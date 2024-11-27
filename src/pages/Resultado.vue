<template>
 <div class="result-container">
        <div class="result-lado-esquerdo">
            <div class="result-infos">
                <h1 class="result-infos-titulo">A Linha de Crédito ideal para você</h1>

                <h2 class="result-infos-subtitulo-yellow">Nome da Linha de Credito</h2>
                <p class="result-infos-conteudo descricao-da-linha">Descrição da linha de Credito </p>

                <h2 class="result-infos-subtitulo-yellow">Valor do Empréstimo</h2>
                <p class="result-infos-conteudo">R$1500,00</p>

                <h2 class="result-infos-subtitulo-yellow">Quantidade de Parcelas</h2>
                <p class="result-infos-conteudo">9</p>

                <h2 class="result-infos-subtitulo">Valor das Parcelas</h2>
                <p class="result-infos-conteudo">R$120,00</p>
                
                <h2 class="result-infos-subtitulo">Valor Total com Juros</h2>
                <p class="result-infos-conteudo">R$2140,58</p>

                <h2 class="result-infos-subtitulo">Taxa de Juros Mensal</h2>
                <p class="result-infos-conteudo">1,25%</p>

                <h2 class="result-infos-subtitulo">Taxa de Juros Total</h2>
                <p class="result-infos-conteudo"> 12,8%</p>
            </div>

            <button class="result-btn-contratar">
                <a href="http://" target="_blank" rel="noopener noreferrer">Contratar</a>
            </button>
        </div>

        <div class="result-lado-direito">
            <img src="@/images/threepersons.png" alt="imagem de homem no pc">
        </div>
    </div>
 

</template>
 <script>
 import "@/styles/Resultados.css";
 import dataExportada from '@/pages/Linhas.vue';
 
export default {
    name: 'Resultado',
}
</script>