<template>
  <v-app-bar class="home-header">
    
    <v-img src="@/images/bb.png" class="home-logo"></v-img>
    <div class="home-linha_preta_vertical"></div>

    <v-app-bar-title class="home-titulo_nav_bar">
      Banco do Brasil
    </v-app-bar-title>

    <v-btn to="/simul" class="home-buttongeral mx-1">Simulação</v-btn>
    <v-btn to="/operacoes" class="home-buttongeral mx-1">Operacoes</v-btn>
    <v-btn to="/linhas" class="home-buttongeral mx-1">Linhas</v-btn>
    <v-btn to="/blog" class="home-buttongeral mx-1">Blog</v-btn>
    
  </v-app-bar>


  <v-main>
    <v-container>
      
      
    </v-container>
  </v-main>
  
    
  <v-footer app class="home-footer">
    <v-col class="text-center texto_footer">© 2024 - Tropa do BB</v-col>
  </v-footer>
</template>
  
  <script>
  import "@/styles/Home.css";

  export default {
    name: 'Home',
  }
  </script>
  
  <style>
 
  </style>
  