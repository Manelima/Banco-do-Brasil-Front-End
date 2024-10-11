<template>
  <v-app-bar class="header">

    
    <v-img src="@/images/bb.png" class="logo"></v-img>
    
    <v-app-bar-title class="titulo_nav_bar"> Banco do Brasil </v-app-bar-title>
    
      

    <v-btn to="/" class="buttongeral mx-1">Home</v-btn>
    <v-btn to="/linhas" class="buttongeral mx-1">Linhas</v-btn>
    <v-btn to="/operacoes" class="buttongeral mx-1">Operações</v-btn>
    <v-btn to="/blog" class="buttongeral mx-1">Blog</v-btn>

  </v-app-bar>

  <v-spacer></v-spacer>
  <v-main class="container-main">
    <v-container class="mx-auto mt-10 pa-4 pb-6">
      <v-container>
        <v-card class="card card_info_topo pa-4 transparent-bg mb-10" elevation="3">
          <v-card-text class="texto_card">
            Olá, este simulador de investimentos proporciona uma maneira fácil de calcular o
            retorno do seu capital após uma aplicação em uma taxa e um prazo específicos.
            Esse cálculo considera também eventuais contribuições durante o período e um
            valor inicial investido. A calculadora disponibilizada é útil para estimar o
            retorno do seu investimento em aplicações simples.
          </v-card-text>
        </v-card>
        <v-row class="my-6" align-items="center" justify="center">
          <v-btn class="buttongeral"
            v-for="(tipo, index) in tiposInvestimento"
            :key="index"
            :class="{ primary: tipo === formulario.tipo_investimento, 'mx-2': true }"
            small
            @click="selecionarTipo(tipo)"
          >
            {{ tipo }}
          </v-btn>

        </v-row>
      </v-container>

      <v-container class="container_filho_1">
        <v-row>
          <v-col cols="6" class="coluna_formulario">    
            <v-card class="card pa-4 transparent-bg mb-10" elevation="3">
              <v-card-title class="titulo_card text-h4">
                Simule seu Investimento !!!
              </v-card-title>
              <v-card-subtitle class="subtitulo_card mb-5">
                Preencha os valores para simular a rentabilidade de diferentes tipos de
                investimentos.
              </v-card-subtitle>

              

              <v-form>
                <v-row class="linha_botoes_form">
                  <v-col>
                    <v-text-field
                    class="campo_texto mb-4"
                    v-model="formulario.valor_aplicado"
                    label="Valor da Aplicação"
                    @input="formatarValorMonetario('valor_aplicado')">
                    </v-text-field>
                  </v-col>

                  <v-col>
                    <v-text-field
                    class="campo_texto mb-4"
                    v-model="formulario.investimento_mensal"
                    label="Investimento Mensal"
                    @input="formatarValorMonetario('investimento_mensal')">
                    </v-text-field>
                  </v-col>
                  
                </v-row>

                <v-row class="linha_botoes_form">

                  <v-col>
                    <v-text-field
                    class="campo_texto primary mb-4"
                    v-model="formulario.periodo"
                    label="Prazo">
                    </v-text-field>
                  </v-col>
                  
                  <v-col>
                    <v-select
                    class="campo_texto mb-4"
                    v-model="formulario.tipo_de_periodo"
                    :items="['Meses', 'Anos']">
                    </v-select>
                  </v-col>

                </v-row>

                <v-row class="linha_botoes_form">
                
                  <v-col>
                    <!-- Campo para seleção do tipo de rentabilidade (exibido apenas se não for poupança) -->
                    <v-select
                      class="campo_texto mb-4"
                      v-if="formulario.tipo_investimento !== 'Poupança'"
                      v-model="formulario.rentabilidade"
                      :items="
                        opcoesRentabilidade.find(
                          (opcoes) => opcoes.tipo === formulario.tipo_investimento
                        )?.opcoes || []
                      "
                      label="Tipo de Rentabilidade"
                      @change="atualizarResumoRentabilidade">
                    </v-select>
                  </v-col>
                
                  <v-col>
                    <!-- Campo para a porcentagem de rentabilidade -->
                    <v-text-field
                      class="campo_texto inputcol mb-4"
                      v-if="formulario.tipo_investimento !== 'Poupança'"
                      v-model="formulario.percentualRentabilidade"
                      label="Taxa (%)"
                      @input="validarPercentual">
                    </v-text-field>
                  </v-col>
                
                </v-row>

                <v-alert v-if="resumoRentabilidade" type="info" class="mb-5">
                  {{ resumoRentabilidade }}
                </v-alert>  

                <!-- Exibe mensagem personalizada para Tesouro Selic -->
                <v-alert v-if="formulario.rentabilidade === 'Selic'" type="info" class="mb-5">
                  Título Selic rendem de acordo com uma porcentagem do CDI. Estamos considerando
                  a Selic a 10.75% + o valor abaixo.
                </v-alert>

                <v-alert v-if="formulario.rentabilidade === 'Pré-fixado'" type="info" class="mb-5">
                  Títulos prefixados rendem conforme uma taxa fixa combinada no momento da
                  compra.
                </v-alert>

                <v-alert v-if="formulario.rentabilidade === 'Pós-fixado'" type="info" class="mb-5">
                  Títulos pós-fixados rendem de acordo com uma porcentagem do CDI. Estamos
                  considerando o CDI como 10.65%.
                </v-alert>

                <v-alert v-if="formulario.rentabilidade === 'IPCA+'" type="info" class="mb-5">
                  Título IPCA+ rendem de acordo com uma porcentagem do CDI. Estamos considerando
                  o IPCA a 0.53% + o valor abaixo.
                </v-alert>

                <!-- Alerta para a faixa de rentabilidade -->
                <v-alert v-if="alertaPercentual" type="warning" class="mb-5">
                  {{ alertaPercentual }}
                </v-alert>

                <!-- Exibe o resumo da rentabilidade -->
                <v-alert v-if="resumoRentabilidade" type="info"  class="mb-5">
                  {{ resumoRentabilidade }}
                </v-alert>

                <v-btn block class="buttongeral" @click="simularInvestimento">
                  Simular investimento
                </v-btn>

              </v-form>

              <!-- Exibição do resultado -->
              <v-dialog v-model="resultadoVisivel" max-width="500">
                <v-card class="caixa_dialog_result">
                  <v-card-title class="headline">Resultado da Simulação</v-card-title>
                  
                  <v-card-text>
                    Em {{ formulario.periodo }}
                    {{ formulario.tipo_de_periodo.toLowerCase() }} você teria:
                    <div class="valor_bruto_dialog">R$ {{ valorTotalBruto.toFixed(2) }}</div>
                    <div>Total investido: R$ {{ totalInvestido.toFixed(2) }}</div>
                    <div>Rendimento bruto: R$ {{ rendimentoBruto.toFixed(2) }}</div>
                    <div v-if="comparacao">{{ comparacao }}</div>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn color="primary" text @click="resultadoVisivel = false">Fechar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </v-card>
          </v-col>

          <v-col class="coluna_grafico">
            
              
              <!-- Exibe o resumo do investimento -->
              <v-alert v-if="resumoInvestimento" type="info" class="info_curta" style="background-color: #FCFC30!important; color: #465EFF!important; font-weight: bold!important;">
                {{ resumoInvestimento }}
              </v-alert>
              <bar-chart :data="gerarDataGrafico()"></bar-chart>

            
          </v-col>

        </v-row>
      </v-container>

      <v-container class="container_filho_2">
        <v-row>
          <v-col cols="6">
            <v-card class="card_pos_form pa-4 transparent-bg mb-10" elevation="3">
              <v-card-title class="titulo_card">Poupança</v-card-title>
              <v-card-text class="texto_card">
                A poupança é uma reserva financeira, guardada para uma finalidade futura,
                com rentabilidade definida por lei e que varia de acordo com a taxa Selic.
                Para Pessoas físicas, quando a Selic está acima de 8,5% ao ano, ela rende
                0,5% ao mês + TR (Taxa Referencial). Quando é igual ou menor que 8.5% rende
                70% da meta Selic + TR.
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="6" class="card_tesouro_dir">
            <v-card class="card_pos_form pa-4 transparent-bg mb-10" elevation="3">
              <v-card-title class="titulo_card">Tesouro Direto</v-card-title>
              <v-card-text class="texto_card">
                São títulos públicos de Renda Fixa, emitidos pelo governo. Oferecem baixo
                risco e podem ser atrelados à taxa básica de juros (Selic) ou apresentar uma
                taxa prefixada no momento da aplicação.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-card class="card_pos_form pa-4 transparent-bg mb-10" elevation="3">
              <v-card-title class="titulo_card">Debênture</v-card-title>
              <v-card-text class="texto_card">
                São títulos de dívidas emitidos por empresas que não são instituições
                financeiras ou de crédito imobiliário. Em retorno ao empréstimo, as empresas
                pagam juros sobre esse dinheiro, que podem ser prefixados ou pós-fixados
                (atrelados ao CDI).
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="6">
            <v-card class="card_pos_form pa-4 transparent-bg mb-10" elevation="3">
              <v-card-title class="titulo_card">LCI e LCA</v-card-title>
              <v-card-text class="texto_card">
                São títulos de crédito imobiliário e do agronegócio, que têm a vantagem de
                serem isentos de Imposto de Renda para pessoas físicas. As LCI’s são lastreadas
                em créditos imobiliários e as LCA’s em créditos do agronegócio. Oferecem
                rentabilidade em geral atrelada ao CDI.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card class="card_pos_form pa-4 transparent-bg mb-10" elevation="3">
              <v-card-title class="titulo_card"
                >CDB (Certificados de Depósito Bancário)</v-card-title
              >
              <v-card-text class="texto_card"
                >Os CDBs são títulos emitidos por instituições financeiras como forma de
                captar recursos. Podem ser prefixados, pós-fixados (atrelados ao CDI) ou
                atrelados à inflação.</v-card-text
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
  name: 'Simul',
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
      resumoInvestimento: "",
      resumoRentabilidade: "",
      resultadoVisivel: false,
      valorTotalBruto: 0,
      totalInvestido: 0,
      rendimentoBruto: 0,
      comparacao: "",
      rendimentoB: [0, 0, 0, 0, 0],
    };
  },
  methods: {
    gerarDataGrafico(){
      return [
        ['CDB/LC', this.rendimentoB[0]], 
        ['Debênture', this.rendimentoB[4]], 
        ['LCI & LCA', this.rendimentoB[2]], 
        ['Tesouro Direto', this.rendimentoB[3]], 
        ['Poupança', this.rendimentoB[1]],
      ];
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
    
      let valorAplicado = this.parseCurrency(this.formulario.valor_aplicado);
      let investimentoMensal = this.parseCurrency(this.formulario.investimento_mensal);
      let meses = 
        this.formulario.tipo_de_periodo === "Anos"
          ? parseInt(this.formulario.periodo) * 12
          : parseInt(this.formulario.periodo);

      if (
        isNaN(valorAplicado) ||
        isNaN(investimentoMensal) ||
        isNaN(meses) ||
        meses <= 0
      ) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
      }

      this.totalInvestido = valorAplicado + investimentoMensal * meses;
      this.rendimentoBruto = 0;

      if (this.formulario.tipo_investimento === "Poupança") {
        this.calcularRendimentoPoupanca(valorAplicado, investimentoMensal, meses);
      } else if (this.formulario.rentabilidade === "Pré-fixado") {
        this.calcularRendimentoPreFixado(valorAplicado, investimentoMensal, meses);
      } else if (this.formulario.rentabilidade === "IPCA+") {
        this.calcularRendimentoIPCA(valorAplicado, investimentoMensal, meses);
      } else if (this.formulario.rentabilidade === "Selic") {
        this.calcularRendimentoSelic(valorAplicado, investimentoMensal, meses);
      } else {
        this.calcularRendimentoPosFixado(valorAplicado, investimentoMensal, meses);
      } 

      teste = this.calcularRendimentoIPCA(valorAplicado, investimentoMensal, meses);
      this.rendimentoB[0] = teste.valorTotalBruto;

      this.resultadoVisivel = true;
    },
    
    // 
    // Função para atualizar o gráfico
    atualizarGrafico() {
      this.$refs.barChart.update({
        data: [
          ['CDB/LC', this.rendimentoB[0]],
          ['Debênture', this.rendimentoB[4]],
          ['LCI & LCA', this.rendimentoB[2]],
          ['Tesouro Direto', this.rendimentoB[3]],
          ['Poupança', this.rendimentoB[1]]
        ]
      });
    },
    atualizarRendimentoB() {
      switch (this.formulario.tipo_investimento) {
        case "CDB/LC":
          this.rendimentoB[0] = this.rendimentoBruto;
          break;
        case "Poupança":
          this.rendimentoB[1] = this.rendimentoBruto;
          break;
        case "LCI & LCA":
          this.rendimentoB[2] = this.rendimentoBruto;
          break;
        case "Tesouro Direto":
          this.rendimentoB[3] = this.rendimentoBruto;
          break;
        case "Debênture":
          this.rendimentoB[4] = this.rendimentoBruto;
          break;
      }
    },

  // VALIDAÇÕES 
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
        if (this.formulario.rentabilidade === "Pré-fixado" && (valor < 5 || valor > 17)) {
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
        if (this.formulario.rentabilidade === "Pré-fixado" && (valor < 5 || valor > 19)) {
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
        if (this.formulario.rentabilidade === "Pré-fixado" && (valor < 5 || valor > 15)) {
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
    
    calcRendimentoBruto(){
      this.rendimentoBruto = this.valorTotalBruto - this.totalInvestido;
      return this.rendimentoBruto;
    },

    calcularRendimentoSelic(valorAplicado, investimentoMensal, meses) { // VERIFICAR EFICIENCIA
      const taxaSelicAnual = 0.1075; // 10.75% a.a.
      const taxaSelicMensal = Math.pow(1 + taxaSelicAnual, 1 / 12) - 1;

      for (let i = 0; i < meses; i++) {
        valorAplicado = valorAplicado * (1 + taxaSelicMensal) + investimentoMensal;
      }
      this.valorTotalBruto = valorAplicado;

      //chamar a função e atribuir ao array
      this.rendimentoB[3] = this.calcRendimentoBruto();

      this.calcularRendimentoPoupanca(valorAplicado, investimentoMensal, meses);
      this.calcularRendimentoPreFixado(valorAplicado, investimentoMensal, meses);
    },
    calcularRendimentoPoupanca(valorAplicado, investimentoMensal, meses) {
      const taxaPoupanca = 0.0057; // Exemplo: 0.57% ao mês

      for (let i = 0; i < meses; i++) {
        valorAplicado = valorAplicado * (1 + taxaPoupanca) + investimentoMensal;
      }

      this.valorTotalBruto = valorAplicado;

      this.rendimentoB[1] = this.calcRendimentoBruto();
      
      this.calcularRendimentoPreFixado(valorAplicado, investimentoMensal, meses);
      this.calcularRendimentoSelic(valorAplicado, investimentoMensal, meses);
      
    },
    calcularRendimentoPreFixado(valorAplicado, investimentoMensal, meses) {
      let taxaAnual;

      if(this.tiposInvestimento === 'Pré-fixado'){
        taxaAnual = parseFloat(this.formulario.percentualRentabilidade) / 100;
        if (isNaN(taxaAnual)) {
          alert("Por favor, insira um percentual de rentabilidade válido.");
          return;
        }      
      }

      // Convertendo taxa anual para taxa mensal
      const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;
      
      // Calculando o rendimento sobre o valor inicial
      let valorFinal = valorAplicado * Math.pow(1 + taxaMensal, meses);

      // Calculando o rendimento das contribuições mensais
      for (let i = 1; i <= meses; i++) {
        valorFinal += investimentoMensal * Math.pow(1 + taxaMensal, meses - i);
      }

      this.valorTotalBruto = valorFinal;
      this.rendimentoB[0] = this.calcRendimentoBruto(); 
      this.rendimentoB[2] = this.rendimentoB[0];
      this.rendimentoB[4] = this.rendimentoB[2];
      
      this.calcularRendimentoPoupanca(valorAplicado, investimentoMensal, meses);
      this.calcularRendimentoSelic(valorAplicado, investimentoMensal, meses);
    },
    calcularRendimentoIPCA(valorAplicado, investimentoMensal, meses) {
      let taxaAnual = parseFloat(this.formulario.percentualRentabilidade) / 100;
      if (isNaN(taxaAnual)) {
        alert("Por favor, insira um percentual de rentabilidade válido.");
        return;
      }

      let ipca = 0.0053; // IPCA de 0.53%
      const taxaCompostaAnual = (1 + taxaAnual) * (1 + ipca) - 1;
      const taxaMensal = Math.pow(1 + taxaCompostaAnual, 1 / 12) - 1;

      for (let i = 0; i < meses; i++) {
        valorAplicado = valorAplicado * (1 + taxaMensal) + investimentoMensal;
      }

      this.valorTotalBruto = valorAplicado;
      this.rendimentoBruto[4] = this.calcRendimentoBruto();
      console.log(this.calcRendimentoBruto());
      this.calcularRendimentoPreFixado(valorAplicado, investimentoMensal, meses);
      console.log(this.calcularRendimentoPreFixado(valorAplicado, investimentoMensal, meses));
    },
    calcularRendimentoPosFixado(valorAplicado, investimentoMensal, meses) {
      let percentualCDI = parseFloat(this.formulario.percentualRentabilidade);
      if (isNaN(percentualCDI)) {
        alert("Por favor, insira um percentual de rentabilidade válido.");
        return;
      }
      let cdiAnual = 0.1065; // CDI atual (exemplo: 10.65%)
      let taxaAnual = cdiAnual * (percentualCDI / 100);
      const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;

      for (let i = 0; i < meses; i++) {
        valorAplicado = valorAplicado * (1 + taxaMensal) + investimentoMensal;
      }

      this.valorTotalBruto = valorAplicado;
      this.rendimentoB[0] = this.calcRendimentoBruto(); 
      this.rendimentoB[2] = this.rendimentoB[0];
      this.rendimentoB[4] = this.rendimentoB[2];
    },
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