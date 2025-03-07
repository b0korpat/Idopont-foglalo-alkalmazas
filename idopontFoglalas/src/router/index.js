import { createRouter, createWebHistory } from 'vue-router'
import IdopontPage from '../views/IdopontPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Időpont foglalás',
      component: IdopontPage,
    }

  ],
})

export default router
