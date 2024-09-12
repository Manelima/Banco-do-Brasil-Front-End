
import { createRouter, createWebHistory } from 'vue-router'; 
import Home from '@/Pages/Home.vue';
import Simul from '@/Pages/Simul.vue';

const routes = [
  {
    path: '/',
    component: Home, 
  },
  {
    path: '/Simul',
    component: Simul, 
  },
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

export default router;
