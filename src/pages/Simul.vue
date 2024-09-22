<template>
  <v-app-bar app>
    <v-toolbar-title>Banco do Brasil</v-toolbar-title>
    <v-btn to="/" color="primary">Home</v-btn>
    <v-btn to="/linhas" color="secondary">Linhas</v-btn>
    <v-btn to="/operacoes" color="secondary">Operações</v-btn>
    <v-btn to="/blog" color="secondary">Blog</v-btn>
  </v-app-bar>

  <v-main>
    <v-container max-width="800px" class="mx-auto pa-4 pb-6">
      <v-card class="pa-4">
        <v-card-title class="text-h4">
          Compare investimentos ao longo do tempo
        </v-card-title>
        <v-card-subtitle>
          Preencha os valores para simular a rentabilidade de diferentes tipos de
          produtos.
        </v-card-subtitle>

        <v-row class="my-6" align-items="center" justify="center">
          <v-btn
            v-for="tipo in tiposInvestimento"
            :key="tipo"
            :class="{ primary: tipo === formulario.tipo_investimento, 'mx-2': true }"
            small
            @click="selecionarTipo(tipo)"
          >
            {{ tipo }}
          </v-btn>
        </v-row>

        <!-- Exibe o resumo do investimento -->
        <v-alert v-if="resumoInvestimento" type="info" class="mb-4">
          {{ resumoInvestimento }}
        </v-alert>

        <v-form>
          <v-text-field
            v-model="formulario.valor_aplicado"
            label="Valor da Aplicação"
            @input="formatarValorMonetario('valor_aplicado')"
          ></v-text-field>

          <v-text-field
            v-model="formulario.investimento_mensal"
            label="Investimento Mensal"
            @input="formatarValorMonetario('investimento_mensal')"
          ></v-text-field>

          <v-text-field v-model="formulario.periodo" label="Prazo"></v-text-field>

          <v-select
            v-model="formulario.tipo_de_periodo"
            :items="['Meses', 'Anos']"
            label="Investindo por"
          ></v-select>

          <!-- Campo para seleção do tipo de rentabilidade (exibido apenas se não for poupança) -->
          <!-- V-Select para escolher a rentabilidade -->
          <v-select
            v-if="formulario.tipo_investimento !== 'Poupança'"
            v-model="formulario.rentabilidade"
            :items="
              opcoesRentabilidade.find(
                (opcoes) => opcoes.tipo === formulario.tipo_investimento
              )?.opcoes || []
            "
            label="Tipo de Rentabilidade"
            @change="atualizarResumoRentabilidade"
          ></v-select>

          <v-alert v-if="resumoRentabilidade" type="info">
            {{ resumoRentabilidade }}
          </v-alert>

          <!-- Campo para a porcentagem de rentabilidade -->
          <v-text-field
            v-if="formulario.tipo_investimento !== 'Poupança'"
            v-model="formulario.percentualRentabilidade"
            label="Taxa (%)"
            @input="validarPercentual"
          ></v-text-field>

          <!-- Exibe mensagem personalizada para Tesouro Selic -->
          <v-alert v-if="formulario.rentabilidade === 'Selic'" type="info">
            Título Selic rendem de acordo com uma porcentagem do CDI. Estamos considerando
            a Selic a 10.75% + o valor abaixo.
          </v-alert>

          <v-alert v-if="formulario.rentabilidade === 'Pré-fixado'" type="info">
            Títulos prefixados rendem conforme uma taxa fixa combinada no momento da
            compra.
          </v-alert>

          <v-alert v-if="formulario.rentabilidade === 'Pós-fixado'" type="info">
            Títulos pós-fixados rendem de acordo com uma porcentagem do CDI. Estamos
            considerando o CDI como 10.65%.
          </v-alert>

          <v-alert v-if="formulario.rentabilidade === 'IPCA+'" type="info">
            Título IPCA+ rendem de acordo com uma porcentagem do CDI. Estamos considerando
            o IPCA a 0.53% + o valor abaixo.
          </v-alert>

          <!-- Alerta para a faixa de rentabilidade -->
          <v-alert v-if="alertaPercentual" type="warning" class="mt-2">
            {{ alertaPercentual }}
          </v-alert>

          <!-- Exibe o resumo da rentabilidade -->
          <v-alert v-if="resumoRentabilidade" type="info" class="mt-4">
            {{ resumoRentabilidade }}
          </v-alert>

          <v-btn block color="primary" class="mt-4" @click="simularInvestimento">
            Simular investimento
          </v-btn>
        </v-form>

        <!-- Exibição do resultado -->
        <v-dialog v-model="resultadoVisivel" max-width="500">
          <v-card>
            <v-card-title class="headline">Resultado da Simulação</v-card-title>
            <v-card-text>
              Em {{ formulario.periodo }}
              {{ formulario.tipo_de_periodo.toLowerCase() }} você teria:
              <div>R$ {{ valorTotalBruto.toFixed(2) }}</div>
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
    </v-container>
  </v-main>

  <v-footer app>
    <v-col class="text-center">© 2024 - Tropa do BB</v-col>
  </v-footer>
</template>

<script>
export default {
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
    };
  },
  methods: {
    selecionarTipo(tipo) {
      this.formulario.tipo_investimento = tipo;
      this.atualizarResumoInvestimento();
      this.formulario.rentabilidade = "";
      this.formulario.percentualRentabilidade = "";
      this.alertaPercentual = "";
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
    calcularRendimentoSelic(valorAplicado, investimentoMensal, meses) {
      const taxaSelicAnual = 0.1075;
      const taxaSelicMensal = Math.pow(1 + taxaSelicAnual, 1 / 12) - 1;
      

      for (let i = 0; i < meses; i++) {
        valorAplicado = valorAplicado * (1 + taxaSelicMensal) + investimentoMensal;
      }
      this.valorTotalBruto = valorAplicado;
      this.rendimentoBruto = this.valorTotalBruto - this.totalInvestido;
    },
    calcularRendimentoPoupanca(valorAplicado, investimentoMensal, meses) {
      const taxaPoupanca = 0.0057; // Exemplo: 0.57% ao mês

      for (let i = 0; i < meses; i++) {
        valorAplicado = valorAplicado * (1 + taxaPoupanca) + investimentoMensal;
      }

      this.valorTotalBruto = valorAplicado;
      this.rendimentoBruto = this.valorTotalBruto - this.totalInvestido;
    },
    calcularRendimentoPreFixado(valorAplicado, investimentoMensal, meses) {
      let taxaAnual = parseFloat(this.formulario.percentualRentabilidade) / 100;
      if (isNaN(taxaAnual)) {
        alert("Por favor, insira um percentual de rentabilidade válido.");
        return;
      }
      const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;

      for (let i = 0; i < meses; i++) {
        valorAplicado = valorAplicado * (1 + taxaMensal) + investimentoMensal;
      }

      this.valorTotalBruto = valorAplicado;
      this.rendimentoBruto = this.valorTotalBruto - this.totalInvestido;
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
      this.rendimentoBruto = this.valorTotalBruto - this.totalInvestido;
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
      this.rendimentoBruto = this.valorTotalBruto - this.totalInvestido;
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

<style>
.primary {
  background-color: #f1fc23b0;
  /* Altere a cor conforme necessário */
  color: white;
}
</style>