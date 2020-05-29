<template>
  <div class="single-household">
    <v-carousel cycle class="household-carousel">
      <v-carousel-item
        v-for="item in household.images"
        :key="item.file_path"
        :src="'http://18.156.183.119/' + item.file_path"
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
          cijena <b>{{ household.prices[0].price }} KM</b>/noć
        </div>
        <div class="single-household-description">
          {{ household.description }}
        </div>
      </div>
      <div class="single-household-airbnb-wrapper">
        <div class="single-household-airbnb-text">
          Rezervirajte smještaj na:
        </div>
        <v-btn class="single-household-airbnb-btn">
          <img src="../assets/airbnb.svg" />
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    markers: {
      position: {
        lat: 45.508,
        lng: -73.587
      }
    },
    cities: [],
    household: {
      id: null,
      title: "",
      description: "",
      address: "",
      prices: [],
      city_id: null,
      latitude: null,
      longitude: null,
      popular: false,
      images: []
    }
  }),
  computed: {
    cityName() {
      console.log(this.cities);
      return this.cities
        .map(e => {
          if (e.id === this.household.city_id) return e.title;
        })
        .join("");
    }
  },
  methods: {
    ...mapGetters(["GET_SINGLE_HOUSEHOLD", "GET_CITIES"]),
    ...mapActions(["fetchCities"]),
    getSrc(val) {
      console.log(this.household);
      console.log("http://18.156.183.119/" + val);
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
        id: data.id
      };
      console.log(this.household);
      this.markers = {
        position: {
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude)
        }
      };
    }
  },
  mounted() {
    this.fetchCities().then(() => {
      this.cities = JSON.parse(JSON.stringify(this.GET_CITIES()));
    });
    this.storeHousehold();
  }
};
</script>

<style lang="scss">
.household-carousel {
  margin-bottom: 32px;
  .v-carousel__item {
    border-radius: 8px !important;
  }
}
.single-household-title {
  color: $primary-text;
  font-family: "MontserratBold";
  font-size: 34px;
}
.single-household-description {
  color: $secondary-text;
  font-size: 16px;
  font-weight: 400;
  margin-top: 32px;
}
.single-household-airbnb-btn {
  background-color: #ff5a5f !important;
  border-radius: 4px;
  box-shadow: 0 10px 20px 0 rgba(255, 90, 95, 0.5);
  width: 312px;
  height: 36px;
}
.single-household-airbnb-wrapper {
  padding: 24px;
  border: 1px solid $border;
  height: 100%;
  border-radius: 8px;
}
.single-household-airbnb-text {
  margin-bottom: 24px;
  color: $primary-text;
  font-size: 16px;
}

.single-household-body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
