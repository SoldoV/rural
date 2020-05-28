<template>
  <div class="single-article">
    <image-header
      class="image-header-parent"
      :imgSrc="imgPath"
      headerText=""
      :single="true"
    />
    <div class="news-item-wrapper">
      <div class="news-item-date mt-11 mb-2">
        <v-icon>mdi-calendar</v-icon>
        <div class="news-item-date-text">
          {{ date }}
        </div>
      </div>
      <div class="news-item-title">{{ article.title }}</div>
      <div v-html="article.text" class="article-item-text"></div>
    </div>
    <selected-news />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import imageHeader from "./ImageHeader.vue";
import selectedNews from "./SelectedNews.vue";

export default {
  components: {
    imageHeader,
    selectedNews
  },
  data: () => ({
    article: {},
    date: ""
  }),
  computed: {
    imgPath() {
      return (
        "http://18.156.183.119/storage/news_images/" + this.article.image_path
      );
    }
  },
  methods: {
    ...mapActions(["fetchSingleArticle"]),
    ...mapGetters(["GET_SINGLE_ARTICLE"]),
    getArticles() {
      let id = this.$route.params.id;
      this.fetchSingleArticle(id).then(() => {
        this.article = this.GET_SINGLE_ARTICLE();
        this.date = this.article.created_at.slice(0, 10);
      });
    }
  },
  watch: {
    /* eslint-disable-next-line */
    $route(to, from) {
      if (to.name === "AdminSingleArticle") {
        this.getArticles();
      }
    }
  },
  created() {
    this.getArticles();
  }
};
</script>

<style lang="scss">
.news-item-wrapper {
  padding: 0px 10% 0px 10%;
}
.news-item-title {
  color: $primary-text;
  font-family: "MontserratBold";
  margin-bottom: 32px;
  font-size: 34px;
  line-height: 41.45px;
  width: 792px;
  text-align: left;
}

.article-item-text {
  padding-bottom: 80px;
}
</style>
