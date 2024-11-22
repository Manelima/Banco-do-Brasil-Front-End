<template>
  <v-app-bar class="home-header">
    
    <v-img src="@/images/bb.png" class="home-logo"></v-img>
    <div class="home-linha_preta_vertical"></div>

    <v-app-bar-title class="home-titulo_nav_bar">
      Banco do Brasil
    </v-app-bar-title>

    <v-btn to="/simul" class="home-buttongeral mx-1">Simular Investimentos</v-btn>
    <v-btn to="/operacoes" class="home-buttongeral mx-1">Operações</v-btn>
    <v-btn to="/linhas" class="home-buttongeral mx-1">Linhas de Crédito</v-btn>
    <v-btn to="/blog" class="home-buttongeral mx-1">Blog</v-btn>
    
  </v-app-bar>


  <v-main>
    <v-container>
    
      
    </v-container>
  </v-main>
  
    
  <v-footer app class="home-footer">
    
    <div class="home-footer-azul">
      <img src="@/assets/bb-yellow.png" alt="Logo Banco" class="bb-icon-home" />
      <div class="home-footer-column"> 
       
        
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

      <div class="home-footer-column2">
        
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
      <div class="home-footer-column3">
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
     
      <img class="acess-icon-home" src="@/assets/acess.png" alt="acess-icon">
      
    </div>
      <div class="home-footer-amarelo">
        <h3 class="home-texto-footer-location">
          © Banco do Brasil S/A - CNPJ 00.000.000/0001-91 SAUN QD 5 LT
          <br>B, Asa Norte, Brasília-DF, Brasil - CEP 70040-911
        </h3>
      </div>

     <div class="home-footer-links">
        <div class="home-footer-button-group">
          <img src="@/assets/eye-outline.svg" alt="Eye" class="home-eye-footer" />
          <v-btn class="home-texto-footer-priv">Minha privacidade</v-btn>
        </div>
        <div class="home-footer-button-group">
          <img src="@/assets/help-circle-outline.svg" alt="Help" class="home-help-footer" />
          <v-btn to="/blog" class="home-texto-footer-help">Ajuda</v-btn>
        </div>
     </div>

     
  </v-footer>
  
 
</template>
  
  <script>
  import "@/styles/Home.css";

  export default {
    name: 'Home',
  }
  </script>
  
  <style>
 
  </style>
  