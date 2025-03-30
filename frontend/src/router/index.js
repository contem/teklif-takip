import { createRouter, createWebHistory } from 'vue-router'

import Customers from '../views/Customers.vue'
import Offers from '../views/Offers.vue'

const routes = [
  { path: '/', redirect: '/customers' },
  { path: '/customers', component: Customers },
  { path: '/offers', component: Offers },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
