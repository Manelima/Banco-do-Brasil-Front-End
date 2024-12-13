// import { createRouter, createWebHistory } from 'vue-router'; 

// // Importando as páginas
// import Login from '@/pages/Login.vue';
// import Home from '@/pages/Home.vue';
// import Linhas from '@/pages/Linhas.vue';
// import Simul from '@/pages/Simul.vue';
// import Operacoes from '@/pages/Operacoes.vue';
// import Blog from '@/pages/Blog.vue';
// import Resultado from '@/pages/Resultado.vue';

// // Função para verificar autenticação
// const isAuthenticated = () => {
//   // Exemplo: verifica se existe um token no localStorage
//   return localStorage.getItem('authToken') !== null;
// };

// // Definição das rotas
// const routes = [
//   {
//     path: '/login',
//     name: 'Login',
//     component: Login,
//   },
//   {
//     path: '/',
//     name: 'Home',
//     component: Home,
//     meta: { requiresAuth: true }, // Define que esta rota requer autenticação
//   },
//   {
//     path: '/simul',
//     name: 'Simul',
//     component: Simul,
//     meta: { requiresAuth: true },
//   },
//   {
//     path: '/linhas',
//     name: 'Linhas',
//     component: Linhas,
//     meta: { requiresAuth: true },
//   },
//   {
//     path: '/blog',
//     name: 'Blog',
//     component: Blog,
//     meta: { requiresAuth: true },
//   },
//   {
//     path: '/operacoes',
//     name: 'Operacoes',
//     component: Operacoes,
//     meta: { requiresAuth: true },
//   },
//   {
//     path: '/resultado',
//     name: 'Resultado',
//     component: Resultado,
//     meta: { requiresAuth: true },
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !isAuthenticated()) {
//     next({ name: 'Login' });
//   } else {
//     next(); // Permite continuar para a rota
//   }
// });

// export default router;

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