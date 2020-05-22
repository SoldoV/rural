import axios from 'axios';
import {
  rootUrls
} from '../../assets/_constants.js';
//import router from './../../index.js';


const state = {
  tags: [],
  categories: [],
  cities: [],
  singleHousehold: {},
  households: {},
  householdResp: false,
  editHouseholdResp: false,
  priceResp: false,
  householdIdResp: false,
  householdTag: false,
  platformResp: false,
  householdId: null,
  householdImage: false,
  errorMsg: "",
  headerJson: {
    "Content-Type": "application/json",
  },
  headerForm: {
    'Content-Type': 'multipart/form-data',
  },
  header: {
    "Accept": "aplication/json",
    "Authorization": "Bearer " + "2|KM3OZHyQetnnC4mONg05qd3rEnfwOUzTYKptPKXaJHos5CmUAvkuf2fYFSQV1Vpyeno7DDaQCvKBdyE2"
  },
}
const getters = {
  GET_TAGS: state => {
    return state.tags;
  },
  GET_CITIES: state => {
    return state.cities;
  },
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
  PRICE_RESP: state => {
    return state.householdResp;
  },
  PLATFORM_RESP: state => {
    return state.platformResp;
  },
  HOUSEHOLD_TAG_RESP: state => {
    return state.householdTag;
  },
  HOUSEHOLD_IMAGE_RESP: state => {
    return state.householdImage;
  },
  GET_ERROR_MSG: state => {
    return state.errorMsg;
  },
  GET_SINGLE_HOUSEHOLD: state => {
    return state.singleHousehold;
  },
}
const actions = {
  async fetchTags({
    commit,
    state
  }) {
    await axios.get(`${rootUrls.URL}/tags`, {
        headers: state.header
      })
      .then(response => {
        commit('STORE_TAGS', response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  async fetchHouseholds({
    state,
    commit,
  }, data) {
    await axios.get(`${rootUrls.URL}/households/?with[]=prices&with[]=images&with[]=platforms&with[]=tags&perPage=8&page=${data}`, {
        headers: state.header
      })
      .then(response => {
        commit('STORE_HOUSEHOLDS', response.data);
        commit('STORE_HOUSEHOLD_RESP', true);
      })
      .catch(error => {
        console.log(error);
      });
  },
  async getHouseholdById({
    state,
    commit,
  }, data) {
    await axios.get(`${rootUrls.URL}/households/${data}?with[]=prices&with[]=images&with[]=tags&with[]=platforms`, {
        headers: state.header
      })
      .then(response => {
        commit('STORE_HOUSEHOLD_BY_ID', response.data);
        commit('STORE_HOUSEHOLDID_RESP', true);
      })
      .catch(error => {
        console.log(error);
      });
  },
  async postTag({
    dispatch,
    state
  }, data) {
    await axios.post(`${rootUrls.URL}/tags`, data, {
        headers: state.header
      })
      .then(() => {
        dispatch("fetchTags")
      })
      .catch(error => {
        console.log(error);
      });
  },
  async editTag({
    dispatch,
    state
  }, data) {
    await axios.put(`${rootUrls.URL}/tags/${data.id}`, data, {
        headers: state.header
      })
      .then(() => {
        dispatch("fetchTags")
      })
      .catch(error => {
        console.log(error);
      });
  },
  async deleteTag({
    dispatch,
    state
  }, data) {
    await axios.delete(`${rootUrls.URL}/tags/${data}`, {
        headers: state.header
      })
      .then(() => {
        dispatch("fetchTags")
      })
      .catch(error => {
        console.log(error);
      });
  },
  async fetchCities({
    commit,
    state
  }) {
    await axios.get(`${rootUrls.URL}/cities`, {
        headers: state.header
      })
      .then(response => {
        commit('STORE_CITIES', response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  async postCity({
    dispatch,
    state
  }, data) {
    await axios.post(`${rootUrls.URL}/cities`, data, {
        headers: state.header
      })
      .then(() => {
        dispatch("fetchCities")
      })
      .catch(error => {
        console.log(error);
      });
  },
  async editCity({
    dispatch,
    state
  }, data) {
    await axios.put(`${rootUrls.URL}/cities/${data.id}`, data, {
        headers: state.header
      })
      .then(() => {
        dispatch("fetchCities")
      })
      .catch(error => {
        console.log(error);
      });
  },
  async deleteCity({
    dispatch,
    state
  }, data) {
    await axios.delete(`${rootUrls.URL}/cities/${data}`, {
        headers: state.header
      })
      .then(() => {
        dispatch("fetchCities")
      })
      .catch(error => {
        console.log(error);
      });
  },
  async postHousehold({
    state,
    commit
  }, data) {
    await axios.post(`${rootUrls.URL}/households`, data, {
        headers: state.header
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
    state,
    commit
  }, data) {
    await axios.put(`${rootUrls.URL}/households/${data[1]}`, data[0], {
        headers: state.header
      })
      .then(() => {
        commit('STORE_EDIT_HOUSEHOLD_RESP', true);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async postPrice({
    state,
    commit,
  }, data) {
    await axios.post(`${rootUrls.URL}/prices`, data, {
        headers: state.header
      })
      .then(() => {
        commit('STORE_PRICE_RESP', true);
      })
      .catch((error) => {
        console.log(error);
        commit('STORE_ERROR_MSG', "ERROR: Couldn't post price");
      });
  },
  async postPlatforms({
    commit,
    state
  }, data) {
    await axios.post(`${rootUrls.URL}/households/${data[1]}/platforms`, data[0], {
        headers: {
          ...state.header,
          ...state.headerJson
        }
      })
      .then(() => {
        commit('STORE_PLATFORM_RESP', true);
      })
      .catch((error) => {
        console.log(error);
        commit('STORE_ERROR_MSG', "ERROR: Couldn't post platforms");
      });
  },
  async postHouseholdTags({
    commit
  }, data) {
    await axios.post(`${rootUrls.URL}/households/${data[1]}/tags`, data[0], {
        headers: {
          ...state.header,
          ...state.headerJson
        }
      })
      .then(() => {
        commit('STORE_HOUSEHOLD_TAG_RESP', true);
      })
      .catch((error) => {
        console.log(error);
        commit('STORE_ERROR_MSG', "ERROR: Couldn't post tags");
      });
  },
  async postHouseholdImages({
    commit
  }, data) {
    await axios.post(`${rootUrls.URL}/households/${data[1]}/images`, data[0], {
        headers: {
          ...state.header,
          ...state.headerForm
        }
      })
      .then(() => {
        commit('STORE_HOUSEHOLD_IMAGE_RESP', true);
      })
      .catch((error) => {
        console.log(error);
        commit('STORE_ERROR_MSG', "ERROR: Couldn't post images");
      });
  },
}

const mutations = {
  STORE_TAGS: (state, data) => {
    state.tags = data;
  },
  STORE_CITIES: (state, data) => {
    state.cities = data;
  },
  STORE_HOUSEHOLD_RESP: (state, data) => {
    state.householdResp = data;
  },
  STORE_HOUSEHOLDID_RESP: (state, data) => {
    state.householdIdResp = data;
  },
  STORE_HOUSEHOLD_ID: (state, data) => {
    state.householdId = data;
  },
  STORE_PRICE_RESP: (state, data) => {
    state.priceResp = data;
  },
  STORE_PLATFORM_RESP: (state, data) => {
    state.platformResp = data;
  },
  STORE_HOUSEHOLD_TAG_RESP: (state, data) => {
    state.householdTag = data;
  },
  STORE_HOUSEHOLD_IMAGE_RESP: (state, data) => {
    state.householdImage = data;
  },
  STORE_ERROR_MSG: (state, data) => {
    state.errorMsg = data;
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
