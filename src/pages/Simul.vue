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
        <v-card-title class="text-h4">Compare investimentos ao longo do tempo</v-card-title>
        <v-card-subtitle>Preencha os valores para simular a rentabilidade de diferentes tipos de produtos.</v-card-subtitle>

        <v-row class="my-6" align-items="center" justify="center">
          <v-btn
            v-for="tipo in tiposInvestimento"
            :key="tipo"
            :class="{'primary': tipo === formulario.tipo_investimento, 'mx-2': true}" 
            small 
            @click="selecionarTipo(tipo)"
          >
            {{ tipo }}
          </v-btn>
        </v-row>

        <!-- Exibe o resumo do investimento -->
        <v-alert
          v-if="resumoInvestimento"
          type="info"
          class="mb-4"
        >
          {{ resumoInvestimento }}
        </v-alert>

        <v-form>
          <v-text-field
            v-model="formulario.valor_aplicado"
            label="Valor da Aplicação"
            prefix="R$"
            @input="formatarMoeda('valor_aplicado')"
          ></v-text-field>

          <v-text-field
            v-model="formulario.investimento_mensal"
            label="Investimento Mensal"
            prefix="R$"
            @input="formatarMoeda('investimento_mensal')"
          ></v-text-field>

          <v-text-field
            v-model="formulario.periodo"
            label="Prazo"
          ></v-text-field>

          <v-select
            v-model="formulario.tipo_de_periodo"
            :items="['Meses', 'Anos']"
            label="Investindo por"
          ></v-select>

          <v-select
            v-model="formulario.rentabilidade"
            :items="['Pré-fixado', 'Pós-fixado', 'IPCA+']"
            label="Tipo de Rentabilidade"
            @change="atualizarResumoRentabilidade"
          ></v-select>

          <!-- Exibe o resumo da rentabilidade -->
          <v-alert
            v-if="resumoRentabilidade"
            type="info"
            class="mt-4"
          >
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
              Em {{ formulario.periodo }} {{ formulario.tipo_de_periodo.toLowerCase() }} você teria:
              <div>R$ {{ valorTotalBruto }}</div>
              <div>Total investido: R$ {{ totalInvestido }}</div>
              <div>Rendimento bruto: R$ {{ rendimentoBruto }}</div>
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
      tiposInvestimento: ['CDB', 'CDI', 'Debenture', 'LCI & LCA', 'Tesouro Selic', 'Poupança'],
      formulario: {
        tipo_investimento: '', 
        valor_aplicado: '',
        investimento_mensal: '',
        periodo: '',
        tipo_de_periodo: "",
        rentabilidade: "",
      },
      resumoInvestimento: '',
      resumoRentabilidade: '',
      resultadoVisivel: false,
      valorTotalBruto: 0,
      totalInvestido: 0,
      rendimentoBruto: 0,
      comparacao: '',
    };
  },
  methods: {
    selecionarTipo(tipo) {
      this.formulario.tipo_investimento = tipo;
      this.atualizarResumoInvestimento();
    },
    atualizarResumoInvestimento() {
      const { tipo_investimento } = this.formulario;

      if (tipo_investimento === 'CDB') {
        this.resumoInvestimento = 'CDB é um investimento de renda fixa emitido por bancos. Considerando taxa de 10.10% ao ano.';
      } else if (tipo_investimento === 'CDI') {
        this.resumoInvestimento = 'O CDI é um índice que reflete as taxas de empréstimos entre bancos. Considerando taxa de 10.65% ao ano.';
      } else if (tipo_investimento === 'LCI & LCA') {
        this.resumoInvestimento = 'LCI e LCA são investimentos em renda fixa emitidos por instituições financeiras, isentos de IR. Considerando uma média de 7.5% ao ano.';
      } else if (tipo_investimento === 'Tesouro Selic') {
        this.resumoInvestimento = 'Tesouro Selic é um título público emitido pelo governo. Considerando taxa de 10.50% ao ano.';
      } else if (tipo_investimento === 'Poupança') {
        this.resumoInvestimento = 'A poupança é um investimento tradicional, com rendimento de 6.17% ao ano atualmente.';
      } else if (tipo_investimento === 'Debenture') {
        this.resumoInvestimento = 'Debêntures são títulos de dívida emitidos por empresas. A rentabilidade varia de acordo com a empresa emissora.';
      } else {
        this.resumoInvestimento = '';
      }
    },
    atualizarResumoRentabilidade() {
      const { rentabilidade } = this.formulario;

      if (rentabilidade === 'IPCA+') {
        this.resumoRentabilidade = 'Título IPCA+ rendem de acordo com uma porcentagem do CDI. Estamos considerando o IPCA a 0.56% + o valor abaixo.';
      } else if (rentabilidade === 'Pré-fixado') {
        this.resumoRentabilidade = 'Investimentos pré-fixados têm uma taxa fixa conhecida no momento da aplicação.';
      } else if (rentabilidade === 'Pós-fixado') {
        this.resumoRentabilidade = 'Investimentos pós-fixados têm sua rentabilidade atrelada a um indicador, como o CDI.';
      } else {
        this.resumoRentabilidade = '';
      }
    },
    simularInvestimento() {
      // Extraindo e formatando valores para cálculos
      let valorAplicado = parseFloat(this.formulario.valor_aplicado.replace(/[^\d,.-]/g, '').replace(',', '.'));
      let investimentoMensal = parseFloat(this.formulario.investimento_mensal.replace(/[^\d,.-]/g, '').replace(',', '.'));
      const { periodo, tipo_de_periodo, tipo_investimento } = this.formulario;

      // Convertendo para número e em meses
      const periodoEmMeses = tipo_de_periodo === 'Anos' ? periodo * 12 : periodo;

      let taxaAnual = 0;

      // Definindo a taxa anual conforme o tipo de investimento
      switch (tipo_investimento) {
        case 'CDB':
          taxaAnual = 0.101; // 10.1%
          break;
        case 'CDI':
          taxaAnual = 0.1065; // 10.65%
          break;
        case 'LCI & LCA':
          taxaAnual = 0.075; // 7.5%
          break;
        case 'Tesouro Selic':
          taxaAnual = 0.105; // 10.5%
          break;
        case 'Poupança':
          taxaAnual = 0.0617; // 6.17%
          break;
        case 'Debenture':
          taxaAnual = 0.08; // 8.0%
          break;
        default:
          taxaAnual = 0;
      }

      // Convertendo taxa anual para mensal
      let taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;

      // Cálculo do valor total bruto
      let valorTotal = valorAplicado * Math.pow(1 + taxaMensal, periodoEmMeses);
      valorTotal += investimentoMensal * ((Math.pow(1 + taxaMensal, periodoEmMeses) - 1) / taxaMensal);

      // Calculando o total investido e o rendimento bruto
      this.totalInvestido = (valorAplicado + investimentoMensal * periodoEmMeses).toFixed(2);
      this.rendimentoBruto = (valorTotal - this.totalInvestido).toFixed(2);

      // Calculando valor total bruto
      this.valorTotalBruto = valorTotal.toFixed(2);

      // Comparação com a poupança
      if (tipo_investimento === 'Poupança') {
        const taxaPoupancaAnual = 0.0617; // 6.17% ao ano
        const taxaPoupancaMensal = Math.pow(1 + taxaPoupancaAnual, 1 / 12) - 1;
        let valorTotalPoupanca = valorAplicado * Math.pow(1 + taxaPoupancaMensal, periodoEmMeses);
        valorTotalPoupanca += investimentoMensal * ((Math.pow(1 + taxaPoupancaMensal, periodoEmMeses) - 1) / taxaPoupancaMensal);

        const rendimentoPoupanca = (valorTotalPoupanca - this.totalInvestido).toFixed(2);
        this.comparacao = `Na poupança: R$ ${rendimentoPoupanca}`;
      } else {
        this.comparacao = '';
      }

      this.resultadoVisivel = true;
    },
    formatarMoeda(campo) {
      let valor = this.formulario[campo].toString();
      valor = valor.replace(/[^\d]/g, '');
      if (valor === '') valor = '0';
      valor = parseInt(valor).toString();
      this.formulario[campo] = (valor / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    },
  },
};
</script>

<style>
.primary {
  background-color: #f1fc23b0; /* Altere a cor conforme necessário */
  color: white;
}
</style>
