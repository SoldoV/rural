import axios from "axios";
import { rootUrls } from "../../assets/_constants.js";
import i18n from "../../i18n.js";

const state = {
  tags: [],
  filters: [],
  householdTag: false,
  tagResp: false
};

const getters = {
  GET_TAGS: state => {
    return state.tags;
  },
  HOUSEHOLD_TAG_RESP: state => {
    return state.householdTag;
  },
  GET_FILTERS: state => {
    return state.filters;
  },
  GET_TAG_RESP: state => {
    return state.tagResp;
  }
};

const actions = {
  async fetchTags({ commit, rootState }, data) {
    await axios
      .get(`${rootUrls.URL}/tags`, {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken,
          "X-Localization": localStorage.getItem("Lang")
        },
        params: {
          ...data
        }
      })
      .then(response => {
        commit("STORE_TAGS", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  async fetchCategoryTags({ commit, rootState }, data) {
    await axios
      .get(`${rootUrls.URL}/categories/${data[1]}/tags`, {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken,
          "X-Localization": localStorage.getItem("Lang")
        },
        params: {
          ...data[0]
        }
      })
      .then(response => {
        commit("STORE_TAGS", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  async fetchFilters({ commit, rootState }, data) {
    await axios
      .get(`${rootUrls.URL}/categories/${data}/tags`, {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken,
          "X-Localization": localStorage.getItem("Lang")
        }
      })
      .then(response => {
        commit("STORE_FILTERS", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  async postTag({ dispatch, rootState, commit }, data) {
    await axios
      .post(`${rootUrls.URL}/tags`, data[0], {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {
        commit("STORE_TAG_RESP", true);
        dispatch("fetchCategoryTags", [
          {
            withTranslations: 1
          },
          data[1]
        ]);
      })
      .catch(error => {
        commit("STORE_TAG_RESP", false);
        console.log(error);
      });
  },
  async editTag({ dispatch, rootState, commit }, data) {
    await axios
      .put(`${rootUrls.URL}/tags/${data[0].id}`, data[0], {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {
        commit("STORE_TAG_RESP", true);
        dispatch("fetchCategoryTags", [
          {
            withTranslations: 1
          },
          data[1]
        ]);
      })
      .catch(error => {
        commit("STORE_TAG_RESP", false);
        console.log(error);
      });
  },
  async deleteTag({ dispatch, rootState, commit }, data) {
    await axios
      .delete(`${rootUrls.URL}/tags/${data[0]}`, {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {
        commit("STORE_TAG_RESP", true);
        dispatch("fetchCategoryTags", [
          {
            withTranslations: 1
          },
          data[1]
        ]);
      })
      .catch(error => {
        commit("STORE_TAG_RESP", false);
        console.log(error);
      });
  },
  async deleteHouseholdTag({ rootState }, data) {
    await axios
      .post(`${rootUrls.URL}/households/${data[0]}/tags`, data[1], {
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
  async postHouseholdTags({ commit, rootState }, data) {
    await axios
      .post(`${rootUrls.URL}/households/${data[1]}/tags`, data[0], {
        headers: {
          ...rootState.common.header,
          ...rootState.common.headerJson,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {
        commit("STORE_HOUSEHOLD_TAG_RESP", true);
      })
      .catch(error => {
        console.log(error);
        commit("STORE_HOUSEHOLD_TAG_RESP", false);
        commit("STORE_ERROR_MSG", `ERROR: ${i18n.t("modules.tag")}`, {
          root: true
        });
      });
  }
};

const mutations = {
  STORE_TAGS: (state, data) => {
    state.tags = data;
  },
  STORE_HOUSEHOLD_TAG_RESP: (state, data) => {
    state.householdTag = data;
  },
  STORE_FILTERS: (state, data) => {
    state.filters = data;
  },
  STORE_TAG_RESP: (state, data) => {
    state.tagResp = data;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
