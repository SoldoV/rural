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
        @getHousehold="getHousehold"
        class="domacinstva-item"
        v-for="item in households"
        :key="item.id"
        :cardItem="item"
        :cities="cities"
        @click="getHousehold()"
      ></card>
    </div>
    <v-pagination
      v-model="currentPage"
      :length="lastPage"
      :page="currentPage"
      :total-visible="4"
      @input="getHouseholds"
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
    currentPage: 1,
    lastPage: 1,
    cities: [],
    households: []
  }),
  methods: {
    ...mapActions(["fetchHouseholds", "fetchCities"]),
    ...mapGetters(["GET_HOUSEHOLDS", "GET_CITIES", "HOUSEHOLD_RESP"]),

    getHousehold(e) {
      console.log(e);
    },
    getHouseholds(i) {
      this.fetchHouseholds(i).then(() => {
        this.fetchCities().then(() => {
          if (this.HOUSEHOLD_RESP()) {
            this.households = this.GET_HOUSEHOLDS().data;
            this.lastPage = this.GET_HOUSEHOLDS().last_page;
            this.currentPage = this.GET_HOUSEHOLDS().current_page;
            this.cities = this.GET_CITIES();
          }
        });
      });
    }
  },
  created() {
    this.getHouseholds(1);
  }
};
</script>

