<template>
  <div class="single-household">
    <v-carousel cycle class="household-carousel">
      <v-carousel-item
        v-for="item in household.images"
        :key="item.file_path"
        :src="'http://test-api.rural.ba/' + item.file_path"
        reverse-transition="fade-transition"
        transition="fade-transition"
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
        <div class="card-item-price">
          {{ $t("cardItem.price") }} <b>{{ household.prices[0].price }} KM</b
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
            style="width:100%;  height: 400px;"
          >
            <gmap-marker
              icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
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
        <a
          :href="'http://airbnb.com/' + household.platforms[0].pivot.uid"
          target="_blank"
        >
          <v-btn class="single-household-airbnb-btn">
            <img src="../assets/airbnb.svg" />
          </v-btn>
        </a>
      </div>
    </div>
    <featured class="homepage-selected-households" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import featured from "./FeaturedHouseholds.vue";

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
    household: {
      id: null,
      title: "",
      description: "",
      address: "",
      prices: [{ price: null }],
      city_id: null,
      latitude: null,
      longitude: null,
      popular: false,
      tags: [],
      images: [],
      platforms: [{ pivot: { uid: "" } }]
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
    ...mapActions(["fetchCities", "getHouseholdById"]),
    getImgUrl(img) {
      return require("../assets/icons/" + img + ".svg");
    },
    storeHousehold() {
      let data = this.GET_SINGLE_HOUSEHOLD();
      this.household = {
        title: data.title,
        description: data.description,
        address: data.address,
        city_id: data.city_id,
        prices: data.prices,
        latitude: data.latitude,
        longitude: data.longitude,
        popular: data.popular,
        images: data.images,
        tags: data.tags,
        id: data.id,
        platforms: data.platforms
      };
      this.household.tags.map(e => {
        if (e.category_id == 1) this.tagsCatOne.push(e);
        else if (e.category_id == 2) this.tagsCatTwo.push(e);
        else this.tagsCatThree.push(e);
      });
      this.markers = {
        position: {
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude)
        }
      };
    }
  },
  mounted() {
    this.getHouseholdById(this.$route.params.id).then(() => {
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
