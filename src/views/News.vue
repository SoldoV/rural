<template>
  <div class="news">
    <image-header
      class="image-header-parent"
      :imgSrc="image"
      :searchText="$t('news.search')"
      :headerText="text"
      @search="search"
      :single="false"
    />
    <news-item
      :selected="false"
      v-for="item in articles"
      :key="item.id"
      :id="item.id"
      :dateText="item"
      :header="item.title"
      :text="item.text"
      :image="item.small_image_url"
      class="news-item-parent"
    />
    <v-pagination
      @input="getArticles"
      v-model="currentPage"
      :length="lastPage"
      :page="currentPage"
      :total-visible="4"
    ></v-pagination>
  </div>
</template>

<script>
import imageHeader from "../components/ImageHeader.vue";
import newsItem from "../components/NewsItem.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    imageHeader,
    newsItem
  },
  data: function() {
    return {
      currentPage: 1,
      lastPage: 1,
      articles: null,
      image: "",
      text: this.$t("news.search")
    };
  },
  methods: {
    ...mapActions(["fetchArticles", "fetchCoverImage"]),
    ...mapGetters(["GET_ARTICLES", "GET_COVER_IMAGE"]),
    search(val) {
      this.getArticles(1, val);
    },
    getArticles(i, filter) {
      this.fetchArticles([{}, filter, i, 5]).then(() => {
        let article = this.GET_ARTICLES();
        this.articles = article.data;
        this.lastPage = article.last_page;
        this.currentPage = article.current_page;
      });
    }
  },
  mounted() {
    this.getArticles(1);
    this.fetchCoverImage().then(() => {
      this.image = this.GET_COVER_IMAGE();
    });
  }
};
</script>
