<script setup>
    defineProps({
        animal: Object
    })
</script>

<template>
    <div class="animal-card">
        <h3>{{ animal.scientificname }}</h3>
        <p>Famille: {{ animal.family }}</p>
        <router-link :to="`/species/${animal.AphiaID}`" class="details-link">
            Voir détails
        </router-link>
    </div>
</template>

<style scoped>
    .animal-card {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: transform 0.2s;
    }

    .animal-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .animal-card h3 {
        margin-bottom: 8px;
        font-size: 1.2rem;
        color: #0f172a;
    }

    .animal-card p {
        margin-bottom: 12px;
        color: #334155;
    }

    .details-link {
        text-decoration: none;
        color: #38bdf8;
        font-weight: 500;
    }

    .details-link:hover {
        text-decoration: underline;
    }
</style>