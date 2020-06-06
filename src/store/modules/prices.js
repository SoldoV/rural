import axios from "axios";
import {
  rootUrls
} from "../../assets/_constants.js";
import i18n from "../../i18n.js"

const state = {
  priceResp: false
};

const getters = {
  PRICE_RESP: state => {
    return state.priceResp;
  }
};

const actions = {
  async deletePrice({
    rootState
  }, data) {
    await axios
      .delete(`${rootUrls.URL}/prices/${data}`, {
        headers: {
          ...rootState.common.header,
          ...rootState.common.headerJson,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
  },
  async postPrice({
    rootState,
    commit
  }, data) {
    await axios
      .post(`${rootUrls.URL}/prices`, data, {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {
        commit("STORE_PRICE_RESP", true);
      })
      .catch(error => {
        console.log(error);
        commit("STORE_PRICE_RESP", false);
        commit("STORE_ERROR_MSG", `ERROR: ${i18n.t('modules.price')}`, {
          root: true
        });
      });
  }
};

const mutations = {
  STORE_PRICE_RESP: (state, data) => {
    state.priceResp = data;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
