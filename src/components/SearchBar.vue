<script setup>
    const model = defineModel()
</script>

<template>
    <input
        type="text"
        v-model="model"
        placeholder="Entrer un taxon"
        class="recherche"
    />
</template>

<style>
    .recherche {
        padding: 8px 12px;
        border-radius: 15px;
        border: 1px solid #ccc;
        width: 300px;
    }
</style>