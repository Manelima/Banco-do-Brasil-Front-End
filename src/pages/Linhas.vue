<template>
  <v-app-bar class="line-header">
    <v-img src="@/images/bb.png" class="line-logo"></v-img>
    <div class="line-linha_preta_vertical"></div>
    <v-app-bar-title class="line-titulo_nav_bar">
      Banco do Brasil
    </v-app-bar-title>

    <v-btn to="/" class="line-buttongeral mx-1">Home</v-btn>
    <v-btn to="/simul" class="line-buttongeral mx-1">Simulação</v-btn>
    <v-btn to="/operacoes" class="line-buttongeral mx-1">Operações</v-btn>
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
              <v-card-text>Acesse opções de crédito pessoal com taxas de juros que cabem no seu bolso.</v-card-text>
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
              <v-radio-group v-model="respostasSelecionadas['pergunta_' + perguntaAtual]" class="line-pergunta_form">

                <!-- Seção antes do formulário: -->
                <template v-if="perguntaAtual === 0">
                  <h1 class="text_h1">Quer saber quais são suas principais linhas de crédito?</h1>

                  <h4 class="text_h4">O BB ajuda a encontrar a melhor solução para você. Conheça as linhas de crédito pessoal, escolha a mais adequada e realize seus sonhos.</h4>  
                </template>

                <!-- Pergunta 1: O que você procura? -->
                <template v-if="perguntaAtual === 1">
                  <h3>O que você procura?</h3>
                  <v-radio class="line-form_ratio" label="Dinheiro na conta para usar como eu quiser" value="dinheiro_conta"></v-radio>
                  <v-radio class="line-form_ratio" label="Financiamento para realizar meus sonhos" value="financiamento_sonhos"></v-radio>
                  <v-radio class="line-form_ratio" label="Quero renovar empréstimos que já possuo" value="renovar_emprestimo"></v-radio>
                  <v-radio class="line-form_ratio" label="Fazer a portabilidade de um empréstimo de outro banco ou instituição financeira"
                    value="portabilidade"></v-radio>
                </template>

                <!-- Resposta anterior(X): "..." -->
                <template>
                  <h3></h3>
                  <v-radio label="" value=""></v-radio>
                  <v-radio label="" value=""></v-radio>
                  <v-radio label="" value=""></v-radio>
                </template>

                <!-- Resposta anterior(X): "..." -->
                <template>
                  <h3></h3>
                  <v-radio label="" value=""></v-radio>
                  <v-radio label="" value=""></v-radio>
                  <v-radio label="" value=""></v-radio>
                </template>

                <!-- Resposta anterior(X): "..." -->
                <template>
                  <h3></h3>
                  <v-radio label="" value=""></v-radio>
                  <v-radio label="" value=""></v-radio>
                  <v-radio label="" value=""></v-radio>
                </template>

              </v-radio-group>

              <!-- Botões de navegação -->
              <v-row>
                <v-col cols="6">
                  <v-btn class="line-buttonbeforeafter" v-if="perguntaAtual === 0" @click="proximaPergunta">Começar</v-btn>
                  <v-btn class="line-buttonbeforeafter" v-else
                    @click="perguntaAnterior">Anterior</v-btn>
                </v-col>
                <v-col cols="6" class="text-right">
                  <v-btn class="line-buttonbeforeafter" v-if="fimDaRota === false && perguntaAtual !== 0"  @click="proximaPergunta">Próxima</v-btn>
                  <v-btn class="line-buttonbeforeafter" v-if="fimDaRota === true"
                    @click="enviarResposta">Enviar Respostas</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>

        <v-alert type="success" v-if="mostrarResultados">
          Suas respostas foram enviadas! Confira abaixo as linhas de crédito recomendadas para você:
        </v-alert>

        <!-- Exibir as opções de crédito recomendadas -->
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
</template>

<script>
import '@/styles/line.css';

