import { createRouter, createWebHashHistory } from 'vue-router'

import List from './pages/List.vue'
import Databases from './pages/Databases.vue'

const routes = [
  { path: '/', name: 'Databases', component: Databases },
  { path: '/list', name: 'List', component: List }, // Database views should be child of Databases
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
