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
        <div class="header-buttons header-buttons-sidebar">
          <v-btn depressed class="header-log-in">Registracija</v-btn>
          <v-btn depressed outlined class="header-sign-up">Prijavite se</v-btn>
        </div>
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
        <v-tabs class="header-toolbar-tabs" align-with-title>
          <v-tab v-for="item in menuItems" :key="item.title" :to="item.path">
            {{ item.title }}
          </v-tab>
        </v-tabs>
      </v-toolbar-items>
      <div class="header-buttons hidden-md-and-down">
        <v-btn depressed class="header-log-in">Registracija</v-btn>
        <v-btn depressed outlined class="header-sign-up">Prijavite se</v-btn>
      </div>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appTitle: "Awesome App",
      sidebar: false,
      menuItems: [
        { title: "Domaćinstva", path: "/dashboard" },
        { title: "Novosti", path: "/news" },
        { title: "O nama", path: "/about" },
        { title: "Kontakt", path: "/contact" }
      ]
    };
  }
};
</script>
