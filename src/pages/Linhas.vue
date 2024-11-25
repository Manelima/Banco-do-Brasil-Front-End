<template>
  <v-main class="line-container-main">
    <v-container class="d-flex" fluid>
      <!-- Lado esquerdo: Imagem -->
      <v-col cols="6" class="line-lado_esquerdo d-flex align-center justify-center">
        <v-img src="@/images/mulher_form.webp" max-height="100%" max-width="100%"></v-img>
      </v-col>

      <!-- Lado direito: Formulário e perguntas -->
      <v-col cols="6" class="line-lado_direito d-flex align-center justify-center">
        <v-form class="line-form_def_linhas">
          <v-radio-group v-model="respostasSelecionadas['pergunta_' + perguntaAtual]" class="line-pergunta_form">
            <!-- Pergunta inicial -->
            <template v-if="perguntaAtual === 0">
              <h1 class="line-title-zero">
                <b> Quer saber quais são suas<br>principais linhas de <br>crédito?</b>
              </h1>
              <h4 class="line-subtitle-zero">
                O BB ajuda a encontrar a melhor solução para você. <br> Conheça as linhas de crédito pessoal, escolha a mais <br>
                adequada e realize seus sonhos.
              </h4>
            </template>

            <!-- Pergunta 1: O que você procura? -->
            <template v-if="perguntaAtual === 1">
             
              <h3 class="line-title-form"> <img src="@/assets/arrow-left.svg" class="arrow-left-svg" alt="seta esquerda"> O que você precisa?</h3>
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
              <h3 class="line-title-form">
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
              <h3 class="line-title-form">
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
              <h3 class="line-title-form">O que você pretende antecipar?</h3>
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
              <h3 class="line-title-form">Quanto você vai receber?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Valor do 13º salário"
                type="number" min="1412" max="20000" step="0.01">
              </v-text-field>
            </template>

            <!-- Resposta anterior(5): "Valor do 13º salário" -->
            <template v-if="perguntaAtual === 6 && rotaPerguntas === '/perguntas/13-terceiro'">
              <h3 class="line-title-form">
                Quanto vai receber?
              </h3>
              <h3 class="line-title-form">
                Qual será a data de recebimento do valor?
              </h3>
              <v-text-field v-model="respostasSelecionadas['pergunta_6']" label="Recebimento do valor" type="date"
                :min="minDate_13" :max="maxDate_13">
              </v-text-field>
            </template>

            <!-- ACIMA ESTÁ A ROTA DO 13º(FINALIZADA) -->

            <!-- Resposta anterior(4): "Restituição do IRPF." -->
            <template v-if="
              perguntaAtual === 5 &&
              respostasSelecionadas['pergunta_4'] === 'IRPF' &&
              rotaPerguntas === '/perguntas/IRPF'
            ">
              <h3 class="line-title-form">Quanto você vai receber?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Valor da restituição do IRPF"
                type="number" min="1911" max="50000" step="0.01">
              </v-text-field>

              <h3 class="line-title-form">
                Qual será a data de recebimento do valor?
              </h3>
              <v-text-field v-model="respostasSelecionadas['pergunta_5']" label="Recebimento do valor" type="date"
                :min="minDate_IRPF" :max="maxDate_IRPF">
              </v-text-field>
            </template>

            <!-- Resposta anterior(5): "Valor da restituição do IRPF" -->
            
             
            

            <!-- ACIMA ESTÁ A ROTA DO IRPF(FINALIZADA) -->

            <!-- Resposta anterior(4): "Saque aniversário do FGTS." -->
            <template v-if="
              perguntaAtual === 5 &&
              respostasSelecionadas['pergunta_4'] === 'FGTS' &&
              rotaPerguntas === '/perguntas/FGTS'
            ">
              <h3 class="line-title-form">
                quanto você tem de saldo no FGTS?
              </h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Saldo FGTS" type="number"
                min="500" max="50000" step="0.01">
              </v-text-field>
            </template>

            <!-- ACIMA ESTÁ A ROTA DO FGTS(FINALIZADA) -->

            <!-- Resposta anterior(3): Crédito na hora com pagamento de parcelas mensais -->
            <template v-if="perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === 'credito_hora'">
              <h3 class="line-title-form">Escolha uma das seguintes opções</h3>
              <v-radio class="line-form_radio"
                label="Crédito Salário para quem recebe o salário no BB e tem conta corrente ativa(possui melhores taxas e prazos)"
                value="credito_salario"></v-radio>
              <v-radio class="line-form_radio"
                label="Crédito Benefício para aposentados ou pensionistas do INSS que recebem o benefício na conta corrente do BB(com taxas de juros atraticas)"
                value="credito_beneficio"></v-radio>
              <v-radio class="line-form_radio"
                label="Empréstimo Automático, opção ideal para quem precisa de dinheiro para emergências, colocar as contas em dia ou usar como quiser"
                value="emprestimo_automatico"></v-radio>
            </template>

            <!-- Resposta anterior(4): Crédito Salário para quem recebe o salário no bb... -->
            <template v-if="perguntaAtual === 5 && respostasSelecionadas['pergunta_4'] === 'credito_salario'">
              <h3 class="line-title-form"> Quanto você precisa?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Valor" type="number">
              </v-text-field>

              <h3 class="line-title-form">Em quantas parcelas você deseja pagar?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Parcelas" type="number" min="1"
                max="72" step="1"></v-text-field>
            </template>

            <!-- ACIMA ESTÁ A ROTA DO CREDITO_SALARIO(FINALIZADA) -->

            <!-- Resposta anterior(4): Crédito Benefício para aposentados ou pensionistas... -->
            <template v-if="perguntaAtual === 5 && respostasSelecionadas['pergunta_4'] === 'credito_beneficio'">
              <h3 class="line-title-form">Qual o valor do benefício?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Valor" type="number">
                <!-- definir :min e :max desse -->
              </v-text-field>

              <h3 class="line-title-form">Em quantas parcelas você deseja pagar?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Parcelas" type="number" min="1"
                max="72" step="1"></v-text-field>
            </template>

            <!-- Resposta anterior(5): Input do valor do benefício -->
            <template v-if="perguntaAtual === 6 && rotaPerguntas === '/perguntas/credito_beneficio'">
              <h3 class="line-title-form">Em quantas parcelas você deseja pagar?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_6']" label="Parcelas" type="number" min="1"
                max="72" step="1"></v-text-field>
            </template>

            <!-- ACIMA ESTÁ A ROTA DO CREDITO_BENEFICIO(FINALIZADA) -->

            <!-- Resposta anterior(4): Empréstimo Automático, opção ideal para quem... -->
            <template v-if="perguntaAtual === 5 && respostasSelecionadas['pergunta_4'] === 'emprestimo_automatico'">
              <h3 class="line-title-form">Qual o valor do empréstimo?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Valor" type="number">
                <!-- definir :min e :max desse -->
              </v-text-field>

              <h3 class="line-title-form">Em quantas parcelas você deseja pagar?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Parcelas" type="number" min="1"
                max="72" step="1"></v-text-field>
            </template>

            
             
          

            <!-- ACIMA ESTÁ A ROTA DO EMPRESTIMO_AUTOMATICO(FINALIZADA) -->

            <!-- Resposta anterior(2): "Sim, quero usar garantias e ter juros baixos" -->
            <template v-if="perguntaAtual === 3 && respostasSelecionadas['pergunta_2'] === 'com_garantia'">
              <h3 class="line-title-form">O que você deseja usar como garantia?</h3>
              <v-radio class="line-form_ratio" label="Imóvel" value="imovel_como_garantia"></v-radio>
              <v-radio class="line-form_ratio" label="Veículo" value="veiculo_como_garantia"></v-radio>
              <v-radio class="line-form_ratio" label="Investimentos(Poupança, Fundos de Renda Fixa, CDB, LCA e Planos de Previdência Privada BrasilPrev)" value="investimentos_como_garantia"></v-radio>
            </template>

            <!-- Resposta anterior(3): "Imóvel" -->
            <template v-if="
              perguntaAtual === 4 &&
              respostasSelecionadas['pergunta_3'] === 'imovel_como_garantia'
            ">
              <h3 class="line-title-form">Qual é o valor do imóvel ?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Valor do imóvel" type="number"
                min="35000" max="5000000" step="0.01"></v-text-field>

                <h3 class="line-title-form">Quanto você deseja ?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Valor do empréstimo"
                type="number" min="0" step="0.01"></v-text-field>

                <h3 class="line-title-form">Em quantas parcelas você deseja?</h3>
                <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Parcelas" type="number" min="0" step="0.01"></v-text-field>
            </template>

           

        

            <!-- ACIMA ESTÁ A ROTA DO IMOVEL_COMO_GARANTIA -->

            <!-- Resposta anterior(3): "Veículo" -->
            <template v-if="
              perguntaAtual === 4 &&
              respostasSelecionadas['pergunta_3'] === 'veiculo_como_garantia'
            ">
              <h3 class="line-title-form">Qual é o valor do veículo?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Valor do veículo" type="number"
                min="10000" max="1000000" step="0.01"></v-text-field>
                
                <h3 class="line-title-form">Quanto você deseja ?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Valor do empréstimo"
                type="number" min="0" step="0.01"></v-text-field>

                <h3 class="line-title-form">Em quantas parcelas você deseja?</h3>
                <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Parcelas" type="number" min="0" step="0.01"></v-text-field>
            </template>



            <!-- ACIMA ESTÁ A ROTA DO VEICULO_COMO_GARANTIA -->

            <!-- Resposta anterior(3): "Investimentos" -->
            <template v-if="
              perguntaAtual === 4 &&
              respostasSelecionadas['pergunta_3'] === 'investimentos_como_garantia'
            ">
              <h3 class="line-title-form">O quanto, em patrimônios, você possui investido?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Valor dos investimentos"
                type="number" min="10000" max="10000000" step="0.01"></v-text-field>

                <h3 class="line-title-form">O quanto você deseja?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Valor do empréstimo"
                type="number" min="0" step="0.01"></v-text-field>

                <h3 class="line-title-form">Em quantas parcelas você deseja?</h3>
                <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Parcelas" type="number" min="0" step="0.01"></v-text-field>
            </template>

            <!-- ACIMA ESTÁ A ROTA DO INVESTIMENTOS_COMO_GARANTIA -->

            <!-- Resposta anterior(1): "Financiamentos para realizar meus sonhos" -->
            <template v-if="perguntaAtual === 2 && respostasSelecionadas['pergunta_1'] === 'financiamento_sonhos'">
              <h3 class="line-title-form">Possuímos vários tipos de financiamento, desde os tradicionais até os mais diversos, para oferecer exatamente oque você procura</h3>
              <v-radio class="line-form_ratio" label="Eu quero os clássicos, imobiliário e veículos"
                value="classicos"></v-radio>
              <v-radio class="line-form_ratio" label="Procuro algo que só o BB possui" value="diferenciado"></v-radio>
            </template>

            <!-- Resposta anterior (2): "Eu quero os clássicos, imobiliário e veículos" -->
            <template v-if="perguntaAtual === 3 && respostasSelecionadas['pergunta_2'] === 'classicos'">
              <h3 class="line-title-form">Escolha dentre as opções a seguir:</h3>
              <v-radio class="line-form_ratio" label="Financiamento imobiliário"
                value="financiamento_imobiliario"></v-radio>
              <v-radio class="line-form_ratio" label="Financiamento carro" value="financiamento_carro"></v-radio>
              <v-radio class="line-form_ratio" label="Financiamento moto" value="financiamento_moto"></v-radio>
            </template>

            <!-- Resposta anterior(3): "Financiamento Imobiliário" -->
            <template v-if="perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === 'financiamento_imobiliario'">
              <h3 class="line-title-form">Qual o valor do Imovél?</h3>
              <v-text-field v-model="respostasSelecionadas['pergunta_4']" label="Valor do imóvel" type="number"
                min="20000" max="5000000" step="0.01">
              </v-text-field>
              <h3 class="line-title-form">Em quantas parcelas você deseja pagar?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Parcelas" type="number" min="15"
                step="420"></v-text-field>
            </template>

            <!-- Resposta anterior(4): Input do valor do imóvel -->
            <template v-if="perguntaAtual === 5 && rotaPerguntas === '/perguntas/financiamento_imobiliario'">
             
            </template>

            <!-- ACIMA ESTÁ A ROTA DO FINANCIAMENTO_IMOBILIARIO(FINALIZADA) -->

            <!-- Resposta anterior(3): "Financiamento Carro" -->
            <template v-if="perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === 'financiamento_carro'">
              <h3 class="line-title-form">Qual o valor do Carro?</h3>
              <v-text-field v-model="respostasSelecionadas['pergunta_4']" label="Valor do carro" type="number"
                min="20000" max="500000" step="0.01">
              </v-text-field>

              <h3 class="line-title-form">Em quantas parcelas você deseja pagar?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Parcelas" type="number" min="5"
                max="36" step="1"></v-text-field>
            </template>


            <!-- ACIMA ESTÁ A ROTA DO FINANCIAMENTO_CARRO(FINALIZADA) -->

            <!-- Resposta anterior(3): "Financiamento Moto" -->
            <template v-if="perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === 'financiamento_moto'">
              <h3 class="line-title-form">Qual o valor da Moto?</h3>
              <v-text-field v-model="respostasSelecionadas['pergunta_4']" label="Valor da moto" type="number"
                min="10000" max="100000" step="0.01">
              </v-text-field>

              <h3 class="line-title-form">Em quantas parcelas você deseja pagar?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Parcelas" type="number" min="5"
                max="36" step="1"></v-text-field>
            </template>

            <!-- Resposta anterior(4): Input do valor da moto -->
            <template v-if="perguntaAtual === 5 && rotaPerguntas === '/perguntas/financiamento_moto'">
              <h3 class="line-title-form">Em quantas parcelas você deseja pagar?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Parcelas" type="number" min="5"
                max="36" step="1"></v-text-field>
            </template>

            <!-- ACIMA ESTÁ A ROTA DO FINANCIAMENTO_MOTO(FINALIZADA) -->

            <!-- Resposta anterior(2): "Procuro algo diferenciado que só o BB possui" -->
            <template v-if="perguntaAtual === 3 && respostasSelecionadas['pergunta_2'] === 'diferenciado'">
              <h3 class="line-title-form">Escolha entre as opções a seguir:</h3>
              <v-radio class="line-form_ratio" label="Crédito Mobilidade (financie itens direcionados à mobilidade como: bicicletas, patinetes, scooters elétricos ou mecânicos e motos abaixo de 125 cc.)" value="credito_mobilidade"></v-radio>
              <v-radio class="line-form_ratio" label="Crédito Realiza (você pode financiar tudo o que precisa, eletrônicas, itens pessoais, serviços, viagens e muitos mais)" value="credito_realiza"></v-radio>
              <v-radio class="line-form_ratio" label="Crédito Energia Renovável (financie sistemas voltaicos que captam a luz do sol durante o dia e a convertem a fim de gerar energia solar residencial)"
                value="credito_energia_renovavel"></v-radio>
              <v-radio class="line-form_ratio" label="Bens e serviços para PCDs (Financia cadeiras de rodas, aparelhos auditivos, órteses, próteses, andadores, entre outro produtos de tecnologia assistiva)" value="bens_e_servicos_pcds"></v-radio>
            </template>

            <!-- Respota anterior(3): "Crédito mobilidade" -->
            <template v-if="perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === 'credito_mobilidade'">
              <h3 class="line-title-form">Qual o valor do item que deseja financiar?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Valor do item" type="number"
                min="500" max="50000" step="0.01"></v-text-field>
              <h3 class="line-title-form">Em quantas parcelas você deseja pagar ?</h3>  
              <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Quantidade de parcelas" type="number"
              min="500" max="50000" step="0.01"></v-text-field>
            </template>

            <!-- Resposta anterior(4): Input do valor do item -->
            <template v-if="perguntaAtual === 5 && rotaPerguntas === '/perguntas/credito_mobilidade'">
              <h3 class="line-title-form">Em quantas parcelas você deseja pagar?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Parcelas" type="number" min="5"
                max="60" step="1"></v-text-field>
            </template>

            <!-- ACIMA ESTÁ A ROTA DO CREDITO_MOBILIDADE(FINALIZADA) -->

            <!-- Resposta anterior(3): "Crédito realiza" -->
            <template v-if="perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === 'credito_realiza'">
              <h3 class="line-title-form">Qual o valor do item ou serviço que deseja financiar?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Valor do item/serviço"
                type="number" min="100" max="50000" step="0.01"></v-text-field>
                <h3 class="line-title-form">Qual o valor do item que deseja financiar?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Quantidade de parcelas" type="number"
              min="500" max="50000" step="0.01"></v-text-field>
            </template>

            <!-- Resposta anterior(4): Input do valor do item/serviço -->
            <template v-if="perguntaAtual === 5 && rotaPerguntas === '/perguntas/credito_realiza'">
              <h3 class="line-title-form">Em quantas parcelas você deseja pagar?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Parcelas" type="number" min="1"
                max="60" step="1"></v-text-field>
            </template>

            <!-- ACIMA ESTÁ A ROTA DO CREDITO_REALIZA(FINALIZADA) -->

            <!-- Resposta anterior(3): "Crédito energia renovável" -->
            <template v-if="perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === 'credito_energia_renovavel'">
              <h3 class="line-title-form">Qual o valor do item que deseja financiar?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Valor do item" type="number"
                min="2000" max="100000" step="0.01"></v-text-field>
            </template>

            <!-- Resposta anterior(4): Input do valor do item -->
            <template v-if="perguntaAtual === 4 && rotaPerguntas === '/perguntas/credito_energia_renovavel'">

           
         
              <h3 class="line-title-form">Em quantas parcelas você deseja pagar?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Parcelas" type="number" min="2"
                max="96" step="1"></v-text-field>
            </template>

            <!-- ACIMA ESTÁ A ROTA DO CREDITO_ENERGIA_RENOVAVEL(FINALIZADA) -->

            <!-- Resposta anterior(3): "Bens e serviços para PCDs -->
            <template v-if="perguntaAtual === 4 && respostasSelecionadas['pergunta_3'] === 'bens_e_servicos_pcds'">
              <h3 class="line-title-form">Qual o valor do item/serviço que deseja financiar?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_4']" label="Valor do item/serviço"
                type="number" min="70" max="30000" step="0.01"></v-text-field>
            </template>

            <!-- Resposta anterior(4): Input do valor do item/serviço -->
            <template v-if="perguntaAtual === 4 && rotaPerguntas === '/perguntas/bens_e_servicos_pcds'">
              <h3>Em quantas parcelas você deseja pagar?</h3>
              <v-text-field v-model.number="respostasSelecionadas['pergunta_5']" label="Parcelas" type="number" min="2"
                max="60" step="1"></v-text-field>
            </template>

            <!-- ACIMA ESTÁ A ROTA DOS BENS_E_SERVICOS_PCDS -->

            <!-- 
                <template v-if="
                  perguntaAtual === 2 &&
                  respostasSelecionadas['pergunta_1'] === 'renovar_emprestimo'
                ">
                  <h3 class="line-title-form">
                    Qual empréstimo existente você deseja renovar
                  </h3>
                  <v-radio class="line-form_ratio" label="Placeholder" value=""></v-radio>
                  <v-radio class="line-form_ratio" label="Placeholder_2" value=""></v-radio>
                  <v-radio class="line-form_ratio" label="Placeholder_3" value=""></v-radio>
                </template>
                 -->
            <template v-if="
              perguntaAtual === 2 &&
              respostasSelecionadas['pergunta_1'] === 'portabilidade'
            ">
              <h3 class="line-title-form"></h3>
              <v-radio class="line-form_ratio" label="Portabilidade" value=""></v-radio>
            </template>

            <!-- Linhas recomendadas: Diferenciado -->
            <template v-if="perguntaAtual === 2 && respostasSelecionadas[2] === 'diferenciado'">
              <v-alert type="success">
                Linhas de Crédito Recomendadas:
                <ul>
                  <li>Crédito Mobilidade</li>
                  <li>Crédito Realiza</li>
                  <li>Crédito Energia Renovável</li>
                  <li>Bens e Serviços para PCDs</li>
                </ul>
              </v-alert>
            </template>

         
            <!-- Renovação de Empréstimos -->
            <template v-if="perguntaAtual === 1 && respostasSelecionadas[1] === 'renovar_emprestimo'">
              <v-alert type="success">
                Linhas de Crédito Recomendadas:
                <ul>
                  <li>Renovação de Empréstimos</li>
                </ul>
              </v-alert>
            </template>

            <!-- Portabilidade -->
            <template v-if="perguntaAtual === 1 && respostasSelecionadas[1] === 'portabilidade'">
              <v-alert type="success">
                Linhas de Crédito Recomendadas:
                <ul>
                  <li>Portabilidade de Crédito</li>
                </ul>
              </v-alert>
            </template>

          </v-radio-group>

          <!-- Botões de navegação -->
          <v-row>
            <v-col cols="6">
              <v-btn class="line-buttonbeforeafter" v-if="perguntaAtual === 0" @click="proximaPergunta">Começar <img src="@/assets/arrow-right.svg" alt="seta direita" class="arrow-right-svg"></v-btn>
              <v-btn class="line-buttonbeforeafter" v-else @click="perguntaAnterior">Anterior</v-btn>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn class="line-buttonbeforeafter" v-if="fimDaRota === false && perguntaAtual !== 0"
                @click="proximaPergunta">Próxima</v-btn>
              <v-btn class="line-buttonbeforeafter" v-if="fimDaRota === true && perguntaAtual !== 0"
                @click="enviarResposta">Enviar
                Respostas</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>


      <v-alert type="success" v-if="mostrarResultados">
        Suas respostas foram enviadas! Confira abaixo as linhas de crédito
        recomendadas para você:
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
    </v-container>z
  </v-main>

