<template>
  <v-app>
    <Header v-if="$route.name != 'login'" />
    <router-view></router-view> 
    <Footer v-if="$route.name !== 'login'" />
  </v-app>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: 'App',
}
</script>
