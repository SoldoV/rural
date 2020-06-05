<template>
  <div class="domacinstva">
    <div class="domacinstva-btn-wrapper mb-10">
      <v-btn
        depressed
        :to="'/dashboard/household/description'"
        class="common-btn"
        ><v-icon class="mr-3">mdi-plus</v-icon
        >{{ $t("admin.households.add") }}</v-btn
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
    ...mapActions(["fetchHouseholds", "fetchCities", "getHouseholdById"]),
    ...mapGetters([
      "GET_HOUSEHOLDS",
      "GET_CITIES",
      "HOUSEHOLD_RESP",
      "GET_HOUSEHOLDID_RESP",
      "GET_SINGLE_HOUSEHOLD"
    ]),

    getHousehold(id) {
      this.$router.push(`/dashboard/household/${id}/description`);
    },
    getHouseholds(i) {
      this.fetchHouseholds([i, 12]).then(() => {
        this.fetchCities().then(() => {
          if (this.HOUSEHOLD_RESP()) {
            let household = this.GET_HOUSEHOLDS();
            this.households = household.data;
            this.lastPage = household.last_page;
            this.currentPage = household.current_page;
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
