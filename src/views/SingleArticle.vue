<template>
  <div class="single-article">
    <v-carousel cycle class="household-carousel">
      <v-carousel-item
        v-for="item in images"
        :key="item.image_url"
        :src="item.image_url"
      ></v-carousel-item>
    </v-carousel>
    <div class="news-item-wrapper">
      <div class="news-item-date mt-11 mb-2">
        <v-icon>mdi-calendar</v-icon>
        <div class="news-item-date-text">
          {{ getDate(date) }}
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
import selectedNews from "../components/SelectedNews.vue";
import moment from "moment";

export default {
  components: {
    selectedNews
  },
  data: () => ({
    article: {},
    images: [],
    date: ""
  }),
  computed: {
    imgPath() {
      return this.article.image_url;
    }
  },
  methods: {
    ...mapActions(["fetchSingleArticle", "fetchArticleImages"]),
    ...mapGetters(["GET_SINGLE_ARTICLE", "GET_ARTICLE_IMAGES"]),
    getDate(item) {
      return moment(item).format("DD-MM-YYYY");
    },
    getArticles() {
      let id = this.$route.params.id;
      this.fetchSingleArticle(id).then(() => {
        this.article = this.GET_SINGLE_ARTICLE();
        this.images.push({ image_url: this.article.image_url });
        this.date = this.article.created_at;
        this.fetchArticleImages(id).then(() => {
          this.GET_ARTICLE_IMAGES().forEach(a => {
            this.images.push({ image_url: a.image_url });
          });
        });
      });
    }
  },
  created() {
    window.scrollTo(0, 0);
    this.getArticles();
  }
};
</script>

