<template>
    <main class="informations">
        <h1>Informations sur WoRMS</h1>
        <p>
            Ce site utilise les données de <strong>WoRMS</strong> 
            (<a href="https://www.marinespecies.org" target="_blank" class="lien">World Register of Marine Species</a>), 
            une base de données mondiale qui recense toutes les espèces marines connues. 
            Elle permet d'accèder à la hiérarchie biologique des organismes.
        </p>
        <p>
            Les informations que vous voyez ici sont organisées en <strong>taxons</strong>. 
            Un <em>taxon</em> (pluriel <em>taxa</em>) est un groupe d'organismes classé selon leur parenté biologique. Par exemple, <strong>Kingdom</strong> (Règne), 
            <strong>Phylum</strong> (Embranchement), <strong>Class</strong> (Classe), et <strong>Species</strong> (Espèce) sont des niveaux de taxons.
        </p>
        <p>
            Grâce à l'API de WoRMS, vous pouvez savoir pour chaque taxon :
        </p>
        <ul>
            <li>Son nom scientifique et son autorité (qui l'a décrit)</li>
            <li>Sa classification complète</li>
            <li>Son statut (valide, synonyme, éteint...)</li>
            <li>Ses distributions géographiques</li>
            <li>Ses potentiels enfants (pour les taxons qui représentent des règnes, embranchements...)</li>
            <li>Ses noms communs</li>
            <li>Ses synonymes</li>
        </ul>
        <p>
            Cette interface vous permet également de gérer vos favoris, explorer les taxons enfants et consulter des informations détaillées de chaque taxon.
        </p>
    </main>
    <div class="button">
        <RouterLink to="/especes-liste/0" class="link-button">Voir les espèces</RouterLink>
    </div>
</template>

<style>
    .informations {
        max-width: 800px;
        margin: auto;
        text-align: left;
        padding: 2rem;
        padding-top: 50px;
        line-height: 1.6;
    }

    .informations h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    .lien {
        color: #0a225a;
        text-decoration: underline;
    }

    .informations ul {
        margin-left: 20px;
        margin-top: 10px;
    }

    .button {
        text-align: center;
        margin-top: -25px;

    }

    .link-button {
        display: inline-block;
        margin-top: 1rem;
        padding: 10px 20px;
        background-color: #0a225a;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
    }

    .link-button:hover {
        background-color: #0a225a;
    }
</style>