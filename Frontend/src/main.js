import { createApp } from 'vue'

import App from './pages/App.vue';
import router from './router';
import store from './store/mainStore'
// import './assets/tailwind.css';

createApp(App).use(router).use(store).mount('#app')

