
<template>
  <v-header>
    <v-toolbar-title>Seja Bem-vindo a Home!!!</v-toolbar-title>
      <navbar>
         <v-btn @click="navegar('/')"> Operações</v-btn>
        <v-btn @click="navegar('/')"> Linha de Credito</v-btn>
        <v-btn @click="navegar('/')"> Blog </v-btn>
        <v-btn @click="navegar('/Simul')">Simul</v-btn>
      </navbar>
  </v-header>
  <v-btn color="red" prepend-icon="$vuetify">
  Button
</v-btn>
  <v-footer>

  </v-footer>
</template>

<script>

export default {
  methods: {
    navegar(path) {
      this.$router.push(path)
    }
  },data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
}
</script>