import axios from 'axios';
import {
  rootUrls
} from '../../assets/_constants.js';
//import router from './../../index.js';


const state = {
  tags: [],
  categories: [],
  cities: [],
  householdResp: false,
  priceResp: false,
  platformResp: false,
  householdId: null,
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
  HOUSEHOLD_RESP: state => {
    return state.householdResp;
  },
  GET_HOUSEHOLD_ID: state => {
    return state.householdId;
  },
  PRICE_RESP: state => {
    return state.householdResp;
  },
  PLATFORM_RESP: state => {
    return state.platformResp;
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
      .catch(() => {
        commit('STORE_HOUSEHOLD_RESP', false);
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
        console.log("cijena");
        commit('STORE_PRICE_RESP', true);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async postPlatforms({
    state,
    commit,
  }, data) {
    await axios.post(`${rootUrls.URL}/household_platforms`, data, {
        headers: state.header
      })
      .then(() => {
        console.log("plaforma");
        commit('STORE_PLATFORM_RESP', true);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async postHouseholdTags({
    state,
  }, data) {
    await axios.post(`${rootUrls.URL}/households/${data[1]}/tags`, data[0], {
        headers: state.header
      })
      .then(() => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
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
  STORE_HOUSEHOLD_ID: (state, data) => {
    state.householdId = data;
  },
  STORE_PRICE_RESP: (state, data) => {
    state.priceResp = data;
  },
  STORE_PLATFORM_RESP: (state, data) => {
    state.platformResp = data;
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
