<template>
  <v-app>
    <!-- Header -->
    <v-app-bar app>
      <v-toolbar-title>Banco do Brasil</v-toolbar-title>
      <v-btn to="/" color="primary">Home</v-btn>
      <v-btn to="/operacoes" color="secondary">Operacoes</v-btn>
      <v-btn to="/linhas" color="primary">Linhas</v-btn>
      <v-btn to="/blog" color="secondary">Blog</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-card>
          <v-card-title>
            Realize já uma simulação de investimento!
          </v-card-title>
          <v-card-subtitle>
            Insira os valores a investir logo abaixo
          </v-card-subtitle>
          <!-- <v-card-actions>
            <v-btn>CDB</v-btn>
            <v-btn>CDI</v-btn>
            <v-btn>Tesouro Direto</v-btn>
            <v-btn>Renda Fixa</v-btn>
            <v-btn>Fundo de Investimentos</v-btn>
            <v-btn>Poupança</v-btn>
          </v-card-actions> -->
          <v-form>
            <v-select
              v-model="formulario.tipo_investimento"
              :items="[
                'CDB',
                'CDI',
                'Tesouro Direto',
                'Renda Fixa',
                'Fundo de Investimentos',
                'Poupança',
              ]"
              label="Tipo de Investimento"
            ></v-select>
            <v-text-field
              v-model="formulario.valor_aplicado"
              label="Valor Aplicado"
            ></v-text-field>
            <v-text-field
              v-model="formulario.investimento_mensal"
              label="Investimento Mensal"
            ></v-text-field>
            <v-text-field
              v-model="formulario.periodo"
              label="Período de Investimento"
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
            ></v-select>
            <v-btn @click="simularInvestimento">Simular</v-btn>
          </v-form>
        </v-card>
      </v-container>
    </v-main>

    <v-footer app>
      <v-col class="text-center">© 2024 - Meu Projeto</v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "Simul",

  data() {
    return {
      formulario: {
        tipo_investimento: "",
        valor_aplicado: 0.0,
        investimento_mensal: 0.0,
        periodo: 0,
        tipo_de_periodo: "",
        rentabilidade: "",
      },
    };
  },

  methods: {
    simularInvestimento() {
      const {
        tipo_investimento,
        valor_aplicado,
        investimento_mensal,
        periodo,
        tipo_de_periodo,
        rentabilidade,
      } = this.formulario;

      // Converte o período em meses se necessário
      if (tipo_de_periodo === "Anos") {
        periodo *= 12;
      }

      let rendimento = 0;

      // Calcula o rendimento baseado no tipo de rentabilidade
      switch (rentabilidade) {
        case "Pré-fixado":
          let taxaPrefixada = 0.1; // Exemplo de taxa
          rendimento =
            valor_aplicado * Math.pow(1 + taxaPrefixada, periodo / 12);
          break;

        case "Pós-fixado":
          let taxaCDI = 0.075; // Exemplo de taxa
          rendimento = valor_aplicado * Math.pow(1 + taxaCDI, periodo / 12);
          break;

        case "IPCA+":
          let taxaIPCA = 0.03; // Exemplo de taxa de inflação
          let taxaAdicional = 0.05; // Exemplo de taxa adicional
          rendimento =
            valor_aplicado *
            Math.pow(1 + taxaIPCA + taxaAdicional, periodo / 12);
          break;

        default:
          alert("Selecione um tipo de rentabilidade válido.");
          return;
      }

      const valorTotal = rendimento + investimento_mensal * periodo;
      alert(`Valor Total após o período: R$ ${valorTotal.toFixed(2)}`);
    },
  },
};
</script>

<style></style>
