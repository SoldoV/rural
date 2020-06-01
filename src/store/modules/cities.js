import axios from 'axios';
import {
  rootUrls
} from '../../assets/_constants.js';


const state = {
  cities: [],

}
const getters = {
  GET_CITIES: state => {
    return state.cities;
  },
}
const actions = {
  async fetchCities({
    commit,
    rootState
  }) {
    await axios.get(`${rootUrls.URL}/cities`, {
        headers: {
          ...rootState.common.header,
          "Authorization": "Bearer " + rootState.common.loginToken
        }
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
    rootState
  }, data) {
    await axios.post(`${rootUrls.URL}/cities`, data, {
        headers: {
          ...rootState.common.header,
          "Authorization": "Bearer " + rootState.common.loginToken
        }
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
    rootState
  }, data) {
    await axios.put(`${rootUrls.URL}/cities/${data.id}`, data, {
        headers: {
          ...rootState.common.header,
          "Authorization": "Bearer " + rootState.common.loginToken
        }
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
    rootState
  }, data) {
    await axios.delete(`${rootUrls.URL}/cities/${data}`, {
        headers: {
          ...rootState.common.header,
          "Authorization": "Bearer " + rootState.common.loginToken
        }
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
