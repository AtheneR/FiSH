# Fauna information & Species Hub (FiSH)

## Objectif du projet

L’objectif de FiSH est de créer une interface pour montrer et rechercher des taxons marins à partir de différentes API du site WoRMS (World Register of Marine Species).
Le projet permet aux utilisateurs :

- rechercher un taxon par son nom scientifique
- explorer l’arbre phylogénétique en allant de taxon en taxon en regardant ses enfants
- regarder les informations de chaque taxon
- ajouter et retirer des taxons à une liste de favoris pour y accèder rapidement

## Fonctionnalités principales

La première fonctionnalité est l'affichage de la liste des taxons, suivant un arbre phylogénétique, avec des cartes interactives pour chaque taxon avec une couleur de fond qui varie selon le rang taxonomique. Si elle ressemble aux listes d'éléments que l'on a pu voir en cours, cette page diffère de ce que l'on a pu réaliser car il y a un système de navigation : si on clique sur le bouton "Voir les enfants" on va afficher les taxons qui appartiennent au taxon sur lequel on vient de cliquer. C'est réalisable car les éléments ne sont pas nécessairement des espèces, ils peuvent être aussi des règnes, des classes, des ordres... L'approche est inspirée de la page https://www.marinespecies.org/aphia.php?p=browser&id[]=2#focus .

Il y a un système de favoris : on peut ajouter un taxon (quel que soit son rang taxinomique) à ses favoris, et les retrouver dans un onglet dédié. Dans cet onglet, il y a notamment une barre de recherche qui permet de chercher un taxon ajoutés au favoris en fonction de son nom et un système de tri. On peut avoir l'affichage par défaut, qui est l'affichage chronologique de l'ajout par l'utilisateur du plus vieux au plus récent, le tri alphabétique et par catégorie.

Il y a une page de recherche qui permet d'entrer un nom d'un taxon et qui permet de trouver le ou les taxons correspondants. Cette page se base sur une API qui permet de récupérer en temps réel les taxons qui possèdent la chaîne de caractère entrée dans la barre de recherche. Je crée ainsi une barre de recherche qui permet de récupérer un taxon grâce à son nom, scientifique ou commun.

Finalement, j'ai ajouté une page d'informations pour expliquer les éléments importants, dont principalement la source des données et l'explication du terme de taxon.

Voici quelques pages représentatives :

- http://localhost:5173/espece-informations/140656 : détails de l'espèce Crassostrea gigas, qui possède énormément d'information, ce qui rend cette page représentative de tous les éléments que l'on peut trouver ici

- http://localhost:5173/espece-informations/2 : détails du règne animal, qui possède beaucoup d'enfants

## Difficultés rencontrées et solutions

Le premier soucis rencontré a été lors de la réalisation de la page qui permet de voir l'arbre phylogénétique des taxons. En effet, le but initial était d'afficher tous les taxons dans des cartes, sans ordre précis. Cependant, comme il y a environ 250 000 taxons (plus précisément, 249 857 taxons), c'était beaucoup trop grand pour afficher tous les taxons, car l'API chargaient pendant très longtemps. J'ai donc cherché une autre approche, et celle qui m'a semblée la plus pertinent a été celle réalisée dans la page https://www.marinespecies.org/aphia.php?p=browser&id[]=8#focus. Je me suis donc dit que j'allais adapter cette page pour ne pas tout afficher d'un coup, mais d'en faire une page de navigation où on peut aller de taxon en taxon en regardant ses enfants. De plus, le nombre d'enfants affiché d'un taxon est limité à 50, c'est quelque chose qui est limité par l'API en elle-même pour la récupération des enfants d'un taxon.

Le second problème était donc de rendre la navigation de taxon en taxon intuitive. Mon choix a donc été d'avoir un bouton pour les infos, et un bouton pour l'exploration.

Je voulais également un système pour indiquer simplement si un taxon est dans la liste des favoris ou nom, donc pour ça j'ai choisi de symboliser un favori par une petite étoile à droite de son nom, ça permet de voir facilement les éléments favoris.

J'ai également eu quelques soucis pour le tri en fonction de la catégorie (règne, ordre...) car je voulais classer tous les éléments similaires ensemble. Par exemple, il y a "Kingdom", "Superkingdom" ou d'autres éléments similaires mais que l'on peut regrouper comme étant des "Kingdom" donc j'ai passé du temps à chercher une manière de les regrouper ensemble.

J'ai eu des difficulté à mettre en place la barre de recherche des taxons pour le mode "Commun". En effet, l'API renvoie un ou plusieurs noms communs liés à un taxon. Ainsi, un taxon peut avoir aucun, un ou plusieurs nom commun, et ce en plusieurs langues. J'ai décidé de faire un tri en affichant seulement les noms communs qui sont liés à l'anglais ou en français, en priorisant ceux en français. J'ai mis beaucoup de temps à trouver comment récupérer efficacement ça, et à prioriser les élémenst en français puis prendre ceux en anglais.

Finalement, j'ai également fait quelques tests pour essayer de créer une barre de recherche qui permette d'entrer une localisation (comme on entre ici le nom scientifique d'un taxon) mais ce système était complexe à mettre en place, l'API appelait parfois pendant vraiment longtemps et les zones sont exclusivement en anglais et avec des termes très spécifiques, ce qui rendait l'utilisation assez complexe. Il y avait également trop d'éléments pour afficher simplement toutes les localisations possibles.

## Installation et lancement

1. Cloner le dépôt

```bash
git clone https://github.com/AtheneR/FiSH
cd FiSH
```

2. Installer les dépendances

```bash
npm install
```

3. Lancer le serveur de développement

```bash
npm run dev
```

4. Accéder à l’application

Ouvrir le navigateur à l’adresse indiquée dans le terminal
