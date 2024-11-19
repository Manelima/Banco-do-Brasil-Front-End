import { createApp } from 'vue';
import App from './App.vue';
import router from './router/routes';  
import vuetify from './plugins/vuetify'; 
import VueChartkick from 'vue-chartkick';
import 'chartkick/chart.js';


createApp(App)
  .use(router)
  .use(vuetify)
  .use(VueChartkick)
  .mount('#app');

