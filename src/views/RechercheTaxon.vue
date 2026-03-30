<!-- cette page sert à cherche un taxon spécifique -->
<!-- c'est particulièrement utile car cela n'est pas possible dans l'affichage de la liste à cause de la quantité d'éléments qui est en centaines de milliers -->
<!-- pour la recherche, j'utilise une API disponible qui va permettre de mettre en place la recherche d'un taxon avec seuleent une partie de son nom scientifique -->

<script setup>
    import { ref, watch } from 'vue'
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import TaxonCard from '../components/TaxonCard.vue'

    const search = ref('')
    const taxa = ref([])
    const loading = ref(false)
    const error = ref(null)
    const router = useRouter()
    const modeRecherche = ref('scientifique')

    let timeout = null
    async function recuperationDetailsEnBatch(arrayTaxon, tailleBatch = 5) {
        const resultats = []
        for (let i = 0; i < arrayTaxon.length; i += tailleBatch) {
            const batch = arrayTaxon.slice(i, i + tailleBatch)
            const batchResultats = await Promise.all(
                batch.map(async taxon => {
                    try {
                        const { data: detail } = await axios.get(`https://www.marinespecies.org/rest/AphiaRecordByAphiaID/${taxon.AphiaID}`)
                        let nomCommun = null
                        try {
                            const { data: noms } = await axios.get(`https://www.marinespecies.org/rest/AphiaVernacularsByAphiaID/${taxon.AphiaID}`)
                            if (Array.isArray(noms)) {
                                const priorite = noms.find(v => v.language === 'French') || noms.find(v => v.language === 'English') || noms[0]
                                nomCommun = priorite?.vernacular || null
                            }
                        } catch {
                            nomCommun = null
                        }
                        if (detail.rank === 'Species') {
                            return {...taxon, rank: detail.rank || '', hasChildren: false, nomCommun}
                        }
                        // on regarde juste s'il y a au moins un enfant
                        const { data: children } = await axios.get(`https://www.marinespecies.org/rest/AphiaChildrenByAphiaID/${taxon.AphiaID}?offset=1`)
                        return {
                            ...taxon,
                            rank: detail.rank || '',
                            hasChildren: Array.isArray(children) && children.length > 0,
                            nomCommun
                        }
                    } catch {
                        return { ...taxon, rank: '', hasChildren: false, nomCommun: null }
                    }
                })
            )
            resultats.push(...batchResultats)
        }
        return resultats
    }

    watch([search, modeRecherche], ([newValue]) => {
        clearTimeout(timeout)
        if (!newValue.trim()) {
            taxa.value = []
            return
        }
        timeout = setTimeout(async () => {
            loading.value = true
            error.value = null
            try {
                let data = []
                if (modeRecherche.value === 'scientifique') {
                    const res = await axios.get(
                        `https://www.marinespecies.org/rest/AjaxAphiaRecordsByNamePart/${newValue}`,
                        { params: { max_matches: 50 } }
                    )
                    data = Array.isArray(res.data) ? res.data.map(r => ({
                        AphiaID: r.id,
                        scientificname: r.displayname,
                        authority: r.authority
                    })) : []
                } else {
                    const res = await axios.get(
                        `https://www.marinespecies.org/rest/AphiaRecordsByVernacular/${newValue}`,
                        { params: { like: true } }
                    )
                    data = Array.isArray(res.data) ? res.data.map(r => ({
                        AphiaID: r.AphiaID,
                        scientificname: r.scientificname,
                        authority: r.authority
                    })) : []
                }
                taxa.value = await recuperationDetailsEnBatch(data, 5)
            } catch (err) {
                console.error(err)
                error.value = "Erreur lors de la recherche"
                taxa.value = []
            }
            loading.value = false
        }, 400)
    })

    function voirEnfants(taxon) {
        router.push({ name: 'EspecesListe', params: { id: taxon.AphiaID } })
    }
</script>

<template>
    <main class="arbre-taxon">
        <h1>Recherche</h1>
        <p v-if="modeRecherche === 'scientifique'" class="centre">
            Entrez le nom scientifique d'un taxon (règne, ordre, espèce...) qui vous intéresse
        </p>
        <div v-else class="centre">
            Entrez le nom commun d'un taxon (règne, ordre, espèce...) qui vous intéresse
            <p class="commentaire">
                Attention, tous les taxons ne possèdent pas un nom commun définit, si vous souhaitez une espèce précise rare,<br>
                il peut être nécessaire de chercher à l'avance son nom scientifique
            </p>
        </div>
        <br>
        <input v-model="search" type="text" placeholder="Exemple : Animalia..." class="recherche"/>
        <div class="toggle-mode">
            <button :class="{ actif: modeRecherche === 'scientifique' }" @click="modeRecherche = 'scientifique'">
                Scientifique
            </button>
            <button :class="{ actif: modeRecherche === 'vernaculaire' }" @click="modeRecherche = 'vernaculaire'">
                Nom commun
            </button>
        </div>
        <div v-if="loading" class="centre">Chargement...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else-if="search && taxa.length === 0" class="pas-d-enfant">
            Aucun résultat
        </div>
        
        <ul class="liste" v-else>
            <li v-for="taxon in taxa" :key="taxon.AphiaID">
                <TaxonCard :taxon="taxon">
                    <template #title class="nom">
                        <span v-if="modeRecherche === 'vernaculaire' && taxon.nomCommun">
                            {{ taxon.nomCommun }}
                        </span>
                        <span v-else>
                            {{ taxon.scientificname }}
                        </span>
                    </template>
                    <template #explore v-if="taxon.hasChildren">
                        <button class="btn-explore" @click="voirEnfants(taxon)">
                            Voir les enfants
                        </button>
                    </template>
                </TaxonCard>
            </li>
        </ul>
    </main>
</template>

<style>
    .recherche-page {
        max-width: 600px;
        margin: auto;
        padding: 2rem;
        text-align: center;
    }

    .actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 5px;
        align-items: center;
    }

    .centre {
        text-align: center;
    }

    .recherche {
        padding: 8px 12px;
        border-radius: 15px;
        border: 1px solid #ccc;
        width: 300px;
    }

    .liste {
        list-style: none;
        padding: 0;
    }

    .resultat {
        padding: 10px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
    }

    .resultat:hover {
        background: #f5f5f5;
    }

    .toggle-mode {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 10px;
    }

    .toggle-mode button {
        margin: 5px;
        padding: 6px 10px;
        border-radius: 10px;
        border: 1px solid #ccc;
        background: white;
        cursor: pointer;
    }

    .toggle-mode button.actif {
        background: #38bdf8;
        color: white;
        border-color: #38bdf8;
    }

    .commentaire{
        opacity: 0.9;
    }
</style>