import axios from 'axios';
import {
  rootUrls
} from '../../assets/_constants.js';
//import router from './../../index.js';


const state = {
  tags: [],
  categories: [],
}
const getters = {
  GET_TAGS: state => {
    return state.tags;
  }
}
const actions = {
  async fetchTags({
    commit
  }) {
    await axios.get(`${rootUrls.URL}/tags`, {
        headers: {
          "Accept": "aplication/json",
          "Authorization": "Bearer " + "MmtjUINHnR92JOVM2malJECWfq0eDW88tXrlr8stZvmhc0G3lUm3nffcWwc8oLOa0CqcTigOGwygxw3p"
        }
      })
      .then(response => {
        commit('STORE_TAGS', response.data);
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
}

export default {
  state,
  getters,
  mutations,
  actions
}
