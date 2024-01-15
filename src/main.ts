import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'


import App from './App.vue'
import router from './router' 
import { ConfigProvider } from 'vant';

import '@/assets/css/index.css'
import 'vant/lib/index.css';
import '@varlet/ui/es/style'
import 'tdesign-mobile-vue/es/style/index.css';

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)

app.use(ConfigProvider);

app.use(pinia)
app.use(router)

app.mount('#app')
