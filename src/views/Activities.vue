<template>
  <div class="activities">
    <news v-for="tag in tags" :key="tag" :seeAll="false" /></div
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
      tags: []
    };
  },
  methods: {
    ...mapActions(["fetchCategoryTags"]),
    ...mapGetters(["GET_TAGS"])
  },
  mounted() {
    this.fetchCategoryTags([{ withTranslations: 0 }, 5]).then(() => {
      this.tags = this.GET_TAGS();
    });
  }
};
</script>

<style>
</style>
