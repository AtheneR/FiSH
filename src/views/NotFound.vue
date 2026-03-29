<script setup>
</script>

<template>
    <div class="notFound">
        <h1>404</h1>
        <p>Oups ! Cette page n'existe pas.</p>
        <router-link to="/">
            <button class="boutonRetour">Retour à l'accueil</button>
        </router-link>
    </div>
</template>

<style scoped>
    .notFound {
        text-align: center;
        margin-top: 100px;
        font-family: Arial, sans-serif;
    }

    .boutonRetour {
        margin-top: 20px;
        padding: 8px 15px;
        border: 2px solid #0a225a;
        border-radius: 30px;
        background-color: transparent;
        color: #0a225a;
        cursor: pointer;
    }
</style>