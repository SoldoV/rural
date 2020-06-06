<template>
  <div>
    <navigation />
    <v-content class="admin-dashboard-content">
      <router-view />
    </v-content>
  </div>
</template>

<script>
import Navigation from "../../components/Admin/Navigation.vue";

export default {
  components: {
    Navigation
  },
  data: () => ({})
};
</script>
