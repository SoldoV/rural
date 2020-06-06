<template>
  <div class="selected-news">
    <div class="align-row-center mb-8 selected-news-header">
      <div class="selected-news-title">
        {{ $t("featuredHouseholds.featured") }}
      </div>
    </div>
    <div class="selected-news-wrapper">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="(item, i) in households" :key="i"
          ><card
            @getHousehold="getHouseholdPage"
            class="domacinstva-item"
            :cardItem="item"
            :cities="cities"
          ></card
        ></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import card from "./CardItem.vue";
import { mapActions, mapGetters } from "vuex";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  components: {
    Swiper,
    card,
    SwiperSlide
  },
  data: () => ({
    households: [],
    cities: [],
    swiperOptions: {
      preventClicks: true,
      preventClicksPropagation: true,
      slidesPerView: 5,
      spaceBetween: 20,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      loop: true,
      pagination: {
        el: ".swiper-pagination"
      },
      breakpoints: {
        1700: {
          slidesPerView: 5
        },
        1200: {
          slidesPerView: 4
        },
        930: {
          slidesPerView: 3
        },
        840: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 2
        },
        1: {
          slidesPerView: 1
        }
      }
    }
  }),
  methods: {
    ...mapActions(["fetchCities", "fetchHouseholds"]),
    ...mapGetters(["GET_HOUSEHOLDS", "HOUSEHOLD_RESP", "GET_CITIES"]),
    getHouseholdPage(id) {
      this.$router.push(`/households/${id}`);
      window.scrollTo(0, 0);
    },
    getHouseholds(i) {
      let params = [i, 12, null, null, { popular: 1 }, null];
      this.fetchHouseholds(params).then(() => {
        this.fetchCities().then(() => {
          if (this.HOUSEHOLD_RESP()) {
            let household = this.GET_HOUSEHOLDS();
            this.households = household.data;
            this.cities = this.GET_CITIES();
          }
        });
      });
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  mounted() {
    this.getHouseholds(1);
  }
};
</script>
