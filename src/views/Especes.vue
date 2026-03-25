<template>
    <div v-if="animal">
        <h1>{{ animal.scientificname }}</h1>
        <p>Famille: {{ animal.family }}</p>
        <p>Classe: {{ animal.class }}</p>
        <p>Rang: {{ animal.rank }}</p>
        <p>
            Distribution: <span v-for="dist in distributions" :key="dist.area">{{ dist.area }}</span>
        </p>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'
    import { useRoute } from 'vue-router'
    import { useAnimalsStore } from '../stores/animals'
    import { getAnimalByAphiaID, getDistributionsByAphiaID } from '../api/wormsApi'

    const route = useRoute()
    const animalsStore = useAnimalsStore()
    const animal = ref(null)
    const distributions = ref([])

    onMounted(async () => {
        const id = route.params.id
        animal.value = await getAnimalByAphiaID(id)
        distributions.value = await getDistributionsByAphiaID(id)
    })
</script>