<template>
    <v-main>
        <div class="lados-container">
            
            <div class="lado-esquerdo">
                <div class="background-login">
                    <br>
                    <div class="header-container">
                        <img class = "header-logo" src="@/images/bb2.png">
                        <div class = "header-line"></div>
                        <h1 class = "header-texto">Autoatendimento</h1>
                    </div>
                    
                    <div class="apresentacao-container">
                        <h2 class="apresentacao-texto1">Acesse sua conta</h2>
                        <h2 class="apresentacao-texto2">Banco do Brasil</h2>
                    </div>
        
                    <div class="formulario-container">
                        
                        <h2 class="formulario-texto">Agência e Conta</h2>
                        
                        <form class="login-form" @submit.prevent="login">
                            <div class="input-row">
                                <div class="input-group row">
                                    <label for="agencia">Agência</label>
                                    <input type="text" id="agencia" name="agencia" v-model="agencia" required>
                                </div>
                                <div class="input-group row">
                                    <label for="conta">Conta</label>
                                    <input type="text" id="conta" name="conta" v-model="conta" required>
                                </div>
                            </div>

                            <div class="input-group full-width">
                                <label for="senha">Senha</label>
                                <input type="password" id="senha" name="senha" v-model="senha" required>
                            </div>

                            <div class="btn-link-container">
                                <button type="submit" class="btn-entrar">ENTRAR</button>
                                <a href="#" class="forgot-password">Esqueci minha senha</a>
                            </div>
                        </form>

                    </div>
                </div>
            
            </div>                
    
            <div class="lado-direito">
                <img class="lado-direito-img" src="@/images/laptop_woman_login.png">
            </div>
        </div>



    </v-main>
</template>

<script>
import "@/styles/login.css";
import "@/styles/reset.css";
import axios from 'axios';

export default {
    name: 'Login',
    data() {
        
        return {
            agencia: '',
            conta: '',
            senha: ''
        };
    },
    methods: {
        async login() {
            try {
                const api = axios.create({
                    baseURL: 'https://sought-hare-ultimate.ngrok-free.app',
                    timeout: 5000,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const response = await api.post('/cliente/login', { 
                    agencia: this.agencia, 
                    conta: this.conta, 
                    senha: this.senha 
                });

                if (response.data) {
                    console.log("Login bem-sucedido:", response.data);
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    localStorage.setItem('clienteNome', JSON.stringify(response.data.clienteNome));
                    this.$router.push('/');
                }
    
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Login ou senha inválidos';
                console.error("Erro ao logar:", error);

                this.agencia = '';
                this.conta = '';
                this.senha = '';

                this.mostrarMsg = true;
            }
        }
    }
};
</script>
