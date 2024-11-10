<template>
  <v-app-bar class="simul-header">
    <v-img src="@/images/bb.png" class="line-logo"></v-img>
    <div class="simul-linha_preta_vertical"></div>
    <v-app-bar-title class="line-titulo_nav_bar">
      Banco do Brasil
    </v-app-bar-title>

    <v-btn to="/" class="simul-buttongeral mx-1">Home</v-btn>
    <v-btn to="/linhas" class="simul-buttongeral mx-1">Linhas</v-btn>
    <v-btn to="/operacoes" class="simul-buttongeral mx-1">Operações</v-btn>
    <v-btn to="/blog" class="simul-buttongeral mx-1">Blog</v-btn>
  </v-app-bar>

  <v-spacer></v-spacer>
  <v-main class="simul-container-main">
    <v-container class="mx-auto mt-10 pa-4 pb-6">
      <v-container>
        <v-card
          class="simul-card simul-card_info_topo pa-4 transparent-bg mb-10"
          elevation="3"
        >
          <v-card-text class="simul-texto_card">
            Olá, este simulador de investimentos proporciona uma maneira fácil
            de calcular o retorno do seu capital após uma aplicação em uma taxa
            e um prazo específicos. Esse cálculo considera também eventuais
            contribuições durante o período e um valor inicial investido. A
            calculadora disponibilizada é útil para estimar o retorno do seu
            investimento em aplicações simples.
          </v-card-text>
        </v-card>

        <v-row class="my-6" align-items="center" justify="center">
          <v-btn
            class="simul-buttongeral"
            v-for="(tipo, index) in tiposInvestimento"
            :key="index"
            :class="{
              primary: tipo === formulario.tipo_investimento,
              'mx-2': true,
            }"
            small
            @click="selecionarTipo(tipo)"
          >
            {{ tipo }}
          </v-btn>
        </v-row>
      </v-container>

      <v-container class="simul-simul-container_filho_1 mt-6">
        <v-row>
          <v-col cols="6" class="simul-coluna_formulario">
            <v-card class="simul-card pa-4 transparent-bg mb-10" elevation="3">
              <v-card-title class="simul-titulo_card text-h4">
                Simule seu Investimento 
              </v-card-title>
              <v-card-subtitle class="subsimul-titulo_card mb-5">
                Preencha os valores para simular a rentabilidade de diferentes
                tipos de investimentos.
              </v-card-subtitle>

              <v-form>
                <v-row class="simul-simul-linha_botoes_form">
                  <v-col>
                    <v-text-field
                      class="simul-campo_texto mb-4"
                      v-model="formulario.valor_aplicado"
                      label="Valor da Aplicação"
                      @input="formatarValorMonetario('valor_aplicado')"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col>
                    <v-text-field
                      class="simul-campo_texto mb-4"
                      v-model="formulario.investimento_mensal"
                      label="Investimento Mensal"
                      @input="formatarValorMonetario('investimento_mensal')"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>

                <v-row class="simul-linha_botoes_form">
                  <v-col>
                    <v-text-field
                      class="simul-campo_texto primary mb-4"
                      v-model="formulario.periodo"
                      label="Prazo"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col>
                    <v-select
                      class="simul-campo_texto mb-4"
                      v-model="formulario.tipo_de_periodo"
                      :items="['Meses', 'Anos']"
                    >
                    </v-select>
                  </v-col>
                </v-row>

                <v-row class="simul-linha_botoes_form">
                  <v-col>
                    <!-- Campo para seleção do tipo de rentabilidade (exibido apenas se não for poupança) -->
                    <v-select
                      class="simul-campo_texto mb-4"
                      v-if="formulario.tipo_investimento !== 'Poupança'"
                      v-model="formulario.rentabilidade"
                      :items="
                        opcoesRentabilidade.find(
                          (opcoes) =>
                            opcoes.tipo === formulario.tipo_investimento
                        )?.opcoes || []
                      "
                      label="Tipo de Rentabilidade"
                      @change="atualizarResumoRentabilidade"
                    >
                    </v-select>
                  </v-col>

                  <v-col>
                    <!-- Campo para a porcentagem de rentabilidade -->
                    <v-text-field
                      class="simul-campo_texto simul-inputcol mb-4"
                      v-if="formulario.tipo_investimento !== 'Poupança'"
                      v-model="formulario.percentualRentabilidade"
                      label="Taxa (%)"
                      @input="validarPercentual"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>

                <v-alert v-if="resumoRentabilidade" type="info" class="mb-5">
                  {{ resumoRentabilidade }}
                </v-alert>

                <!-- Exibe mensagem personalizada para Tesouro Selic -->
                <v-alert
                  v-if="formulario.rentabilidade === 'Selic'"
                  type="info"
                  class="mb-5"
                >
                  Título Selic rendem de acordo com uma porcentagem do CDI.
                  Estamos considerando a Selic a 10.75% + o valor abaixo.
                </v-alert>

                <v-alert
                  v-if="formulario.rentabilidade === 'Pré-fixado'"
                  type="info"
                  class="mb-5"
                >
                  Títulos prefixados rendem conforme uma taxa fixa combinada no
                  momento da compra.
                </v-alert>

                <v-alert
                  v-if="formulario.rentabilidade === 'Pós-fixado'"
                  type="info"
                  class="mb-5"
                >
                  Títulos pós-fixados rendem de acordo com uma porcentagem do
                  CDI. Estamos considerando o CDI como 10.65%.
                </v-alert>

                <v-alert
                  v-if="formulario.rentabilidade === 'IPCA+'"
                  type="info"
                  class="mb-5"
                >
                  Título IPCA+ rendem de acordo com uma porcentagem do CDI.
                  Estamos considerando o IPCA a 0.53% + o valor abaixo.
                </v-alert>

                <!-- Alerta para a faixa de rentabilidade -->
                <v-alert v-if="alertaPercentual" type="warning" class="mb-5">
                  {{ alertaPercentual }}
                </v-alert>

                <!-- Exibe o resumo da rentabilidade -->
                <v-alert v-if="resumoRentabilidade" type="info" class="mb-5">
                  {{ resumoRentabilidade }}
                </v-alert>

                <v-btn block class="simul-buttongeral" @click="simularInvestimento">
                  Simular investimento
                </v-btn>
              </v-form>

              <!-- Exibição do resultado -->
              <v-dialog v-model="resultadoVisivel" max-width="500">
                <v-card class="simul-caixa_dialog_result">
                  <v-card-title class="headline"
                    >Resultado da Simulação</v-card-title
                  >

                  <v-card-text>
                    Em {{ formulario.periodo }}
                    {{ formulario.tipo_de_periodo.toLowerCase() }} você teria:
                    <div class="simul-valor_bruto_dialog">
                      R$ {{ valorTotalBruto.toFixed(2) }}
                    </div>
                    <div>
                      Total investido: R$ {{ totalInvestido.toFixed(2) }}
                    </div>
                    <div>
                      Rendimento bruto: R$ {{ rendimentoBruto.toFixed(2) }}
                    </div>
                    <div v-if="comparacao">{{ comparacao }}</div>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn
                      color="primary"
                      text
                      @click="resultadoVisivel = false"
                      >Fechar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
          </v-col>

          <v-col class="simul-coluna_grafico">
            <!-- Exibe o resumo do investimento -->
            <v-alert
              v-if="resumoInvestimento"
              type="info"
              class="simul-info_curta"
              style="
                background-color: #fcfc30 !important;
                color: #465eff !important;
                font-weight: bold !important;
              "
            >
              {{ resumoInvestimento }}
            </v-alert>
            <bar-chart :data="gerarDataGrafico()"></bar-chart>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="simul-container_filho_2">
        <v-row>
          <v-col cols="6">
            <v-card
              class="simul-simul-card_pos_form pa-4 transparent-bg mb-10"
              elevation="3"
            >
              <v-card-title class="simul-titulo_card">Poupança</v-card-title>
              <v-card-text class="simul-texto_card">
                A poupança é uma reserva financeira, guardada para uma
                finalidade futura, com rentabilidade definida por lei e que
                varia de acordo com a taxa Selic. Para Pessoas físicas, quando a
                Selic está acima de 8,5% ao ano, ela rende 0,5% ao mês + TR
                (Taxa Referencial). Quando é igual ou menor que 8.5% rende 70%
                da meta Selic + TR.
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="6" class="simul-card_tesouro_dir">
            <v-card
              class="simul-card_pos_form pa-4 transparent-bg mb-10"
              elevation="3"
            >
              <v-card-title class="simul-titulo_card">Tesouro Direto</v-card-title>
              <v-card-text class="simul-texto_card">
                São títulos públicos de Renda Fixa, emitidos pelo governo.
                Oferecem baixo risco e podem ser atrelados à taxa básica de
                juros (Selic) ou apresentar uma taxa prefixada no momento da
                aplicação.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-card
              class="simul-card_pos_form pa-4 transparent-bg mb-10"
              elevation="3"
            >
              <v-card-title class="simul-titulo_card">Debênture</v-card-title>
              <v-card-text class="simul-texto_card">
                São títulos de dívidas emitidos por empresas que não são
                instituições financeiras ou de crédito imobiliário. Em retorno
                ao empréstimo, as empresas pagam juros sobre esse dinheiro, que
                podem ser prefixados ou pós-fixados (atrelados ao CDI).
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="6">
            <v-card
              class="simul-card_pos_form pa-4 transparent-bg mb-10"
              elevation="3"
            >
              <v-card-title class="simul-titulo_card">LCI e LCA</v-card-title>
              <v-card-text class="simul-texto_card">
                São títulos de crédito imobiliário e do agronegócio, que têm a
                vantagem de serem isentos de Imposto de Renda para pessoas
                físicas. As LCI’s são lastreadas em créditos imobiliários e as
                LCA’s em créditos do agronegócio. Oferecem rentabilidade em
                geral atrelada ao CDI.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card
              class="simul-card_pos_form pa-4 transparent-bg mb-10"
              elevation="3"
            >
              <v-card-title class="simul-titulo_card"
                >CDB (Certificados de Depósito Bancário)</v-card-title
              >
              <v-card-text class="simul-texto_card"
                >Os CDBs são títulos emitidos por instituições financeiras como
                forma de captar recursos. Podem ser prefixados, pós-fixados
                (atrelados ao CDI) ou atrelados à inflação.</v-card-text
              >
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-main>
</template>

