import axios from 'axios';
import {
  rootUrls
} from '../../assets/_constants.js';


const state = {
  singleHousehold: {},
  households: {},
  householdResp: false,
  editHouseholdResp: false,
  householdIdResp: false,
  householdId: null,

}
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
}
const actions = {
  async fetchHouseholds({
    rootState,
    commit,
  }, data) {
    await axios.get(`${rootUrls.URL}/households/?with[]=prices&with[]=images&with[]=platforms&with[]=tags&perPage=${data[1]}&page=${data[0]}`, {
        headers: {
          ...rootState.common.header,
          "Authorization": "Bearer " + rootState.common.loginToken
        }
      })
      .then(response => {
        commit('STORE_HOUSEHOLDS', response.data);
        commit('STORE_HOUSEHOLD_RESP', true);
      })
      .catch(error => {
        console.log(error);
        commit('STORE_HOUSEHOLD_RESP', false);
      });
  },
  async getHouseholdById({
    rootState,
    commit,
  }, data) {
    await axios.get(`${rootUrls.URL}/households/${data}?with[]=prices&with[]=images&with[]=tags&with[]=platforms`, {
        headers: {
          ...rootState.common.header,
          "Authorization": "Bearer " + rootState.common.loginToken
        }
      })
      .then(response => {
        commit('STORE_HOUSEHOLD_BY_ID', response.data);
        commit('STORE_HOUSEHOLDID_RESP', true);
      })
      .catch(error => {
        console.log(error);
        commit('STORE_HOUSEHOLDID_RESP', false);
      });
  },
  async postHousehold({
    rootState,
    commit
  }, data) {
    await axios.post(`${rootUrls.URL}/households`, data, {
        headers: {
          ...rootState.common.header,
          "Authorization": "Bearer " + rootState.common.loginToken
        }
      })
      .then((response) => {
        commit('STORE_HOUSEHOLD_ID', response.data.id);
        commit('STORE_HOUSEHOLD_RESP', true);
      })
      .catch((error) => {
        console.log(error);
        commit('STORE_HOUSEHOLD_RESP', false);
        commit('STORE_ERROR_MSG', "ERROR: Couldn't post household");
      });
  },
  async editHousehold({
    rootState,
    commit
  }, data) {
    await axios.put(`${rootUrls.URL}/households/${data[1]}`, data[0], {
        headers: {
          ...rootState.common.header,
          "Authorization": "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {
        commit('STORE_EDIT_HOUSEHOLD_RESP', true);
      })
      .catch((error) => {
        console.log(error);
        commit('STORE_EDIT_HOUSEHOLD_RESP', false);
      });
  },
}

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
}

export default {
  state,
  getters,
  mutations,
  actions
}
