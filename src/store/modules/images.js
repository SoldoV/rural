import axios from 'axios';
import {
  rootUrls
} from '../../assets/_constants.js';


const state = {
  householdImage: false,
}

const getters = {
  HOUSEHOLD_IMAGE_RESP: state => {
    return state.householdImage;
  },
}

const actions = {
  async deleteImage({
    rootState
  }, data) {
    await axios.delete(`${rootUrls.URL}/images/${data}`, {
        headers: {
          ...rootState.common.header,
          "Authorization": "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
  },
  async postHouseholdImages({
    commit,
    rootState
  }, data) {
    await axios.post(`${rootUrls.URL}/households/${data[1]}/images`, data[0], {
        headers: {
          ...rootState.common.header,
          ...rootState.common.headerForm,
          "Authorization": "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {
        commit('STORE_HOUSEHOLD_IMAGE_RESP', true);
      })
      .catch((error) => {
        console.log(error);
        commit('STORE_HOUSEHOLD_IMAGE_RESP', false);
        commit('STORE_ERROR_MSG', "ERROR: Couldn't post images", {
          root: true
        });
      });
  },
}

const mutations = {
  STORE_HOUSEHOLD_IMAGE_RESP: (state, data) => {
    state.householdImage = data;
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
