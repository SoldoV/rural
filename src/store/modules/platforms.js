import axios from "axios";
import { rootUrls } from "../../assets/_constants.js";
import i18n from "../../i18n.js";

const state = {
  platformResp: false
};

const getters = {
  PLATFORM_RESP: state => {
    return state.platformResp;
  }
};

const actions = {
  async postPlatforms({ commit, rootState }, data) {
    await axios
      .post(`${rootUrls.URL}/households/${data[1]}/platforms`, data[0], {
        headers: {
          ...rootState.common.header,
          ...rootState.common.headerJson,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {
        commit("STORE_PLATFORM_RESP", true);
      })
      .catch(error => {
        console.log(error);
        commit("STORE_PLATFORM_RESP", false);
        commit("STORE_ERROR_MSG", `ERROR: ${i18n.t("modules.platforms")}`, {
          root: true
        });
      });
  }
};

const mutations = {
  STORE_PLATFORM_RESP: (state, data) => {
    state.platformResp = data;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
