<template>
  <v-app-bar class="blog-header">
    <v-img src="@/images/bb.png" class="line-logo"></v-img>
    <div class="blog-linha_preta_vertical"></div>
    <v-toolbar-title class="blog-titulo_nav_bar">Banco do Brasil</v-toolbar-title>

    <v-btn to="/" class="blog-buttongeral mx-1">Home</v-btn>
    <v-btn to="/simul" class="blog-buttongeral mx-1">Meus investimentos</v-btn>
    <v-btn to="/linhas" class="blog-buttongeral mx-1">Linhas de Crédito</v-btn>
    <v-btn to="/Operacoes" class="blog-buttongeral mx-1">Operações</v-btn>
    
   

  </v-app-bar>


  <v-main>
    <v-container>
      
  <div>
 
   
  </div>

    </v-container>

  </v-main>

  
  <v-footer class="blog-footer">
    
    <div class="blog-footer-azul">
      <img src="@/assets/bb-yellow.png" alt="Logo Banco" class="bb-icon-blog" />
      <div class="blog-footer-column"> 
       
        
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

      <div class="blog-footer-column2">
        
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
      <div class="blog-footer-column3">
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
     
      <img class="acess-icon-blog" src="@/assets/acess.png" alt="acess-icon">
      
    </div>
      <div class="blog-footer-amarelo">
        <h3 class="blog-texto-footer-location">
          © Banco do Brasil S/A - CNPJ 00.000.000/0001-91 SAUN QD 5 LT
          <br>B, Asa Norte, Brasília-DF, Brasil - CEP 70040-911
        </h3>
      </div>

     <div class="blog-footer-links">
        <div class="blog-footer-button-group">
          <img src="@/assets/eye-outline.svg" alt="Eye" class="blog-eye-footer" />
          <v-btn class="blog-texto-footer-priv">Minha privacidade</v-btn>
        </div>
        <div class="blog-footer-button-group">
          <img src="@/assets/help-circle-outline.svg" alt="Help" class="blog-help-footer" />
          <v-btn to="/blog" class="blog-texto-footer-help">Ajuda</v-btn>
        </div>
     </div>

     
  </v-footer>

</template>
  
  <script>
   import "@/styles/Blog.css";
   

   
  export default {
    name: 'Blog',
  }
  </script>
  
  <style>
 
  </style>
  