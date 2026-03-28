<script setup>
    import { ref, watch, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import axios from 'axios'
    import TaxonCard from '../components/TaxonCard.vue'

    const taxa = ref([])
    const loading = ref(true)
    const error = ref(null)
    const route = useRoute()
    const router = useRouter()
    const currentTaxonName = ref('Biota')

    async function recuperationTaxon(id) {
        try {
            const { data } = await axios.get(`https://www.marinespecies.org/rest/AphiaChildrenByAphiaID/${id}`)
            if (!Array.isArray(data)) {
                console.warn('Réponse inattendue :', data)
                return []
            }

            return data.map(item => ({
                AphiaID: item.AphiaID,
                scientificname: item.scientificname,
                rank: item.rank,
                children: []
            }))
        } catch (err) {
            error.value = err.message
            return []
        }
    }

    function voirEnfants(taxon) {
        router.push({ name: 'EspecesListe', params: { id: taxon.AphiaID } })
    }

    async function chargerTaxon(id) {
        loading.value = true
        error.value = null
        let taxonBruts = []
        // il n'y a pas d'élément 0, qui correspond à la biote, la racine est donc simulée avec les premiers éléments
        // approche inspirée de la page https://www.marinespecies.org/aphia.php?p=browser&id[]=2#focus
        if (id === 0) {
            taxonBruts = [
                { AphiaID: 2, scientificname: 'Animalia', rank: 'Kingdom' },
                { AphiaID: 3, scientificname: 'Plantae', rank: 'Kingdom' },
                { AphiaID: 4, scientificname: 'Fungi', rank: 'Kingdom' },
                { AphiaID: 5, scientificname: 'Protozoa', rank: 'Kingdom' },
                { AphiaID: 6, scientificname: 'Bacteria', rank: 'Kingdom' },
                { AphiaID: 7, scientificname: 'Chromista', rank: 'Kingdom' },
                { AphiaID: 8, scientificname: 'Archaea', rank: 'Kingdom' },
                { AphiaID: 10, scientificname: 'Viruses', rank: 'Kingdom' },
                { AphiaID: 147415, scientificname: 'Monera', rank: 'Kingdom' }
            ]
        } else {
            taxonBruts = await recuperationTaxon(id)
        }
        if (id === 0) {
            currentTaxonName.value = 'Biota'
        } else {
            try {
                const response = await axios.get(
                    `https://www.marinespecies.org/rest/AphiaRecordByAphiaID/${id}`
                )
                currentTaxonName.value = response.data.scientificname || 'Taxon inconnu'
            } catch {
                currentTaxonName.value = 'Taxon inconnu'
            }
        }

        taxa.value = await Promise.all(
            taxonBruts.map(async (taxon) => {
                if (taxon.rank === 'Species') {
                    return { ...taxon, hasChildren: false }
                }
                try {
                    const response = await axios.get(
                        `https://www.marinespecies.org/rest/AphiaChildrenByAphiaID/${taxon.AphiaID}?offset=1`
                    )
                    const data = response.data
                    return { ...taxon, hasChildren: Array.isArray(data) && data.length > 0 }
                } catch {
                    return { ...taxon, hasChildren: false }
                }
            })
        )
        loading.value = false
    }

    onMounted(() => {
        const id = Number(route.params.id || 0)
        chargerTaxon(id)
    })

    watch(
        () => route.params.id,
        (newId) => {chargerTaxon(Number(newId || 0))}
    )
</script>

<template>
    <main class="arbre-taxon">
        <h1>{{ currentTaxonName }}</h1>
        <div v-if="loading">Chargement...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else-if="taxa.length === 0" class="pas-d-enfant">
            Ce taxon n'a pas d'enfants.
        </div>
        <ul class="liste" v-else>
            <li v-for="taxon in taxa" :key="taxon.AphiaID">
                <TaxonCard :taxon="taxon">
                    <template #explore v-if="taxon.hasChildren && taxon.rank !== 'Species'">
                        <button class="btn-explore" @click="voirEnfants(taxon)">
                            Voir les enfants
                        </button>
                    </template>
                </TaxonCard>
            </li>
        </ul>
    </main>
</template>

<style scoped>
    .arbre-taxon {
        padding: 1rem;
    }

    .arbre-taxon h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    .liste {
        list-style: none;
        padding: 0;
        margin: 30px auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 40px;
        justify-content: center;
    }

    .pas-d-enfant {
        text-align: center;
        margin-top: 50px;
        font-size: 1.2rem;
        color: #666;
    }
</style>