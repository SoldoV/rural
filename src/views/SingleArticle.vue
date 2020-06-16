<template>
  <div class="single-article">
    <image-header
      class="image-header-parent"
      :searchText="''"
      :imgSrc="imgPath"
      headerText=""
      :single="true"
    />
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
import imageHeader from "../components/ImageHeader.vue";
import selectedNews from "../components/SelectedNews.vue";
import moment from "moment";

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
      return this.article.image_url;
    }
  },
  methods: {
    ...mapActions(["fetchSingleArticle"]),
    ...mapGetters(["GET_SINGLE_ARTICLE"]),
    getDate(item) {
      return moment(item).format("DD-MM-YYYY");
    },
    getArticles() {
      let id = this.$route.params.id;
      this.fetchSingleArticle(id).then(() => {
        this.article = this.GET_SINGLE_ARTICLE();
        this.date = this.article.created_at;
      });
    }
  },
  created() {
    this.getArticles();
  }
};
</script>

