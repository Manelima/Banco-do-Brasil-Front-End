<template>
  <v-main class="line-container-main">
    <v-container class="d-flex" fluid>
      <!-- Lado esquerdo: Imagem -->
      <v-col cols="6" class="line-lado_esquerdo"></v-col>

      <!-- Lado direito: Formulário e perguntas -->
      <v-col cols="6" class="line-lado_direito">
        <v-form class="line-form_def_linhas">
          <v-radio-group v-model="respostasSelecionadas['pergunta_' + perguntaAtual]" class="line-pergunta_form">
            <!-- Pergunta inicial -->
            <template v-if="perguntaAtual === 0">
              <h1 class="line-title-zero">
                <b> Quer saber quais são suas<br />principais linhas de <br />crédito?</b>
              </h1>

              <h2 class="line-subtitle-zero">
                O BB ajuda a encontrar a melhor solução para você. <br />
                Conheça as linhas de crédito pessoal, escolha a mais <br />
                adequada e realize seus sonhos.
              </h2>
            </template>

            <!-- Pergunta 1: O que você procura? -->
            <template v-if="perguntaAtual === 1">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>
                <v-col>
                  <h3 class="line-title-form mb-10">O que você precisa?</h3>
                </v-col>
              </v-row>

              <div class="line-div-form-ratio">
                <v-radio class="line-form_ratio" label="Dinheiro na conta para usar como eu quiser"
                  value="dinheiro_conta"></v-radio>

                <v-radio class="line-form_ratio" label="Financiamento para realizar meus sonhos"
                  value="financiamento_sonhos"></v-radio>

                <v-radio class="line-form_ratio" label="Quero renovar empréstimos que já possuo"
                  value="renovar_emprestimo"></v-radio>

                <v-radio class="line-form_ratio"
                  label="Fazer a portabilidade de um empréstimo de outro banco ou instituição financeira"
                  value="portabilidade"></v-radio>
              </div>
            </template>

            <!-- Resposta anterior(1): "Dinheiro na conta para usar como eu quiser" -->
            <template v-if="
              perguntaAtual === 2 &&
              respostasSelecionadas['pergunta_1'] === 'dinheiro_conta'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-bottom: 225px">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>

                <v-col style="padding-bottom: 120px">
                  <h3 class="line-title-form">
                    Você quer usar um imóvel ou veículo como garantia desse empréstimo?
                    Isso pode deixar sua taxa de juros mais baixa
                  </h3>
                </v-col>
              </v-row>

              <div class="line-div-form-ratio">
                <v-radio class="line-form_ratio" label="Sim, quero usar garantias e ter juros baixos"
                  value="com_garantia"></v-radio>
                <v-radio class="line-form_ratio" label="Não quero usar garantias" value="sem_garantia"></v-radio>
              </div>
            </template>

            <!-- Resposta anterior(2): "Não quero usar garantias" -->
            <template v-if="
              perguntaAtual === 3 &&
              respostasSelecionadas['pergunta_2'] === 'sem_garantia'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-bottom: 225px">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>

                <v-col style="padding-bottom: 70px">
                  <h3 class="line-title-form">
                    Você prefere pagar parcelas mensais(linhas CDC), ou tem algum valor a
                    receber no futuro(linhas de antecipação), para quitar o empréstimo?
                  </h3>
                </v-col>
              </v-row>

              <div class="line-div-form-ratio">
                <v-radio class="line-form_ratio" label="Antecipar valores sem precisar pagar parcelas mensais"
                  value="antecipar"></v-radio>
                <v-radio class="line-form_ratio" label="Crédito na hora com pagamento de parcelas mensais"
                  value="credito_hora"></v-radio>
              </div>
            </template>

            <!-- Resposta anterior(3): "Antecipar valores sem precisar pagar parcelas mensais" -->
            <template v-if="
              perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === 'antecipar'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-bottom: 135px">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>
                <v-col style="padding-bottom: 135px">
                  <h3 class="line-title-form">O que você pretende antecipar?</h3>
                </v-col>
              </v-row>

              <div class="line-div-form-ratio">
                <v-radio class="line-form_ratio" label="13º salário." value="antecipar-decimo-terceiro"></v-radio>
                <v-radio class="line-form_ratio" label="Restituição do IRPF." value="IRPF"></v-radio>
                <v-radio class="line-form_ratio" label="Saque aniversário do FGTS." value="FGTS"></v-radio>
              </div>
            </template>

            <!-- Resposta anterior(4): "13º salário." -->
            <template v-if="
              perguntaAtual === 5 &&
              respostasSelecionadas['pergunta_4'] === 'antecipar-decimo-terceiro' &&
              rotaPerguntas === 'antecipar-decimo-terceiro'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-bottom: 158px">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>
                <v-col style="padding-bottom: 150px">
                  <h3 class="line-title-form mb-12">Digite os valores:</h3>
                </v-col>
              </v-row>

              <h3 class="line-title-input">Valor do 13º salário.</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_5']" label=""
                type="number" min="1412" max="20000" step="0.01">
              </v-text-field>
              <h3 class="line-title-input">Qual será a data de recebimento do valor?</h3>
              <v-text-field class="line-textfield" v-model="respostasSelecionadas['pergunta_6']" label="" type="date"
                :min="minDate_13" :max="maxDate_13" @change="atualizarDataUS">
              </v-text-field>
            </template>
            <!-- ACIMA ESTÁ A ROTA DO 13º(FINALIZADA) -->

            <!-- Resposta anterior(4): "Restituição do IRPF." -->
            <template v-if="
              perguntaAtual === 5 &&
              respostasSelecionadas['pergunta_4'] === 'IRPF' &&
              rotaPerguntas === 'antecipar-irpf'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-bottom: 118px">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>
                <v-col style="padding-bottom: 120px">
                  <h3 class="line-title-form">Sobre o IRPF</h3>
                </v-col>
              </v-row>
              <div class="line-div-form-ratio"></div>
              <h3 class="line-title-input">Quanto você vai receber?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_5']" label=""
                type="number" min="1911" max="50000" step="0.01">
              </v-text-field>

              <h3 class="line-title-input">Qual será a data de recebimento do valor?</h3>
              <v-text-field class="line-textfield" v-model="respostasSelecionadas['pergunta_5']" label="" type="date"
                :min="minDate_IRPF" :max="maxDate_IRPF" @change="atualizarDataUS">
              </v-text-field>
            </template>
            <!-- ACIMA ESTÁ A ROTA DO IRPF(FINALIZADA) -->

            <!-- Resposta anterior(4): "Saque aniversário do FGTS." -->
            <template v-if="
              perguntaAtual === 5 &&
              respostasSelecionadas['pergunta_4'] === 'FGTS' &&
              rotaPerguntas === 'antecipar-fgts'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-bottom: 317px">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>
                <v-col style="padding-bottom: 320px">
                  <h3 class="line-title-form">O que você precisa?</h3>
                </v-col>
              </v-row>

              <h3 class="line-title-input">Quanto você tem de saldo no FGTS?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_5']" label=""
                type="number" min="500" max="50000" step="0.01">
              </v-text-field>
            </template>
            <!-- ACIMA ESTÁ A ROTA DO FGTS(FINALIZADA) -->

            <!-- Resposta anterior(3): Crédito na hora com pagamento de parcelas mensais -->

            <template v-if="
              perguntaAtual === 4 &&
              respostasSelecionadas['pergunta_3'] === 'credito_hora'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-top: 45px">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>

                <v-col style="padding-top: 40px">
                  <h3 class="line-title-form">Escolha uma das seguintes opções</h3>
                </v-col>
              </v-row>
              <div class="line-div-form-ratio">
                <v-radio class="line-form_ratio"
                  label="Crédito Salário para quem recebe o salário no BB e tem conta corrente ativa(possui melhores taxas e prazos)"
                  value="credito-salario"></v-radio>
                <v-radio class="line-form_ratio"
                  label="Crédito Benefício para aposentados ou pensionistas do INSS que recebem o benefício na conta corrente do BB(com taxas de juros atraticas)"
                  value="credito-beneficio"></v-radio>
                <v-radio class="line-form_ratio"
                  label="Empréstimo Automático, opção ideal para quem precisa de dinheiro para emergências, colocar as contas em dia ou usar como quiser"
                  value="credito-automatico"></v-radio>
              </div>
            </template>

            <!-- Resposta anterior(4): Crédito Salário para quem recebe o salário no bb... -->
            <template v-if="
              perguntaAtual === 5 &&
              respostasSelecionadas['pergunta_4'] === 'credito-salario'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-bottom: 252px">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>
                <v-col style="padding-bottom: 210px">
                  <h3 class="line-title-form mt-0">Quanto você precisa?</h3>
                </v-col>
              </v-row>

              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_5']" label=""
                type="number">
              </v-text-field>

              <h3 class="line-title-form" style="padding-left: 90px;">Em quantas parcelas você deseja pagar?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_5']" label=""
                type="number" min="1" max="72" step="1"></v-text-field>
            </template>
            <!-- ACIMA ESTÁ A ROTA DO credito-salario(FINALIZADA) -->

            <!-- Resposta anterior(4): Crédito Benefício para aposentados ou pensionistas... -->
            <template v-if="
              perguntaAtual === 5 &&
              respostasSelecionadas['pergunta_4'] === 'credito-beneficio'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-bottom: 105px">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>
                <v-col style="padding-bottom: 100px;">
                  <h3 class="line-title-form mb-12">Qual o valor do benefício?</h3>
                </v-col>
              </v-row>

              <h3 class="line-title-form" style="padding-left: 90px;"> Valor do Benefício: </h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_5']" label=""
                type="number">
                <!-- definir :min e :max desse -->
              </v-text-field>

              <h3 class="line-title-form" style="padding-left: 90px;">Em quantas parcelas você deseja pagar?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_5']" label=""
                type="number" min="1" max="72" step="1"></v-text-field>
            </template>
            <!-- ACIMA ESTÁ A ROTA DO credito-beneficio(FINALIZADA) -->

            <!-- Resposta anterior(4): Empréstimo Automático, opção ideal para quem... -->
            <template v-if="
              perguntaAtual === 5 &&
              respostasSelecionadas['pergunta_4'] === 'credito-automatico'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-bottom: 250px">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>
                <v-col style="padding-bottom: 240px">
                  <h3 class="line-title-form mb-12">Qual o valor do empréstimo?</h3>
                </v-col>
              </v-row>

              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_5']" label="Valor"
                type="number">
                <!-- definir :min e :max desse -->
              </v-text-field>

              <h3 class="line-title-form">Em quantas parcelas você deseja pagar?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_6']" label="Parcelas"
                type="number" min="1" max="72" step="1"></v-text-field>
            </template>
            <!-- ACIMA ESTÁ A ROTA DO credito-automatico(FINALIZADA) -->

            <!-- Resposta anterior(2): "Sim, quero usar garantias e ter juros baixos" -->
            <template v-if="
              perguntaAtual === 3 &&
              respostasSelecionadas['pergunta_2'] === 'com_garantia'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-bottom: 103px">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>

                <v-col>
                  <h3 class="line-title-form" style="padding-bottom: 92px">
                    O que você deseja usar como garantia?
                  </h3>
                </v-col>
              </v-row>
              <div class="line-div-form-ratio">
                <v-radio class="line-form_ratio" label="Imóvel" value="garantia-imovel"></v-radio>
                <v-radio class="line-form_ratio" label="Veículo" value="garantia-veiculo"></v-radio>
                <v-radio class="line-form_ratio"
                  label="Investimentos(Poupança, Fundos de Renda Fixa, CDB, LCA e Planos de Previdência Privada BrasilPrev)"
                  value="garantia-investimento"></v-radio>
              </div>
            </template>

            <!-- Resposta anterior(3): "Imóvel" -->
            <template v-if="
              perguntaAtual === 4 &&
              respostasSelecionadas['pergunta_3'] === 'garantia-imovel'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-top: 32px; padding-left: 50px">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>

                <v-col style="padding-top: 31px">
                  <h3 class="line-title-form">O que você precisa?</h3>
                </v-col>
              </v-row>

              <h3 class="line-title-input">Qual é o valor do imóvel ?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_4']"
                label="" type="number" min="35000" max="5000000" step="0.01"></v-text-field>

              <h3 class="line-title-input">Quanto você deseja ?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_5']"
                label="" type="number" min="0" step="0.01"></v-text-field>

              <h3 class="line-title-input">Em quantas parcelas você deseja?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_6']" label=""
                type="number" min="0" step="0.01"></v-text-field>
            </template>
            <!-- ACIMA ESTÁ A ROTA DO garantia-imovel -->

            <!-- Resposta anterior(3): "Veículo" -->
            <template v-if="
              perguntaAtual === 4 &&
              respostasSelecionadas['pergunta_3'] === 'garantia-veiculo'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-top: 31px">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>

                <v-col style="padding-top: 30px">
                  <h3 class="line-title-form">O que você precisa?</h3>
                </v-col>
              </v-row>
              <h3 class="line-title-input">Qual é o valor do veículo?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_4']"
                label="" type="number" min="10000" max="1000000" step="0.01"></v-text-field>

              <h3 class="line-title-input">Quanto você deseja ?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_5']"
                label="" type="number" min="0" step="0.01"></v-text-field>

              <h3 class="line-title-input">Em quantas parcelas você deseja?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_6']" label=""
                type="number" min="0" step="0.01"></v-text-field>
            </template>
            <!-- ACIMA ESTÁ A ROTA DO garantia-veiculo -->

            <!-- Resposta anterior(3): "Investimentos" -->
            <template v-if="
              perguntaAtual === 4 &&
              respostasSelecionadas['pergunta_3'] === 'garantia-investimento'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-top: 31px">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>

                <v-col style="padding-top: 30px">
                  <h3 class="line-title-form">O que você precisa?</h3>
                </v-col>
              </v-row>

              <h3 class="line-title-input">Valor dos investimentos</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_4']" label=""
                type="number" min="10000" max="10000000" step="0.01"></v-text-field>

              <h3 class="line-title-input">Qual o valor do empréstimo?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_5']" label=""
                type="number" min="0" step="0.01"></v-text-field>

              <h3 class="line-title-input">Em quantas parcelas você deseja?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_6']" label=""
                type="number" min="0" step="0.01"></v-text-field>
            </template>
            <!-- ACIMA ESTÁ A ROTA DO garantia-investimento -->

            <!-- Resposta anterior(1): "Financiamentos para realizar meus sonhos" -->
            <template v-if="
              perguntaAtual === 2 &&
              respostasSelecionadas['pergunta_1'] === 'financiamento_sonhos'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-bottom: 316px">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>
                <v-col style="padding-bottom: 218px">
                  <h3 class="line-title-form">
                    Possuímos vários tipos de financiamento, desde os tradicionais até os
                    mais diversos, para oferecer exatamente o que você procura
                  </h3>
                </v-col>
              </v-row>

              <v-radio class="line-form_ratio" label="Eu quero os clássicos, imobiliário e veículos"
                value="classicos"></v-radio>
              <v-radio class="line-form_ratio" label="Procuro algo que só o BB possui" value="diferenciado"></v-radio>
            </template>

            <!-- Resposta anterior (2): "Eu quero os clássicos, imobiliário e veículos" -->
            <template v-if="
              perguntaAtual === 3 && respostasSelecionadas['pergunta_2'] === 'classicos'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-bottom: 135px">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>

                <v-col style="padding-bottom: 140px">
                  <h3 class="line-title-form">Escolha dentre as opções a seguir:</h3>
                </v-col>
              </v-row>
              <div class="line-div-form-ratio">
                <v-radio class="line-form_ratio" label="Financiamento imobiliário"
                  value="financiamento_imobiliario"></v-radio>
                <v-radio class="line-form_ratio" label="Financiamento carro" value="financiamento_carro"></v-radio>
                <v-radio class="line-form_ratio" label="Financiamento moto" value="financiamento_moto"></v-radio>
              </div>
            </template>

            <!-- Resposta anterior(3): "Financiamento Imobiliário" -->
            <template v-if="
              perguntaAtual === 4 &&
              respostasSelecionadas['pergunta_3'] === 'financiamento_imobiliario'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-top: 30px;">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>

                <v-col style="padding-top: 20px;">
                  <h3 class="line-title-form">Qual o valor do Imovél?</h3>
                </v-col>
              </v-row>
              <div class="line-div-form-ratio">
                <h3 class="line-title-input">Valor do imóvel</h3>
                <v-text-field class="line-textfield" v-model="respostasSelecionadas['pergunta_4']" label=""
                  type="number" min="20000" max="5000000" step="0.01">
                </v-text-field>

                <h3 class="line-title-input">Em quantas parcelas você deseja pagar?</h3>
                <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_5']" label=""
                  type="number" min="15" step="420"></v-text-field>
              </div>
            </template>
            <!-- ACIMA ESTÁ A ROTA DO FINANCIAMENTO_IMOBILIARIO(FINALIZADA) -->

            <!-- Resposta anterior(3): "Financiamento Carro" -->
            <template v-if="
              perguntaAtual === 4 &&
              respostasSelecionadas['pergunta_3'] === 'financiamento_carro'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-bottom: 158px">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>

                <v-col style="padding-bottom: 160px">
                  <h3 class="line-title-form">O que você precisa?</h3>
                </v-col>
              </v-row>

              <h3 class="line-title-input">Valor do carro</h3>
              <v-text-field class="line-textfield" v-model="respostasSelecionadas['pergunta_4']" label="" type="number"
                min="20000" max="500000" step="0.01">
              </v-text-field>

              <h3 class="line-title-input">Em quantas parcelas você deseja pagar?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_5']" label=""
                type="number" min="5" max="36" step="1"></v-text-field>
            </template>
            <!-- ACIMA ESTÁ A ROTA DO FINANCIAMENTO_CARRO(FINALIZADA) -->

            <!-- Resposta anterior(3): "Financiamento Moto" -->
            <template v-if="
              perguntaAtual === 4 &&
              respostasSelecionadas['pergunta_3'] === 'financiamento_moto'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left:50px; padding-bottom: 158px;">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>
                <v-col style="padding-bottom: 160px">
                  <h3 class="line-title-form">Qual o valor da Moto?</h3>
                </v-col>
              </v-row>

              <h3 class="line-title-input">Valor:</h3>
              <v-text-field class="line-textfield" v-model="respostasSelecionadas['pergunta_4']" label="" type="number"
                min="10000" max="100000" step="0.01">
              </v-text-field>

              <h3 class="line-title-input">Em quantas parcelas você deseja pagar?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_5']" label=""
                type="number" min="5" max="36" step="1"></v-text-field>
            </template>
            <!-- ACIMA ESTÁ A ROTA DO FINANCIAMENTO_MOTO(FINALIZADA) -->

            <!-- Resposta anterior(2): "Procuro algo diferenciado que só o BB possui" -->
            <template v-if="
              perguntaAtual === 3 &&
              respostasSelecionadas['pergunta_2'] === 'diferenciado'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-top: 200px">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3" />
                </v-col>

                <v-col style="padding-top: 200px">
                  <h3 class="line-title-form">Escolha entre as opções a seguir:</h3>
                </v-col>
              </v-row>

              <div class="line-div-form-ratio">
                <v-radio class="line-form_ratio"
                  label="Crédito Mobilidade (financie itens direcionados à mobilidade como: bicicletas, patinetes, scooters elétricos ou mecânicos e motos abaixo de 125 cc.)"
                  value="credito-mobilidade"></v-radio>
                <v-radio class="line-form_ratio"
                  label="Crédito Realiza (você pode financiar tudo o que precisa, eletrônicas, itens pessoais, serviços, viagens e muitos mais)"
                  value="credito-realiza"></v-radio>
                <v-radio class="line-form_ratio"
                  label="Crédito Energia Renovável (financie sistemas voltaicos que captam a luz do sol durante o dia e a convertem a fim de gerar energia solar residencial)"
                  value="credito-energia-renovavel"></v-radio>
                <v-radio class="line-form_ratio"
                  label="Bens e serviços para PCDs (Financia cadeiras de rodas, aparelhos auditivos, órteses, próteses, andadores, entre outro produtos de tecnologia assistiva)"
                  value="bens-servicos-pcd"></v-radio>
              </div>
            </template>

            <!-- Respota anterior(3): "Crédito mobilidade" -->
            <template v-if="
              perguntaAtual === 4 &&
              respostasSelecionadas['pergunta_3'] === 'credito-mobilidade'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-bottom: 158px;">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3" />
                </v-col>

                <v-col style="padding-bottom:155px;">
                  <h3 class="line-title-form">
                    Qual o valor do item que deseja financiar?
                  </h3>
                </v-col>
              </v-row>
              <h3 class="line-title-input">Qual o valor do item?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_4']" label=""
                type="number" min="500" max="50000" step="0.01"></v-text-field>

              <h3 class="line-title-input">Em quantas parcelas você deseja pagar ?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_5']" label=""
                type="number" min="1" max="60" step="1"></v-text-field>
            </template>
            <!-- ACIMA ESTÁ A ROTA DO credito-mobilidade(FINALIZADA) -->

            <!-- Resposta anterior(3): "Crédito realiza" -->
            <template v-if="
              perguntaAtual === 4 &&
              respostasSelecionadas['pergunta_3'] === 'credito-realiza'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto" style="padding-left: 50px; padding-bottom: 158px;">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>
                <v-col style="padding-bottom:155px;">
                  <h3 class="line-title-form">
                    Qual o valor do item ou serviço que deseja financiar?
                  </h3>
                </v-col>
              </v-row>

              <h3 class="line-title-input">Valor do item/serviço</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_4']" label=""
                type="number" min="100" max="50000" step="0.01"></v-text-field>

              <h3 class="line-title-input">Qual o valor do item que deseja financiar?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_5']"
                label="Quantidade de parcelas" type="number" min="1" max="60" step="1"></v-text-field>
            </template>
            <!-- ACIMA ESTÁ A ROTA DO credito-realiza(FINALIZADA) -->

            <!-- Resposta anterior(3): "Crédito energia renovável" -->
            <template v-if="
              perguntaAtual === 4 &&
              respostasSelecionadas['pergunta_3'] === 'credito-energia-renovavel'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>
                <v-col>
                  <h3 class="line-title-form">
                    Qual o valor do item que deseja financiar?
                  </h3>
                </v-col>
              </v-row>

              <h3 class="line-title-input">Qual o valor do item?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_4']" label=""
                type="number" min="2000" max="100000" step="0.01"></v-text-field>

              <h3 class="line-title-input">Em quantas parcelas você deseja pagar?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_5']" label=""
                type="number" min="2" max="96" step="1"></v-text-field>
            </template>
            <!-- ACIMA ESTÁ A ROTA DO credito-energia-renovavel(FINALIZADA) -->

            <!-- Resposta anterior(3): "Bens e serviços para PCDs -->
            <template v-if="
              perguntaAtual === 4 &&
              respostasSelecionadas['pergunta_3'] === 'bens-servicos-pcd'
            ">
              <v-row class="line-title-container">
                <v-col cols="auto">
                  <img src="@/assets/seta-esquerda-azul.png" @click="perguntaAnterior" class="arrow-left-svg-3"
                    alt="seta esquerda" />
                </v-col>
                <v-col>
                  <h3 class="line-title-form">
                    Qual o valor do item/serviço que deseja financiar?
                  </h3>
                </v-col>
              </v-row>

              <h3 class="line-title-input">Valor do item/serviço</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_4']" label=""
                type="number" min="70" max="30000" step="0.01"></v-text-field>

              <h3 class="line-title-input">Em quantas parcelas você deseja pagar?</h3>
              <v-text-field class="line-textfield" v-model.number="respostasSelecionadas['pergunta_5']" label=""
                type="number" min="2" max="60" step="1"></v-text-field>
            </template>
            <!-- ACIMA ESTÁ A ROTA DOS bens-servicos-pcd -->
          </v-radio-group>

          <!-- Botões de navegação -->
          <v-row>
            <v-col cols="6">
              <v-btn class="line-buttonbeforeafter" v-if="perguntaAtual === 0" @click="proximaPergunta">Começar
                <img src="@/assets/arrow-right-blue.svg" alt="seta direita" class="arrow-right-svg" /></v-btn>
            </v-col>
            <v-col cols="6" class="text-right" style="padding-right: 75px">
              <v-btn class="line-buttonbeforeafter" v-if="fimDaRota === false && perguntaAtual !== 0"
                @click="proximaPergunta">AVANÇAR
                <img src="@/assets/arrow-right-blue.svg" alt="seta direita" class="arrow-right-svg" /></v-btn>
              <v-btn class="line-buttonbeforeafter" v-if="fimDaRota === true && perguntaAtual !== 0" :disabled="!fimDaRota || !respostasSelecionadas['pergunta_' + perguntaAtual]
                " @click="enviarResposta">Finalizar
                <img src="@/assets/arrow-right-blue.svg" alt="seta direita" class="arrow-right-svg" /></v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>

      <v-alert type="success" v-if="mostrarResultados">
        Suas respostas foram enviadas! Confira abaixo as linhas de crédito recomendadas
        para você:
      </v-alert>

      <!-- Exibir as opções de crédito recomendadas -->
      <v-container v-if="mostrarResultados" class="line-container_resultados">
        <h3 class="line-title-form">Linhas de Crédito Recomendadas:</h3>
        <v-list>
          <v-list-item v-for="linha in linhasRecomendadas" :key="linha">
            <v-list-item-content>{{ linha }}</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-container>
  </v-main>

