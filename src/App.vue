<template>
  <v-app id="app">
    <Header v-if="!$route.fullPath.includes('dashboard')" />
    <router-view class="app-page" />
    <Footer v-if="!$route.fullPath.includes('dashboard')" />
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  data: () => ({
    //
  })
};
</script>
<style lang="scss">
</style>

