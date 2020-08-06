<template>
  <div class="selected-news">
    <div class="align-row-center mb-8 selected-news-header">
      <div class="selected-news-title">{{ title }}</div>
      <v-spacer />
      <v-btn
        v-if="seeAll"
        outlined
        @click="$router.push('/blog')"
        class="selected-news-btn"
        >{{ $t("selectedNews.all") }} <v-icon>mdi-arrow-right</v-icon></v-btn
      >
    </div>
    <div class="selected-news-wrapper selected-news-swiper">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide
          v-for="item in articles"
          :key="item.id"
          @click="goToArticle()"
          ><news-item
            class="news-item"
            :id="item.id"
            :dateText="item.created_at"
            :header="item.title"
            :text="item.text"
            :image="item.images[0] ? item.images[0].small_image_url : ''"
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
  props: {
    items: {
      required: true
    },
    title: {
      required: true
    },
    seeAll: {
      required: true
    }
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: 3,
      spaceBetween: 20,
      preventClicks: true,
      preventClicksPropagation: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      loop: false,
      breakpoints: {
        1700: {
          slidesPerView: 4
        },
        1100: {
          slidesPerView: 3
        },
        600: {
          slidesPerView: 2
        },
        320: {
          slidesPerView: 1
        },
        1: {
          slidesPerView: 1
        }
      }
    },
    articles: []
  }),
  watch: {
    items() {
      this.getArticles();
    }
  },
  methods: {
    ...mapActions(["fetchArticles"]),
    ...mapGetters(["GET_ARTICLES"]),
    goToArticle() {
      this.$refs.newsItem.goToArticle();
    },
    getArticles() {
      if (!this.items) {
        this.fetchArticles([{}, {}, "", "", "n="]).then(() => {
          this.articles = this.GET_ARTICLES();
        });
      } else {
        this.articles = this.items;
      }
    }
  },
  mounted() {
    this.getArticles();
  }
};
</script>
