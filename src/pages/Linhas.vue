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
        <div class="line-div_maintext">
          <h1>Linhas de Crédito, Rápido e Prático</h1>
        </div>
        <div>
          <h5>Dinheiro sem burocracia, acesse agora mesmo, em nosso site!</h5>
        </div>
        <v-row>
          <v-col cols="4">
            <v-card class="line-card_filho_topo">
              <v-img class="line-img_card"
                src="https://cdn.bb.com.br/wp-content/uploads/2023/05/Cards-Banner-Full-Credito-pra-voce-v2.png"
                cover></v-img>
              <v-card-subtitle class="line-subtitle_card">Crédito para você</v-card-subtitle>
              <v-card-text>Acesse opções de crédito pessoal com taxas de juros que cabem
                no seu bolso.</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="line-card_filho_topo">
              <v-img class="line-img_card"
                src="https://cdn.bb.com.br/wp-content/uploads/2023/05/Cards-Banner-Full-Credito-pro-seu-veiculo-v2.png"
                cover></v-img>
              <v-card-subtitle class="line-subtitle_card">Financie o seu veículo</v-card-subtitle>
              <v-card-text>Veja como financiar o seu carro novo.</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="line-card_filho_topo">
              <v-img class="line-img_card"
                src="https://cdn.bb.com.br/wp-content/uploads/2023/05/Cards-Banner-Full-Credito-pra-sua-casa-v2.png"
                cover></v-img>
              <v-card-subtitle class="line-subtitle_card">Financie um imóvel</v-card-subtitle>
              <v-card-text>Realize o sonho de adquirir uma casa própria.</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="line-container_form">
        <v-row>
          <v-col cols="6" class="line-lado_esquerdo">
            <v-img src="@/images/mulher_form.webp"></v-img>
          </v-col>
          <v-col cols="6" class="line-lado_direito d-flex align-center justify-center">
            <v-form class="line-form_def_linhas">
              <!-- Etapas das perguntas -->
              <v-radio-group v-model="respostaSelecionada" class="line-pergunta_form">
                <template v-if="perguntaAtual === 1">
                  <h3>Qual é o seu principal objetivo ao buscar crédito?</h3>
                  <v-radio label="Renovar um empréstimo já existente." value="renovar"></v-radio>
                  <v-radio label="Obter crédito para uma compra ou necessidade específica." value="compra"></v-radio>
                  <v-radio label="Antecipar um valor que receberei futuramente." value="antecipar"></v-radio>
                  <v-radio label="Financiar um imóvel." value="imovel"></v-radio>
                  <v-radio label="Financiar um veículo." value="veiculo"></v-radio>
                  <v-radio label="Aumentar o limite do meu cartão de crédito." value="cartao"></v-radio>
                </template>

                <template v-if="perguntaAtual === 2">
                  <h3>Você já possui um empréstimo contratado que deseja renovar?</h3>
                  <v-radio label="Sim" value="sim_renovar"></v-radio>
                  <v-radio label="Não" value="nao_renovar"></v-radio>
                </template>

                <template v-if="perguntaAtual === 3">
                  <h3>Você prefere realizar o pagamento do crédito em:</h3>
                  <v-radio label="Várias parcelas mensais." value="parcelas"></v-radio>
                  <v-radio label="Um pagamento único na data de recebimento de um valor futuro."
                    value="pagamento_unico"></v-radio>
                </template>

                <template v-if="perguntaAtual === 4">
                  <h3>Você recebe seu salário ou benefícios de forma consignada (desconto direto na folha de pagamento)?
                  </h3>
                  <v-radio label="Sim, sou funcionário público." value="publico"></v-radio>
                  <v-radio label="Sim, trabalho em empresa privada." value="privado"></v-radio>
                  <v-radio label="Não" value="nao_consignado"></v-radio>
                </template>

                <template v-if="perguntaAtual === 5">
                  <h3>Qual tipo de bem ou serviço você deseja financiar?</h3>
                  <v-radio label="Imóvel" value="financiar_imovel"></v-radio>
                  <v-radio label="Veículo" value="financiar_veiculo"></v-radio>
                  <v-radio label="Bens e serviços (educação, reforma, viagens, etc.)" value="bens_servicos"></v-radio>
                  <v-radio label="Energias renováveis ou mobilidade sustentável" value="sustentavel"></v-radio>
                  <v-radio label="Equipamentos de acessibilidade" value="acessibilidade"></v-radio>
                </template>

                <template v-if="perguntaAtual === 6">
                  <h3>Você precisa de um crédito com garantia?</h3>
                  <v-radio label="Sim, posso oferecer um bem como garantia." value="sim_garantia"></v-radio>
                  <v-radio label="Não, prefiro um crédito sem garantia." value="nao_garantia"></v-radio>
                </template>

                <template v-if="perguntaAtual === 7">
                  <h3>Você gostaria de antecipar um valor específico que irá receber futuramente?</h3>
                  <v-radio label="Sim, 13º salário." value="decimo_terceiro"></v-radio>
                  <v-radio label="Sim, restituição do imposto de renda (IRPF)." value="irpf"></v-radio>
                  <v-radio label="Sim, saque-aniversário do FGTS." value="fgts"></v-radio>
                  <v-radio label="Não" value="nao_antecipar"></v-radio>
                </template>

                <template v-if="perguntaAtual === 8">
                  <h3>Você está pensando em transferir (portar) um empréstimo de outro banco para o nosso?</h3>
                  <v-radio label="Sim, estou interessado em portar meu empréstimo." value="portabilidade"></v-radio>
                  <v-radio label="Não, estou buscando um novo crédito." value="novo_credito"></v-radio>
                </template>
              </v-radio-group>

              <!-- Botões para navegação -->
              <v-row>
                <v-col cols="6">
                  <v-btn class="line-buttongeral" :disabled="perguntaAtual === 1"
                    @click="perguntaAnterior">Anterior</v-btn>
                </v-col>
                <v-col cols="6" class="text-right">
                  <v-btn class="line-buttongeral" v-if="perguntaAtual < totalDePerguntas"
                    @click="proximaPergunta">Próxima</v-btn>
                  <v-btn class="line-buttongeral" v-else @click="enviarResposta">Enviar Respostas</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>

        <!-- Exibir as opções de crédito recomendadas (MERAMENTE ILUSTRATIVA!!!)-->
        <v-container v-if="mostrarResultados" class="line-container_resultados">
          <h3>Linhas de Crédito Recomendadas:</h3>
          <v-list>
            <v-list-item v-for="linha in linhasRecomendadas" :key="linha">
              <v-list-item-content>{{ linha }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-container>
      </v-container>
    </v-container>
  </v-main>

  <v-footer app class=" line-footer">
    <v-col class="text-center line-texto_footer">© 2024 - Tropa do BB</v-col>
  </v-footer>
</template>

<script>

import '@/styles/line.css';

export default {
  data() {
    return {
      perguntaAtual: 1,
      totalDePerguntas: 8,
      respostaSelecionada: null,
      respostas: [],
      mostrarResultados: false,
      linhasRecomendadas: []
    };
  },
  methods: {
    proximaPergunta() {
      if (this.respostaSelecionada) {
        this.respostas.push(this.respostaSelecionada);
        this.respostaSelecionada = null;
        if (this.perguntaAtual < this.totalDePerguntas) {
          this.perguntaAtual++;
        }
      }
    },
    perguntaAnterior() {
      if (this.perguntaAtual > 1) {
        this.perguntaAtual--;
        this.respostas.pop();
      }
    },
    enviarResposta() {
      // Coleta todas as respostas e realiza a lógica para sugerir linhas de crédito
      this.respostas.push(this.respostaSelecionada);

      this.linhasRecomendadas = this.getlinhasRecomendadas();
      this.mostrarResultados = true;
    },
    getlinhasRecomendadas() {
      // Lógica simples de exemplo, ajustada com base nas respostas
      let linhas = [];

      if (this.respostas.includes("renovar")) {
        linhas.push("Renovação de Empréstimos");
      }
      if (this.respostas.includes("compra")) {
        linhas.push("Crédito Novo (CDC)");
      }
      if (this.respostas.includes("antecipar")) {
        linhas.push("Antecipação de Crédito (13º salário, IRPF, FGTS)");
      }
      if (this.respostas.includes("imovel")) {
        linhas.push("Financiamento de Imóveis");
      }
      if (this.respostas.includes("veiculo")) {
        linhas.push("Financiamento de Veículos");
      }
      if (this.respostas.includes("portabilidade")) {
        linhas.push("Portabilidade de Crédito");
      }

      return linhas;
    }
  },
};
</script>