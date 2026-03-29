<script setup>
    import { storeToRefs } from 'pinia'
    import { useFavoritesStore } from '../stores/favorisStore'
    import TaxonCard from '../components/TaxonCard.vue'
    import { computed, ref } from 'vue'
    import SearchBar from '../components/SearchBar.vue'

    const favorisStore = useFavoritesStore()
    const { favorites } = storeToRefs(favorisStore)
    const modeTri = ref('none')
    const search = ref('')

    function normalisationRangs(rank) {
        return rank.toLowerCase().replace('sub', '').replace(/\(.*?\)/g, '').trim()
    }

    const favorisTries = computed(() => {
        let list = [...favorites.value]
        if (search.value.trim() !== '') {
            list = list.filter(t =>
                t.scientificname.toLowerCase().includes(search.value.toLowerCase())
            )
        }

        if (modeTri.value === 'alpha') {
            return list.sort((a, b) => a.scientificname.localeCompare(b.scientificname))
        }

        if (modeTri.value === 'rank') {
            return list.sort((a, b) => {
                const rankA = normalisationRangs(a.rank)
                const rankB = normalisationRangs(b.rank)
                if (rankA === rankB) {
                    return a.scientificname.localeCompare(b.scientificname)
                }
                return rankA.localeCompare(rankB)
            })
        }
        return list
    })
</script>

<template>
    <main class="arbre-taxon">
        <h1>Mes favoris</h1>
        <SearchBar v-model="search" />
        <div class="tri">
            <button :class="{ actif: modeTri === 'none' }" @click="modeTri = 'none'">
                Aucun tri
            </button>

            <button :class="{ actif: modeTri === 'alpha' }" @click="modeTri = 'alpha'">
                Tri alphabétique
            </button>

            <button :class="{ actif: modeTri === 'rank' }" @click="modeTri = 'rank'">
                Par catégorie
            </button>
        </div>

        <div v-if="favorites.length === 0" class="pas-d-enfant">
            Aucun favori pour le moment.
        </div>

        <ul class="liste" v-else>
            <li v-for="taxon in favorisTries" :key="taxon.AphiaID">
                <TaxonCard :taxon="taxon" />
            </li>
        </ul>
    </main>
</template>

<style>
    .tri {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin-bottom: 20px;
    }

    .tri button {
        padding: 5px 10px;
        border-radius: 8px;
        border: 1px solid #ccc;
        background: white;
        cursor: pointer;
        transition: background 0.2s ease;
    }

    .tri button.actif {
        background: #F3E5F5;
    }

    .recherche {
        display: block;
        margin: 0 auto 20px auto;
    }
</style>