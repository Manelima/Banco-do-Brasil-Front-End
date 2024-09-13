<template>
    <v-app>
      <!-- Header -->
      <v-app-bar app>
        <v-toolbar-title>Banco do Brasil</v-toolbar-title>

        <v-btn to="/" color="primary">Home</v-btn>
        <v-btn to="/simul" color="secondary">Simulação</v-btn>
        <v-btn to="/operacoes" color="secondary">Operacoes</v-btn>
        <v-btn to="/blog" color="secondary">Blog</v-btn>

      </v-app-bar>
  
   
      <v-main>
        <v-container>
          
          
        </v-container>
        <router-view></router-view>
      </v-main>
  
     
      <v-footer app>
        <v-col class="text-center">© 2024 - Meu Projeto</v-col>
      </v-footer>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'Linhas',
  }
  </script>
  
  <style>
 
  </style>
  