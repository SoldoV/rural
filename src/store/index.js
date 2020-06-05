import Vue from "vue";
import Vuex from "vuex";
import tags from "./modules/tags.js";
import common from "./modules/common.js";
import households from "./modules/households.js";
import images from "./modules/images.js";
import articles from "./modules/articles.js";
import cities from "./modules/cities.js";
import prices from "./modules/prices.js";
import platforms from "./modules/platforms.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    tags,
    common,
    households,
    images,
    articles,
    cities,
    prices,
    platforms
  }
});
