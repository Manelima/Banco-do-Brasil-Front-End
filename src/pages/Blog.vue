<template>
    <v-app>
      <v-app-bar app>
        <v-toolbar-title>Banco do Brasil</v-toolbar-title>

        <v-btn to="/" color="primary">Home</v-btn>
        <v-btn to="/simul" color="secondary">Simulação</v-btn>
        <v-btn to="/linhas" color="secondary">Linhas</v-btn>
        <v-btn to="/operacoes" color="secondary">Operações</v-btn>
       
        

      </v-app-bar>
  
   
      <v-main>
        <v-container>
          
          
        </v-container>

      </v-main>
  
     
      <v-footer app>
        <v-col class="text-center">© 2024 - Meu Projeto</v-col>
      </v-footer>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'Blog',
  }
  </script>
  
  <style>
 
  </style>
  