import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import EspecesListe from '../views/EspecesListe.vue'
import EspeceInformations from '../views/EspeceInformations.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/especes-liste/:id?', name: 'EspecesListe', component: EspecesListe},
  { path: '/espece-informations/:id', name: 'EspeceInformations', component: EspeceInformations}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router