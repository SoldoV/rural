import axios from "axios";
import { rootUrls } from "../../assets/_constants.js";
import i18n from "../../i18n.js";

const state = {
  loginToken: localStorage.getItem("access_token") || null,
  errorMsg: "",
  contactResp: "",
  headerJson: {
    "Content-Type": "application/json"
  },
  headerForm: {
    "Content-Type": "multipart/form-data"
  },
  header: {
    Accept: "aplication/json",
    "Access-Control-Allow-Origin": "*"
  }
};

const getters = {
  GET_ERROR_MSG: state => {
    return state.errorMsg;
  },
  GET_LOGIN_TOKEN: state => {
    return state.loginToken;
  },
  GET_CONTACT_RESP: state => {
    return state.contactResp;
  },
  IS_LOGGED_IN: state => {
    return state.loginToken !== null;
  }
};

const actions = {
  async userLogin({ commit }, data) {
    await axios
      .post(`${rootUrls.URL}/auth/login`, data, {
        headers: {
          ...state.header,
          ...state.headerJson,
          Authorization: "Bearer " + state.loginToken
        }
      })
      .then(res => {
        localStorage.setItem("access_token", res.data);
        commit("STORE_LOGIN_TOKEN", res.data);
      })
      .catch(error => {
        console.log(error);
        commit("STORE_ERROR_MSG", `ERROR: ${i18n.t("modules.login")}`);
      });
  },
  async sendContactForm({ commit }, data) {
    await axios
      .post(`${rootUrls.URL}/send_mail`, data, {
        headers: {
          ...state.header,
          ...state.headerJson
        }
      })
      .then(() => {
        commit("STORE_CONTACT_RESP", true);
      })
      .catch(error => {
        console.log(error);
        commit("STORE_CONTACT_RESP", false);
      });
  },
  userLogout({ getters, commit }) {
    if (getters.IS_LOGGED_IN) {
      localStorage.removeItem("access_token");
      commit("DESTROY_TOKEN");
    }
  }
};

const mutations = {
  STORE_ERROR_MSG: (state, data) => {
    state.errorMsg = data;
  },
  STORE_LOGIN_TOKEN: (state, data) => {
    state.loginToken = data;
  },
  STORE_LOGIN_RESP: (state, data) => {
    state.loginResp = data;
  },
  STORE_CONTACT_RESP: (state, data) => {
    state.contactResp = data;
  },
  DESTROY_TOKEN: state => {
    state.loginToken = null;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
