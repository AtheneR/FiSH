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
    let timeout = null

    watch(search, (newValue) => {
        clearTimeout(timeout)
        if (!newValue.trim()) {
            taxa.value = []
            return
        }
        timeout = setTimeout(async () => {
            loading.value = true
            error.value = null
            try {
                const { data } = await axios.get(
                    `https://www.marinespecies.org/rest/AjaxAphiaRecordsByNamePart/${newValue}`,
                    { params: { max_matches: 50 } }
                )
                const nettoye = Array.isArray(data) ? data.map(r => ({AphiaID: r.id, scientificname: r.displayname, authority: r.authority})) : []
                const detaille = await Promise.all(
                    nettoye.map(async (taxon) => {
                    try {
                        const { data: detail } = await axios.get(`https://www.marinespecies.org/rest/AphiaRecordByAphiaID/${taxon.AphiaID}`)
                        return {
                            ...taxon,
                            rank: detail.rank || '',
                            hasChildren: detail.childcount > 0
                        }
                    } catch {
                        return { ...taxon, rank: '', hasChildren: false }
                    }
                    })
                )
                taxa.value = detaille
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
        <input v-model="search" type="text" placeholder="Exemple : Animalia..." class="recherche"/>
        <div v-if="loading" class="centre">Chargement...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else-if="search && taxa.length === 0" class="pas-d-enfant">
            Aucun résultat
        </div>
        <ul class="liste" v-else>
            <li v-for="taxon in taxa" :key="taxon.AphiaID">
                <TaxonCard :taxon="taxon">
                    <template #explore>
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
</style>