<template>
  <v-main>

    <div class="background">
      <div class="container">
        
        <div class="secao1">
  <router-link to="/linhas" class="img-secao1">
    <h3 class="titulo-secao1">Linhas de Crédito</h3>
    <p class="texto-secao1">
      Quer saber qual o crédito ideal para você?
      Simule e veja qual a linha feita pra você.
    </p>
  </router-link>
</div>

<div class="secao2">
  <router-link to="/simul" class="img-secao2-1">
    <h3 class="titulo-secao2-1">Simular Investimentos</h3>
    <p class="texto-secao2-1">
      Quer saber onde investir? Simule e veja 
      quanto seu dinheiro pode render no BB.
    </p>
  </router-link>

  <router-link to="/blog" class="img-secao2-2">
    <h3 class="titulo-secao2-2">Blog</h3>
    <p class="texto-secao2-2">
      Dicas, sugestões, notícias, tudo que é importante
      para você está aqui no nosso Blog.
    </p>
  </router-link>
</div>

<div class="secao3">
  <router-link to="/operacoes" class="img-secao3">
    <h3 class="titulo-secao1">Minhas Operações</h3>
    <p class="texto-secao1">
      Faça suas operações com facilidade. Aqui no
      BB, você pode fazer tudo com um clique.
    </p>
  </router-link>
</div>

</div>
</div>
 
  </v-main>
</template>
  
<script>
  import "@/styles/home.css";
  import "@/styles/reset.css";

  export default {
    name: 'Home',
    methods: {
    goToHome() {
      this.$router.push('/'); // Navega para a rota '/'
    }
  }
  }
</script>
  

  