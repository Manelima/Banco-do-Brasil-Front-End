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

    <div class="opera-yellowline">Suas Operações</div>

    <v-container class="opera-container_main">
      
        
      
      <v-container class="opera-container_operacoes">
       
      
        <v-row>
          <div class="opera-div_operacoes">

          
          <v-col cols="1" class="opera-coluna_um mx-16">
         

            <div class="opera-item">

            
            <v-btn variant="text" class="opera-buttontipos" size="x-large" @click="selecionarOperacao('saque')">
              <img src="@/assets/saque.png" class="opera-img_saque" />
            </v-btn>
          
          <v-text class="opera-texto-desc-saque">  Saque  </v-text>
          </div>

          </v-col>

          <v-col cols="1" class="opera-coluna_um mx-16">
           <div class="opera-item">
              <v-btn variant="text" class="opera-buttontipos" size="x-large" @click="selecionarOperacao('deposito')">
              <img src="@/assets/deposito.png" class="opera-img_deposito" />
            </v-btn>

          
            
            <v-text class="opera-texto-desc-deposito"> Depósito </v-text>

           </div>
          </v-col>
          

          <v-col cols="1" class="opera-coluna_um mx-16">
            <div class="opera-item">

            

            
            <v-btn variant="text"class="opera-buttontipos" size="x-large" @click="selecionarOperacao('transferencia')">
              <img src="@/assets/transferencia.png" class="opera-img_transferencia" />
            </v-btn>


          <v-text class="opera-texto-desc-transf"> <strong>Transferir para usuário </strong>   </v-text>

          </div>
          </v-col>

          <v-col cols="1" class="opera-coluna_um mx-16">
          
          <div class="opera-item">
          
            
            <v-btn variant="text" class="opera-buttontipos" size="x-large" @click="selecionarOperacao('historico')">
              <img src="@/assets/recibo.png" class="opera-img_recibo" />
            </v-btn>


           <v-text class="opera-texto-desc-historico">  Histórico de Movimentações  </v-text>
          </div>
          </v-col>

        </div>
        </v-row>
      
        <!-- Exibe o card baseado na operação selecionada -->
        <v-card v-if="operacaoSelecionada === 'saque'" class="opera-card_operacao_selecionada">
           
          <v-card-title class="opera-title-operacao-selecionada"> <img src="@/assets/oper_cash.png" class="opera-cash.icon"><b>Saque</b></v-card-title>
          <v-card-text class="opera-cardtext-saque">
            Saldo Disponível: R$ {{ saldoDisponivel }}
          </v-card-text>

          <v-card-text class="opera-cardtext-saque">
            Quanto deseja sacar?
          </v-card-text>

           <v-card-text class="opera-cardtext-saque">
            <v-form>
              <v-text-field label="" v-model="valorSaque" prefix="R$" type="number" outlined class="opera-textfield-saque" color="white"></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-text class="opera-cardtext-saque">
            Saldo após o saque:
          </v-card-text>

          <v-card-text class="opera-cardtext-saque">
            Deseja confirmar essa operação?
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="cancelarSaque" class="opera-btn-saque" outlined color="white"> NÃO </v-btn>
            <v-btn @click="confirmarSaque" class="opera-btn-saque" outlined color="white"> SIM </v-btn>
          </v-card-actions>
        </v-card>

        <v-card v-if="operacaoSelecionada === 'transferencia'" class="opera-card_operacao_selecionada">
         
          <v-card-title class="opera-title-operacao-selecionada">  <img src="@/assets/oper_cash.png" class="opera-cash.icon"> Transferência</v-card-title>
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
          
          <v-card-title class="opera-title-operacao-selecionada"> <img src="@/assets/oper_cash.png" class="opera-cash.icon"> Depósito</v-card-title>
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
          
          <v-card-title class="opera-title-operacao-selecionada"> <img src="@/assets/oper_cash.png" class="opera-cash.icon">Histórico de Transações</v-card-title>
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
          <v-btn class="opera-texto-footer-priv">Minha privacidade</v-btn>
        </div>
        <div class="opera-footer-button-group">
          <img src="@/assets/help-circle-outline.svg" alt="Help" class="opera-help-footer" />
          <v-btn to="/blog" class="opera-texto-footer-help">Ajuda</v-btn>
        </div>
     </div>

     
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