<template>
  <v-app-bar class="opera-header">
    <v-img src="@/images/bb.png" class="opera-logo"></v-img>
    <div class="opera-linha_preta_vertical"></div>
    <v-app-bar-title class="opera-titulo_nav_bar">Banco do Brasil</v-app-bar-title>

    <v-btn to="/" class="opera-buttongeral mx-1">Home</v-btn>
    <v-btn to="/simul" class="opera-buttongeral mx-1">Simular Investimentos</v-btn>
    <v-btn to="/linhas" class="opera-buttongeral mx-1">Linhas</v-btn>
    <v-btn to="/blog" class="opera-buttongeral mx-1">Blog</v-btn>
  </v-app-bar>

  <v-main>
    <v-text class="opera-text_saldo">Saldo Disponível</v-text>

<<<<<<< HEAD
    <div class="opera-yellowline">
      Suas Operações
    </div>
=======
    <div class="opera-yellowline">Suas Operações</div>
>>>>>>> operacoes

    <v-container class="opera-container_main">

      <v-container class="opera-container_operacoes">

        <v-row>
          <v-col cols="3" class="opera-coluna_um">


<<<<<<< HEAD
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
              <v-btn variant="text" class="opera-button_tipos" width="200" height="200" @click="dialogTransferencia = true">
                <img src="@/assets/transferencia.png" class="opera-img_transferencia" />
              </v-btn>
         

              <v-text class="opera-texto-desc-transf"  @click="dialogTransferencia = true"> <b>Transferir para <br> usuário </b>
              </v-text>

            </div>
          </v-col>

          <v-col cols="3" class="opera-coluna_um">
            <div class="opera-item">

              <v-btn variant="text" class="opera-button_tipos" width="200" height="185" @click="dialogHistorico = true">
                <img src="@/assets/recibo.png" class="opera-img_historico" />
              </v-btn>

              <v-text @click="dialogHistorico = true" class="opera-texto-desc-historico"> Histórico de Movimentações </v-text>
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
                  Saldo disponível:<br> R$ {{ saldoDisponivel }}
                </b>

              </v-card-text>

              <v-card-text class="opera-cardtext-desac">
                <b>
                  Quanto deseja sacar?
                </b>

              </v-card-text>

              <v-form>
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
                  Saldo disponível:<br> R$ {{ saldoDisponivel }}
                </b>
              </v-card-text>

              <v-card-text class="opera-cardtext-desac">
                <b>
                  Quanto você deseja depositar?
                </b>
              </v-card-text>

              <v-form>
                <v-text-field label="" v-model="valorDeposito" prefix="R$" type="number" outlined
                  class="opera-textfield" color="white"></v-text-field>
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

              <v-card-text>
                <v-form class="opera-form-textfield">
                  <v-text-field label="Agência" v-model="contaDestino" outlined class="opera-textfield"
                    color="white"></v-text-field>
                  <v-text-field label="Conta" v-model="valorTransferencia" prefix="R$" type="number"
                    outlined class="opera-textfield" color="white"></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-text class="opera-cardtext-qnt">
                <b>
                  Quanto deseja transferir?
                </b>

              </v-card-text>
              <v-form class="opera-form-textfield">
                <v-text-field label="" v-model="contaDestino" outlined class="opera-textfield"
                  color="white"></v-text-field>
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
=======
            <!--             <div class="opera-item"> -->
            <v-row><v-btn variant="text" class="opera-button_tipos" width="200" height="200"
                @click="selecionarOperacao('saque')">
                <v-img src="@/assets/saque.png" class="opera-img_saque" />
              </v-btn>
            </v-row>
            <v-row>
              <v-text class="opera-texto-desc-saque"> Saque </v-text>
            </v-row>

            <!--             </div> -->
          </v-col>

          <v-col cols="3" class="opera-coluna_um">
<!--             <div class="opera-item"> -->
              <v-row>
                <v-btn variant="text" class="opera-button_tipos" width="200" height="200"
                  @click="selecionarOperacao('deposito')">
                  <img src="@/assets/deposito.png" class="opera-img_deposito" />
                </v-btn>
              </v-row>

              <v-row>
                <v-text class="opera-texto-desc-deposito"> Depósito </v-text>
              </v-row>
            <!-- </div> -->
          </v-col>


          <v-col cols="3" class="opera-coluna_um">
<!--             <div class="opera-item"> -->

              <v-row>
                <v-btn variant="text" class="opera-button_tipos" width="200" height="200"
                  @click="selecionarOperacao('transferencia')">
                  <img src="@/assets/transferencia.png" class="opera-img_transferencia" />
                </v-btn>
              </v-row>
              
              <v-row>
                <v-text class="opera-texto-desc-transf" width="90" height="30"> <strong>Transferir para usuário </strong>
                </v-text>
              </v-row>