</template>

<script>
import "@/styles/line.css";
import "@/styles/reset.css";

import axios from "axios";

export default {
  data() {
    return {
      perguntaAtual: 0,
      totalDePerguntas: 0,
      respostasSelecionadas: { pergunta_0: "Este índice não possui alternativas!" }, // Agora é um objeto(o valor pré-estabelecido serve apenas para não provocar retorno 'undefined' ao averiguar os console.logs)
      mostrarResultados: false,
      linhasRecomendadas: [],
      verificacao: this.perguntaAtual < this.totalDePerguntas,
      menu: false, // controla a abertura do calendário
      rotaPerguntas: "",
      fimDaRota: false,
      minDate_13: "2024-11-01",
      maxDate_13: "2024-12-31",
      minDate_IRPF: "",
      maxDate_IRPF: "",
      dataExportada: null,
    };
  },
  methods: {
    // Adicionada a nova função para definir intervalo de datas
    atualizarIntervaloDatas() {
      const hoje = new Date();
      const diaSeguinte = new Date(hoje);
      diaSeguinte.setDate(hoje.getDate() + 1);

      const fimDoAno = new Date(hoje.getFullYear(), 11, 31); // Mês 11 é dezembro (baseado em zero)

      const formatarData = (data) => {
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const dia = String(data.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
      };

      this.minDate_IRPF = formatarData(diaSeguinte);
      this.maxDate_IRPF = formatarData(fimDoAno);
    },
    definirRotaETotalDePerguntas() {
      if (this.respostasSelecionadas["pergunta_4"] === "antecipar-decimo-terceiro") {
        this.rotaPerguntas = "antecipar-decimo-terceiro";
        this.totalDePerguntas = 5;
      } else if (this.respostasSelecionadas["pergunta_4"] === "IRPF") {
        this.rotaPerguntas = "antecipar-irpf";
        this.totalDePerguntas = 5;
      } else if (this.respostasSelecionadas["pergunta_4"] === "FGTS") {
        this.rotaPerguntas = "antecipar-fgts";
        this.totalDePerguntas = 5;
      } else if (this.respostasSelecionadas["pergunta_4"] === "credito-salario") {
        this.rotaPerguntas = "credito-salario";
        this.totalDePerguntas = 5;
      } else if (this.respostasSelecionadas["pergunta_4"] === "credito-beneficio") {
        this.rotaPerguntas = "credito-beneficio";
        this.totalDePerguntas = 5;
      } else if (this.respostasSelecionadas["pergunta_4"] === "credito-automatico") {
        this.rotaPerguntas = "credito-automatico";
        this.totalDePerguntas = 5;
      } else if (this.respostasSelecionadas["pergunta_3"] === "garantia-imovel") {
        this.rotaPerguntas = "garantia-imovel";
        this.totalDePerguntas = 4;
      } else if (this.respostasSelecionadas["pergunta_3"] === "garantia-veiculo") {
        this.rotaPerguntas = "garantia-veiculo";
        this.totalDePerguntas = 4;
      } else if (this.respostasSelecionadas["pergunta_3"] === "garantia-investimento") {
        this.rotaPerguntas = "garantia-investimento";
        this.totalDePerguntas = 4;
      } else if (this.respostasSelecionadas["pergunta_3"] === "financiamento_imobiliario") {
        this.rotaPerguntas = "financiamento_imobiliario";
        this.totalDePerguntas = 4;
      } else if (this.respostasSelecionadas["pergunta_3"] === "financiamento_carro") {
        this.rotaPerguntas = "financiamento_carro";
        this.totalDePerguntas = 4;
      } else if (this.respostasSelecionadas["pergunta_3"] === "financiamento_moto") {
        this.rotaPerguntas = "financiamento_moto";
        this.totalDePerguntas = 4;
      } else if (this.respostasSelecionadas["pergunta_3"] === "credito-mobilidade") {
        this.rotaPerguntas = "credito-mobilidade";
        this.totalDePerguntas = 4;
      } else if (this.respostasSelecionadas["pergunta_3"] === "credito-realiza") {
        this.rotaPerguntas = "credito-realiza";
        this.totalDePerguntas = 4;
      } else if (this.respostasSelecionadas["pergunta_3"] === "credito-energia-renovavel") {
        this.rotaPerguntas = "credito-energia-renovavel";
        this.totalDePerguntas = 4;
      } else if (this.respostasSelecionadas["pergunta_3"] === "bens-servicos-pcd") {
        this.rotaPerguntas = "bens-servicos-pcd";
        this.totalDePerguntas = 4;
      } else if (this.respostasSelecionadas["pergunta_1"] === "renovar_emprestimo") {
        this.rotaPerguntas = "renovar_emprestimo";
        this.totalDePerguntas = 1;
      } else if (this.respostasSelecionadas["pergunta_1"] === "portabilidade") {
        this.rotaPerguntas = "portabilidade";
        this.totalDePerguntas = 1;
      }
    },
    definirFimDaRota() {
      if (this.perguntaAtual === this.totalDePerguntas) {
        this.fimDaRota = true;
      }
      console.log("O usuário chegou no fim da rota? " + this.fimDaRota);
      console.log("Pergunta atual: " + this.perguntaAtual);
      console.log("Total de perguntas: " + this.totalDePerguntas);
    },
    proximaPergunta() {
      console.log(
        "Resposta da pergunta atual(" +
        this.perguntaAtual +
        "):" +
        this.respostasSelecionadas["pergunta_" + this.perguntaAtual]
      );

      this.definirRotaETotalDePerguntas();

      this.perguntaAtual++;

      if (this.rotaPerguntas !== "") {
        console.log(
          "Rota atual: " +
          this.rotaPerguntas +
          " e total de perguntas: " +
          this.totalDePerguntas
        );
      }
      this.definirFimDaRota();
    },
    perguntaAnterior() {
      this.respostasSelecionadas["pergunta_" + this.perguntaAtual] = null;
      this.fimDaRota = false;
      if (this.perguntaAtual > 0) {
        this.perguntaAtual--;
      }
    },
    converterDataInputToDataUS(dataInput) {
      // Verifica se a entrada está no formato esperado
      if (dataInput && /^\d{2}-\d{2}-\d{4}$/.test(dataInput)) {
        // Divide a data no formato dd-mm-yyyy
        const [dia, mes, ano] = dataInput.split("-");
        // Retorna no formato yyyy-mm-dd
        return `${ano}-${mes}-${dia}`;
      }
      // Retorna null ou lança um erro se o formato estiver incorreto
      console.error("Formato de data inválido. Esperado: dd-mm-yyyy");
      return null;
    },
    atualizarDataUS() {
      if (this.rotaPerguntas === "antecipar-irpf") {
        const dataFormatada = this.converterDataInputToDataUS(
          this.respostasSelecionadas["resposta_5"]
        );
        if (dataFormatada) {
          this.respostasSelecionadas["resposta_5"] = dataFormatada;
        }
      } else if (this.rotaPerguntas === "antecipar-decimo-terceiro") {
        const dataFormatada = this.converterDataInputToDataUS(
          this.respostasSelecionadas["resposta_6"]
        );
        if (dataFormatada) {
          this.respostasSelecionadas["resposta_6"] = dataFormatada;
        }
      }
    },
    
    async enviarResposta() {
      try {
        const token = localStorage.getItem('token');        
        let dataParaAPI = null;
        let valorParaAPI = null;
        let custoParaAPI = null;
        let parcelasParaAPI = null;
        let tipo = this.rotaPerguntas;

        //bloco condicional referenciando os campos de data
        if (this.rotaPerguntas === "antecipar-irpf") {
          dataParaAPI = this.respostasSelecionadas["resposta_5"];
        } else if (this.rotaPerguntas === "antecipar-decimo-terceiro") {
          dataParaAPI = this.respostasSelecionadas["resposta_6"];
        }
        //bloco condicional referenciando os campos de custo(ex: bens usados como garantia)
        if (this.rotaPerguntas === "garantia-imovel") {
          custoParaAPI = this.respostasSelecionadas["resposta_4"];
        } else if (this.rotaPerguntas === "garantia-veiculo") {
          custoParaAPI = this.respostasSelecionadas["resposta_4"];
        } else if (this.rotaPerguntas === "garantia-investimento") {
          custoParaAPI = this.respostasSelecionadas["resposta_4"];
        } else if (this.rotaPerguntas === "financiamento-imobiliario") {
          custoParaAPI = this.respostasSelecionadas["resposta_4"];
        } else if (this.rotaPerguntas === "financiamento-carro") {
          custoParaAPI = this.respostasSelecionadas["resposta_4"];
        } else if (this.rotaPerguntas === "financiamento-moto") {
          custoParaAPI = this.respostasSelecionadas["resposta_4"];
        } else if (this.rotaPerguntas === "credito-mobilidade") {
          custoParaAPI = this.respostasSelecionadas["resposta_3"];
        } else if (this.rotaPerguntas === "credito-realiza") {
          custoParaAPI = this.respostasSelecionadas["resposta_3"];
        } else if (this.rotaPerguntas === "credito-energia-renovavel") {
          custoParaAPI = this.respostasSelecionadas["resposta_3"];
        } else if (this.rotaPerguntas === "bens-servicos-pcd") {
          custoParaAPI = this.respostasSelecionadas["resposta_3"];
        }
        //bloco condicional referenciando os campos de valor de empréstimo
        if (this.rotaPerguntas === "credito-salario") {
          valorParaAPI = this.respostasSelecionadas["resposta_5"];
        } else if (this.rotaPerguntas === "credito-beneficio") {
          valorParaAPI = this.respostasSelecionadas["resposta_5"];
        } else if (this.rotaPerguntas === "credito-automatico") {
          valorParaAPI = this.respostasSelecionadas["resposta_5"];
        } else if (this.rotaPerguntas === "garantia-imovel") {
          custoParaAPI = this.respostasSelecionadas["resposta_5"];
        } else if (this.rotaPerguntas === "garantia-veiculo") {
          custoParaAPI = this.respostasSelecionadas["resposta_5"];
        } else if (this.rotaPerguntas === "garantia-investimento") {
          custoParaAPI = this.respostasSelecionadas["resposta_5"];
        }
        //bloco condicional referenciando os campos de parcelas
        if (this.rotaPerguntas === "credito-salario") {
          parcelasParaAPI = this.respostasSelecionadas["resposta_6"];
        } else if (this.rotaPerguntas === "credito-beneficio") {
          parcelasParaAPI = this.respostasSelecionadas["resposta_6"];
        } else if (this.rotaPerguntas === "credito-automatico") {
          parcelasParaAPI = this.respostasSelecionadas["resposta_6"];
        } else if (this.rotaPerguntas === "garantia-imovel") {
          parcelasParaAPI = this.respostasSelecionadas["resposta_6"];
        } else if (this.rotaPerguntas === "garantia-veiculo") {
          parcelasParaAPI = this.respostasSelecionadas["resposta_6"];
        } else if (this.rotaPerguntas === "garantia-investimento") {
          parcelasParaAPI = this.respostasSelecionadas["resposta_6"];
        } else if (this.rotaPerguntas === "credito-mobilidade") {
          parcelasParaAPI = this.respostasSelecionadas["resposta_5"];
        } else if (this.rotaPerguntas === "credito-realiza") {
          parcelasParaAPI = this.respostasSelecionadas["resposta_5"];
        } else if (this.rotaPerguntas === "credito-energia-renovavel") {
          parcelasParaAPI = this.respostasSelecionadas["resposta_5"];
        } else if (this.rotaPerguntas === "bens-servicos-pcd") {
          parcelasParaAPI = this.respostasSelecionadas["resposta_5"];
        } else if (this.rotaPerguntas === "financiamento-imobiliario") {
          parcelasParaAPI = this.respostasSelecionadas["resposta_5"];
        } else if (this.rotaPerguntas === "financiamento-carro") {
          parcelasParaAPI = this.respostasSelecionadas["resposta_5"];
        } else if (this.rotaPerguntas === "financiamento-moto") {
          parcelasParaAPI = this.respostasSelecionadas["resposta_5"];
        }

        const api = axios.create({
          baseURL: 'https://sought-hare-ultimate.ngrok-free.app',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });

        const response = await axios.get('/linhas-de-credito/simular/${tipo}', {
          params: {
            valor: valorParaAPI,
            parcelas: parcelasParaAPI,
            custo: custoParaAPI,
            data: dataParaAPI
          }
        });

        console.log('O botão foi clicado e suas funções estão sendo executadas(teoricamente)...');

      } catch (error) {
        if (error.response?.data?.scoreBaixo === true) {
          this.$router.push({ name: ResultScoreBaixo });
        }
        console.error("Erro na requisição:", error);
        const errorMessage = error.response?.data?.message || 'Erro interno do servidor.';
      }
    },
    
    getLinhasRecomendadas() {
      let linhas = [];

      if (this.respostasSelecionadas["pergunta_1"] === "dinheiro_conta") {
        if (this.respostasSelecionadas["pergunta_2"] === "com_garantia") {
          linhas.push(
            "Empréstimo com Garantia de Imóvel",
            "Empréstimo com Garantia de Veículo",
            "Empréstimo com Garantia de Investimentos"
          );
        } else if (this.respostasSelecionadas["pergunta_2"] === "sem_garantia") {
          if (this.respostasSelecionadas["pergunta_3"] === "antecipar") {
            linhas.push(
              "Antecipar 13º",
              "Restituição do IRPF",
              "Saque aniversário do FGTS"
            );
          } else if (this.respostasSelecionadas["pergunta_3"] === "credito_hora") {
            linhas.push(
              "Empréstimo Consignado",
              "Empréstimo Automático",
              "Crédito Benefício",
              "Crédito Salário"
            );
          }
        }
      } else if (this.respostasSelecionadas["pergunta_1"] === "financiamento_sonhos") {
        if (this.respostasSelecionadas["pergunta_2"] === "classicos") {
          linhas.push(
            "Financiamento Imobiliário",
            "Financiamento de Veículos",
            "Financiamento de Motos"
          );
        } else if (this.respostasSelecionadas["pergunta_2"] === "diferenciado") {
          linhas.push(
            "Crédito Mobilidade",
            "Crédito Realiza",
            "Crédito Energia Renovável",
            "Bens e Serviços para PCDs"
          );
        }
      } else if (this.respostasSelecionadas["pergunta_1"] === "renovar_emprestimo") {
        linhas.push("Renovação de Empréstimos");
      } else if (this.respostasSelecionadas["pergunta_1"] === "portabilidade") {
        linhas.push("Portabilidade de Crédito");
      }

      return linhas;
    },
    // Método para obter todas as linhas de crédito
    async simularLinhaDeCredito(tipo, params) {
      try {
        const queryParams = new URLSearchParams(params).toString();
        const url = `https://sought-hare-ultimate.ngrok-free.app/linhas-de-credito/simular/${tipo}?${queryParams}`;
        const response = await axios.get(url, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });

        this.dataExportada = response.data;

        return response.data;
      } catch (error) {
        if (error.response?.data?.scoreBaixo === true) {
          this.$router.push({ name: ResultScoreBaixo });
        }
        const errorMessage = error.response?.data?.message || 'Erro interno do servidor.';
        console.error("Erro na requisição:", errorMessage);
      
      }
    }
  },
  created() {
    
    this.atualizarIntervaloDatas(); // Chamada ao carregar o componente
  },
};
</script>
