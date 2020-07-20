import axios from "axios";
import {
  rootUrls
} from "../../assets/_constants.js";

const state = {
  singleArticle: {},
  articleResp: false,
  articleImageResp: false,
  articles: [],
  articleImages: []
};
const getters = {
  GET_ARTICLES: state => {
    return state.articles;
  },
  GET_ARTICLE_RESP: state => {
    return state.articleResp;
  },
  GET_SINGLE_ARTICLE: state => {
    return state.singleArticle;
  },
  GET_ARTICLE_IMAGES: state => {
    return state.articleImages;
  },
  GET_ARTICLE_IMAGE_RESP: state => {
    return state.articleImageResp;
  },
};

var qs = require("qs");

const actions = {
  async fetchArticles({
    commit,
    rootState
  }, data) {
    await axios
      .get(`${rootUrls.URL}/news_articles`, {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken,
          "X-Localization": localStorage.getItem("Lang")
        },
        params: {
          filter: {
            ...(data[1] || ""),
            tag_id: data[4]
          },
          ...(data[0] || ""),
          perPage: data[3],
          page: data[2]
        },
        paramsSerializer: function (params) {
          return qs.stringify(params, {
            arrayFormat: "brackets"
          });
        }
      })
      .then(response => {
        commit("STORE_ARTICLES", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  async fetchSingleArticle({
    commit,
    rootState
  }, data) {
    await axios
      .get(`${rootUrls.URL}/news_articles/${data}`, {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken,
          "X-Localization": localStorage.getItem("Lang")
        }
      })
      .then(response => {
        commit("STORE_SINGLE_ARTICLE", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  async fetchArticleImages({
    commit,
    rootState
  }, data) {
    await axios
      .get(`${rootUrls.URL}/news_articles/${data}/images`, {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken,
          "X-Localization": localStorage.getItem("Lang")
        }
      })
      .then(response => {
        commit("STORE_ARTICLE_IMAGES", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  async postArticleImages({
    commit,
    rootState
  }, data) {
    await axios
      .post(`${rootUrls.URL}/news_articles/${data[1]}/images`, data[0], {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken,
        }
      })
      .then(() => {
        commit("STORE_ARTICLE_IMAGE_RESP", true);
      })
      .catch(error => {
        console.log(error);
        commit("STORE_HOUSEHOLD_IMAGE_RESP", false);
      });
  },
  async deleteArticleImage({
    rootState
  }, data) {
    await axios
      .delete(`${rootUrls.URL}/news_images/${data[1]}`, {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken,
        }
      })
      .then()
      .catch(error => {
        console.log(error);
      });
  },
  async postArticle({
    dispatch,
    commit,
    rootState
  }, data) {
    await axios
      .post(`${rootUrls.URL}/news_articles`, data, {
        headers: {
          ...rootState.common.header,
          ...rootState.common.headerForm,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then((resp) => {
        commit("STORE_ARTICLE_RESP", [resp.data.id, true]);
        dispatch("fetchArticles", [{
          withTranslations: 1
        }]);
      })
      .catch(error => {
        commit("STORE_ARTICLE_RESP", false);
        console.log(error);
      });
  },
  async editArticle({
    dispatch,
    rootState,
    commit
  }, data) {
    await axios
      .post(`${rootUrls.URL}/news_articles/${data[1]}`, data[0], {
        headers: {
          ...rootState.common.header,
          ...rootState.common.headerForm,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then((resp) => {
        dispatch("fetchArticles", [{
          withTranslations: 1
        }]);
        commit("STORE_ARTICLE_RESP", [resp.data.id, true]);
      })
      .catch(error => {
        commit("STORE_ARTICLE_RESP", false);
        console.log(error);
      });
  },
  async deleteArticle({
    dispatch,
    rootState,
    commit
  }, data) {
    await axios
      .delete(`${rootUrls.URL}/news_articles/${data}`, {
        headers: {
          ...rootState.common.header,
          Authorization: "Bearer " + rootState.common.loginToken
        }
      })
      .then(() => {
        commit("STORE_ARTICLE_RESP", true);
        dispatch("fetchArticles", [{
          withTranslations: 1
        }]);
      })
      .catch(error => {
        commit("STORE_ARTICLE_RESP", false);
        console.log(error);
      });
  }
};

const mutations = {
  STORE_ARTICLES: (state, data) => {
    state.articles = data;
  },
  STORE_ARTICLE_RESP: (state, data) => {
    state.articleResp = data;
  },
  STORE_SINGLE_ARTICLE: (state, data) => {
    state.singleArticle = data;
  },
  SET_ARTICLES: state => {
    state.articles = [];
  },
  STORE_ARTICLE_IMAGES: (state, data) => {
    state.articleImages = data;
  },
  STORE_ARTICLE_IMAGE_RESP: (state, data) => {
    state.articleImageResp = data;
  },
};

export default {
  state,
  getters,
  mutations,
  actions
};
