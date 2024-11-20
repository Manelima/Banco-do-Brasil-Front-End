<template>
    <v-main>
        <v-container>
            <v-row class="login-conjunto_form_imagem">
                <v-col class="login-lado_form" cols="5">
                    <v-row class="login-elementos_top_form">
                        <v-img src="../images/bb2.png" width="55" max-width="55" height="55"
                            style="margin-inline: 0;"></v-img>
                        <div class="login-div_line_form"></div>
                        <h2 class="login-titulo_superior_form">Autoatendimento</h2>
                    </v-row>
                    <v-col class="login-col_titulos_form">
                        <h1 class="login-titulo_2_form">Acesse sua conta</h1>
                        <h1 class="login-titulo_3_form">Banco do Brasil</h1>
                    </v-col>
                    <v-col class="login-col_form">
                        <v-form class="login-form" height="500">
                            <h2 class="login-titulo_interno_form">Agência e Conta</h2>
                            <v-row class="login-row_interno_1_form">
                                <v-col cols="6">
                                    <v-text-field primary v-model.number="agencia" label="Agência" variant="outlined"
                                        type="number" class="login-campo_1_form"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field v-model.number="conta" label="Conta" variant="outlined" type="number"
                                        class="login-campo_2_form"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="login-row_interno_2_form">
                                <v-col cols="12">
                                    <v-text-field v-model="senha" label="Senha" variant="outlined" type="password"
                                        class="login-campo_3_form"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="login-row_interno_3_form">
                                <v-btn @click="entrar" class="login-btn_entrar_form" color="#FCFC30">Entrar</v-btn>
                            </v-row>
                            <v-row class="login-row_interno_4_form d-flex align-center justify-center">
                                <router-link to="/esqueci-minha-senha" class="login-link_esqueci_senha_form">Esqueci minha senha</router-link>
                            </v-row>
                        </v-form>
                    </v-col>
                </v-col>
                <v-col class="login-lado_img_form" cols="6">
                    <v-img class="login-img_form" src="../images/laptop_woman_login.png"></v-img>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>

import "@/styles/login.css";

export default {
    data() {
        return {
            agencia: 0,
            conta: 0,
            senha: '',
        }
    },
    methods: {
    },
    created() {

    }
}

</script>