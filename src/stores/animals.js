import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAnimalByAphiaID, searchAnimalsByName } from '../api/wormsApi'

export const useAnimalsStore = defineStore('animals', () => {
    const animals = ref([])
    const selectedAnimal = ref(null)
    const fetchAnimal = async (id) => {
        selectedAnimal.value = await getAnimalByAphiaID(id)
    }
    const searchAnimals = async (name) => {
        animals.value = await searchAnimalsByName(name)
    }
    return { animals, selectedAnimal, fetchAnimal, searchAnimals }
})