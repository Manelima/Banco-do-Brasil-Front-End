<template>
  <v-main>
   

   
    <v-text class="opera-text_saldo">Saldo Disponível </v-text>
    <v-text class="opera-text-ex"> R$ 1.000,00</v-text>
   
  
    <div class="opera-yellowline">
      Suas Operações
    </div>

    <v-container class="opera-container_main">

      <v-container class="opera-container_operacoes">

        <v-row>
          <v-col cols="3" class="opera-coluna_um">


            <div class="opera-item">
              <v-btn variant="text" class="opera-button_tipos" width="200" height="200" @click="dialogSaque = true">
                <v-img src="@/assets/saque.png" class="opera-img_saque" />

              </v-btn>
              <v-text class="opera-texto-desc-saque" @click="dialogSaque = true"> Saque </v-text>

            </div>
          </v-col>

          <v-col cols="3" class="opera-coluna_um">
            <div class="opera-item">
              <v-btn variant="text" class="opera-button_tipos" width="200" height="200" @click="dialogDeposito = true">
                <img src="@/assets/deposito.png" class="opera-img_deposito" />
              </v-btn>



              <v-text class="opera-texto-desc-deposito" @click="dialogDeposito = true"> Depósito </v-text>

            </div>
          </v-col>


          <v-col cols="3" class="opera-coluna_um">
            <div class="opera-item">
              <v-btn variant="text" class="opera-button_tipos" width="200" height="200"
                @click="dialogTransferencia = true">
                <img src="@/assets/transferencia.png" class="opera-img_transferencia" />
              </v-btn>


              <v-text class="opera-texto-desc-transf" @click="dialogTransferencia = true"> <b>Transferir para <br> usuário
                </b>
              </v-text>

            </div>
          </v-col>

          <v-col cols="3" class="opera-coluna_um">
            <div class="opera-item">

              <v-btn variant="text" class="opera-button_tipos" width="200" height="185" @click="dialogHistorico = true">
                <img src="@/assets/recibo.png" class="opera-img_historico" />
              </v-btn>

              <v-text @click="dialogHistorico = true" class="opera-texto-desc-historico"> Histórico de Movimentações
              </v-text>
            </div>
          </v-col>
        </v-row>

        <!-- Exibe o dialog baseado na operação selecionada -->
        <v-dialog v-model="dialogSaque">
          <template v-slot: default>
            <v-card class="opera-dialog_operacao_selecionada">

              <v-col> <img src="@/assets/oper_cash.png" class="opera-cash-icon">
                <v-card-title class="opera-title-operacao-selecionada-saque"> <b>Saque</b> </v-card-title>
              </v-col>

              <br>
              <v-card-text class="opera-cardtext-saldos">
                <b>
                  Saldo disponível: R$: 1.000<br>  {{ saldoDisponivel }}
                </b>

              </v-card-text>

              <v-card-text class="opera-cardtext-desac">
                <b>
                  Quanto deseja sacar?
                </b>

              </v-card-text>

              <v-form class="opera-form-textfield">


                <v-text-field label="" v-model="valorSaque" prefix="R$" type="number" outlined class="opera-textfield"
                  color="white"></v-text-field>
              </v-form>
              <br>
              <v-card-text class="opera-cardtext-saldos">
                <b>
                  Saldo após o saque:<br> R$ {{ saldoDisponivel }}
                </b>

              </v-card-text>
              <v-card-text class="opera-cardtext-desac">
                <b>
                  Deseja confirmar a operação?
                </b>
              </v-card-text>



              <v-card-actions class="justify-center">
                <v-btn @click="dialogSaque = false" class="opera-btn-confirm" outlined color="white"> NÃO </v-btn>
                <v-btn @click="confirmarSaque" class="opera-btn-confirm" outlined color="white"> SIM </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>

        <v-dialog v-model="dialogDeposito">
          <template v-slot:default>
            <v-card class="opera-dialog_operacao_selecionada">
              <v-col><img src="@/assets/oper_cash.png" class="opera-cash-icon">
                <v-card-title class="opera-title-operacao-selecionada-deposito">Depósito</v-card-title>
              </v-col>
              <v-spacer></v-spacer>
              <v-card-text class="opera-cardtext-saldos">
                <b>
                  Saldo disponível:  <br> R$ {{ saldoDisponivel }}
                </b>
              </v-card-text>

              <v-card-text class="opera-cardtext-desac">
                <b>
                  Quanto você deseja depositar?
                </b>
              </v-card-text>

              <v-form>
                <v-text-field label="" v-model="valorDeposito" prefix="R$" type="number" outlined class="opera-textfield"
                  color="white"></v-text-field>
              </v-form>

              <v-card-text class="opera-cardtext-saldos">
                <b>
                  Saldo após o depósito: <br>{{ saldoPosDeposito }}
                </b>
              </v-card-text>

              <v-card-text class="opera-cardtext-desac">
                <b>
                  Deseja confirmar essa operação?
                </b>
              </v-card-text>

              <v-card-actions class="justify-center">
                <v-btn @click="dialogDeposito = false" class="opera-btn-confirm" outlined color="white"> NÃO </v-btn>
                <v-btn @click="confirmarSaque" class="opera-btn-confirm" outlined color="white"> SIM </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>

        <v-dialog v-model="dialogTransferencia">
          <template v-slot:default>
            <v-card class="opera-dialog_operacao_selecionada">
              <v-col>

                <img src="@/assets/oper_cash.png" class="opera-cash-icon-transf">
                
              <v-card-title class="opera-title-operacao-selecionada-transferencia">
                  <b>Transferência</b></v-card-title>
              </v-col>
              <br>
              <v-card-text class="opera-cardtext-saldos">
                <b>
                  Saldo disponível:<br> R$ {{ saldoDisponivel }}
                </b>

              </v-card-text>

              <v-card-text class="opera-cardtext-saldos">
                <b>
                  Para quem deseja Transferir?
                </b>

              </v-card-text>
              <br>
              <v-form class="opera-form-textfield">
                <v-text-field label="Agência" v-model="contaDestino" outlined class="opera-textfield"
                  color="white"></v-text-field>
                <v-text-field label="Conta" v-model="valorTransferencia" prefix="R$" type="number" outlined
                  class="opera-textfield" color="white" min="0" max="saldoDisponivel"></v-text-field>
              </v-form>

              <v-card-text class="opera-cardtext-qnt">
                <b>
                  Quanto deseja transferir?
                </b>

              </v-card-text>
              <v-form class="opera-form-textfield">
                <v-text-field label="Valor" v-model="contaDestino" outlined class="opera-textfield" color="white"
                  ></v-text-field>
              </v-form>
              <v-card-text class="opera-cardtext-saldos">
                <b>
                  Saldo após a transferência: <br>R$ {{ saldoDisponivel - valorTransferencia }}
                </b>
              </v-card-text>

              <v-card-text class="opera-cardtext-desac">
                <b>
                  Deseja confirmar essa operação?
                </b>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn @click="dialogTransferencia = false" class="opera-btn-confirm" outlined color="white"> NÃO </v-btn>
                <v-btn @click="confirmarSaque" class="opera-btn-confirm" outlined color="white"> SIM </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>

        <v-dialog v-model="dialogHistorico">
          <template v-slot:default>
            <v-card class="opera-dialog_operacao_selecionada_hist">
              <img src="@/assets/oper_cash.png" class="opera-cash-icon-hist">
              <v-card-title class="opera-title-operacao-selecionada-hist"> <b>Histórico de Transações</b></v-card-title>
              <br>
              <v-card-text class="opera-cardtext-saldos-hist">
                <b>
                  Saldo atual:<br> R$ {{ saldoDisponivel }}
                </b>
              </v-card-text>
              <br>
              <v-card-text class="opera-cardtext-contacorrente">
                Conta corrente
              </v-card-text>

              <v-card-text>
                <v-data-table>
                  <thead>
                    <tr>
                      <th style="width: 10rem">Data</th>
                      <th style="width: 20rem">Transação</th>
                      <th style="width: 10rem">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(transacao, index) in historicoTransacoes" :key="index">
                      <td>{{ transacao.data }}</td>
                      <td>{{ transacao.tipo }}</td>
                      <td>R$ {{ transacao.valor }}</td>
                    </tr>
                  </tbody>
                </v-data-table>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>

      </v-container>
    
    </v-container>
  </v-main>
