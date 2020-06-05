<template>
  <div class="navigation">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <router-link :key="item.url" :to="item.url">
            <v-list-item :key="item.text" link>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">{{
          $t("admin.navigation.title")
        }}</span>
      </v-toolbar-title>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <div class="navigation-profile-button" v-on="on">
            {{ user }}
            <v-icon class="ml-2" left>mdi-account-circle</v-icon>
          </div>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title class="logout">{{
              $t("common.logout")
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="home()">
            <v-list-item-title class="logout">{{
              $t("admin.navigation.home")
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    source: String
  },
  data: function() {
    return {
      dialog: false,
      drawer: null,
      user: "Admin",
      items: [
        {
          icon: "mdi-home",
          text: this.$t("admin.navigation.households"),
          url: "/dashboard/households"
        },
        {
          icon: "mdi-tag",
          text: this.$t("admin.navigation.tags"),
          url: "/dashboard/tags"
        },
        {
          icon: "mdi-map",
          text: this.$t("admin.navigation.cities"),
          url: "/dashboard/cities"
        },
        {
          icon: "mdi-newspaper",
          text: this.$t("admin.navigation.articles"),
          url: "/dashboard/articles"
        }
      ]
    };
  },
  methods: {
    ...mapActions(["userLogout"]),
    logout() {
      this.userLogout().then(() => {
        this.$router.push("/");
      });
    },
    home() {
      this.$router.push("/");
    }
  }
};
</script>
