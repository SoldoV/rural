import axios from 'axios';
import {
  rootUrls
} from '../../assets/_constants.js';


const state = {
  cities: [],
  cityResp: false
}

const getters = {
  GET_CITIES: state => {
    return state.cities;
  },
  GET_CITY_RESP: state => {
    return state.cityResp;
  },
}

const actions = {
  async fetchCities({
    rootState,
    commit
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
    rootState,
    commit
  }, data) {
    await axios.post(`${rootUrls.URL}/cities`, data, {
        headers: {
          ...rootState.common.header,
          "Authorization": "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {
        commit("STORE_CITY_RESP", true)
        dispatch("fetchCities")
      })
      .catch(error => {
        commit("STORE_CITY_RESP", false)
        console.log(error);
      });
  },
  async editCity({
    dispatch,
    rootState,
    commit
  }, data) {
    await axios.put(`${rootUrls.URL}/cities/${data.id}`, data, {
        headers: {
          ...rootState.common.header,
          "Authorization": "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {
        commit("STORE_CITY_RESP", true)
        dispatch("fetchCities")
      })
      .catch(error => {
        commit("STORE_CITY_RESP", false)
        console.log(error);
      });
  },
  async deleteCity({
    dispatch,
    rootState,
    commit
  }, data) {
    await axios.delete(`${rootUrls.URL}/cities/${data}`, {
        headers: {
          ...rootState.common.header,
          "Authorization": "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {
        commit("STORE_CITY_RESP", true)
        dispatch("fetchCities")
      })
      .catch(error => {
        commit("STORE_CITY_RESP", false)
        console.log(error);
      });
  },
}

const mutations = {
  STORE_CITIES: (state, data) => {
    state.cities = data;
  },
  STORE_CITY_RESP: (state, data) => {
    state.cityResp = data;
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
