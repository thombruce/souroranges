import { createRouter, createWebHashHistory } from 'vue-router'

import List from './pages/List.vue'

const routes = [
  { path: '/', name: 'List', component: List },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
