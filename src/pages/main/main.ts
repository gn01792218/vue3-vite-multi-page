import { createApp } from 'vue'
import App from './App.vue'
import router from '../../router'
import store from '../../store'
import '@/assets/style/style.css'
createApp(App).use(router).use(store).mount('#app')

document.title = import.meta.env.VITE_TITLE as string