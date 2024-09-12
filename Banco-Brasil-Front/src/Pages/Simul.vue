<template>
    <v-header>

        <nav>
        <v-btn @click="navegar('/')"> Home </v-btn>
        <v-btn @click="navegar('/')"> Operações</v-btn>
        <v-btn @click="navegar('/')"> Linha de Credito</v-btn>
        <v-btn @click="navegar('/')"> Blog </v-btn>
      
      </nav>

    </v-header>



    <v-footer>

    </v-footer>

</template>


<script>

export default {
  methods: {
    navegar(path) {
      this.$router.push(path)
    }
  }
}

</script>