</template>
<script>
import '@/styles/line.css';

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
      minDate_13: '2024-11-01',
      maxDate_13: '2024-12-31',
      minDate_IRPF: '',
      maxDate_IRPF: '',
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
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const dia = String(data.getDate()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
      };

      this.minDate_IRPF = formatarData(diaSeguinte);
      this.maxDate_IRPF = formatarData(fimDoAno);
    },
    definirRotaETotalDePerguntas() {
      if (this.respostasSelecionadas["pergunta_4"] === "13-terceiro") {
        this.rotaPerguntas = "/perguntas/13-terceiro";
        this.totalDePerguntas = 6;
      } else if (this.respostasSelecionadas["pergunta_4"] === "IRPF") {
        this.rotaPerguntas = "/perguntas/IRPF";
        this.totalDePerguntas = 6;
      } else if (this.respostasSelecionadas["pergunta_4"] === "FGTS") {
        this.rotaPerguntas = "/perguntas/FGTS";
        this.totalDePerguntas = 5;
      } else if (this.respostasSelecionadas['pergunta_4'] === 'credito_salario') {
        this.rotaPerguntas = "/perguntas/credito_salario";
        this.totalDePerguntas = 6;
      } else if (this.respostasSelecionadas['pergunta_4'] === 'credito_beneficio') {
        this.rotaPerguntas = "/perguntas/credito_beneficio";
        this.totalDePerguntas = 6;
      } else if (this.respostasSelecionadas['pergunta_4'] === 'emprestimo_automatico') {
        this.rotaPerguntas = "/perguntas/emprestimo_automatico";
        this.totalDePerguntas = 6;
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
      if (this.perguntaAtual === this.totalDePerguntas) {
        this.fimDaRota = true;
      }
      console.log('O usuário chegou no fim da rota? ' + this.fimDaRota);
      console.log('Pergunta atual: ' + this.perguntaAtual);
      console.log('Total de perguntas: ' + this.totalDePerguntas);
    },
    proximaPergunta() {
      console.log("Resposta da pergunta atual(" + this.perguntaAtual + "):" + this.respostasSelecionadas["pergunta_" + this.perguntaAtual]);

      this.definirRotaETotalDePerguntas();

      this.perguntaAtual++;

      if (this.rotaPerguntas !== '') {
        console.log('Rota atual: ' + this.rotaPerguntas + ' e total de perguntas: ' + this.totalDePerguntas);
      }
      this.definirFimDaRota();
    },
    perguntaAnterior() {
      if (this.perguntaAtual > 0) {
        this.perguntaAtual--;
      }
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
  created() {
    this.atualizarIntervaloDatas(); // Chamada ao carregar o componente
  },
};
</script>
