<template>
  <v-app-bar class="opera-header">
    <v-img src="@/images/bb.png" class="opera-logo"></v-img>
    <div class="opera-linha_preta_vertical"></div>
    <v-app-bar-title class="opera-titulo_nav_bar">Banco do Brasil</v-app-bar-title>

    <v-btn to="/" class="opera-buttongeral mx-1">Home</v-btn>
    <v-btn to="/simul" class="opera-buttongeral mx-1">Simulação</v-btn>
    <v-btn to="/linhas" class="opera-buttongeral mx-1">Linhas</v-btn>
    <v-btn to="/blog" class="opera-buttongeral mx-1">Blog</v-btn>
  </v-app-bar>

  <v-main>
    <v-container class="opera-container_main">
      <v-container class="opera-container_operacoes">
        <div class="opera-div_saudacao">Olá, {{nomeDeUsuario}}</div>

        <v-row>
          <v-col cols="4" class="opera-coluna_um mt-5">
            <v-btn class="opera-buttontipos d-flex justify-center align-center mb-5" size="x-large" @click="selecionarOperacao('saque')">
              Saque Móvel
            </v-btn>

            <v-btn class="opera-buttontipos d-flex justify-center align-center mb-5" size="x-large" @click="selecionarOperacao('transferencia')">
              Transferência
            </v-btn>
          </v-col>

          <v-col cols="4" class="opera-coluna_dois mt-5">
            <v-btn class="opera-buttontipos d-flex justify-center align-center mb-5" size="x-large" @click="selecionarOperacao('deposito')">
              Depósito
            </v-btn>

            <v-btn class="opera-buttontipos d-flex justify-center align-center mb-5" size="x-large" @click="selecionarOperacao('historico')">
              Histórico
            </v-btn>
          </v-col>
        </v-row>

        <!-- Exibe o card baseado na operação selecionada -->
        <v-card v-if="operacaoSelecionada === 'saque'" class="opera-card_operacao_selecionada">
          <v-card-title class="white--text">Saque Móvel</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Valor do Saque" v-model="valorSaque" prefix="R$" type="number" outlined class="white--text" color="white"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="confirmarSaque" class="white--text" outlined color="white"> Confirmar Saque </v-btn>
          </v-card-actions>
        </v-card>

        <v-card v-if="operacaoSelecionada === 'transferencia'" class="opera-card_operacao_selecionada">
          <v-card-title class="white--text">Transferência</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Conta de Destino" v-model="contaDestino" outlined class="white--text" color="white"></v-text-field>
              <v-text-field label="Valor da Transferência" v-model="valorTransferencia" prefix="R$" type="number" outlined class="white--text" color="white"></v-text-field>
            </v-form>
          </v-card-text>
            <v-card-actions>
              <v-btn @click="confirmarTransferencia" class="white--text" outlined color="white">
                Confirmar Transferência
              </v-btn>
            </v-card-actions>
        </v-card>


        <v-card v-if="operacaoSelecionada === 'deposito'" class="opera-card_operacao_selecionada">
          <v-card-title class="white--text">Depósito</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Valor do Depósito" v-model="valorDeposito" prefix="R$" type="number" outlined class="white--text" color="white"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="confirmarDeposito" class="white--text" outlined color="white">
              Confirmar Depósito
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card v-if="operacaoSelecionada === 'historico'" class="opera-card_operacao_selecionada">
          <v-card-title class="white--text">Histórico de Transações</v-card-title>
          <v-card-text>
            <v-simple-table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(transacao, index) in historicoTransacoes" :key="index">
                  <td>{{ transacao.data }}</td>
                  <td>{{ transacao.tipo }}</td>
                  <td>R$ {{ transacao.valor }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>

      </v-container>
    </v-container>
  </v-main>

  <v-footer app class="opera-footer">
    <v-col class="text-center texto_footer">© 2024 - Tropa do BB</v-col>
  </v-footer>
</template>

<script>
import "@/styles/opera.css";

export default {
  name: 'Operacoes',
  data() {
    return {
      nomeDeUsuario: 'User_teste01',
      operacaoSelecionada: null,
      valorSaque: null,
      contaDestino: '',
      valorTransferencia: null,
      valorDeposito: null,
      historicoTransacoes: [
        { data: '10/10/2024', tipo: 'Depósito', valor: '500' },
        { data: '12/10/2024', tipo: 'Transferência', valor: '200' },
      ],
    };
  },
  methods: {
    selecionarOperacao(operacao) {
      this.operacaoSelecionada = operacao; // Define a operação selecionada
    },
    confirmarSaque() {
      alert(`Saque de R$ ${this.valorSaque} realizado com sucesso!`);
      this.valorSaque = null;
    },
    confirmarTransferencia() {
      alert(`Transferência de R$ ${this.valorTransferencia} para a conta ${this.contaDestino} realizada com sucesso!`);
      this.contaDestino = '';
      this.valorTransferencia = null;
    },
    confirmarDeposito() {
      alert(`Depósito de R$ ${this.valorDeposito} realizado com sucesso!`);
      this.valorDeposito = null;
    }
  },
};
</script>
