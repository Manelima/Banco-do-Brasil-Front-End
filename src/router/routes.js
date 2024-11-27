import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/pages/Login.vue';
import Home from '@/pages/Home.vue';
import Linhas from '@/pages/Linhas.vue';
import Simul from '@/pages/Simul.vue';
import Operacoes from '@/pages/Operacoes.vue';
import Blog from '@/pages/Blog.vue';
import Resultado from '@/pages/Resultado.vue';
 

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
   {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/simul',
    name: 'Simul',
    component: Simul,
  },
  {
    path: '/linhas',
    name: 'Linhas',
    component: Linhas,
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
  },
  {
    path: '/operacoes',
    name: 'Operacoes',
    component: Operacoes,
  }, 
  {
    path: '/resultado',
    name: 'Resultado',
    component: Resultado,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
