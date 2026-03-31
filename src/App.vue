<script setup>
    import Navbar from './components/Navbar.vue'
    import { RouterView } from 'vue-router'
</script>

<template class="fond-blanc">
    <Navbar />
    <div class="container">
        <Suspense>
            <template #default>
                <RouterView />
            </template>
            <template #fallback>
                <div class="centre">Chargement...</div>
            </template>
        </Suspense>
    </div>
</template>

<style>
    .fond-blanc{
        background-color: white;
    }

    .container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
    }

    .centre {
        text-align: center;
    }
</style>