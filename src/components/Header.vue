<template>
  <v-app-bar class="header">
    <v-img src="@/images/bb.png" class="bb-symbol-logo"></v-img>
    <div class="linha_preta_vertical"></div>
    <v-app-bar-title class="titulo_nav_bar">
      Banco do Brasil
    </v-app-bar-title>

    <v-btn v-if="$route.path != '/'" to="/" class="buttongeral mx-1">Home</v-btn>
    <v-btn v-if="$route.path != '/linhas'" to="/linhas" class="buttongeral mx-1">Linhas de Crédito</v-btn>
    <v-btn v-if="$route.path != '/simul'" to="/simul" class="buttongeral mx-1">Simular Investimentos</v-btn>
    <v-btn v-if="$route.path != '/operacoes'" to="/operacoes" class="buttongeral mx-1">Operações</v-btn>
    <v-btn v-if="$route.path != '/blog'" to="/blog" class="buttongeral mx-1">Blog</v-btn>
    
  </v-app-bar>
</template>

<style>
.header {
  background-color: #FCFC30 !important;
  border-bottom: #465EFF 2px solid;
}

.bb-symbol-logo {
  width: 50px;
  max-width: 68px !important;
  margin-left: 1rem;
}

.linha_preta_vertical {
  height: 60%;
  background-color: #465EFF;
  width: 2px;
}

.titulo_nav_bar {
  color: #465EFF;
  font-size: 24px;
  margin-left: 10px;
  font-weight: bold;
  font-family: 'BancoDoBrasilTextos-Bold';
}

/* ================ BOTOES ============== */

.buttongeral {
  color: #465EFF !important;
  border-radius: 80px;
  font-family: 'BancoDoBrasilTextos-Bold';
  transition: ease .3s;
}

.buttongeral:hover {
  background-color: #465EFF;
  color: #FFF !important;
  border-radius: 80px;
}

/* =================== Fonts =================== */

/*
@font-face {
  font-family: 'BancoDoBrasilTextos-Bold';
  src: url('@/assets/fonts/BancoDoBrasilTextos-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'BancoDoBrasilTextos-Medium';
  src: url('@/assets/fonts/BancoDoBrasilTextos-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'BancoDoBrasilTextos-Regular';
  src: url('@/assets/fonts/BancoDoBrasilTextos-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
*/ 
</style>

<script>
export default {
  name: "Header",
};
</script>