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
@font-face {
  font-family: "Montserrat";
  src: url("./assets/fonts/Montserrat-Regular.ttf");
}

@font-face {
  font-family: "MontserratBold";
  src: url("./assets/fonts/Montserrat-Bold.ttf");
}
@font-face {
  font-family: "BalooPaaji2";
  src: url("./assets/fonts/BalooPaaji2-Regular.ttf");
}

@font-face {
  font-family: "BalooPaaji2Bold";
  src: url("./assets/fonts/BalooPaaji2-SemiBold.ttf");
}
html,
body {
  margin: 0 !important;
  padding: 0 !important;
  height: 100% !important;
  width: 100% !important;
}
#app {
  padding: 0 120px 0 120px;
  font-family: "Montserrat";

  .app-page {
    min-height: calc(100vh - 256px);
  }
}

@media only screen and (max-width: 964px) {
  #app {
    padding: 0 2em 0 2em;
    .app-page {
      min-height: calc(100vh - 426px);
    }
  }
}
</style>

