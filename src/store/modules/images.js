import axios from "axios";
import { rootUrls } from "../../assets/_constants.js";
import i18n from "../../i18n.js";

const state = {
  householdImage: false,
  coverImage: null,
  coverImageResp: false
};

const getters = {
  HOUSEHOLD_IMAGE_RESP: state => {
    return state.householdImage;
  },
  GET_COVER_IMAGE: state => {
    return state.coverImage;
  },
  GET_COVER_IMAGE_RESP: state => {
    return state.coverImage;
  }
};

const actions = {
  async deleteImage({ rootState }, data) {
    await axios
      .delete(`${rootUrls.URL}/images/${data}`, {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
  },
  async postHouseholdImages({ commit, rootState }, data) {
    await axios
      .post(`${rootUrls.URL}/households/${data[1]}/images`, data[0], {
        headers: {
          ...rootState.common.header,
          ...rootState.common.headerForm,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {
        commit("STORE_HOUSEHOLD_IMAGE_RESP", true);
      })
      .catch(error => {
        console.log(error);
        commit("STORE_HOUSEHOLD_IMAGE_RESP", false);
        commit("STORE_ERROR_MSG", `ERROR: ${i18n.t("modules.images")}`, {
          root: true
        });
      });
  },
  async postCoverImage({ commit, rootState }, data) {
    await axios
      .post(`${rootUrls.URL}/cover`, data, {
        headers: {
          ...rootState.common.header,
          ...rootState.common.headerForm,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {
        commit("STORE_COVER_IMAGE_RESP", true);
      })
      .catch(error => {
        console.log(error);
        commit("STORE_COVER_IMAGE_RESP", false);
      });
  },
  async fetchCoverImage({ commit, rootState }) {
    await axios
      .get(`${rootUrls.URL}/cover`, {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then(res => {
        commit("STORE_COVER_IMAGE", res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const mutations = {
  STORE_HOUSEHOLD_IMAGE_RESP: (state, data) => {
    state.householdImage = data;
  },
  STORE_COVER_IMAGE: (state, data) => {
    state.coverImage = data;
  },
  STORE_COVER_IMAGE_RESP: (state, data) => {
    state.coverImage = data;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
