import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref([])

  function addFavorite(taxon) {
    if (!favorites.value.find(f => f.AphiaID === taxon.AphiaID)) {
      favorites.value.push(taxon)
    }
  }

  function removeFavorite(AphiaID) {
    favorites.value = favorites.value.filter(f => f.AphiaID !== AphiaID)
  }

  function isFavorite(AphiaID) {
    return favorites.value.some(f => f.AphiaID === AphiaID)
  }

  return { favorites, addFavorite, removeFavorite, isFavorite }
})