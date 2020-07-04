<template>
  <div class="single-household">
    <v-carousel cycle class="household-carousel">
      <v-carousel-item
        v-for="item in household.images"
        :key="item.image_url"
        :src="item.image_url"
      ></v-carousel-item>
    </v-carousel>
    <div class="single-household-body">
      <div>
        <div class="card-item-location">
          <v-icon>mdi-map-marker</v-icon>
          <div class="card-item-location-text">
            {{ cityName }}
          </div>
        </div>
        <div class="single-household-title my-2">
          {{ household.title }}
        </div>
        <div class="card-item-price" v-if="household.current_price">
          {{ $t("cardItem.price") }}
          <b>{{ household.current_price.value }} KM</b
          >{{ $t("cardItem.night") }}
        </div>
        <div class="single-household-description">
          {{ household.description }}
        </div>
        <div v-if="tagsCatOne.length > 0">
          <div class="single-household-tags-one-wrapper">
            <div
              class="single-household-tags-one"
              v-for="(tag, i) in tagsCatOne"
              :key="i"
            >
              <v-img
                class="single-household-tag"
                :src="getImgUrl(tag.icon)"
              ></v-img>
              <div class="single-household-tag-text-one">
                <b class="mr-1">{{ tag.pivot.value }}</b
                >x
                <div class="ml-1">{{ tag.title }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tagsCatTwo.length > 0">
          <div class="single-household-tags-two-wrapper">
            <div
              class="single-household-tags-two"
              v-for="(tag, i) in tagsCatTwo"
              :key="i"
            >
              <v-img
                class="single-household-tag"
                :src="getImgUrl(tag.icon)"
              ></v-img>
              <div class="single-household-tag-text">{{ tag.title }}</div>
            </div>
          </div>
        </div>
        <div class="single-household-location">
          <div class="single-household-location-text">
            {{ $t("catSidebar.location") }}
          </div>
          <gmap-map
            :center="markers.position || center"
            :zoom="12"
            style="height: 400px;"
          >
            <gmap-marker
              :icon="{ url: require('../assets/marker.svg') }"
              :position="markers.position"
            ></gmap-marker>
          </gmap-map>
        </div>
        <div
          v-if="tagsCatThree.length > 0"
          class="single-household-tags-three-wrapper"
        >
          <div class="single-household-tags-three-header">
            {{ $t("common.nearby") }}
          </div>
          <div class="single-household-tags-three-badge">
            <div
              class="single-household-tags-three"
              v-for="(tag, i) in tagsCatThree"
              :key="i"
            >
              <b>{{ tag.pivot.value }}km</b>{{ tag.title }}
            </div>
          </div>
        </div>
      </div>

      <div class="single-household-airbnb-wrapper align-column-center">
        <div class="single-household-airbnb-text">
          {{ $t("common.reserve") }}
        </div>
        <a v-if="isAirbnb" :href="airbnb.url" target="_blank">
          <v-btn class="single-household-airbnb-btn">
            <img src="../assets/airbnb.svg" />
          </v-btn>
        </a>
        <a v-if="isBooking" :href="booking.url" target="_blank">
          <v-btn
            class="single-household-airbnb-btn single-household-booking-btn"
          >
            <img class="booking-image" src="../assets/booking.svg" />
          </v-btn>
        </a>
      </div>
    </div>
    <featured class="homepage-selected-households mt-10" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import featured from "../components/FeaturedHouseholds.vue";

export default {
  components: {
    featured
  },
  data: () => ({
    markers: {
      position: {
        lat: 0,
        lng: 0
      }
    },
    tagsCatOne: [],
    tagsCatTwo: [],
    tagsCatThree: [],
    cities: [],
    isAirbnb: false,
    isBooking: false,
    airbnb: { url: "" },
    booking: { url: "" },
    household: {
      id: null,
      title: "",
      description: "",
      address: "",
      current_price: [{ value: "" }],
      city_id: null,
      latitude: null,
      longitude: null,
      popular: false,
      tags: [],
      images: []
    }
  }),
  computed: {
    cityName() {
      return this.cities
        .map(e => {
          if (e.id === this.household.city_id) return e.title;
        })
        .join("");
    }
  },
  methods: {
    ...mapGetters([
      "GET_SINGLE_HOUSEHOLD",
      "GET_HOUSEHOLDID_RESP",
      "GET_CITIES"
    ]),
    platformsValue(household) {
      household.platforms.forEach(x => {
        if (x.title == "airbnb") {
          this.airbnb = x.pivot;
          this.isAirbnb = true;
        }
        if (x.title == "booking") {
          this.booking = x.pivot;
          this.isBooking = true;
        }
      });
    },
    ...mapActions(["fetchCities", "getHouseholdById"]),
    getImgUrl(img) {
      return require("../assets/icons/" + img + ".svg");
    },
    storeHousehold() {
      let data = this.GET_SINGLE_HOUSEHOLD();
      this.household = { ...data };
      this.household.tags.map(e => {
        if (e.category_id == 1) this.tagsCatOne.push(e);
        else if (e.category_id == 2) this.tagsCatTwo.push(e);
        else if (e.category_id == 3) this.tagsCatThree.push(e);
      });
      this.markers = {
        position: {
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude)
        }
      };
      this.platformsValue(this.household);
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getHouseholdById([this.$route.params.id, {}]).then(() => {
      if (this.GET_HOUSEHOLDID_RESP()) {
        this.storeHousehold();
      }
    });
    this.fetchCities().then(() => {
      this.cities = JSON.parse(JSON.stringify(this.GET_CITIES()));
    });
  }
};
</script>
