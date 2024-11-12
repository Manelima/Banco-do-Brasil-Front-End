import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/pages/Home.vue';
import Linhas from '@/pages/Linhas.vue';
import Simul from '@/pages/Simul.vue';
import Operacoes from '@/pages/Opera.vue';
import Blog from '@/pages/Blog.vue';

const routes = [
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
