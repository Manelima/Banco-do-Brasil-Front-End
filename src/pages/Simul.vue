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
				<v-card-subtitle>
					Preencha os valores para simular a rentabilidade de diferentes tipos de produtos.
				</v-card-subtitle>

				<v-row class="my-6" align-items="center" justify="center">
					<v-btn v-for="tipo in tiposInvestimento" :key="tipo"
						:class="{ primary: tipo === formulario.tipo_investimento, 'mx-2': true }" small
						@click="selecionarTipo(tipo)">
						{{ tipo }}
					</v-btn>
				</v-row>

				<!-- Exibe o resumo do investimento -->
				<v-alert v-if="resumoInvestimento" type="info" class="mb-4">
					{{ resumoInvestimento }}
				</v-alert>

				<v-form>
					<v-text-field v-model="formulario.valor_aplicado" label="Valor da Aplicação"
						@input="formatarMoeda('valor_aplicado')"></v-text-field>

					<v-text-field v-model="formulario.investimento_mensal" label="Investimento Mensal"
						@input="formatarMoeda('investimento_mensal')"></v-text-field>

					<v-text-field v-model="formulario.periodo" label="Prazo"></v-text-field>

					<v-select v-model="formulario.tipo_de_periodo" :items="['Meses', 'Anos']"
						label="Investindo por"></v-select>

					<v-select v-model="formulario.rentabilidade" :items="['Pré-fixado', 'Pós-fixado', 'IPCA+']"
						label="Tipo de Rentabilidade" @change="atualizarResumoRentabilidade"></v-select>

					<!-- Seleção específica para opções de cálculo -->
					<v-select v-if="formulario.rentabilidade === 'Pré-fixado' || formulario.rentabilidade === 'IPCA+'"
						v-model="formulario.tipo_calculo" :items="getTipoCalculoOptions()"
						label="Tipo de Cálculo"></v-select>

					<!-- Campo para a porcentagem de rentabilidade -->
					<v-text-field
						v-if="formulario.rentabilidade === 'Pré-fixado' || formulario.rentabilidade === 'IPCA+'"
						v-model="formulario.percentualRentabilidade" label="Percentual de Rentabilidade (%)"
						@input="validarPercentual"></v-text-field>

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
			tiposInvestimento: ['CDB', 'CDI', 'Debenture', 'LCI & LCA', 'Tesouro Selic', 'Poupança'],
			formulario: {
				tipo_investimento: '',
				valor_aplicado: '',
				investimento_mensal: '',
				periodo: '',
				tipo_de_periodo: '',
				rentabilidade: '',
				tipo_calculo: '',
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
		getTipoCalculoOptions() {
			if (this.formulario.rentabilidade === 'Pré-fixado') {
				return this.formulario.tipo_investimento === 'Tesouro Selic' ? ['Limitado (3% - 15%)'] : ['Normal'];
			} else if (this.formulario.rentabilidade === 'IPCA+') {
				return ['Com IPCA (2% - 10%)', 'Sem IPCA'];
			}
			return [];
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
				this.resumoRentabilidade = 'Título IPCA+ rendem de acordo com uma porcentagem do CDI. Faixa considerada: mínimo 2% e máximo 10%.';
			} else if (rentabilidade === 'Pré-fixado') {
				this.resumoRentabilidade = 'Investimentos pré-fixados têm uma taxa fixa conhecida no momento da aplicação. Para Tesouro Selic: faixa de 3% a 15%.';
			} else if (rentabilidade === 'Pós-fixado') {
				this.resumoRentabilidade = 'Investimentos pós-fixados têm sua rentabilidade atrelada a um indicador, como o CDI.';
			} else {
				this.resumoRentabilidade = '';
			}
		},
		simularInvestimento() {
			let valorAplicado = this.formulario.valor_aplicado_numerico;
			let investimentoMensal = this.formulario.investimento_mensal_numerico;
			let meses = this.formulario.tipo_de_periodo === 'Anos' ? parseInt(this.formulario.periodo) * 12 : parseInt(this.formulario.periodo);

			if (isNaN(valorAplicado) || isNaN(investimentoMensal) || isNaN(meses) || meses <= 0) {
				alert('Por favor, preencha todos os campos corretamente.');
				return;
			}

			// Continue com os cálculos
			this.totalInvestido = 0;
			this.rendimentoBruto = 0;

			if (this.formulario.rentabilidade === 'Pré-fixado') {
				this.calcularRendimentoPreFixado(valorAplicado, investimentoMensal, meses);
			} else if (this.formulario.rentabilidade === 'IPCA+') {
				this.calcularRendimentoIPCA(valorAplicado, investimentoMensal, meses);
			} else {
				this.calcularRendimentoPosFixado(valorAplicado, investimentoMensal, meses);
			}

			this.resultadoVisivel = true;
		},

		calcularRendimentoPreFixado(valorAplicado, investimentoMensal, meses) {
			let taxaAnual = 0.08;  // Exemplo: 8% ao ano
			const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;
			this.totalInvestido = valorAplicado;  // Inclui o valor inicial aplicado

			for (let i = 0; i < meses; i++) {
				valorAplicado = valorAplicado * (1 + taxaMensal) + investimentoMensal;
				this.totalInvestido += investimentoMensal;
			}

			this.valorTotalBruto = valorAplicado;
			this.rendimentoBruto = this.valorTotalBruto - this.totalInvestido;
		},
		calcularRendimentoIPCA(valorAplicado, investimentoMensal, meses) {
			let taxaAnual = 0.07; // Exemplo de taxa fixa para IPCA+
			let ipca = 0.05;  // IPCA de 5%

			const taxaCompostaAnual = (1 + taxaAnual) * (1 + ipca) - 1;
			const taxaMensal = Math.pow(1 + taxaCompostaAnual, 1 / 12) - 1;
			this.totalInvestido = valorAplicado;

			for (let i = 0; i < meses; i++) {
				valorAplicado = valorAplicado * (1 + taxaMensal) + investimentoMensal;
				this.totalInvestido += investimentoMensal;
			}

			this.valorTotalBruto = valorAplicado;
			this.rendimentoBruto = this.valorTotalBruto - this.totalInvestido;
		},
		calcularRendimentoPosFixado(valorAplicado, investimentoMensal, meses) {
			// Implementa a função para calcular pós-fixado (mantendo a lógica existente)
			let taxaMensal = 0.008; // Exemplo: 0.8% ao mês

			for (let i = 0; i < meses; i++) {
				valorAplicado = valorAplicado * (1 + taxaMensal) + investimentoMensal;
				this.totalInvestido += investimentoMensal;
			}

			this.valorTotalBruto = valorAplicado;
			this.rendimentoBruto = this.valorTotalBruto - (this.totalInvestido + this.formulario.valor_aplicado);
		},
		formatarMoeda(campo) {
			let valor = this.formulario[campo].toString().replace(/[^\d,-]/g, '');
			if (valor === '') valor = '0';
			let valorNumerico = parseFloat(valor.replace(',', '.'));  // Valor limpo para cálculos
			this.formulario[`${campo}_numerico`] = valorNumerico;  // Armazenar valor numérico separado

			this.formulario[campo] = (valorNumerico).toLocaleString('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			});
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