export default {
  data() {
    return {
      perguntaAtual: 0,
      totalDePerguntas: 0,
      respostasSelecionadas: {}, // Agora é um objeto
      mostrarResultados: false,
      linhasRecomendadas: [],
      verificacao: this.perguntaAtual < this.totalDePerguntas,
      menu: false, // controla a abertura do calendário
      rotaPerguntas: '',
      fimDaRota: false,
    };
  },
  methods: {
    definirRotaPerguntas() {
      if(this.perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === '13-terceiro'){
        this.rotaPerguntas = '/perguntas/13-terceiro';
      }
      else if(this.perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === 'IRPF'){
        this.rotaPerguntas = '/perguntas/IRPF';
      }
      else if(this.perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === 'FGTS'){
        this.rotaPerguntas = '/perguntas/FGTS';
      }
    },
    proximaPergunta() {
      console.log('Resposta da pergunta atual(' + this.perguntaAtual + '):' + this.respostasSelecionadas['pergunta_' + this.perguntaAtual]);

      this.definirRotaPerguntas();

      this.perguntaAtual++;
    },
    perguntaAnterior() {
      if (this.perguntaAtual > 0) {
        this.perguntaAtual--;
      }
      console.log(this.respostasSelecionadas['pergunta_' + this.perguntaAtual]);
      console.log(this.perguntaAtual);
    },
    enviarResposta() {
      this.mostrarResultados = true;
      this.linhasRecomendadas = this.getLinhasRecomendadas();
    },
    getLinhasRecomendadas() {
      let linhas = [];

      if (this.respostasSelecionadas['pergunta_1'] === 'dinheiro_conta') {
        if (this.respostasSelecionadas['pergunta_2'] === 'com_garantia') {
          linhas.push('Empréstimo com Garantia de Imóvel', 'Empréstimo com Garantia de Veículo', 'Empréstimo com Garantia de Investimentos');
        } else if (this.respostasSelecionadas['pergunta_2'] === 'sem_garantia') {
          if (this.respostasSelecionadas['pergunta_3'] === 'antecipar') {
            linhas.push('Antecipar 13º', 'Restituição do IRPF', 'Saque aniversário do FGTS');
          } else if (this.respostasSelecionadas['pergunta_3'] === 'credito_hora') {
            linhas.push('Empréstimo Consignado', 'Empréstimo Automático', 'Crédito Benefício', 'Crédito Salário');
          }
        }
      }

      else if (this.respostasSelecionadas['pergunta_1'] === 'financiamento_sonhos') {
        if (this.respostasSelecionadas['pergunta_2'] === 'classicos') {
          linhas.push('Financiamento Imobiliário', 'Financiamento de Veículos', 'Financiamento de Motos');
        } else if (this.respostasSelecionadas['pergunta_2'] === 'diferenciado') {
          linhas.push('Crédito Mobilidade', 'Crédito Realiza', 'Crédito Energia Renovável', 'Bens e Serviços para PCDs');
        } else if (this.respostasSelecionadas['pergunta_2'] === 'agronegocio') {
          linhas.push('Pronaf Grupo A/C', 'Pronaf Agricultura Familiar', 'Crédito Rural Pronamp Custeio', 'Custeio Agropecuário');
        }
      } else if (this.respostasSelecionadas['pergunta_1'] === 'renovar_emprestimo') {
        linhas.push('Renovação de Empréstimos');
      } else if (this.respostasSelecionadas['pergunta_1'] === 'portabilidade') {
        linhas.push('Portabilidade de Crédito');
      }

      return linhas;
    },
    //ANALISAR SE É NECESSÁRIO USAR A FUNÇÃO "FORMATAR O VALOR MONETÁRIO" E A "PARSE CURRENCY", CASO NECESSÁRIO, ADAPTÁ-LAS PARA O FORMULÁRIO DESTA PÁGINA.
    formatarValorMonetario(campo) {
      let valor = this.formulario[campo];

      // Remove todos os caracteres não numéricos
      valor = valor.replace(/\D/g, "");

      // Formata o valor
      valor = (valor / 100).toFixed(2) + "";
      valor = valor.replace(".", ",");
      valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

      // Atualiza o campo do formulário
      this.respostasSelecionadas[campo] = "R$ " + valor;
    },
  }
};
</script>