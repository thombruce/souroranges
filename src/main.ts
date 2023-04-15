import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "./style.css"
import App from './App.vue'
import './samples/node-api'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
