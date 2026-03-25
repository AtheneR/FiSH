<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import EspeceCarte from '../components/EspeceCarte.vue'

const animals = ref([])
const loading = ref(true)
const error = ref(null)
const ANIMALIA_ID = 1

async function fetchAnimals() {
  loading.value = true
  error.value = null

  try {
    const { data } = await axios.get(
      `https://www.marinespecies.org/rest/AphiaChildrenByAphiaID/${ANIMALIA_ID}`
    )

    if (!data || !data.length) {
      throw new Error('Réponse vide de l’API')
    }

    animals.value = data
      .filter(item => item.rank === 'Species')
      .slice(0, 50)
      .map(item => ({
        AphiaID: item.AphiaID,
        scientificname: item.scientificname,
        family: item.family || 'Inconnue',
      }))

    console.log(animals.value)
  } catch (err) {
    error.value = err.message || 'Erreur inconnue'
  } finally {
    loading.value = false
  }
}

onMounted(fetchAnimals)
</script>

<template>
  <main class="especes-liste">
    <h1>Liste des animaux</h1>

    <div v-if="loading">Chargement des espèces...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="grid">
      <EspeceCarte
        v-for="animal in animals"
        :key="animal.AphiaID"
        :animal="animal"
      />
    </div>
  </main>
</template>

<style scoped>
.especes-liste {
  padding: 2rem;
}

.grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin-top: 2rem;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>