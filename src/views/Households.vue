<template>
  <div class="households">
    <image-header
      class="image-header-parent households-header"
      :searchText="searchText"
      :headerText="text"
      :single="false"
      @search="search"
      :imgSrc="image"
    />
    <householdMap ref="map" />
    <div class="housholds-body">
      <v-expansion-panels class="categories-mobile-view hidden-lg-and-up">
        <v-expansion-panel>
          <v-expansion-panel-header>{{
            $t("households.filters")
          }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <categoriesSidebar @setFilters="setFilters"></categoriesSidebar>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <categoriesSidebar class="hidden-md-and-down" @setFilters="setFilters" />
      <div class="households-right-wrapper">
        <!-- <div class="households-right-sort">
          <div class="sort-label">{{ $t("households.sort") }}</div>
          <v-select
            class="footer-lang households-sort"
            :items="sort"
            dense
            v-model="sortSelected"
            outlined
            hide-details
          ></v-select>
        </div> -->
        <div class="no-content" v-if="households.length == 0">
          {{ $t("households.noData") }}
        </div>
        <div class="households-body-content">
          <card
            @getHousehold="getHouseholdPage"
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
    </div>
  </div>
</template>

<script>
import imageHeader from "../components/ImageHeader.vue";
import categoriesSidebar from "../components/CategoriesSidebar.vue";
import card from "../components/CardItem.vue";
import householdMap from "../components/Map.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    imageHeader,
    householdMap,
    categoriesSidebar,
    card
  },
  data: function() {
    return {
      searchText: this.$t("homepage.searchText"),
      currentPage: 1,
      firstFilter: {},
      secondFilter: [],
      searchFilter: {},
      priceFilter: {},
      cityFilter: {},
      lastPage: 1,
      image: "",
      households: [],
      cities: [],
      // sortSelected: this.$t("households.suggested"),
      text: this.$t("common.search")
      // sort: [
      //   this.$t("households.suggested"),
      //   this.$t("households.priceAsc"),
      //   this.$t("households.priceDsc"),
      //   this.$t("households.distance")
      // ]
    };
  },
  methods: {
    ...mapActions(["fetchCities", "fetchHouseholds", "fetchCoverImage"]),
    ...mapGetters([
      "GET_COVER_IMAGE",
      "GET_HOUSEHOLDS",
      "HOUSEHOLD_RESP",
      "GET_CITIES",
      "GET_HOMEPAGE_FILTER",
      "GET_HOMEPAGE_SEARCH_FILTER"
    ]),
    ...mapMutations(["STORE_FILTER", "STORE_SEARCH_FILTER"]),
    getHouseholdPage(id) {
      this.$router.push(`/households/${id}`);
    },
    setFilters(first, second, city, price) {
      this.firstFilter = first;
      this.secondFilter = second;
      this.cityFilter = city;
      this.priceFilter = price;
      this.getHouseholds(1);
    },
    search(val) {
      this.searchFilter = val;
      this.getHouseholds(1);
    },
    getHouseholds(i) {
      let params = [
        i,
        12,
        this.firstFilter,
        this.secondFilter,
        this.searchFilter,
        this.cityFilter,
        this.priceFilter
      ];
      this.fetchHouseholds(params).then(() => {
        this.fetchCities().then(() => {
          if (this.HOUSEHOLD_RESP()) {
            let household = this.GET_HOUSEHOLDS();
            this.households = household.data;
            this.lastPage = household.last_page;
            this.currentPage = household.current_page;
            this.cities = this.GET_CITIES();
            this.$refs.map.getData();
          }
        });
      });
    }
  },
  created() {
    this.fetchCoverImage().then(() => {
      this.image = this.GET_COVER_IMAGE();
    });
    this.firstFilter = this.GET_HOMEPAGE_FILTER();
    this.searchFilter = this.GET_HOMEPAGE_SEARCH_FILTER();
    this.STORE_FILTER(null);
    this.STORE_SEARCH_FILTER(null);
    this.getHouseholds(1);
  }
};
</script>
