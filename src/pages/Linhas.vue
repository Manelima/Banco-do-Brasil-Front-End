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
              <v-radio-group v-model="respostasSelecionadas[perguntaAtual]" class="line-pergunta_form">

                <!-- Pergunta 1: O que você procura? -->
                <template v-if="perguntaAtual === 0">
                  <h3>O que você procura?</h3>
                  <v-radio label="Dinheiro na conta para usar como eu quiser" value="dinheiro_conta"></v-radio>
                  <v-radio label="Financiamento para realizar meus sonhos" value="financiamento_sonhos"></v-radio>
                  <v-radio label="Quero renovar empréstimos que já possuo" value="renovar_emprestimo"></v-radio>
                  <v-radio label="Fazer a portabilidade de um empréstimo de outro banco ou instituição financeira"
                    value="portabilidade"></v-radio>
                </template>

                <!-- Pergunta 2: Dinheiro na conta para usar como eu quiser -->
                <template v-if="perguntaAtual === 1 && respostasSelecionadas[1] === 'dinheiro_conta'">
                  <h3>Deseja usar garantias?</h3>
                  <v-radio label="Sim, quero usar garantias e juros baixos" value="com_garantia"></v-radio>
                  <v-radio label="Não quero usar garantias" value="sem_garantia"></v-radio>
                </template>

                <!-- Linhas recomendadas com garantias -->
                <template v-if="perguntaAtual === 2 && respostasSelecionadas[2] === 'com_garantia'">
                  <v-alert type="success">
                    Linhas de Crédito Recomendadas:
                    <ul>
                      <li>Empréstimo com Garantia de Imóvel</li>
                      <li>Empréstimo com Garantia de Veículo</li>
                      <li>Empréstimo com Garantia de Investimentos</li>
                    </ul>
                  </v-alert>
                </template>

                <!-- Pergunta 3: Sem garantias -->
                <template v-if="perguntaAtual === 2 && respostasSelecionadas[2] === 'sem_garantia'">
                  <h3>O que você prefere?</h3>
                  <v-radio label="Antecipar valores sem precisar pagar parcelas mensais" value="antecipacao"></v-radio>
                  <v-radio label="Crédito na hora com pagamento de parcelas mensais" value="credhora"></v-radio>
                </template>

                <!-- Linhas recomendadas: Antecipação -->
                <template v-if="perguntaAtual === 3 && respostasSelecionadas[3] === 'antecipacao'">
                  <v-alert type="success">
                    Linhas de Crédito Recomendadas:
                    <ul>
                      <li>Antecipar 13º</li>
                      <li>Restituição do IRPF</li>
                      <li>Saque aniversário do FGTS</li>
                    </ul>
                  </v-alert>
                </template>

                <!-- Linhas recomendadas: Crédito na hora -->
                <template v-if="perguntaAtual === 3 && respostasSelecionadas[3] === 'credhora'">
                  <v-alert type="success">
                    Linhas de Crédito Recomendadas:
                    <ul>
                      <li>Empréstimo Consignado</li>
                      <li>Empréstimo Automático</li>
                      <li>Crédito Benefício</li>
                      <li>Crédito Salário</li>
                    </ul>
                  </v-alert>
                </template>

                <!-- Financiamento para realizar meus sonhos -->
                <template v-if="perguntaAtual === 1 && respostasSelecionadas[1] === 'financiamento_sonhos'">
                  <h3>Seja mais específico:</h3>
                  <v-radio label="Eu quero os clássicos: imobiliário e veículos" value="classicos"></v-radio>
                  <v-radio label="Procuro algo diferenciado que só o BB possui" value="diferenciado"></v-radio>
                  <v-radio label="Busco algo voltado para o agronegócio" value="agronegocio"></v-radio>
                </template>

                <!-- Linhas recomendadas: Clássicos -->
                <template v-if="perguntaAtual === 2 && respostasSelecionadas[2] === 'classicos'">
                  <v-alert type="success">
                    Linhas de Crédito Recomendadas:
                    <ul>
                      <li>Financiamento Imobiliário</li>
                      <li>Financiamento de Veículos</li>
                      <li>Financiamento de Motos</li>
                    </ul>
                  </v-alert>
                </template>

                <!-- Linhas recomendadas: Diferenciado -->
                <template v-if="perguntaAtual === 2 && respostasSelecionadas[2] === 'diferenciado'">
                  <v-alert type="success">
                    Linhas de Crédito Recomendadas:
                    <ul>
                      <li>Crédito Mobilidade</li>
                      <li>Crédito Realiza</li>
                      <li>Crédito Energia Renovável</li>
                      <li>Bens e Serviços para PCDs</li>
                    </ul>
                  </v-alert>
                </template>

                <!-- Linhas recomendadas: Agronegócio -->
                <template v-if="perguntaAtual === 2 && respostasSelecionadas[2] === 'agronegocio'">
                  <v-alert type="success">
                    Linhas de Crédito Recomendadas:
                    <ul>
                      <li>Pronaf Grupo A/C</li>
                      <li>Pronaf Agricultura Familiar</li>
                      <li>Crédito Rural Pronamp Custeio</li>
                      <li>Custeio Agropecuário</li>
                    </ul>
                  </v-alert>
                </template>

                <!-- Renovação de Empréstimos -->
                <template v-if="perguntaAtual === 1 && respostasSelecionadas[1] === 'renovar_emprestimo'">
                  <v-alert type="success">
                    Linhas de Crédito Recomendadas:
                    <ul>
                      <li>Renovação de Empréstimos</li>
                    </ul>
                  </v-alert>
                </template>

                <!-- Portabilidade -->
                <template v-if="perguntaAtual === 1 && respostasSelecionadas[1] === 'portabilidade'">
                  <v-alert type="success">
                    Linhas de Crédito Recomendadas:
                    <ul>
                      <li>Portabilidade de Crédito</li>
                    </ul>
                  </v-alert>
                </template>

              </v-radio-group>

              <!-- Botões de navegação -->
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
      totalDePerguntas: 3,
      respostasSelecionadas: [],
      mostrarResultados: false,
      linhasRecomendadas: []
    };
  },
  methods: {
    proximaPergunta() {
      if (this.perguntaAtual < this.totalDePerguntas) {
        this.perguntaAtual++;
      }
    },
    perguntaAnterior() {
      if (this.perguntaAtual > 1) {
        this.perguntaAtual--;
      }
    },
    enviarResposta() {
      this.mostrarResultados = true;
      this.linhasRecomendadas = this.getLinhasRecomendadas();
    },
    getLinhasRecomendadas() {
      // Implementar lógica de recomendação de linhas de crédito com base nas respostas selecionadas
      // Aqui você pode adicionar as condições de verificação de respostas para determinar as linhas recomendadas
      let recomendacoes = [];

      if (this.respostasSelecionadas[0] === 'dinheiro_conta') {
        if (this.respostasSelecionadas[1] === 'com_garantia') {
          recomendacoes = [
            'Empréstimo com Garantia de Imóvel',
            'Empréstimo com Garantia de Veículo',
            'Empréstimo com Garantia de Investimentos'
          ];
        } else if (this.respostasSelecionadas[1] === 'sem_garantia') {
          if (this.respostasSelecionadas[2] === 'antecipacao') {
            recomendacoes = [
              'Antecipar 13º',
              'Restituição do IRPF',
              'Saque aniversário do FGTS'
            ];
          } else if (this.respostasSelecionadas[2] === 'credhora') {
            recomendacoes = [
              'Empréstimo Consignado',
              'Empréstimo Automático',
              'Crédito Benefício',
              'Crédito Salário'
            ];
          }
        }
      } else if (this.respostasSelecionadas[0] === 'financiamento_sonhos') {
        if (this.respostasSelecionadas[1] === 'classicos') {
          recomendacoes = [
            'Financiamento Imobiliário',
            'Financiamento de Veículos',
            'Financiamento de Motos'
          ];
        } else if (this.respostasSelecionadas[1] === 'diferenciado') {
          recomendacoes = [
            'Crédito Mobilidade',
            'Crédito Realiza',
            'Crédito Energia Renovável',
            'Bens e Serviços para PCDs'
          ];
        } else if (this.respostasSelecionadas[1] === 'agronegocio') {
          recomendacoes = [
            'Pronaf Grupo A/C',
            'Pronaf Agricultura Familiar',
            'Crédito Rural Pronamp Custeio',
            'Custeio Agropecuário'
          ];
        }
      } else if (this.respostasSelecionadas[0] === 'renovar_emprestimo') {
        recomendacoes = ['Renovação de Empréstimos'];
      } else if (this.respostasSelecionadas[0] === 'portabilidade') {
        recomendacoes = ['Portabilidade de Crédito'];
      }

      return recomendacoes;
    }
  }
};
</script>