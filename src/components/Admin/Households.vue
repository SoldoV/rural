<template>
  <div class="domacinstva">
    <div class="domacinstva-btn-wrapper">
      <v-btn
        color="primary"
        dark
        class="mb-2 domacinstva-btn"
        :to="'/dashboard/household/description'"
        >Dodaj Domacinstvo</v-btn
      >
    </div>
    <div class="domacinstva-wrapper">
      <card
        class="domacinstva-item"
        v-for="item in households"
        :key="item.id"
        :cardItem="item"
        :cities="cities"
      ></card>
    </div>
    <v-pagination
      v-model="page"
      :length="10"
      :page="page"
      :total-visible="4"
    ></v-pagination>
  </div>
</template>

<script>
import card from "../CardItem.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    card
  },
  data: () => ({
    page: 1,
    cities: [],
    households: []
  }),
  methods: {
    ...mapActions(["fetchHouseholds", "fetchCities"]),
    ...mapGetters(["GET_HOUSEHOLDS", "GET_CITIES"]),

    newHousehold() {
      console.log("ddodaj");
    }
  },
  created() {
    this.fetchHouseholds(1).then(() => {
      this.households = this.GET_HOUSEHOLDS();
      this.fetchCities().then(() => {
        this.cities = this.GET_CITIES();
      });
    });
  }
};
</script>

