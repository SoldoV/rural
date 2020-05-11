<template>
  <div class="navigation">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <router-link :key="item.url" :to="'/dashboard' + item.url">
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
        <span class="hidden-sm-and-down">Admin dashboard</span>
      </v-toolbar-title>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <div class="navigation-profile-button" v-on="on">
            {{ user }}
            <v-icon left>mdi-account-circle</v-icon>
          </div>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: null,
    user: "Vinko Soldo",
    items: [
      { icon: "mdi-home", text: "Domaćinstva", url: "/domacinstva" },
      { icon: "mdi-tag", text: "Tagovi", url: "/tagovi" },
      { icon: "mdi-map", text: "Gradovi", url: "/gradovi" }
    ]
  })
};
</script>
<style>
</style>
