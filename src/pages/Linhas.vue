<template>
  <v-app-bar class="line-header">
    <v-img src="@/images/bb.png" class="line-logo"></v-img>

    <v-app-bar-title class="line-titulo_nav_bar">
      Banco do Brasil
    </v-app-bar-title>

    <v-btn to="/" class="line-buttongeral mx-1">Home</v-btn>

    <v-btn to="/simul" class="line-buttongeral mx-1">Simulação</v-btn>
    <v-btn to="/operacoes" class="line-buttongeral mx-1">Operacoes</v-btn>
    <v-btn to="/blog" class="line-buttongeral mx-1">Blog</v-btn>
  </v-app-bar>

  <v-main class="line-container-main">
    <v-container>
      <v-container class="line-container_card_topo">
        <div class="line-div-maintext">
          <h1>Linhas de Crédito, Rápido e Prático</h1>
        </div>
        <div>
          <h5>Dinheiro sem burocracia, acesse agora mesmo, em nosso site!</h5>
        </div>
        <v-row>
          <v-col cols="4">
            <v-card class="line-card_filho_topo">
              <v-img
                class="line-img_card"
                src="https://cdn.bb.com.br/wp-content/uploads/2023/05/Cards-Banner-Full-Credito-pra-voce-v2.png"
                cover
              ></v-img>
              <v-card-subtitle class="line-subtitle_card"
                >Crédito para você</v-card-subtitle
              >
              <v-card-text
                >Acesse opções de crédito pessoal com taxas de juros que cabem
                no seu bolso.</v-card-text
              >
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="line-card_filho_topo">
              <v-img
                class="line-img_card"
                src="https://cdn.bb.com.br/wp-content/uploads/2023/05/Cards-Banner-Full-Credito-pro-seu-veiculo-v2.png"
                cover
              ></v-img>
              <v-card-subtitle class="line-subtitle_card"
                >Financie o seu veículo</v-card-subtitle
              >
              <v-card-text>Veja como financiar o seu carro novo.</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="line-card_filho_topo">
              <v-img
                class="line-img_card"
                src="https://cdn.bb.com.br/wp-content/uploads/2023/05/Cards-Banner-Full-Credito-pra-sua-casa-v2.png"
                cover
              ></v-img>
              <v-card-subtitle class="line-subtitle_card"
                >Financie um imóvel</v-card-subtitle
              >
              <v-card-text
                >Realize o sonho de adquirir uma casa própria.</v-card-text
              >
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="line-container_form">
        <v-row>
          <v-col cols="6" class="line-lado_esquerdo">
            <v-img src="@/images/mulher_form.webp"></v-img>
          </v-col>
          <v-col cols="6" class="line-lado_direito">
            <v-form class="line-form_def_linhas"></v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-main>

  <v-footer app class="line-footer">
    <v-col class="text-center line-texto_footer">© 2024 - Tropa do BB</v-col>
  </v-footer>
</template>

<script>
import "@/styles/Line.css";

export default {
  name: "Linhas",
};
</script>
