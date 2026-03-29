import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import EspecesListe from '../views/EspecesListe.vue'
import EspeceInformations from '../views/EspeceInformations.vue'
import MesFavoris from '../views/MesFavoris.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/especes-liste/:id?', name: 'EspecesListe', component: EspecesListe},
  { path: '/espece-informations/:id', name: 'EspeceInformations', component: EspeceInformations},
  { path: '/mes-favoris/', name: 'MesFavoris', component: MesFavoris}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router