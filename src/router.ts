import { createRouter, createWebHashHistory } from 'vue-router'

import List from './pages/List.vue'
import Databases from './pages/Databases.vue'

const routes = [
  { path: '/', name: 'List', component: List },
  { path: '/databases', name: 'Databases', component: Databases },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
