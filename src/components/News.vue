<template>
  <div class="news">
    <image-header
      class="image-header-parent"
      :imgSrc="'image.jpg'"
      :searchText="'Pretražite novosti...'"
      :headerText="text"
      @search="search"
      :single="false"
    />
    <news-item
      :selected="false"
      v-for="item in articles"
      :key="item.id"
      :id="item.id"
      :dateText="item.created_at.slice(0, 10)"
      :header="item.title"
      :text="item.text"
      :image="'http://test-api.rural.ba/storage/news_images/' + item.image_path"
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
import imageHeader from "./ImageHeader.vue";
import newsItem from "./NewsItem.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    imageHeader,
    newsItem
  },
  data: () => ({
    currentPage: 1,
    lastPage: 1,
    articles: null,
    text: "Lorem Ipsum is simply dummy text"
  }),
  methods: {
    ...mapActions(["fetchArticles"]),
    ...mapGetters(["GET_ARTICLES"]),
    search(val) {
      this.getArticles(1, val);
    },
    getArticles(i, filter) {
      this.fetchArticles([i, filter]).then(() => {
        let article = this.GET_ARTICLES();
        this.articles = article.data;
        this.lastPage = article.last_page;
        this.currentPage = article.current_page;
      });
    }
  },
  mounted() {
    this.getArticles(1);
  }
};
</script>
