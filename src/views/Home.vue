<!-- cette page affiche juste un message de bienvenue à l'utilisateur quand il arrive sur le site -->

<script setup>
    import { RouterLink } from 'vue-router'
</script>

<template>
    <main class="home">
        <h1>Bienvenue sur Fauna Information & Species Hub (FiSH)</h1>
        <br><p>Vous pourrez trouver des informations sur différentes espèces marines</p>
        <br><p>
            Consultez la liste des animaux :
            <br>
            <RouterLink to="/especes-liste/0" class="link-button">Voir les espèces</RouterLink>
        </p>
    </main>
</template>

<style scoped>
    .home {
        text-align: center;
        padding: 2rem;
        padding-top:50px;
    }

    .link-button {
        display: inline-block;
        margin-top: 1rem;
        padding: 10px 20px;
        background-color: #0a225a;
        color: white;
        text-decoration: none;
        border-radius: 5px;
    }

    .link-button:hover {
        background-color: #0a225a;
    }
</style>