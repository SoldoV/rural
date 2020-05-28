<template>
  <div class="single-article">
    <image-header
      class="image-header-parent"
      :imgSrc="
        'http://18.156.183.119/storage/news_images/' + article.image_path
      "
      headerText=""
      :single="true"
    />
    <div v-html="article.text"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import imageHeader from "./ImageHeader.vue";

export default {
  components: {
    imageHeader
  },
  data: () => ({
    article: {}
  }),
  methods: {
    ...mapActions(["fetchSingleArticle"]),
    ...mapGetters(["GET_SINGLE_ARTICLE"])
  },
  mounted() {
    this.fetchSingleArticle(this.$route.params.id).then(() => {
      this.article = this.GET_SINGLE_ARTICLE();
    });
  }
};
</script>

<style>
</style>
