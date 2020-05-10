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
        { title: "Domaćinstva", path: "/home" },
        { title: "Novosti", path: "/news" },
        { title: "O nama", path: "/about" },
        { title: "Kontakt", path: "/contact" }
      ]
    };
  }
};
</script>

<style lang="scss">
a {
  text-decoration: none;
}

.header {
  .header-buttons {
    display: flex;
    flex-flow: row nowrap !important;
  }

  .header-log-in,
  .header-sign-up {
    border-radius: 4px;
    width: 116px;
    height: 36px;
    font-size: 14px;
    font-weight: 600;
    line-height: 17.07px;
    text-transform: none !important;
  }

  .header-sign-up {
    border: 1px solid rgba(0, 0, 0, 0.12);
  }

  .header-log-in {
    margin-right: 16px;
    margin-left: 16px;
    box-shadow: 0 10px 20px 0 rgba(49, 150, 71, 0.25) !important;
    background-color: #319647 !important;
    color: white !important;
  }

  .v-toolbar__items {
    height: 48px !important;
  }

  .v-tab {
    color: rgba(0, 0, 0, 0.87);
    font-size: 14px;
    text-transform: capitalize;
  }

  .v-tabs-slider {
    color: #319647 !important;
  }

  .v-tab--active {
    color: #000 !important;
    font-family: "MontserratBold";
  }
  .header-buttons-sidebar {
    display: flex;
    flex-direction: column !important;
    align-items: center;
    justify-content: center;

    .header-log-in {
      margin: 2em 0 2em 0;
    }
  }
  .header-toolbar,
  .v-toolbar__content {
    padding: 0px !important;
    height: 126px !important;
    width: 100%;
  }

  .header-toolbar {
    display: flex;
    justify-content: center;
  }

  .header-menu {
    margin-right: 16px;

    .v-app-bar__nav-icon {
      left: -11px;
    }
  }

  .header-logo {
    width: 180px;
    height: 35px;
    background-image: url("../assets/logoHeader.svg");
  }
}
</style>
