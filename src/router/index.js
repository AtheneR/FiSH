import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import EspecesListe from '../views/EspecesListe.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/especes-liste', component: EspecesListe },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router