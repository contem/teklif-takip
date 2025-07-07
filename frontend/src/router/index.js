import { createRouter, createWebHistory } from 'vue-router'
import Customers from '@/views/Customers.vue'
import Offers from '@/views/Offers.vue'

const routes = [
  { path: '/', name: 'Customers', component: Customers },
  { path: '/offers', name: 'Offers', component: Offers },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
