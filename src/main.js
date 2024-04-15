import { createApp } from 'vue'
import App from './App.vue'

import router from './routes/router'
import './styles/styles.scss'
import store from './store'

import CoreuiVue from '@coreui/vue';
import '@coreui/coreui/dist/css/coreui.min.css'


createApp(App).use(store).use(router).use(CoreuiVue).mount('#app')
