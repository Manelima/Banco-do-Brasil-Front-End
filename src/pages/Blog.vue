<template>
  <v-app-bar class="blog-header">
    <v-img src="@/images/bb.png" class="line-logo"></v-img>
    <div class="blog-linha_preta_vertical"></div>
    <v-toolbar-title class="blog-titulo_nav_bar">Banco do Brasil</v-toolbar-title>

    <v-btn to="/" class="blog-buttongeral mx-1">Home</v-btn>
    <v-btn to="/simul" class="blog-buttongeral mx-1">Simulação</v-btn>
    <v-btn to="/linhas" class="blog-buttongeral mx-1">Linhas</v-btn>
    <v-btn to="/operacoes" class="blog-buttongeral mx-1">Operações</v-btn>
    
   

  </v-app-bar>


  <v-main>
    <v-container>
      
  <div>
    Safadeza
    <svg-icon :path="path" class="icon" />
  </div>

    </v-container>

  </v-main>

  
  <v-footer app class="blog-footer">
    <v-col class="text-center texto_footer">© 2024 - Tropa do BB</v-col>
  </v-footer>

</template>
  
  <script>
   import "@/styles/Blog.css";
   import SvgIcon from "@jamescoyle/vue-icon";
   import { mdiAccount } from "@mdi/js";
   
  export default {
    name: 'Blog',
    components: { SvgIcon },
  }
  </script>
  
  <style>
 
  </style>
  