<template>
  <v-app-bar class="opera-header">
    <v-img src="@/images/bb.png" class="opera-logo"></v-img>
    <div class="opera-linha_preta_vertical"></div>
    <v-app-bar-title class="opera-titulo_nav_bar">Banco do Brasil</v-app-bar-title>

    <v-btn to="/" class="opera-buttongeral mx-1">Home</v-btn>
    <v-btn to="/simul" class="opera-buttongeral mx-1">Simulação</v-btn>
    <v-btn to="/linhas" class="opera-buttongeral mx-1">Linhas</v-btn>
    <v-btn to="/blog" class="opera-buttongeral mx-1">Blog</v-btn>
  </v-app-bar>

  <v-main>
    <v-container class="opera-container_main">
      <v-container class="opera-container_operacoes">
        <div class="opera-div_saudacao">Olá, {{nomeDeUsuario}}</div>

        <v-row>
          <v-col cols="4" class="opera-coluna_um mt-5">
            <v-btn class="opera-buttontipos d-flex justify-center align-center mb-5" size="x-large" @click="selecionarOperacao('saque')">
              Saque Móvel
            </v-btn>

            <v-btn class="opera-buttontipos d-flex justify-center align-center mb-5" size="x-large" @click="selecionarOperacao('transferencia')">
              Transferência
            </v-btn>
          </v-col>

          <v-col cols="4" class="opera-coluna_dois mt-5">
            <v-btn class="opera-buttontipos d-flex justify-center align-center mb-5" size="x-large" @click="selecionarOperacao('deposito')">
              Depósito
            </v-btn>

            <v-btn class="opera-buttontipos d-flex justify-center align-center mb-5" size="x-large" @click="selecionarOperacao('historico')">
              Histórico
            </v-btn>
          </v-col>
        </v-row>

        <!-- Exibe o card baseado na operação selecionada -->
        <v-card v-if="operacaoSelecionada === 'saque'" class="opera-card_operacao_selecionada" style="background-color: black;">
          <v-card-actions></v-card-actions>
        </v-card>

        <v-card v-if="operacaoSelecionada === 'transferencia'" class="opera-card_operacao_selecionada" style="background-color: blue;">
          <v-card-actions></v-card-actions>
        </v-card>

        <v-card v-if="operacaoSelecionada === 'deposito'" class="opera-card_operacao_selecionada" style="background-color: red;">
          <v-card-actions></v-card-actions>
        </v-card>

        <v-card v-if="operacaoSelecionada === 'historico'" class="opera-card_operacao_selecionada" style="background-color: magenta;">
          <v-card-actions></v-card-actions>
        </v-card>
      </v-container>
    </v-container>
  </v-main>

  <v-footer app class="opera-footer">
    <v-col class="text-center texto_footer">© 2024 - Tropa do BB</v-col>
  </v-footer>
</template>

<script>
import "@/styles/opera.css";

export default {
  name: 'Operacoes',
  data() {
    return {
      nomeDeUsuario: 'User_teste01',
      operacaoSelecionada: null, // Armazena a operação selecionada
    };
  },
  methods: {
    selecionarOperacao(operacao) {
      this.operacaoSelecionada = operacao; // Define a operação selecionada
    },
  },
};
</script>
