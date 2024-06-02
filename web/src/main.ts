import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ArcoVue from '@arco-design/web-vue';
import './style/index.less'
import './style.css'
import '@arco-design/web-vue/dist/arco.css';
import App from './App.vue'
import router from './router';
import registered from './components';

const pinia = createPinia()
const app = createApp(App)
registered(app)
app.use(pinia)
app.use(ArcoVue)
app.use(router)
app.mount('#app')
