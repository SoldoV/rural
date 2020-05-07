<template>
  <v-app id="inspire">
    <navigation />
    <v-content class="admin-dashboard-content">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Navigation from "./Navigation.vue";

export default {
  components: {
    Navigation
  },
  data: () => ({})
};
</script>

<style lang="scss" scoped>
.admin-dashboard-content {
  margin: 2em;
}
</style>

