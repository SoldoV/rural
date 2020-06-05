import axios from "axios";
import { rootUrls } from "../../assets/_constants.js";

const state = {
  loginToken: localStorage.getItem("access_token") || null,
  errorMsg: "",
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
        commit("STORE_ERROR_MSG", "ERROR: Couldn't log in");
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
