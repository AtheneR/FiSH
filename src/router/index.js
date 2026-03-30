import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../views/Home.vue')},
  { path: '/especes-liste/:id?', name: 'EspecesListe', component: () => import('../views/EspecesListe.vue')},
  { path: '/espece-informations/:id', name: 'EspeceInformations', component: () => import('../views/EspeceInformations.vue')},
  { path: '/mes-favoris/', name: 'MesFavoris', component: () => import('../views/MesFavoris.vue')},
  { path: '/informations/', name: 'Informations', component: () => import('../views/Informations.vue')},
  { path: '/recherche-taxon/', name: 'RechercheTaxon', component: () => import('../views/RechercheTaxon.vue')},
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue')}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router