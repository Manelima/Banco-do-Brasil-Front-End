<template>
    <v-footer class="footer mx-0">

        <div class="footer-azul">
            <img src="@/assets/bb-yellow.png" alt="Logo Banco" class="bb-icon-footer" />
            <div class="footer-column">


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

            <div class="footer-column2">

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
            <div class="footer-column3">
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

            <img class="acess-icon-line" src="@/assets/acess.png" alt="acess-icon">

        </div>
        <div class="footer-amarelo">
            <h3 class="texto-footer-location">
                © Banco do Brasil S/A - CNPJ 00.000.000/0001-91 SAUN QD 5 LT
                <br>B, Asa Norte, Brasília-DF, Brasil - CEP 70040-911
            </h3>
        </div>

        <div class="footer-links">
            <div class="footer-button-group">
                <img src="@/assets/eye-outline.svg" alt="Eye" class="eye-footer" />
                <v-btn variant="text" class="texto-footer-priv">Minha privacidade</v-btn>
            </div>
            <div class="footer-button-group">
                <img src="@/assets/help-circle-outline.svg" alt="Help" class="help-footer" />
                <p class="texto-footer-help">AJUDA</p>
            </div>
        </div>
    </v-footer>
</template>

<style>
/* ================= FOOTER ================ */
.footer {
    position: relative; 
    bottom: 0; 
    width: 100%; 
    display: flex; 
    flex-direction: column; 
    margin-inline: 0!important;
    padding-inline: 0!important;
    margin-bottom: 0!important;
    padding-bottom: 0!important;
    font-family: "BancoDoBrasilTextos-Regular";
}

.footer-links{
    margin-right: 10rem;
}


.footer-amarelo {
background-color: #fcfc30; /* Cor de fundo amarela */
width: 100%!important; /* Largura total */
height: 50px; /* Altura da parte amarela */
display: flex; /* Usar flexbox para organização */
justify-content: space-between; /* Espaçamento entre os elementos */
align-items: center; /* Centralizar os itens verticalmente */
padding: 0 5%; /* Espaçamento interno */
margin-bottom: 0!important;
padding-bottom: 0!important;
}
.footer-azul {
background-color: #465EFF!important;
width: 100%!important; 
height: 202px; 
display: flex; 
align-items: center; 
justify-content: center; 
color: #fff; 
}
/* Estilo para o texto */
.texto-footer-location {
color: #000; 
font-size: 14px; 
text-align: left; 
margin-left: 5%;
}

.texto-footer-priv{
margin-left: 05%;
background: transparent;
margin-bottom: 22%;
}

.texto-footer-help{
    background: transparent;
    margin-left: 05%;
    margin-bottom: 22%;
    cursor: pointer;
}
.texto-footer-help:hover{
    background: transparent;
}
.footer-button-group {
display: flex;
height: 0;
align-items: center;
}
.footer-column{
display: inline;
margin-right: 10%;
}
.footer-column2{
display: inline;
margin-right: 10%;
}
.footer-column3{
    display: inline;
  margin-right: 10%;
}
.p-title-text{
font-size: 16px;
line-height: 18.16px;
}
.p-sub-text{
font-size: 20px;
line-height: 23.2px;
}

/* ================= SVG ================ */
.bb-icon-footer {
width: 50px; 
height: 50px;
margin-left: 1.5rem;
margin-right: 7.5%;
} 

.eye-footer{
margin-bottom: 20%;
margin-left: 250%;
width: 30px;
height: 30px;	
}

.help-footer{
margin-bottom: 20%;
margin-left: 365%;
  width: 30px; 
height: 30px;
}

.acess-icon-blog{
    width: 108px;
  height: 45px;
}

@font-face {
    font-family: 'BancoDoBrasilTextos-Bold';
    src: url('@/assets/fonts/BancoDoBrasilTextos-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'BancoDoBrasilTextos-Medium';
    src: url('@/assets/fonts/BancoDoBrasilTextos-Medium.ttf') format('truetype');
    font-weight: 500; 
    font-style: normal;
}

@font-face {
    font-family: 'BancoDoBrasilTextos-Regular';
    src: url('@/assets/fonts/BancoDoBrasilTextos-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

</style>

<script>
export default {
  name: "Footer",
};
</script>