</template>

<script>

import "@/styles/opera.css";
import axios from 'axios';

export default {
  name: 'Operacoes',
  data() {
    return {
      idCliente: 1, // Atualize conforme necessário
      baseURL: 'https://sought-hare-ultimate.ngrok-free.app',
      saldoDisponivel: 0.0,
      valorSaque: 0.0,
      valorDeposito: 0.0,
      contaDestino: '',
      valorTransferencia: 0.0,
      historicoTransacoes: [{ 'data': '01/01/2001', 'tipo': 'teste', 'valor': 999.99 },],
      dialogSaque: false,
      dialogDeposito: false,
      dialogTransferencia: false,
      dialogHistorico: false,
    };
  },
  methods: {
    async carregarSaldo() {
      try {
        const response = await axios.get(`${this.baseURL}/cliente/${this.idCliente}/conta`);
        this.saldoDisponivel = response.data.saldo || 0.0;
      } catch (error) {
        console.error('Erro ao carregar saldo:', error);
      }
    },
    async confirmarSaque() {
      try {
        const response = await axios.post(`${this.baseURL}/cliente/${this.idCliente}/conta/saque`, {
          valor: this.valorSaque,
        });
        alert(response.data.mensagem || 'Saque realizado com sucesso!');
        this.carregarSaldo();
        this.valorSaque = 0;
        this.dialogSaque = false;
      } catch (error) {
        console.error('Erro ao realizar saque:', error);
      }
    },
    async confirmarDeposito() {
      try {
        const response = await axios.post(`${this.baseURL}/cliente/${this.idCliente}/conta/deposito`, {
          valor: this.valorDeposito,
        });
        alert(response.data.mensagem || 'Depósito realizado com sucesso!');
        this.carregarSaldo();
        this.valorDeposito = 0;
        this.dialogDeposito = false;
      } catch (error) {
        console.error('Erro ao realizar depósito:', error);
      }
    },
    async confirmarTransferencia() {
      try {
        const response = await axios.post(`${this.baseURL}/cliente/${this.idCliente}/conta/transferencia`,
          {
            valor: this.valorTransferencia,
            contaDestino: this.contaDestino,
          }
        );
        alert(response.data.mensagem || 'Transferência realizada com sucesso!');
        this.carregarSaldo();
        this.valorTransferencia = 0;
        this.contaDestino = '';
        this.dialogTransferencia = false;
      } catch (error) {
        console.error('Erro ao realizar transferência:', error);
      }
    },
    async carregarHistorico() {
      try {
        const response = await axios.get(`${this.baseURL}/cliente/${this.idCliente}/conta/historico`);
        this.historicoTransacoes = response.data.transacoes || [];
        this.dialogHistorico = true;
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      }
    },
    abrirDialog(operacao) {
      if (operacao === 'saque') this.dialogSaque = true;
      if (operacao === 'deposito') this.dialogDeposito = true;
      if (operacao === 'transferencia') this.dialogTransferencia = true;
      if (operacao === 'historico') this.dialogHistorico = true;
    },
  },
  mounted() {
    this.carregarSaldo();
  },
};
</script>