<template>
  <div class="selected-news">
    <div class="align-row-center mb-8 selected-news-header">
      <div class="selected-news-title">{{ $t("selectedNews.selected") }}</div>
      <v-spacer />
      <v-btn outlined @click="$router.push('/news')" class="selected-news-btn"
        >{{ $t("selectedNews.all") }} <v-icon>mdi-arrow-right</v-icon></v-btn
      >
    </div>
    <div class="selected-news-wrapper">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide
          v-for="item in articles"
          :key="item.id"
          @click="goToArticle()"
          ><news-item
            class="news-item"
            :id="item.id"
            :dateText="item.created_at.slice(0, 10)"
            :header="item.title"
            :text="item.text"
            :image="
              'http://test-api.rural.ba/storage/news_images/' + item.image_path
            "
            :selected="true"
        /></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import newsItem from "./NewsItem.vue";
import { mapActions, mapGetters } from "vuex";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  components: {
    Swiper,
    newsItem,
    SwiperSlide
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: 3,
      spaceBetween: 20,
      preventClicks: true,
      preventClicksPropagation: true,
      pagination: {
        el: ".swiper-pagination"
      },
      breakpoints: {
        1024: {
          slidesPerView: 3
        },
        768: {
          slidesPerView: 3
        },
        640: {
          slidesPerView: 2
        },
        320: {
          direction: "horizontal",
          slidesPerView: 1
        },
        1: {
          slidesPerView: 1
        }
      }
    },
    articles: null
  }),
  methods: {
    ...mapActions(["fetchArticles"]),
    ...mapGetters(["GET_ARTICLES"]),
    goToArticle() {
      this.$refs.newsItem.goToArticle();
    },
    getArticles(i) {
      let pages = `?perPage=5&page=${i}`;
      this.fetchArticles([{}, pages, 5]).then(() => {
        let article = this.GET_ARTICLES();
        this.articles = article.data;
      });
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  mounted() {
    this.getArticles(1);
    this.swiper.slideTo(3, 1000, false);
  }
};
</script>
