import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAnimalByAphiaID } from '../api/wormsApi';

export const storeAnimaux = defineStore('animaux', () => {
  const animaux = ref([]);
  const animauxSelectionnes = ref(null);

  const recuperationAnimal = async (id) => {
    animauxSelectionnes.value = await getAnimalByAphiaID(id);
  };

  return { animaux, animauxSelectionnes, recuperationAnimal, searchAnimaux };
});