<!--             </div> -->
          </v-col>

          <v-col cols="3" class="opera-coluna_um">

<!--             <div class="opera-item"> -->

            <v-row>
              <v-btn variant="text" class="opera-button_tipos" width="200" height="185"
                @click="selecionarOperacao('historico')">
                <img src="@/assets/recibo.png" class="opera-img_recibo" />
              </v-btn>
            </v-row>
            
            <v-row>
              <v-text class="opera-texto-desc-historico"> Histórico de Transações </v-text>
            </v-row>
            
            <!-- </div> -->
          </v-col>

        </v-row>

        <!-- Exibe o card baseado na operação selecionada -->

        <v-dialog v-if="operacaoSelecionada === 'saque'" class="opera-card_operacao_selecionada">

          <v-col> <img src="@/assets/oper_cash.png" class="opera-cash-icon">
            <v-card-title class="opera-title-operacao-selecionada-saque"> <b>Saque</b> </v-card-title>
          </v-col>

          <br>
          <v-card-text class="opera-cardtext_saldos">
            <b>
              Saldo disponível:<br> R$ {{ saldoDisponivel }}
            </b>

          </v-card-text>

          <v-card-text class="opera-cardtext-desac">
            <b>
              Quanto deseja sacar?
            </b>

          </v-card-text>

          <v-form>
            <v-text-field label="" v-model="valorSaque" prefix="R$" type="number" outlined class="opera-textfield"
              color="white"></v-text-field>
          </v-form>

          <v-card-text class="opera-cardtext_saldos">
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
            <v-btn @click="cancelarSaque" class="opera-btn-confirm" outlined color="white"> NÃO </v-btn>
            <v-btn @click="confirmarSaque" class="opera-btn-confirm" outlined color="white"> SIM </v-btn>
          </v-card-actions>
        </v-dialog>

        <v-dialog v-if="operacaoSelecionada === 'deposito'" class="opera-card_operacao_selecionada">

          <v-col><img src="@/assets/oper_cash.png" class="opera-cash-icon">
            <v-card-title class="opera-title-operacao-selecionada-deposito">Depósito</v-card-title></v-col>


          <v-spacer></v-spacer>
          <v-card-text class="opera-cardtext_saldos">
            <b>
              Saldo disponível:<br> R$ {{ saldoDisponivel }}
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

          <v-card-text class="opera-cardtext">
            <b>
              Saldo após o depósito: <br>{{ saldoPosDeposito }}
            </b>
          </v-card-text>

          <v-card-text class="opera-cardtext">
            <b>
              Deseja confirmar essa operação?
            </b>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn @click="cancelarSaque" class="opera-btn-confirm" outlined color="white"> NÃO </v-btn>
            <v-btn @click="confirmarSaque" class="opera-btn-confirm" outlined color="white"> SIM </v-btn>
          </v-card-actions>
        </v-dialog>

        <v-dialog v-if="operacaoSelecionada === 'transferencia'" class="opera-card_operacao_selecionada">

          <v-col>

            <img src="@/assets/oper_cash.png" class="opera-cash-icon-transf">

            <v-card-title class="opera-title-operacao-selecionada-transferencia"> <b>Transferência</b></v-card-title>
          </v-col>
          <v-card-text class="opera-cardtext_saldos">
            <b>
              Saldo disponível:<br> R$ {{ saldoDisponivel }}
            </b>

          </v-card-text>

          <v-card-text>
            <v-form class="opera-form-textfield">
              <v-text-field label="Conta de Destino" v-model="contaDestino" outlined class="opera-textfield"
                color="white"></v-text-field>
              <v-text-field label="Valor da Transferência" v-model="valorTransferencia" prefix="R$" type="number"
                outlined class="opera-textfield" color="white"></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-text class="opera-cardtext_qnt">
            <b>
              Quanto deseja Transferir?
            </b>

          </v-card-text>
          <v-form class="opera-form-textfield">
            <v-text-field label="" v-model="contaDestino" outlined class="opera-textfield" color="white"></v-text-field>
          </v-form>
          <v-card-text class="opera-cardtext">
            <b>
              Saldo após a transferência: R$ {{ saldoDisponivel - valorTransferencia }}
            </b>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn @click="cancelarSaque" class="opera-btn-confirm" outlined color="white"> NÃO </v-btn>
            <v-btn @click="confirmarSaque" class="opera-btn-confirm" outlined color="white"> SIM </v-btn>
          </v-card-actions>
        </v-dialog>

        <v-dialog v-if="operacaoSelecionada === 'historico'" class="opera-card_operacao_selecionada_hist">
          <img src="@/assets/oper_cash.png" class="opera-cash-icon-hist">
          <v-card-title class="opera-title-operacao-selecionada-hist"> <b>Histórico de Transações</b></v-card-title>
          <br>
          <v-card-text class="opera-cardtext-saldos-hist">
            <b>
              Saldo atual:<br> R$ {{ saldoDisponivel }}
            </b>
          </v-card-text>
          <v-card-text class="opera-cardtext-contacorrente">
            <b>
              Conta corrente
            </b>
          </v-card-text>
          <v-card-text>
            <v-data-table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Transação</th>
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
            </v-data-table>
          </v-card-text>
