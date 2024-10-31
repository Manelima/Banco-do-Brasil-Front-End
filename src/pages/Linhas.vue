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
                
                <!-- ESCOPOS DE TEMPLATES A SEREM FINALIZADOS(A LÓGICA DE ELABORAÇÃO É A SEGUINTE: AS PERGUNTAS SÃO FEITAS NA ORDEM EM QUE OCORREM, PRIORIZANDO AQUELAS CUJA ROTA OCORRE MAIS ACIMA DO QUE AS OUTRAS, POR EXEMPLO, A PRIMEIRA ROTA É AQUELA ONDE TODAS AS RESPOSTAS FORAM PRIMEIRAS OPÇÕES, ENQUANTO A SEGUNDA ROTA É AQUELA ONDE APENAS A ÚLTIMA OPÇÃO MUDA, PARA SEGUNDA, POR EXEMPLO, CLARO, DEVIDO À QUANTIA MAIOR DE RAMIFICAÇÕES, SERÁ NECESSÁRIA UMA MAIOR ANÁLISE DO FLUXO CORRETO, ASSIM COMO TAMBÉM SERÁ NECESSÁRIO CERTO FOCO DURANTE ESSA ELABORAÇÃO - COMENTÁRIO DESTINADO A: EMANUEL!) -->

                <!-- Pergunta 0: O que você procura? -->
                <template v-if="perguntaAtual === 0">
                  <h3>O que você procura?</h3>
                  <v-radio label="Dinheiro na conta para usar como eu quiser" value="dinheiro_conta"></v-radio>
                  <v-radio label="Financiamento para realizar meus sonhos" value="financiamento_sonhos"></v-radio>
                  <v-radio label="Quero renovar empréstimos que já possuo" value="renovar_emprestimo"></v-radio>
                  <v-radio label="Fazer a portabilidade de um empréstimo de outro banco ou instituição financeira"
                    value="portabilidade"></v-radio>
                </template>

                <!-- Resposta anterior(0): "Dinheiro na conta para usar como eu quiser" -->
                <template v-if="perguntaAtual === 1 && respostasSelecionadas[0] === 'dinheiro_conta'">
                  <h3>você quer usar um imóvel ou veículo como garantia desse empréstimo? Isso pode deixar sua taxa de
                    juros mais baixa</h3>
                  <v-radio label="Não quero usar garantias" value="sem_garantia"></v-radio>
                  <v-radio label="Sim, quero usar garantias e ter juros baixos" value="com_garantia"></v-radio>
                </template>

                <!-- Resposta anterior(1): "Não quero usar garantias" -->
                <template v-if="perguntaAtual === 2 && respostasSelecionadas[1] === 'sem_garantia'">
                  <h3>Você prefere pagar parcelas mensais(Linhas CDC), ou tem algum valor a receber no futuro(linhas de
                    antecipação) para quitar o empréstimo?</h3>
                  <v-radio label="Antecipar valores sem precisar pagar parcelas mensais." value="antecipar"></v-radio>
                  <v-radio label="Crédito na hora sem precisar pagar parcelas mensais." value="credito_hora"></v-radio>
                </template>

                <!-- Resposta anterior(2): "Antecipar valores sem precisar pagar parcelas mensais." -->
                <template v-if="perguntaAtual === 3 && respostasSelecionadas[2] === 'antecipar'">
                  <h3>O que você pretende antecipar?</h3>
                  <v-radio label="13º salário." value="decimo_terceiro"></v-radio>
                  <v-radio label="Restituição do IRPF." value="IRPF"></v-radio>
                  <v-radio label="Saque aniversário do FGTS." value="FGTS"></v-radio>
                </template>

                <!-- Resposta anterior(3): "13º salário." -->
                <template v-if="perguntaAtual === 4 && respostasSelecionadas[3] === 'decimo_terceiro'">
                  <h3>Quanto você vai receber?</h3>
                  <v-text-field v-model="respostasSelecionadas[4]" label="Valor do 13º salário"
                    @input="formatarValorMonetario('respostasSelecionadas[4]')">
                  </v-text-field>
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

                <!-- Resposta anterior(X): "..." -->
                <template>
                  <h3></h3>
                  <v-radio label="" value=""></v-radio>
                  <v-radio label="" value=""></v-radio>
                  <v-radio label="" value=""></v-radio>
                </template>

                <!-- DAQUI PARA BAIXO FOI MANTIDO POIS O FLUXO PERMANECE O MESMO, MAS FALTA MODIFICAR A APARIÇÃO DAS RESPECTIVAS LINHAS E OS ÍNDICES MANIPULADOS NOS v-if. -->
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
                      <li>Portabilidade de Empréstimo</li>
                    </ul>
                  </v-alert>
                </template>

              </v-radio-group>

              <!-- Botões de navegação -->
              <v-row>
                <v-col cols="6">
                  <v-btn class="line-buttongeral" :disabled="perguntaAtual === 0"
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
      /*totalDePerguntas: 3, MODIFICAR DE ACORDO COM A ROTA SEGUIDA OU O MÁXIMO DE PERGUNTAS POSSÍVEIS.*/
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
      console.log(this.respostasSelecionadas[this.perguntaAtual]);
      console.log(this.perguntaAtual);
    },
    perguntaAnterior() {
      if (this.perguntaAtual > 0) {
        this.perguntaAtual--;
      }
      console.log(this.respostasSelecionadas[this.perguntaAtual]);
      console.log(this.perguntaAtual);
    },
    enviarResposta() {
      this.mostrarResultados = true;
      this.linhasRecomendadas = this.getLinhasRecomendadas();
    },
    getLinhasRecomendadas() {
      let linhas = [];

      if (this.respostasSelecionadas[1] === 'dinheiro_conta') {
        if (this.respostasSelecionadas[2] === 'com_garantia') {
          linhas.push('Empréstimo com Garantia de Imóvel', 'Empréstimo com Garantia de Veículo', 'Empréstimo com Garantia de Investimentos');
        } else if (this.respostasSelecionadas[2] === 'sem_garantia') {
          if (this.respostasSelecionadas[3] === 'antecipacao') {
            linhas.push('Antecipar 13º', 'Restituição do IRPF', 'Saque aniversário do FGTS');
          } else if (this.respostasSelecionadas[3] === 'credhora') {
            linhas.push('Empréstimo Consignado', 'Empréstimo Automático', 'Crédito Benefício', 'Crédito Salário');
          }
        }
      } else if (this.respostasSelecionadas[1] === 'financiamento_sonhos') {
        if (this.respostasSelecionadas[2] === 'classicos') {
          linhas.push('Financiamento Imobiliário', 'Financiamento de Veículos', 'Financiamento de Motos');
        } else if (this.respostasSelecionadas[2] === 'diferenciado') {
          linhas.push('Crédito Mobilidade', 'Crédito Realiza', 'Crédito Energia Renovável', 'Bens e Serviços para PCDs');
        } else if (this.respostasSelecionadas[2] === 'agronegocio') {
          linhas.push('Pronaf Grupo A/C', 'Pronaf Agricultura Familiar', 'Crédito Rural Pronamp Custeio', 'Custeio Agropecuário');
        }
      } else if (this.respostasSelecionadas[1] === 'renovar_emprestimo') {
        linhas.push('Renovação de Empréstimos');
      } else if (this.respostasSelecionadas[1] === 'portabilidade') {
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