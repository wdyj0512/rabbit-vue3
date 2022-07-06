import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import '@/assets/styles/common.less'
import router from './router/index'
import {createPinia} from 'pinia'
import MyUI from '@/components'
const app =createApp(App)
app.use(router)
app.use(createPinia())
app.use(MyUI)
app.mount('#app')