>>>>>>> operacoes
        </v-dialog>

      </v-container>
    </v-container>
  </v-main>


  <v-footer class="opera-footer">

    <div class="opera-footer-azul">
      <img src="@/assets/bb-yellow.png" alt="Logo Banco" class="bb-icon-opera" />
      <div class="opera-footer-column">


        <p class="p-title-text">Central de Relacionamento BB</p>
        <strong>
          <p class="p-sub-text">4004 0001 / 0800 729 0001</p>
        </strong>

        <br>

        <p class="p-title-text">Deficientes Auditivos/Fala</p>
        <strong>
          <p class="p-sub-text">0800 729 0088</p>
        </strong>
      </div>

      <div class="opera-footer-column2">

        <p class="p-title-text">SAC</p>
        <strong>
          <p class="p-sub-text">0800 729 0722</p>
        </strong>
        <br>
        <p class="p-title-text">WhatsApp</p>

        <strong>
          <p class="p-sub-text">61 4004 0001</p>
        </strong>

      </div>
      <div class="opera-footer-column3">
        <p class="p-title-text">Ouvidoria BB</p>
        <strong>
          <p class="p-sub-text">0800 729 5678</p>
        </strong>

        <br>
        <p class="p-title-text">Canal de Denúncias BB</p>

        <strong>
          <p class="p-sub-text">0800 300 4455</p>
        </strong>

      </div>

      <img class="acess-icon-opera" src="@/assets/acess.png" alt="acess-icon">

    </div>
    <div class="opera-footer-amarelo">
      <h3 class="opera-texto-footer-location">
        © Banco do Brasil S/A - CNPJ 00.000.000/0001-91 SAUN QD 5 LT
        <br>B, Asa Norte, Brasília-DF, Brasil - CEP 70040-911
      </h3>
    </div>

    <div class="opera-footer-links">
      <div class="opera-footer-button-group">
        <img src="@/assets/eye-outline.svg" alt="Eye" class="opera-eye-footer" />
<<<<<<< HEAD
        <v-btn variant="text" class="opera-texto-footer-priv">Minha privacidade</v-btn>
      </div>
      <div class="opera-footer-button-group">
        <img src="@/assets/help-circle-outline.svg" alt="Help" class="opera-help-footer" />
        <v-btn variant="text" to="/blog" class="opera-texto-footer-help">Ajuda</v-btn>
=======
        <v-btn class="opera-texto-footer-priv">Minha privacidade</v-btn>
      </div>
      <div class="opera-footer-button-group">
        <img src="@/assets/help-circle-outline.svg" alt="Help" class="opera-help-footer" />
        <v-btn to="/blog" class="opera-texto-footer-help">Ajuda</v-btn>
>>>>>>> operacoes
      </div>
    </div>


  </v-footer>

</template>

<script>
<<<<<<< HEAD

import "@/styles/opera.css";
import axios from 'axios';
=======
import "@/styles/opera.css";
>>>>>>> operacoes

export default {
  name: 'Operacoes',
  data() {
    return {
<<<<<<< HEAD
      idCliente: 1, // Atualize conforme necessário
      baseURL: 'https://sought-hare-ultimate.ngrok-free.app',
      saldoDisponivel: 0.0,
      valorSaque: 0.0,
      valorDeposito: 0.0,
      contaDestino: '',
      valorTransferencia: 0.0,
      historicoTransacoes: [{'data': '01/01/2001', 'tipo': 'teste', 'valor': 999.99},],
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
=======
      nomeDeUsuario: 'User_teste01',
      operacaoSelecionada: null,
      valorSaque: null,
      contaDestino: '',
      valorTransferencia: null,
      valorDeposito: null,
      saldoDisponivel: 0.00,
      valorDeposito: 0.00,
      historicoTransacoes: [
        { data: '10/10/2024', tipo: 'Depósito', valor: '500' },
        { data: '12/10/2024', tipo: 'Transferência', valor: '200' },
      ],
      saldoPosDeposito: this.saldoDisponivel + this.valorDeposito,
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
    },
>>>>>>> operacoes
  },
};
</script>