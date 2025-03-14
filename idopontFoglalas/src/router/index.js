import { createRouter, createWebHistory } from 'vue-router'
import IdopontPage from '../views/IdopontPage.vue'
import HomePage from "@/views/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Orvosi Rendelő',
      component: HomePage,
    },
    {
      path: '/idopontfoglalas',
      name: 'Időpont foglalás',
      component: IdopontPage,
    }

  ],
})

export default router
