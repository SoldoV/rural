import axios from 'axios';
import {
  rootUrls
} from '../../assets/_constants.js';
//import router from './../../index.js';


const state = {
  tags: [],
  categories: [],
  cities: [],
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
  }
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
}

const mutations = {
  STORE_TAGS: (state, data) => {
    state.tags = data;
  },
  STORE_CITIES: (state, data) => {
    state.cities = data;
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
