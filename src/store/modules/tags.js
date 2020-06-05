import axios from "axios";
import { rootUrls } from "../../assets/_constants.js";

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
  async fetchTags({ commit, rootState }) {
    await axios
      .get(`${rootUrls.URL}/tags`, {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken
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
          Authorization: "Bearer " + rootState.common.loginToken
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
      .post(`${rootUrls.URL}/tags`, data, {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {
        commit("STORE_TAG_RESP", true);
        dispatch("fetchTags");
      })
      .catch(error => {
        commit("STORE_TAG_RESP", false);
        console.log(error);
      });
  },
  async editTag({ dispatch, rootState, commit }, data) {
    await axios
      .put(`${rootUrls.URL}/tags/${data.id}`, data, {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {
        commit("STORE_TAG_RESP", true);
        dispatch("fetchTags");
      })
      .catch(error => {
        commit("STORE_TAG_RESP", false);
        console.log(error);
      });
  },
  async deleteTag({ dispatch, rootState, commit }, data) {
    await axios
      .delete(`${rootUrls.URL}/tags/${data}`, {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {
        commit("STORE_TAG_RESP", true);
        dispatch("fetchTags");
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
        commit("STORE_ERROR_MSG", "ERROR: Couldn't post tags");
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
