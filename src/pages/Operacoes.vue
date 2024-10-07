<template>
 
    <v-app-bar class="header">
      <v-toolbar-title class="titulo_nav_bar">Banco do Brasil</v-toolbar-title>

      <v-btn to="/" class="buttongeral mx-1" >Home</v-btn>
      <v-btn to="/simul" class="buttongeral mx-1">Simulação</v-btn>
      <v-btn to="/linhas" class="buttongeral mx-1">Linhas</v-btn>
      <v-btn to="/blog" class="buttongeral mx-1">Blog</v-btn>
      

    </v-app-bar>

 
    <v-main>
      <v-container>
        
        
      </v-container>
    </v-main>

   
    <v-footer app class="footer">
    <v-col class="text-center texto_footer">© 2024 - Tropa do BB</v-col>
  </v-footer>

</template>

<script>
export default {
  name: 'Operacoes',
}
</script>

<style>

</style>
