<script setup>
    import Navbar from './components/Navbar.vue'
    import { RouterView } from 'vue-router'
</script>

<template>
    <Navbar />
    <div class="container">
        <RouterView />
    </div>
</template>

<style>
    .container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
    }
</style>