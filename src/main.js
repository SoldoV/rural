import Vue from "vue";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./style/main.scss";
import * as VueGoogleMaps from "vue2-google-maps";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import "tiptap-vuetify/dist/main.css";
import "vuetify/dist/vuetify.min.css";
import i18n from "./i18n";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA1cOz-WMZA3eAYoagyQrXG5U1LZSL3BCg",
    libraries: "places"
  }
});

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: "mdi"
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
