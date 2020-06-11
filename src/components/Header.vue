<template>
  <div class="header">
    <v-navigation-drawer
      class="hidden-lg-and-up"
      v-model="sidebar"
      v-if="sidebar"
      app
    >
      <v-list>
        <template v-for="item in menuItems">
          <router-link :key="item.path" :to="item.path">
            <v-list-item :key="item.title" link>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </template>
        <v-menu v-if="IS_LOGGED_IN()" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn depressed class="navigation-profile-button mt-5" v-on="on">
              Admin
              <v-icon class="ml-2" left>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="logout">
              <v-list-item-title class="logout">{{
                $t("common.logout")
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="dashboard()">
              <v-list-item-title class="logout">{{
                $t("common.dashboard")
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="header-toolbar" flat>
      <span class="hidden-lg-and-up header-menu">
        <v-app-bar-nav-icon @click.stop="sidebar = !sidebar" />
      </span>
      <v-toolbar-title>
        <router-link
          to="/"
          tag="div"
          class="header-logo"
          style="cursor: pointer"
        >
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-md-and-down">
        <v-tabs :optional="true" class="header-toolbar-tabs" align-with-title>
          <v-tab v-for="item in menuItems" :key="item.title" :to="item.path">
            {{ item.title }}
          </v-tab>
        </v-tabs>
      </v-toolbar-items>
      <v-menu v-if="IS_LOGGED_IN()" class="hidden-md-and-down" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            depressed
            class="navigation-profile-button hidden-md-and-down"
            v-on="on"
          >
            Admin
            <v-icon class="ml-2" left>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title class="logout">{{
              $t("common.logout")
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="dashboard()">
            <v-list-item-title class="logout">{{
              $t("common.dashboard")
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      appTitle: "Awesome App",
      sidebar: false,
      menuItems: [
        { title: this.$t("header.households"), path: "/households" },
        { title: this.$t("header.news"), path: "/news" },
        { title: this.$t("header.about"), path: "/about" },
        { title: this.$t("header.contact"), path: "/contact" }
      ]
    };
  },
  methods: {
    ...mapActions(["userLogout"]),
    ...mapGetters(["IS_LOGGED_IN"]),
    logout() {
      this.userLogout().then(() => this.$router.push("/"));
    },
    dashboard() {
      this.$router.push("/dashboard/households");
    }
  },
  beforeCreate() {
    if (localStorage.Lang != null) this.$i18n.locale = localStorage.Lang;
    else this.$i18n.locale = "en";
  }
};
</script>
