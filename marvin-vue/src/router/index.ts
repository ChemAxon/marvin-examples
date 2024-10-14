import { createRouter, createWebHistory } from 'vue-router'
import MarvinProCreateFunction from '../views/Marvin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'functional integration',
      component: MarvinProCreateFunction
    }
  ]
})

export default router
