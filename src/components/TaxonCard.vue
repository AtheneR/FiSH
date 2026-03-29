<script setup>
    import { computed } from 'vue'
    import { useRouter } from 'vue-router'
    import { useFavoritesStore } from '../stores/favorisStore'
    
    const favorisStore = useFavoritesStore()
    const props = defineProps({taxon: Object})
    const emit = defineEmits(['info'])
    const router = useRouter()
    const isFav = computed(() => favorisStore.isFavorite(props.taxon.AphiaID))

    function explorer() {
        router.push({ name: 'EspecesListe', params: { id: props.taxon.AphiaID } })
    }

    function voirInfos() {
        router.push({
            name: 'EspeceInformations',
            params: { id: props.taxon.AphiaID }
        })
    }

    function toggleFavori() {
        if (isFav.value) {
            favorisStore.removeFavorite(props.taxon.AphiaID)
        } else {
            favorisStore.addFavorite(props.taxon)
        }
    }

    const backgroundColor = computed(() => {
        const rank = props.taxon.rank.toLowerCase()
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
    <div class="box_taxon" :style="{ backgroundColor: backgroundColor }">
        <p class="nom">{{ taxon.scientificname }}{{ isFav ? ' ★' : '' }}</p>
        <p class="rank">{{ taxon.rank }}</p>
        <div class="actions">
            <button class="btn-info" @click.stop="voirInfos">
                Informations
            </button>
            <button :class="['btn-fav', { actif: isFav }]" @click.stop="toggleFavori">
                {{ isFav ? 'Retirer des favoris' : 'Ajouter aux favoris' }}
            </button>
            <slot name="explore"></slot>
        </div>
    </div>
</template>

<style>
    .box_taxon {
        box-shadow: rgba(139, 139, 139, 0.2) 0px 2px 8px;
        border-radius: 15px;
        padding: 15px;
        width: 180px;
        min-height: 180px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        text-align: center;
    }

    .nom { 
        font-weight: bold; 
        margin-top: 1px;
        font-size: 1.15rem;
    }

    .rank {
        font-size: 0.85rem;
        opacity: 0.9;
    }

    .actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 5px;
    }

    .btn-explore {
        border-radius: 10px;
        border: 1px solid #4CAF50;
        background: white;
        color: #4CAF50;
        cursor: pointer;
        padding: 5px;
    }

    .btn-info {
        border-radius: 10px;
        border: 1px solid #2196F3;
        background: white;
        color: #2196F3;
        cursor: pointer;
        padding: 5px;
    }
</style>