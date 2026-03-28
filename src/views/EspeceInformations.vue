<script setup>
    import { ref, onMounted, watch } from 'vue'
    import { useRoute } from 'vue-router'
    import { computed } from 'vue'
    import axios from 'axios'

    const route = useRoute()
    const taxon = ref(null)
    const loading = ref(true)
    const error = ref(null)
    const distributions = ref([])
    const vernaculars = ref([])
    const sources = ref([])
    const synonyms = ref([])

    async function recuperationTaxon(id) {
        loading.value = true
        error.value = null

        try {
            const { data } = await axios.get(
                `https://www.marinespecies.org/rest/AphiaRecordByAphiaID/${id}`
            )
            taxon.value = data

            const distRes = await axios.get(
                `https://www.marinespecies.org/rest/AphiaDistributionsByAphiaID/${id}`
            )
            distributions.value = (distRes.data || []).filter(d => d.locality && d.locality.trim() !== '')

            const vernRes = await axios.get(
                `https://www.marinespecies.org/rest/AphiaVernacularsByAphiaID/${id}`
            )
            vernaculars.value = (vernRes.data || []).filter(v => v.vernacular && v.vernacular.trim() !== '')

            const srcRes = await axios.get(
                `https://www.marinespecies.org/rest/AphiaSourcesByAphiaID/${id}`
            )
            sources.value = (srcRes.data || []).filter(s => (s.reference || s.fulltext) && (s.reference || s.fulltext).trim() !== '')

            const synRes = await axios.get(
                `https://www.marinespecies.org/rest/AphiaSynonymsByAphiaID/${id}`
            )
            synonyms.value = (synRes.data || []).filter(s => s.scientificname && s.scientificname.trim() !== '')
        } catch (err) {
            error.value = err.message
            taxon.value = null
        }
        loading.value = false
    }

    onMounted(() => {
        const id = route.params.id
        recuperationTaxon(id)
    })

    watch(
        () => route.params.id,
        (newId) => {
            recuperationTaxon(newId)
        }
    )

    const backgroundColor = computed(() => {
        if (!taxon.value?.rank) return '#F5F5F5'
        const rank = taxon.value.rank.toLowerCase()
        if (rank.includes('kingdom')) return '#E1F5FE'
        if (rank.includes('phylum')) return '#F3E5F5'
        if (rank.includes('class')) return '#E8F5E9'
        if (rank.includes('order')) return '#FFF3E0'
        if (rank.includes('family')) return '#E3F2FD'
        if (rank.includes('genus')) return '#E8F5E9'
        if (rank.includes('species')) return '#ebfffb'
        return '#F5F5F5'
    })
</script>

<template>
    <main class="taxon-detail">
        <div v-if="loading">Chargement...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else-if="taxon">
            <h1>{{ taxon.scientificname }}</h1>
            <p v-if="taxon.authority" class="authority">
                {{ taxon.authority }}
            </p>

            <div class="bloc" :style="{ backgroundColor: backgroundColor }">
                <p v-if="taxon.rank"><strong>Rang :</strong> {{ taxon.rank }}</p>
                <p v-if="taxon.status"><strong>Statut :</strong> {{ taxon.status }}</p>
            </div>

            <div class="bloc" :style="{ backgroundColor: backgroundColor }">
                <h2>Classification</h2>
                <p v-if="taxon.kingdom"><strong>Kingdom :</strong> {{ taxon.kingdom }}</p>
                <p v-if="taxon.phylum"><strong>Phylum :</strong> {{ taxon.phylum }}</p>
                <p v-if="taxon.class"><strong>Class :</strong> {{ taxon.class }}</p>
                <p v-if="taxon.order"><strong>Order :</strong> {{ taxon.order }}</p>
                <p v-if="taxon.family"><strong>Family :</strong> {{ taxon.family }}</p>
                <p v-if="taxon.genus"><strong>Genus :</strong> {{ taxon.genus }}</p>
            </div>

            <div class="bloc" :style="{ backgroundColor: backgroundColor }">
                <h2>Informations</h2>
                <p><strong>Marine :</strong> {{ taxon.isMarine ? 'Oui' : 'Non' }}</p>
                <p><strong>Eau douce :</strong> {{ taxon.isFreshwater ? 'Oui' : 'Non' }}</p>
                <p><strong>Terrestre :</strong> {{ taxon.isTerrestrial ? 'Oui' : 'Non' }}</p>
                <p><strong>Éteint :</strong> {{ taxon.isExtinct ? 'Oui' : 'Non' }}</p>
            </div>

            <div class="bloc" :style="{ backgroundColor: backgroundColor }" v-if="vernaculars.length">
                <h2>Noms communs</h2>
                <ul>
                    <li v-for="v in vernaculars" :key="v.vernacular">{{ v.vernacular }} <span v-if="v.language">({{ v.language }})</span></li>
                </ul>
            </div>

            <div class="bloc" :style="{ backgroundColor: backgroundColor }" v-if="synonyms.length">
                <h2>Synonymes</h2>
                <ul>
                    <li v-for="s in synonyms" :key="s.AphiaID">{{ s.scientificname }} <span v-if="s.authority">({{ s.authority }})</span></li>
                </ul>
            </div>

            <div class="bloc" :style="{ backgroundColor: backgroundColor }" v-if="distributions.length">
                <h2>Localisation</h2>
                <p class="informations">Liste des régions où cette espèce a été vue</p>
                <ul>
                    <li v-for="d in distributions" :key="d.locality">{{ d.locality }}</li>
                </ul>
            </div>

            <div class="bloc" :style="{ backgroundColor: backgroundColor }" v-if="sources.length">
                <h2>Sources</h2>
                <ul>
                    <li v-for="s in sources" :key="s.source_id">
                    <a v-if="s.url" :href="s.url" target="_blank">{{ s.reference || s.fulltext }}</a>
                    <span v-else>{{ s.reference || s.fulltext }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>

<style scoped>
    .taxon-detail {
        padding: 1rem;
        max-width: 800px;
        margin: auto;
    }

    h1 {
        text-align: center;
    }

    .authority {
        text-align: center;
        font-style: italic;
        margin-bottom: 20px;
    }

    .bloc {
        margin-top: 20px;
        padding: 15px;
        border-radius: 10px;
        background-color: #f5f5f5;
    }

    .informations {
        opacity: 0.9;
    }
</style>