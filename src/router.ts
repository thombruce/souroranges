import { createRouter, createWebHashHistory } from 'vue-router'

import Databases from './pages/Databases/Index.vue'
import Database from './pages/Databases/_id.vue'
import List from './pages/Entities/Index.vue'

const routes = [
  { path: '/', name: 'Databases', component: Databases },
  {
    path: '/:id',
    component: Database,
    children: [
      { path: '', name: 'List', component: List },
    ],
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