<script>
import "@/styles/Simul.css";

export default {
  name: "Simul",
  data() {
    return {
      tiposInvestimento: [
        "CDB/LC",
        "Debênture",
        "LCI & LCA",
        "Tesouro Direto",
        "Poupança",
      ],
      opcoesRentabilidade: [
        { tipo: "Debênture", opcoes: ["Pré-fixado", "Pós-fixado", "IPCA+"] },
        { tipo: "LCI & LCA", opcoes: ["Pré-fixado", "Pós-fixado", "IPCA+"] },
        { tipo: "CDB/LC", opcoes: ["Pré-fixado", "Pós-fixado", "IPCA+"] },
        { tipo: "Tesouro Direto", opcoes: ["Pré-fixado", "IPCA+", "Selic"] }, 
      ],
      formulario: {
        tipo_investimento: "",
        valor_aplicado: "",
        investimento_mensal: "",
        periodo: "",
        tipo_de_periodo: "",
        rentabilidade: "",
        percentualRentabilidade: "",
      },
      alertaPercentual: "",
      
      //variáveis de resumo --
      resumoInvestimento: "",
      resumoRentabilidade: "",
      // -- fim

      resultadoVisivel: false,
      valorTotalBruto: 0,
      totalInvestido: 0,

      //variáveis de rendimento bruto --
      rendimentoBruto: 0,
      rendimentoBrutoPoupanca: 0,
      rendimentoBrutoSelic: 0,
      rendimentoBrutoIPCA: 0,
      rendimentoBrutoPreFixado: 0,
      rendimentoBrutoPosFixado: 0,
      // -- fim
      
      comparacao: "",
      rendimentoB: [0, 0, 0, 0, 0],
      
      //variaveis de valores aplicados
      valorAplicado: 0,
      valorAplicadoPoupanca: 0,
      valorAplicadoSelic: 0,
      valorAplicadoIPCA: 0,
      valorAplicadoPreFixado: 0,
      valorAplicadoPosFixado: 0,
      // -- fim

      investimentoMensal: 0,

      meses: 0,

      //retornoPrefixado: 0, não estava sendo usada
      //rendimentoBrutoSelic: 0,
      //rendimentoBrutoPoupanca: 0,
    };
  },
  methods: {
    gerarDataGrafico() {
      this.atualizarGrafico();
      return [
        ["CDB/LC", this.rendimentoB[0]],
        ["Debênture", this.rendimentoB[4]],
        ["LCI & LCA", this.rendimentoB[2]],
        ["Tesouro Direto", this.rendimentoB[3]],
        ["Poupança", this.rendimentoB[1]],
      ];
    },
    
    definirRendimentoBruto(){
      if(this.formulario.tipo_investimento === 'Poupança'){
        this.rendimentoBruto = this.rendimentoBrutoPoupanca;
      }
      else if(this.formulario.rentabilidade === 'Pré-fixado'){
        this.rendimentoBruto = this.rendimentoBrutoPreFixado;
      }
      else if(this.formulario.rentabilidade === 'Pós-fixado'){
        this.rendimentoBruto = this.rendimentoBrutoPosFixado;
      }
      else if(this.formulario.rentabilidade === 'IPCA+'){
        this.rendimentoBruto = this.rendimentoBrutoIPCA;
      }
      else if(this.formulario.rentabilidade === 'Selic'){
        this.rendimentoBruto = this.rendimentoBrutoSelic;
      }
      return 'a definição foi feita!';
    },

    // Função para atualizar o gráfico
    atualizarGrafico() {
      if(this.formulario.tipo_investimento === 'Tesouro Direto' && this.formulario.rentabilidade === 'Pré-fixado'){
      
        

        this.rendimentoB[3] = this.calcRendimentoBrutoPreFixado();

    
      
      } else if (this.formulario.tipo_investimento === 'Tesouro Direto' && this.formulario.rentabilidade === 'IPCA+'){

        this.rendimentoB[3] = this.calcRendimentoBrutoIPCA();
    
        
      }  else if (this.formulario.tipo_investimento === 'CDB/LC' && this.formulario.rentabilidade === 'Pós-fixado'){
        
        this.rendimentoB[0] = this.calcRendimentoBrutoPosFixado();
        
        
        console.log('CDB/LC: ' + this.rendimentoB[0]);

      } else if (this.formulario.tipo_investimento === 'CDB/LC' && this.formulario.rentabilidade === 'Pré-fixado'){
        
        this.rendimentoB[0] = this.calcRendimentoBrutoPreFixado();
        
        
        console.log('CDB/LC: ' + this.rendimentoB[0]);
      } else if (this.formulario.tipo_investimento === 'CDB/LC' && this.formulario.rentabilidade === 'IPCA+'){
        
        this.rendimentoB[0] = this.calcRendimentoBrutoIPCA();
        
        
        console.log('CDB/LC: ' + this.rendimentoB[0]);
       }  else if (this.formulario.tipo_investimento === 'Debênture' && this.formulario.rentabilidade === 'Pós-fixado'){
        
        this.rendimentoB[4] = this.calcRendimentoBrutoPosFixado();
        
        
        console.log('Debênture' + this.rendimentoB[0]);

      } else if (this.formulario.tipo_investimento === 'Debênture' && this.formulario.rentabilidade === 'Pré-fixado'){
        
        this.rendimentoB[4] = this.calcRendimentoBrutoPreFixado();
        
        
        console.log('Debênture' + this.rendimentoB[0]);
      } else if (this.formulario.tipo_investimento === 'Debênture' && this.formulario.rentabilidade === 'IPCA+'){
        
        this.rendimentoB[4] = this.calcRendimentoBrutoIPCA();
        
        
        console.log('Debênture: ' + this.rendimentoB[0]);
      
      } else if (this.formulario.tipo_investimento === 'LCI & LCA' && this.formulario.rentabilidade === 'Pós-fixado'){
        
        this.rendimentoB[2] = this.calcRendimentoBrutoPosFixado();
        
        
        console.log('LCI & LCA: ' + this.rendimentoB[2]);

      } else if (this.formulario.tipo_investimento === 'LCI & LCA' && this.formulario.rentabilidade === 'Pré-fixado'){
        
        this.rendimentoB[2] = this.calcRendimentoBrutoPreFixado();
        
        
        console.log('LCI & LCA: ' + this.rendimentoB[2]);
      } else if (this.formulario.tipo_investimento === 'LCI & LCA' && this.formulario.rentabilidade === 'IPCA+'){
        
        this.rendimentoB[2] = this.calcRendimentoBrutoIPCA();
        
        
        console.log('LCI & LCA: ' + this.rendimentoB[2]);
       } else if (this.formulario.rentabilidade === 'Selic'){
     
        
        this.rendimentoB[3] =  this.calcRendimentoBrutoSelic(); 


        console.log('RendimentoB[3]: ' + this.rendimentoB[3] + '\nRendimentoB[1]: ' + this.rendimentoB[1]);

      } else if (this.formulario.tipo_investimento === 'Poupança') {
    
        this.rendimentoB[1] = this.calcRendimentoBrutoPoupanca();
      }
    },
    
    
    selecionarTipo(tipo) {
      this.formulario.tipo_investimento = tipo;
      this.atualizarResumoInvestimento();
      this.formulario.rentabilidade = "";
      this.formulario.percentualRentabilidade = "";
      this.alertaPercentual = "";

      const investimentoSelecionado = this.opcoesRentabilidade.find(
        (item) => item.tipo === tipo
      );
      this.formulario.opcoesFiltradas = investimentoSelecionado
        ? investimentoSelecionado.opcoes
        : [];
    },

    simularInvestimento() {
      this.valorAplicado = this.parseCurrency(this.formulario.valor_aplicado);

      
      this.investimentoMensal = this.parseCurrency(
        this.formulario.investimento_mensal
      );
      this.meses =
        this.formulario.tipo_de_periodo === "Anos"
          ? parseInt(this.formulario.periodo) * 12
          : parseInt(this.formulario.periodo);

      if (
        isNaN(this.valorAplicado) ||
        isNaN(this.investimentoMensal) ||
        isNaN(this.meses) ||
        this.meses <= 0
      ) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
      }

      this.totalInvestido = this.valorAplicado + this.investimentoMensal * this.meses;
      //funções para simular investimentos, lembrar de checkar caso mude algo
      if (this.formulario.tipo_investimento === "Poupança") {
        this.calcularRendimentoPoupanca(
          this.investimentoMensal,
          this.meses
        );
      } else if (this.formulario.rentabilidade === "Pré-fixado") {
        this.calcularRendimentoPreFixado(
          this.investimentoMensal,
          this.meses
        );
      } else if (this.formulario.rentabilidade === "IPCA+") {
        this.calcularRendimentoIPCA(this.investimentoMensal, this.meses);
      } else if (this.formulario.rentabilidade === "Selic") {
        this.calcularRendimentoSelic(this.investimentoMensal, this.meses);
      } else {
        this.calcularRendimentoPosFixado( this.investimentoMensal, this.meses);
      }
    
      this.resultadoVisivel = true;
    },
    validarPercentual() {
      const valor = parseFloat(this.formulario.percentualRentabilidade);

      if (isNaN(valor)) {
        this.alertaPercentual = "Por favor, insira um valor numérico válido.";
        return;
      }

      // Tesouro Direto
      if (this.formulario.tipo_investimento === "Tesouro Direto") {
        if (
          // Pré-fixado do Tesouro Direto
          this.formulario.rentabilidade === "Pré-fixado" &&
          (valor < 3 || valor > 13)
        ) {
          this.alertaPercentual =
            "Esse valor está fora dos valores encontrados no mercado.";
        } else if (
          // IPCA+ do Tesouro Direto
          this.formulario.rentabilidade === "IPCA+" &&
          (valor < 2.5 || valor > 10)
        ) {
          this.alertaPercentual =
            "Esse valor está fora dos limites permitidos para IPCA+ (2.5% - 10%).";
        } else if (
          // Selic do Tesouro Direto Padrão literal
          this.formulario.rentabilidade === "Selic" &&
          (valor < -0.05 || valor > 0.5)
        ) {
          this.alertaPercentual =
            "Esse valor está fora dos valores encontrados no mercado com a Taxa Selic.  (-0.05% - 0.5%).";
        } else {
          this.alertaPercentual = "";
        }
      }
      // CDB/LC
      else if (this.formulario.tipo_investimento === "CDB/LC") {
        if (
          this.formulario.rentabilidade === "Pré-fixado" &&
          (valor < 5 || valor > 17)
        ) {
          this.alertaPercentual =
            "Esse valor está fora dos limites para CDB/LC Pré-fixado (5% - 17%).";
        } else if (
          this.formulario.rentabilidade === "Pós-fixado" &&
          (valor < 90 || valor > 160)
        ) {
          this.alertaPercentual =
            "Esse valor está fora dos limites para CDB/LC Pós-fixado (90% - 160% do CDI).";
        } else if (
          this.formulario.rentabilidade === "IPCA+" &&
          (valor < 2.5 || valor > 10)
        ) {
          this.alertaPercentual =
            "Esse valor está fora dos limites para CDB/LC IPCA+ (2.5% - 10% a.a).";
        } else {
          this.alertaPercentual = "";
        }
      }
      // Debênture
      else if (this.formulario.tipo_investimento === "Debênture") {
        if (
          this.formulario.rentabilidade === "Pré-fixado" &&
          (valor < 5 || valor > 19)
        ) {
          this.alertaPercentual =
            "Esse valor está fora dos limites para Debêntures Pré-fixado (5% - 19%).";
        } else if (
          this.formulario.rentabilidade === "Pós-fixado" &&
          (valor < 90 || valor > 140)
        ) {
          this.alertaPercentual =
            "Esse valor está fora dos limites para Debêntures Pós-fixado (90% - 140% do CDI).";
        } else if (
          this.formulario.rentabilidade === "IPCA+" &&
          (valor < 2.5 || valor > 13)
        ) {
          this.alertaPercentual =
            "Esse valor está fora dos limites para Debêntures IPCA+ (2.5% - 13% a.a).";
        } else {
          this.alertaPercentual = "";
        }
      }
      // LCI & LCA
      else if (this.formulario.tipo_investimento === "LCI & LCA") {
        if (
          this.formulario.rentabilidade === "Pré-fixado" &&
          (valor < 5 || valor > 15)
        ) {
          this.alertaPercentual =
            "Esse valor está fora dos limites para LCI & LCA Pré-fixado (5% - 15%).";
        } else if (
          this.formulario.rentabilidade === "Pós-fixado" &&
          (valor < 85 || valor > 160)
        ) {
          this.alertaPercentual =
            "Esse valor está fora dos limites para LCI & LCA Pós-fixado (85% - 160% do CDI).";
        } else if (
          this.formulario.rentabilidade === "IPCA+" &&
          (valor < 2.5 || valor > 13)
        ) {
          this.alertaPercentual =
            "Esse valor está fora dos limites para LCI & LCA IPCA+ (2.5% - 13% a.a).";
        } else {
          this.alertaPercentual = "";
        }
      } else {
        this.alertaPercentual = "";
      }
    },
    atualizarResumoInvestimento() {
      const { tipo_investimento } = this.formulario;

      if (tipo_investimento === "CDB/LC") {
        this.resumoInvestimento =
          "CDB é um investimento de renda fixa emitido por bancos.";
      } else if (tipo_investimento === "LCI & LCA") {
        this.resumoInvestimento =
          "LCI e LCA são investimentos em renda fixa emitidos por instituições financeiras, isentos de IR.";
      } else if (tipo_investimento === "Tesouro Direto") {
        this.resumoInvestimento =
          "Tesouro Direto é um título público emitido pelo governo.";
      } else if (tipo_investimento === "Poupança") {
        this.resumoInvestimento =
          "A poupança é um investimento tradicional, com rendimento de 7.24% ao ano atualmente.";
      } else if (tipo_investimento === "Debênture") {
        this.resumoInvestimento =
          "Debêntures são títulos de dívida emitidos por empresas.";
      } else {
        this.resumoInvestimento = "";
      }
    },
    atualizarResumoRentabilidade() {
      const { rentabilidade } = this.formulario;

      if (rentabilidade === "IPCA+") {
        this.resumoRentabilidade =
          "Título IPCA+ rendem de acordo com uma porcentagem do CDI.";
      } else if (rentabilidade === "Pré-fixado") {
        this.resumoRentabilidade =
          "Investimentos pré-fixados têm uma taxa fixa conhecida no momento da aplicação.";
      } else if (rentabilidade === "Pós-fixado") {
        this.resumoRentabilidade =
          "Investimentos pós-fixados têm sua rentabilidade atrelada a um indicador, como o CDI.";
      } else {
        this.resumoRentabilidade = "";
      }
      this.formulario.percentualRentabilidade = "";
      this.alertaPercentual = "";
    },

    calcRendimentoBruto() {
      this.rendimentoBruto = this.valorTotalBruto - this.totalInvestido;

      console.log('Console de calcRendimentoBruto:\n' + 'this.rendimentoBruto: ' + this.rendimentoBruto + 'this.valorTotalBruto: ' + this.valorTotalBruto + 'this.totalInvestido: ' + this.totalInvestido);
      
      return this.rendimentoBruto;
    },

    //--------------Calculos Selic------------ analisar resultado
    calcularRendimentoSelic(investimentoMensal, meses) {

      this.valorAplicadoSelic = this.valorAplicado;
      const taxaSelicAnual = 0.1075; // 10.75% a.a.
      const taxaSelicMensal = Math.pow(1 + taxaSelicAnual, 1 / 12) - 1;
    

      for (let i = 0; i < meses; i++) {
        this.valorAplicadoSelic = this.valorAplicadoSelic * (1 + taxaSelicMensal) + investimentoMensal;
      }

     this.valorTotalBruto = this.valorAplicadoSelic;
      
      return this.calcRendimentoBrutoSelic();
    },
    calcRendimentoBrutoSelic(){
      this.rendimentoBrutoSelic = this.valorTotalBruto - this.totalInvestido;

      console.log('Console de calcRendimentoBrutoSelic:\n' + 'this.rendimentoBrutoSelic: ' + this.rendimentoBrutoSelic + 'this.valorTotalBruto: ' + this.valorTotalBruto + 'this.totalInvestido: ' + this.totalInvestido);
      
      return this.rendimentoBrutoSelic;
    },
    // ----------------------------------FIM

    //---------------Calculos Poupança-------------
    calcularRendimentoPoupanca(investimentoMensal, meses) {
      
      this.valorAplicadoPoupanca = this.valorAplicado;
      const taxaPoupanca = 0.0057; // 0.57% ao mês

      for (let i = 0; i < meses; i++) {
       this.valorAplicadoPoupanca = this.valorAplicadoPoupanca* (1 + taxaPoupanca) + investimentoMensal;
      }

      this.valorTotalBruto = this.valorAplicadoPoupanca;

      this.rendimentoB[1] = this.calcRendimentoBrutoPoupanca();
      return this.rendimentoB[1];
    },
    calcRendimentoBrutoPoupanca(){
      
      // Calcula o rendimento bruto da poupança
      this.rendimentoBrutoPoupanca = this.valorTotalBruto - this.totalInvestido;

      this.definirRendimentoBruto();

      console.log('Console de calcRendimentoBrutoPoupanca:\n' + 'this.rendimentoBrutoPoupanca: ' + this.rendimentoBrutoPoupanca + 'this.valorTotalBruto: ' + this.valorTotalBruto + 'this.totalInvestido: ' + this.totalInvestido);

      return this.rendimentoBrutoPoupanca;
    },
    // ------------------------------------------FIM
  
    // --------------Calculos Pré-fixado-------------
    calcularRendimentoPreFixado(investimentoMensal, meses) {

      this.valorAplicadoPreFixado = this.valorAplicado;
      let taxaAnual = parseFloat(this.formulario.percentualRentabilidade) / 100;
      if (isNaN(taxaAnual)) {
        alert("Por favor, insira um percentual de rentabilidade válido.");
        return;
      }

      // Convertendo taxa anual para taxa mensal
      const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;

      // Certifique-se de que valorAplicado seja válido (não NaN ou indefinido)
      if (isNaN(this.valorAplicadoPreFixado) || this.valorAplicadoPreFixado <= 0) {
        alert("Por favor, insira um valor de aplicação válido.");
        return;
      }

      // Inicializa valorFinal com o valor aplicado já rendendo e com os aportes mensais
      let valorFinal = this.valorAplicadoPreFixado * Math.pow(1 + taxaMensal, meses) + investimentoMensal * (Math.pow(1 + taxaMensal, meses) - 1) / taxaMensal;

      // Atualiza os valores finais
      this.valorTotalBruto = valorFinal;

      // Verifique se valorTotalBruto e rendimentoBruto são números válidos
      if (isNaN(this.valorTotalBruto) || isNaN(this.rendimentoB[0])) {
        alert(
          "O cálculo gerou valores inválidos. Por favor, revise os dados inseridos."
        );
      }

      // Certifique-se de que calcRendimentoBrutoPreFixado() retorne um valor válido


      return this.calcRendimentoBrutoPreFixado();
    },
    calcRendimentoBrutoPreFixado(){

      // Calcula o rendimento bruto do Selic
      this.rendimentoBrutoPreFixado = this.valorTotalBruto - this.totalInvestido;

      this.definirRendimentoBruto();

      console.log('Console de calcRendimentoBrutoPreFixado:\n' + 'this.rendimentoBrutoPreFixado: ' + this.rendimentoBrutoPreFixado + 'this.valorTotalBruto: ' + this.valorTotalBruto + 'this.totalInvestido: ' + this.totalInvestido);

      return this.rendimentoBrutoPreFixado;
    },
    //-------------------------------------------FIM

    //--------------Calculos IPCA+---------------
    calcularRendimentoIPCA(investimentoMensal, meses) {

      this.valorAplicadoIPCA = this.valorAplicado;

      let taxaAnual = parseFloat(this.formulario.percentualRentabilidade) / 100;

      if (isNaN(taxaAnual)) {
        alert("Por favor, insira um percentual de rentabilidade válido.");
        return;
      }

      let ipca = 0.0053; // IPCA de 0.53%
      const taxaCompostaAnual = (1 + taxaAnual) * (1 + ipca) - 1;
      const taxaMensal = Math.pow(1 + taxaCompostaAnual, 1 / 12) - 1;

      for (let i = 0; i < meses; i++) {
        this.valorAplicadoIPCA = this.valorAplicadoIPCA * (1 + taxaMensal) + investimentoMensal;
      }

      this.valorTotalBruto = this.valorAplicadoIPCA;

      return this.calcRendimentoBrutoIPCA();
    },
    calcRendimentoBrutoIPCA(){
      // Calcula o rendimento bruto do Selic
      this.rendimentoBrutoIPCA = this.valorTotalBruto - this.totalInvestido;

      this.definirRendimentoBruto();

      console.log('Console de calcRendimentoBrutoIPCA:\n' + 'this.calcRendimentoBrutoIPCA: ' + this.rendimentoBrutoIPCA + 'this.valorTotalBruto: ' + this.valorTotalBruto + 'this.totalInvestido: ' + this.totalInvestido);

      return this.rendimentoBrutoIPCA;
    },
    //-------------------------------------FIM

    //-----------------Calculos Pós-fixado----------------
    calcularRendimentoPosFixado(investimentoMensal, meses) {
      
      this.valorAplicadoPosFixado = this.valorAplicado;
      let percentualCDI = parseFloat(this.formulario.percentualRentabilidade);

      if (isNaN(percentualCDI)) {
        alert("Por favor, insira um percentual de rentabilidade válido.");
        return;
      }
      
      let cdiAnual = 0.1065; // CDI atual (exemplo: 10.65%)

      let taxaAnual = cdiAnual * (percentualCDI / 100);

      const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;

      for (let i = 0; i < meses; i++) {
        this.valorAplicadoPosFixado = this.valorAplicadoPosFixado * (1 + taxaMensal) + investimentoMensal;
      }

      this.valorTotalBruto = this.valorAplicadoPosFixado;
        
      return this.calcRendimentoBruto();
      
    },
    calcRendimentoBrutoPosFixado(){
      // Calcula o rendimento bruto do Pós-fixado
      this.rendimentoBrutoPosFixado = this.valorTotalBruto - this.totalInvestido;

      this.definirRendimentoBruto();

      console.log('Console de calcRendimentoBrutoPosFixado: \n' + 'this.calcRendimentoBrutoPosFixado: ' + this.rendimentoBrutoPosFixado + 'this.valorTotalBruto: ' + this.valorTotalBruto + 'this.totalInvestido: ' + this.totalInvestido);

      return this.rendimentoBrutoPosFixado;
    },
    //------------------------------------------FIM

    formatarValorMonetario(campo) {
      let valor = this.formulario[campo];

      // Remove todos os caracteres não numéricos
      valor = valor.replace(/\D/g, "");

      // Formata o valor
      valor = (valor / 100).toFixed(2) + "";
      valor = valor.replace(".", ",");
      valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

      // Atualiza o campo do formulário
      this.formulario[campo] = "R$ " + valor;
    },
    parseCurrency(value) {
      if (!value) return 0;
      // Remove "R$" e quaisquer caracteres não numéricos, substitui vírgula por ponto
      let numericValue = value.replace(/[^0-9,-]+/g, "").replace(",", ".");
      return parseFloat(numericValue);
    },
  },
};
</script>