<script setup>
    import { RouterLink } from "vue-router";
</script>

<template>
    <nav class="navbar">
        <RouterLink to="/" class="logo">FiSH</RouterLink>
        <div class="liens">
            <RouterLink to="/">Accueil</RouterLink>
            <RouterLink to="/especes-liste/0">Les espèces</RouterLink>
            <RouterLink to="/mes-favoris/">Mes favoris</RouterLink>
            <RouterLink to="/informations/">Informations</RouterLink>
        </div>
    </nav>
</template>

<style scoped>
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #0a225a;
        color: white;
        padding: 15px 50px;
    }

    @media (min-width: 1024px) {
        .navbar {
            padding-left: 250px;
            padding-right: 250px;
        }
    }

    @media (min-width: 1440px) {
        .navbar {
            padding-left: 350px;
            padding-right: 350px;
        }
    }

    .logo {
        margin: 0;
        font-size: 1.5rem;
        text-decoration: none;
        color: white;
    }

    .liens {
        display: flex;
        gap: 20px;
    }

    .liens a {
        color: white;
        text-decoration: none;
        font-weight: 500;
    }

    .liens a.router-link-active {
        border-bottom: 2px solid #38bdf8;
    }
</style>