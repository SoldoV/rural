import axios from "axios";
import {
  rootUrls
} from "../../assets/_constants.js";
import i18n from "../../i18n.js"

const state = {
  singleHousehold: {},
  households: {},
  householdResp: false,
  editHouseholdResp: false,
  householdIdResp: false,
  householdId: null,
  homepageFilter: null,
  homepageSearchFilter: null
};

const getters = {
  GET_HOUSEHOLDS: state => {
    return state.households;
  },
  HOUSEHOLD_RESP: state => {
    return state.householdResp;
  },
  GET_HOUSEHOLDID_RESP: state => {
    return state.householdIdResp;
  },
  GET_HOUSEHOLD_ID: state => {
    return state.householdId;
  },
  GET_EDIT_HOUSEHOLD_RESP: state => {
    return state.householdIdResp;
  },
  GET_SINGLE_HOUSEHOLD: state => {
    return state.singleHousehold;
  },
  GET_HOMEPAGE_FILTER: state => {
    return state.homepageFilter;
  },
  GET_HOMEPAGE_SEARCH_FILTER: state => {
    return state.homepageSearchFilter;
  }
};
var qs = require("qs");

const actions = {
  async fetchHouseholds({
    rootState,
    commit
  }, data) {
    await axios
      .get(`${rootUrls.URL}/households`, {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken
        },
        params: {
          filterRelation: {
            ...data[2],
            ...data[3]
            // prices: {
            //   price: [">40", "<50"],
            // }
          },
          filter: {
            ...data[4],
            ...data[5]
          },
          with: ["prices", "images", "platforms", "tags"],
          perPage: data[1],
          page: data[0]
        },
        paramsSerializer: function (params) {
          return qs.stringify(params, {
            arrayFormat: "brackets"
          });
        }
      })
      .then(response => {
        commit("STORE_HOUSEHOLDS", response.data);
        commit("STORE_HOUSEHOLD_RESP", true);
      })
      .catch(error => {
        console.log(error);
        commit("STORE_HOUSEHOLD_RESP", false);
      });
  },
  async getHouseholdById({
    rootState,
    commit
  }, data) {
    await axios
      .get(
        `${rootUrls.URL}/households/${data}?with[]=prices&with[]=images&with[]=tags&with[]=platforms`, {
          headers: {
            ...rootState.common.header,
            Authorization: "Bearer " + rootState.common.loginToken
          }
        }
      )
      .then(response => {
        commit("STORE_HOUSEHOLD_BY_ID", response.data);
        commit("STORE_HOUSEHOLDID_RESP", true);
      })
      .catch(error => {
        console.log(error);
        commit("STORE_HOUSEHOLDID_RESP", false);
      });
  },
  async postHousehold({
    rootState,
    commit
  }, data) {
    await axios
      .post(`${rootUrls.URL}/households`, data, {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then(response => {
        commit("STORE_HOUSEHOLD_ID", response.data.id);
        commit("STORE_HOUSEHOLD_RESP", true);
      })
      .catch(error => {
        console.log(error);
        commit("STORE_HOUSEHOLD_RESP", false);
        commit("STORE_ERROR_MSG", `ERROR: ${i18n.t('modules.households')}`, {
          root: true
        });
      });
  },
  async editHousehold({
    rootState,
    commit
  }, data) {
    await axios
      .put(`${rootUrls.URL}/households/${data[1]}`, data[0], {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {
        commit("STORE_EDIT_HOUSEHOLD_RESP", true);
      })
      .catch(error => {
        console.log(error);
        commit("STORE_EDIT_HOUSEHOLD_RESP", false);
      });
  },
  async deleteHousehold({
    dispatch,
    rootState
  }, data) {
    await axios
      .delete(`${rootUrls.URL}/households/${data}`, {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {
        dispatch("fetchTags");
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const mutations = {
  STORE_HOUSEHOLD_RESP: (state, data) => {
    state.householdResp = data;
  },
  STORE_HOUSEHOLDID_RESP: (state, data) => {
    state.householdIdResp = data;
  },
  STORE_HOUSEHOLD_ID: (state, data) => {
    state.householdId = data;
  },
  STORE_HOUSEHOLDS: (state, data) => {
    state.households = data;
  },
  STORE_HOUSEHOLD_BY_ID: (state, data) => {
    state.singleHousehold = data;
  },
  STORE_EDIT_HOUSEHOLD_RESP: (state, data) => {
    state.editHouseholdResp = data;
  },
  STORE_FILTER: (state, data) => {
    state.homepageFilter = data;
  },
  STORE_SEARCH_FILTER: (state, data) => {
    state.homepageSearchFilter = data;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
