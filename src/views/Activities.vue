<template>
  <div class="activities mt-12">
    <news
      v-for="tag in tags"
      :key="tag.id"
      :seeAll="false"
      :items="getItems(tag)"
      :title="tag.title"
    /></div
></template>

<script>
import news from "../components/SelectedNews.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    news
  },
  data: function() {
    return {
      tags: [],
      articles: []
    };
  },
  methods: {
    ...mapActions(["fetchCategoryTags", "fetchArticles"]),
    ...mapGetters(["GET_TAGS", "GET_ARTICLES"]),
    getItems(tag) {
      let activities = [];
      this.articles.forEach(a => {
        if (a.tag_id === tag.id) activities.push(a);
      });
      return activities;
    }
  },
  mounted() {
    this.fetchCategoryTags([{ withTranslations: 0 }, 5]).then(() => {
      this.tags = this.GET_TAGS();
    });
    this.fetchArticles([{ withTranslations: 0 }]).then(() => {
      this.articles = this.GET_ARTICLES();
    });
  }
};
</script>

<style>
</style>
