<template>
  <v-app-bar class="line-header">
    <v-img src="@/images/bb.png" class="line-logo"></v-img>
    <div class="line-linha_preta_vertical"></div>
    <v-app-bar-title class="line-titulo_nav_bar">
      Banco do Brasil
    </v-app-bar-title>

    <v-btn to="/" class="line-buttongeral mx-1">Home</v-btn>
    <v-btn to="/simul" class="line-buttongeral mx-1">Simulação</v-btn>
    <v-btn to="/operacoes" class="line-buttongeral mx-1">Operações</v-btn>
    <v-btn to="/blog" class="line-buttongeral mx-1">Blog</v-btn>
  </v-app-bar>

  <v-main class="line-container-main">
    <v-container>
      <v-container class="line-container_card_topo">
        <div class="line-div_maintext">
          <h1>Linhas de Crédito, Rápido e Prático</h1>
        </div>
        <div class="line-div_subtext">
          <h5>Dinheiro sem burocracia, acesse agora mesmo, em nosso site!</h5>
        </div>

        <v-row>
          <v-col cols="4">
            <v-card class="line-card_filho_topo">
              <v-img class="line-img_card"
                src="https://cdn.bb.com.br/wp-content/uploads/2023/05/Cards-Banner-Full-Credito-pra-voce-v2.png"
                cover></v-img>
              <v-card-subtitle class="line-subtitle_card">Crédito para você</v-card-subtitle>
              <v-card-text>Acesse opções de crédito pessoal com taxas de juros que cabem
                no seu bolso.</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="line-card_filho_topo">
              <v-img class="line-img_card"
                src="https://cdn.bb.com.br/wp-content/uploads/2023/05/Cards-Banner-Full-Credito-pro-seu-veiculo-v2.png"
                cover></v-img>
              <v-card-subtitle class="line-subtitle_card">Financie o seu veículo</v-card-subtitle>
              <v-card-text>Veja como financiar o seu carro novo.</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="line-card_filho_topo">
              <v-img class="line-img_card"
                src="https://cdn.bb.com.br/wp-content/uploads/2023/05/Cards-Banner-Full-Credito-pra-sua-casa-v2.png"
                cover></v-img>
              <v-card-subtitle class="line-subtitle_card">Financie um imóvel</v-card-subtitle>
              <v-card-text>Realize o sonho de adquirir uma casa própria.</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="line-container_form">
        <v-row>
          <v-col cols="6" class="line-lado_esquerdo">
            <v-img src="@/images/mulher_form.webp"></v-img>
          </v-col>
          <v-col cols="6" class="line-lado_direito d-flex align-center justify-center">
            <v-form class="line-form_def_linhas">
              <v-radio-group v-model="respostasSelecionadas['pergunta_' + perguntaAtual]" class="line-pergunta_form">
                <!-- Seção antes do formulário: -->
                <template v-if="perguntaAtual === 0">
                  <h1 class="text_h1">
                    Quer saber quais são suas principais linhas de crédito?
                  </h1>

                  <h4 class="text_h4">
                    O BB ajuda a encontrar a melhor solução para você. Conheça
                    as linhas de crédito pessoal, escolha a mais adequada e
                    realize seus sonhos.
                  </h4>
                </template>

                <!-- Pergunta 1: O que você procura? -->
                <template v-if="perguntaAtual === 1">
                  <h3 class="line-h3_form">O que você procura?</h3>
                  <v-radio class="line-form_ratio" label="Dinheiro na conta para usar como eu quiser"
                    value="dinheiro_conta"></v-radio>
                  <v-radio class="line-form_ratio" label="Financiamento para realizar meus sonhos"
                    value="financiamento_sonhos"></v-radio>
                  <v-radio class="line-form_ratio" label="Quero renovar empréstimos que já possuo"
                    value="renovar_emprestimo"></v-radio>
                  <v-radio class="line-form_ratio"
                    label="Fazer a portabilidade de um empréstimo de outro banco ou instituição financeira"
                    value="portabilidade"></v-radio>
                </template>

                <!-- Resposta anterior(1): "Dinheiro na conta para usar como eu quiser" -->
                <template v-if="
                  perguntaAtual === 2 &&
                  respostasSelecionadas['pergunta_1'] === 'dinheiro_conta'
                ">
                  <h3 class="line-h3_form">
                    Você quer usar um imóvel ou veículo como garantia desse
                    empréstimo? Isso pode deixar sua taxa de juros mais baixa
                  </h3>
                  <v-radio class="line-form_ratio" label="Não quero usar garantias" value="sem_garantia"></v-radio>
                  <v-radio class="line-form_ratio" label="Sim, quero usar garantias e ter juros baixos"
                    value="com_garantia"></v-radio>
                </template>

                <!-- Resposta anterior(2): "Não quero usar garantias" -->
                <template v-if="
                  perguntaAtual === 3 &&
                  respostasSelecionadas['pergunta_2'] === 'sem_garantia'
                ">
                  <h3 class="line-h3_form">
                    Você prefere pagar parcelas mensais(linhas CDC), ou tem
                    algum valor a receber no futuro(linhas de antecipação), para
                    quitar o empréstimo?
                  </h3>
                  <v-radio class="line-form_ratio" label="Antecipar valores sem precisar pagar parcelas mensais"
                    value="antecipar"></v-radio>
                  <v-radio class="line-form_ratio" label="Crédito na hora com pagamento de parcelas mensais"
                    value="credito_hora"></v-radio>
                </template>

                <!-- Resposta anterior(3): "Antecipar valores sem precisar pagar parcelas mensais" -->
                <template v-if="
                  perguntaAtual === 4 &&
                  respostasSelecionadas['pergunta_3'] === 'antecipar'
                ">
                  <h3 class="line-h3_form">O que você pretende antecipar?</h3>
                  <v-radio class="line-form_ratio" label="13º salário." value="13-terceiro"></v-radio>
                  <v-radio class="line-form_ratio" label="Restituição do IRPF." value="IRPF"></v-radio>
                  <v-radio class="line-form_ratio" label="Saque aniversário do FGTS." value="FGTS"></v-radio>
                </template>

                <!-- Resposta anterior(4): "13º salário." -->
                <template v-if="
                  perguntaAtual === 5 &&
                  respostasSelecionadas['pergunta_4'] === '13-terceiro' &&
                  rotaPerguntas === '/perguntas/13-terceiro'
                ">
                  <h3 class="line-h3_form">Quanto você vai receber?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Valor do 13º salário"
                    type="number" min="0" step="0.01">
                  </v-text-field>
                </template>

                <!-- ACIMA ESTÁ A ROTA DO 13º(FINALIZADA) -->

                <!-- Resposta anterior(4): "Restituição do IRPF." -->
                <template v-if="
                  perguntaAtual === 5 &&
                  respostasSelecionadas['pergunta_4'] === 'IRPF' &&
                  rotaPerguntas === '/perguntas/IRPF'
                ">
                  <h3 class="line-h3_form">Quanto você vai receber?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_5']"
                    label="Valor da restituição do IRPF" type="number" min="0" step="0.01">
                  </v-text-field>
                </template>

                <!-- Resposta anterior(5): "Valor da restituição do IRPF" -->
                <template>
                  <h3 class="line-h3_form">
                    Qual será a data de recebimento do valor?
                  </h3>
                  <v-text-field v-model="respostasSelecionadas['pergunta_6']" label="Recebimento do valor">
                  </v-text-field>
                </template>

                <!-- ACIMA ESTÁ A ROTA DO IRPF(FINALIZADA) -->

                <!-- Resposta anterior(4): "Saque aniversário do FGTS." -->
                <template v-if="
                  perguntaAtual === 5 &&
                  respostasSelecionadas['pergunta_4'] === 'FGTS' &&
                  rotaPerguntas === '/perguntas/FGTS'
                ">
                  <h3 class="line-h3_form">
                    quanto você tem de saldo no FGTS?
                  </h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Saldo FGTS" type="number"
                    min="0" step="0.01">
                  </v-text-field>
                </template>

                <!-- ACIMA ESTÁ A ROTA DO FGTS(FINALIZADA) -->

                <!-- Resposta anterior(3): Crédito na hora com pagamento de parcelas mensais -->
                <template v-if="
                  perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === 'credito_hora'
                ">
                  <h3 class="line-h3_form">De quanto você precisa?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Saldo FGTS" type="number"
                    min="0" step="0.01">
                  </v-text-field>
                </template>

                <!-- Resposta anterior(4): Input do valor de "crédito na hora com pagamento de parcelas mensais" -->
                <template v-if="perguntaAtual === 5 && rotaPerguntas === '/perguntas/credito_hora'">
                  <h3 class="line-h3_form">Em quantas parcelas você deseja pagar?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Parcelas" type="number"
                    min="1" step="1"></v-text-field>
                </template>

                <!-- ACIMA ESTÁ A ROTA DO CREDITO_HORA(FINALIZADA) -->

                <!-- Resposta anterior(2): "Sim, quero usar garantias e ter juros baixos" -->
                <template v-if="perguntaAtual === 3 && respostasSelecionadas['pergunta_2'] === 'com_garantia'">
                  <h3>O que você deseja usar como garantia?</h3>
                  <v-radio class="line-form_ratio" label="Imóvel" value="imovel_como_garantia"></v-radio>
                  <v-radio class="line-form_ratio" label="Veículo" value="veiculo_como_garantia"></v-radio>
                  <v-radio class="line-form_ratio" label="Investimentos" value="investimentos_como_garantia"></v-radio>
                </template>

                <!-- Resposta anterior(3): "Imóvel" -->
                <template v-if="
                  perguntaAtual === 4 &&
                  respostasSelecionadas['pergunta_3'] === 'imovel_como_garantia'
                ">
                  <h3 class="line-h3_form">Qual é o valor do imóvel?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Valor do imóvel"
                    type="number" min="0" step="0.01"></v-text-field>
                </template>

                <!-- Resposta anterior(4): Input do valor do imóvel -->
                <template v-if="
                  perguntaAtual === 5 &&
                  rotaPerguntas === '/perguntas/imovel_como_garantia'
                ">
                  <h3 class="line-h3_form">Qual é o valor do empréstimo desejado?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Valor do empréstimo"
                    type="number" min="0" step="0.01"></v-text-field>
                </template>

                <!-- Resposta anterior(5): Input do valor do empréstimo -->
                <template v-if="perguntaAtual === 6 && rotaPerguntas === '/perguntas/imovel_como_garantia'">
                  <h3 class="line-h3_form">Em quantas parcelas você deseja pagar?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_6']" label="Parcelas" type="number"
                    min="1" step="1"></v-text-field>
                </template>

                <!-- ACIMA ESTÁ A ROTA DO IMOVEL_COMO_GARANTIA -->

                <!-- Resposta anterior(3): "Veículo" -->
                <template v-if="
                  perguntaAtual === 4 &&
                  respostasSelecionadas['pergunta_3'] === 'veiculo_como_garantia'
                ">
                  <h3 class="line-h3_form">Qual é o valor do veículo?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Valor do veículo"
                    type="number" min="0" step="0.01"></v-text-field>
                </template>

                <!-- Resposta anterior(4): Input do valor do veículo -->
                <template v-if="perguntaAtual === 5 && rotaPerguntas === '/perguntas/veiculo_como_garantia'">
                  <h3 class="line-h3_form">Qual é o valor do empréstimo desejado?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Valor do empréstimo"
                    type="number" min="0" step="0.01"></v-text-field>
                </template>

                <!-- Resposta anterior(5): Input do valor do empréstimo -->
                <template v-if="perguntaAtual === 6 && rotaPerguntas === '/perguntas/veiculo_como_garantia'">
                  <h3 class="line-h3_form">Em quantas parcelas você deseja pagar</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_6']" label="Parcelas" type="number"
                    min="1" step="1"></v-text-field>
                </template>

                <!-- ACIMA ESTÁ A ROTA DO VEICULO_COMO_GARANTIA -->

                <!-- Resposta anterior(3): "Investimentos" -->
                <template v-if="
                  perguntaAtual === 4 &&
                  respostasSelecionadas['pergunta_3'] === 'investimentos_como_garantia'
                ">
                  <h3 class="line-h3_form">O quanto, em patrimônios, você possui investido?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Valor dos investimentos"
                    type="number" min="0" step="0.01"></v-text-field>
                </template>

                <!-- Resposta anterior(4): Input do valor dos investimentos -->
                <template v-if="perguntaAtual === 5 && rotaPerguntas === '/perguntas/investimentos_como_garantia'">
                  <h3 class="line-h3_form">Qual é o valor do empréstimo desejado?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Valor do empréstimo"
                    type="number" min="0" step="0.01"></v-text-field>
                </template>

                <!-- Resposta anterior(5): Input do valor do empréstimo -->
                <template v-if="perguntaAtual === 6 && rotaPerguntas === '/perguntas/investimentos_como_garantia'">
                  <h3 class="line-h3_form">Em quantas parcelas você deseja pagar</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_6']" label="Parcelas" type="number"
                    min="1" step="1"></v-text-field>
                </template>

                <!-- ACIMA ESTÁ A ROTA DO INVESTIMENTOS_COMO_GARANTIA -->

                <!-- Resposta anterior(1): "Financiamentos para realizar meus sonhos" -->
                <template v-if="perguntaAtual === 2 && respostasSelecionadas['pergunta_1'] === 'financiamento_sonhos'">
                  <h3 class="line-h3_form">Qual dessas opções te representa?</h3>
                  <v-radio class="line-form_ratio" label="Eu quero os clássicos, imobiliário e veículos"
                    value="classicos"></v-radio>
                  <v-radio class="line-form_ratio" label="Procuro algo que só o BB possui"
                    value="diferenciado"></v-radio>
                </template>

                <!-- Resposta anterior (2): "Eu quero os clássicos, imobiliário e veículos" -->
                <template v-if="perguntaAtual === 3 && respostasSelecionadas['pergunta_2'] === 'classicos'">
                  <h3 class="line-h3_form">Escolha dentre as opções a seguir:</h3>
                  <v-radio class="line-form_ratio" label="Financiamento imobiliário"
                    value="financiamento_imobiliario"></v-radio>
                  <v-radio class="line-form_ratio" label="Financiamento carro" value="financiamento_carro"></v-radio>
                  <v-radio class="line-form_ratio" label="Financiamento moto" value="financiamento_moto"></v-radio>
                </template>

                <!-- Resposta anterior(3): "Financiamento Imobiliário" -->
                <template
                  v-if="perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === 'financiamento_imobiliario'">
                  <h3 class="line-h3_form">Qual o valor do Imovél?</h3>
                  <v-text-field v-model="respostasSelecionadas['pergunta_4']" label="Valor do imóvel" type="number"
                    min="0" step="0.01">
                  </v-text-field>
                </template>

                <!-- Resposta anterior(4): Input do valor do imóvel -->
                <template v-if="perguntaAtual === 5 && rotaPerguntas === '/perguntas/financiamento_imobiliario'">
                  <h3 class="line-h3_form">Em quantas parcelas você deseja pagar?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Parcelas" type="number"
                    min="1" step="1"></v-text-field>
                </template>

                <!-- ACIMA ESTÁ A ROTA DO FINANCIAMENTO_IMOBILIARIO(FINALIZADA) -->

                <!-- OS PROXIMOS SÃO FINANCIAMENTO_CARRO E MOTO, QUE POSSUEM AS MESMAS DUAS PERGUNTAS SOBRE O VALOR E A QUANTIDADE DE PARCELAS A PAGAR O FINANCIAMENTO -->

                <!-- Resposta anterior(3): "Financiamento Carro" -->
                <template v-if="perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === 'financiamento_carro'">
                  <h3 class="line-h3_form">Qual o valor do Carro?</h3>
                  <v-text-field v-model="respostasSelecionadas['pergunta_4']" label="Valor do carro" type="number"
                    min="0" step="0.01">
                  </v-text-field>
                </template>

                <!-- Resposta anterior(4): Input do valor do carro -->
                <template v-if="perguntaAtual === 5 && rotaPerguntas === '/perguntas/financiamento_carro'">
                  <h3 class="line-h3_form">Em quantas parcelas você deseja pagar?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Parcelas" type="number"
                    min="1" step="1"></v-text-field>
                </template>

                <!-- ACIMA ESTÁ A ROTA DO FINANCIAMENTO_CARRO(FINALIZADA) -->

                <!-- Resposta anterior(3): "Financiamento Moto" -->
                <template v-if="perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === 'financiamento_moto'">
                  <h3 class="line-h3_form">Qual o valor da Moto?</h3>
                  <v-text-field v-model="respostasSelecionadas['pergunta_4']" label="Valor da moto" type="number"
                    min="0" step="0.01">
                  </v-text-field>
                </template>

                <!-- Resposta anterior(4): Input do valor da moto -->
                <template v-if="perguntaAtual === 5 && rotaPerguntas === '/perguntas/financiamento_moto'">
                  <h3 class="line-h3_form">Em quantas parcelas você deseja pagar?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Parcelas" type="number"
                    min="1" step="1"></v-text-field>
                </template>

                <!-- ACIMA ESTÁ A ROTA DO FINANCIAMENTO_MOTO(FINALIZADA) -->

                <!-- Resposta anterior(2): "Procuro algo diferenciado que só o BB possui" -->
                <template v-if="perguntaAtual === 3 && respostasSelecionadas['pergunta_2'] === 'diferenciado'">
                  <h3>Escolha entre as opções a seguir:</h3>
                  <v-radio class="line-form_ratio" label="Crédito mobilidade" value="credito_mobilidade"></v-radio>
                  <v-radio class="line-form_ratio" label="Crédito realiza" value="credito_realiza"></v-radio>
                  <v-radio class="line-form_ratio" label="Crédito energia renovável"
                    value="credito_energia_renovavel"></v-radio>
                  <v-radio class="line-form_ratio" label="Bens e serviços para PCDs"
                    value="bens_e_servicos_pcds"></v-radio>
                </template>

                <!-- Respota anterior(3): "Crédito mobilidade" -->
                <template v-if="perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === 'credito_mobilidade'">
                  <h3 class="line-h3_form">Qual o valor do item que deseja financiar?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Valor do item" type="number" min="0" step="0.01"></v-text-field>
                </template>

                <!-- Resposta anterior(4): Input do valor do item -->
                <template v-if="perguntaAtual === 5 && rotaPerguntas === '/perguntas/credito_mobilidade'">
                  <h3 class="line-h3_form">Em quantas parcelas você deseja pagar?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Parcelas" type="number" min="1" step="1"></v-text-field>
                </template>

                <!-- ACIMA ESTÁ A ROTA DO CREDITO_MOBILIDADE(FINALIZADA) -->

                <!-- Resposta anterior(3): "Crédito realiza" -->
                <template v-if="perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === 'credito_realiza'">
                  <h3 class="line-h3_form">Qual o valor do item ou serviço que deseja financiar?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Valor do item/serviço" type="number" min="0" step="0.01"></v-text-field>
                </template>

                <!-- Resposta anterior(4): Input do valor do item/serviço -->
                <template v-if="perguntaAtual === 5 && rotaPerguntas === '/perguntas/credito_realiza'">
                  <h3 class="line-h3_form">Em quantas parcelas você deseja pagar?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Parcelas" type="number" min="1" step="1"></v-text-field>
                </template>

                <!-- ACIMA ESTÁ A ROTA DO CREDITO_REALIZA(FINALIZADA) -->

                <!-- Resposta anterior(3): "Crédito energia renovável" -->
                <template v-if="perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === 'credito_energia_renovavel'">
                  <h3 class="line-h3_form">Qual o valor do item que deseja financiar?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Valor do item" type="number" min="0" step="0.01"></v-text-field>
                </template>

                <!-- Resposta anterior(4): Input do valor do item -->
                <template v-if="perguntaAtual === 5 && rotaPerguntas === '/perguntas/credito_energia_renovavel'">
                  <h3 class="line-h3_form">Em quantas parcelas você deseja pagar?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Parcelas" type="number" min="1" step="1"></v-text-field>
                </template>

                <!-- ACIMA ESTÁ A ROTA DO CREDITO_ENERGIA_RENOVAVEL(FINALIZADA) -->

                <!-- Resposta anterior(3): "Bens e serviços para PCDs -->
                <template v-if="perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === 'bens_e_servicos_pcds'">
                  <h3 class="line-h3_form">Qual o valor do item/serviço que deseja financiar?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Valor do item/serviço" type="number" min="0" step="0.01"></v-text-field>
                </template>

                <!-- Resposta anterior(4): Input do valor do item/serviço -->
                <template v-if="perguntaAtual === 5 && rotaPerguntas === '/perguntas/bens_e_servicos_pcds'">
                  <h3>Em quantas parcelas você deseja pagar?</h3>
                  <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Parcelas" type="number" min="1" step="1"></v-text-field>
                </template>

                <!-- ACIMA ESTÁ A ROTA DOS BENS_E_SERVICOS_PCDS -->

                <template v-if="
                  perguntaAtual === 2 &&
                  respostasSelecionadas['pergunta_1'] === 'renovar_emprestimo'
                ">
                  <h3 class="line-h3_form">
                    Qual empréstimo existente você deseja renovar
                  </h3>
                  <v-radio class="line-form_ratio" label="Placeholder" value=""></v-radio>
                  <v-radio class="line-form_ratio" label="Placeholder_2" value=""></v-radio>
                  <v-radio class="line-form_ratio" label="Placeholder_3" value=""></v-radio>
                </template>

                <template v-if="
                  perguntaAtual === 2 &&
                  respostasSelecionadas['pergunta_1'] === 'portabilidade'
                ">
                  <h3 class="line-h3_form"></h3>
                  <v-radio class="line-form_ratio" label="Portabilidade" value=""></v-radio>
                </template>
              </v-radio-group>

              <!-- Botões de navegação -->
              <v-row>
                <v-col cols="6">
                  <v-btn class="line-buttonbeforeafter" v-if="perguntaAtual === 0"
                    @click="proximaPergunta">Começar</v-btn>
                  <v-btn class="line-buttonbeforeafter" v-else @click="perguntaAnterior">Anterior</v-btn>
                </v-col>
                <v-col cols="6" class="text-right">
                  <v-btn class="line-buttonbeforeafter" v-if="fimDaRota === false && perguntaAtual !== 0"
                    @click="proximaPergunta">Próxima</v-btn>
                  <v-btn class="line-buttonbeforeafter" v-if="fimDaRota === true" @click="enviarResposta">Enviar
                    Respostas</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>

        <v-alert type="success" v-if="mostrarResultados">
          Suas respostas foram enviadas! Confira abaixo as linhas de crédito
          recomendadas para você:
        </v-alert>

        <!-- Exibir as opções de crédito recomendadas -->
        <v-container v-if="mostrarResultados" class="line-container_resultados">
          <h3 class="line-h3_form">Linhas de Crédito Recomendadas:</h3>
          <v-list>
            <v-list-item v-for="linha in linhasRecomendadas" :key="linha">
              <v-list-item-content>{{ linha }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-container>
      </v-container>
    </v-container>
  </v-main>
</template>

<script>
import "@/styles/line.css";

export default {
  data() {
    return {
      perguntaAtual: 0,
      totalDePerguntas: 0,
      respostasSelecionadas: { 'pergunta_0': 'Este índice não possui alternativas!' }, // Agora é um objeto(o valor pré-estabelecido serve apenas para não provocar retorno 'undefined' ao averiguar os console.logs)
      mostrarResultados: false,
      linhasRecomendadas: [],
      verificacao: this.perguntaAtual < this.totalDePerguntas,
      menu: false, // controla a abertura do calendário
      rotaPerguntas: "",
      fimDaRota: false,
    };
  },
  methods: {
    definirRotaETotalDePerguntas() {
      if (this.respostasSelecionadas["pergunta_4"] === "13-terceiro") {
        this.rotaPerguntas = "/perguntas/13-terceiro";
        this.totalDePerguntas = 5;
      } else if (this.respostasSelecionadas["pergunta_4"] === "IRPF") {
        this.rotaPerguntas = "/perguntas/IRPF";
        this.totalDePerguntas = 6;
      } else if (this.respostasSelecionadas["pergunta_4"] === "FGTS") {
        this.rotaPerguntas = "/perguntas/FGTS";
        this.totalDePerguntas = 5;
      } else if (this.respostasSelecionadas['pergunta_3'] === 'credito_hora') {
        this.rotaPerguntas = "/perguntas/credito_hora";
        this.totalDePerguntas = 5;
      } else if (this.respostasSelecionadas['pergunta_3'] === 'imovel_como_garantia') {
        this.rotaPerguntas = "/perguntas/imovel_como_garantia";
        this.totalDePerguntas = 6;
      } else if (this.respostasSelecionadas['pergunta_3'] === 'veiculo_como_garantia') {
        this.rotaPerguntas = "/perguntas/veiculo_como_garantia";
        this.totalDePerguntas = 6;
      } else if (this.respostasSelecionadas['pergunta_3'] === 'investimentos_como_garantia') {
        this.rotaPerguntas = "/perguntas/investimentos_como_garantia";
        this.totalDePerguntas = 6;
      } else if (this.respostasSelecionadas['pergunta_3'] === 'financiamento_imobiliario') {
        this.rotaPerguntas = "/perguntas/financiamento_imobiliario";
        this.totalDePerguntas = 4;
      } else if (this.respostasSelecionadas['pergunta_3'] === 'financiamento_carro') {
        this.rotaPerguntas = "/perguntas/financiamento_carro";
        this.totalDePerguntas = 4;
      } else if (this.respostasSelecionadas['pergunta_3'] === 'financiamento_moto') {
        this.rotaPerguntas = "/perguntas/financiamento_moto";
        this.totalDePerguntas = 4;
      } else if (this.respostasSelecionadas['pergunta_3'] === 'credito_mobilidade') {
        this.rotaPerguntas = "/perguntas/credito_mobilidade";
        this.totalDePerguntas = 5;
      } else if (this.respostasSelecionadas['pergunta_3'] === 'credito_realiza') {
        this.rotaPerguntas = "/perguntas/credito_realiza";
        this.totalDePerguntas = 5;
      } else if (this.respostasSelecionadas['pergunta_3'] === 'credito_energia_renovavel') {
        this.rotaPerguntas = "/perguntas/credito_energia_renovavel";
        this.totalDePerguntas = 5;
      } else if (this.respostasSelecionadas['pergunta_3'] === 'bens_e_servicos_pcds') {
        this.rotaPerguntas = "/perguntas/bens_e_servicos_pcds";
        this.totalDePerguntas = 5;
      } else if (this.respostasSelecionadas['pergunta_1'] === 'renovar_emprestimo') {
        this.rotaPerguntas = "/perguntas/renovar_emprestimo";
        this.totalDePerguntas = 1;
      } else if (this.respostasSelecionadas['pergunta_1'] === 'portabilidade') {
        this.rotaPerguntas = "/perguntas/portabilidade";
        this.totalDePerguntas = 1;
      }
    },
    definirFimDaRota() {

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
    },
    perguntaAnterior() {
      if (this.perguntaAtual > 0) {
        this.perguntaAtual--;
      }
      console.log(this.respostasSelecionadas["pergunta_" + this.perguntaAtual]);
      console.log(this.perguntaAtual);
    },
    enviarResposta() {
      this.mostrarResultados = true;
      this.linhasRecomendadas = this.getLinhasRecomendadas();
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
        } else if (
          this.respostasSelecionadas["pergunta_2"] === "sem_garantia"
        ) {
          if (this.respostasSelecionadas["pergunta_3"] === "antecipar") {
            linhas.push(
              "Antecipar 13º",
              "Restituição do IRPF",
              "Saque aniversário do FGTS"
            );
          } else if (
            this.respostasSelecionadas["pergunta_3"] === "credito_hora"
          ) {
            linhas.push(
              "Empréstimo Consignado",
              "Empréstimo Automático",
              "Crédito Benefício",
              "Crédito Salário"
            );
          }
        }
      } else if (
        this.respostasSelecionadas["pergunta_1"] === "financiamento_sonhos"
      ) {
        if (this.respostasSelecionadas["pergunta_2"] === "classicos") {
          linhas.push(
            "Financiamento Imobiliário",
            "Financiamento de Veículos",
            "Financiamento de Motos"
          );
        } else if (
          this.respostasSelecionadas["pergunta_2"] === "diferenciado"
        ) {
          linhas.push(
            "Crédito Mobilidade",
            "Crédito Realiza",
            "Crédito Energia Renovável",
            "Bens e Serviços para PCDs"
          );
        }
      } else if (
        this.respostasSelecionadas["pergunta_1"] === "renovar_emprestimo"
      ) {
        linhas.push("Renovação de Empréstimos");
      } else if (this.respostasSelecionadas["pergunta_1"] === "portabilidade") {
        linhas.push("Portabilidade de Crédito");
      }

      return linhas;
    },
    //ANALISAR SE É NECESSÁRIO USAR A FUNÇÃO "FORMATAR O VALOR MONETÁRIO" E A "PARSE CURRENCY", CASO NECESSÁRIO, ADAPTÁ-LAS PARA O FORMULÁRIO DESTA PÁGINA.
    /* formatarValorMonetario(campo) {
      let valor = this.formulario[campo];

      // Remove todos os caracteres não numéricos
      valor = valor.replace(/\D/g, "");

      // Formata o valor
      valor = (valor / 100).toFixed(2) + "";
      valor = valor.replace(".", ",");
      valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

      // Atualiza o campo do formulário
      this.respostasSelecionadas[campo] = "R$ " + valor;
    }, */
  },
};
</script>
