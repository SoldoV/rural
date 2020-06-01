<template>
  <div class="households">
    <image-header
      class="image-header-parent households-header"
      :headerText="text"
      :single="false"
      :imgSrc="'bg.jpg'"
    />
    <div class="housholds-body">
      <v-expansion-panels class="categories-mobile-view hidden-lg-and-up">
        <v-expansion-panel>
          <v-expansion-panel-header>Filteri</v-expansion-panel-header>
          <v-expansion-panel-content>
            <categoriesSidebar />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <categoriesSidebar class="hidden-md-and-down" />
      <div class="households-right-wrapper">
        <div class="households-right-sort">
          <div class="sort-label">Sortiraj:</div>
          <v-select
            class="footer-lang households-sort"
            :items="sort"
            dense
            v-model="sortSelected"
            outlined
            hide-details
          ></v-select>
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
import imageHeader from "./ImageHeader.vue";
import categoriesSidebar from "./CategoriesSidebar.vue";
import card from "./CardItem.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    imageHeader,
    categoriesSidebar,
    card
  },
  data: () => ({
    currentPage: 1,
    lastPage: 1,
    households: [],
    cities: [],
    sortSelected: "Po preporuci",
    text: "Lorem Ipsum is simply dummy text",
    sort: ["Po preporuci", "Cijena silazno", "Cijena uzlazno", "Udaljenost"]
  }),
  methods: {
    ...mapActions(["fetchCities", "fetchHouseholds"]),
    ...mapGetters(["GET_HOUSEHOLDS", "HOUSEHOLD_RESP", "GET_CITIES"]),
    getHouseholdPage(id) {
      this.$router.push(`/households/${id}`);
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

<style lang="scss">
.households {
  margin-bottom: 4em;
  .households-header {
    margin-bottom: 80px;
  }
  .housholds-body {
    display: flex;
    flex-flow: row;
  }
  .sort-label {
    color: $secondary-text;
    font-size: 14px;
    font-weight: 400;
    line-height: 17.07px;
    text-align: right;
  }

  .households-right-sort {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    align-items: center;
    .sort-label {
      margin-right: 16px;
    }
    .households-sort {
      max-width: 170px !important;
      font-weight: 500;
      font-size: 14px;
      color: $primary-text;
      .v-select__selection {
        margin-right: 0px !important;
      }
      .v-select__selections {
        max-width: 160px !important;
      }
    }
  }

  .households-right-wrapper {
    width: 100%;
  }

  .households-body-content {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    margin-top: 44px;
    margin-left: 48px;

    .card-item-wrapper {
      margin-left: 12px;
      margin-right: 12px;
    }
  }
}

@media only screen and (max-width: 1263px) {
  .housholds-body {
    display: flex !important;
    flex-direction: column !important;
    align-items: center;

    .households-body-content {
      margin-left: 0px;
    }
    .households-right-sort {
      margin-top: 24px;
      flex-direction: column !important;

      .sort-label {
        margin-bottom: 8px;
      }
    }

    .v-expansion-panel::before {
      box-shadow: none !important;
    }

    .v-expansion-panel {
      border: 1px solid $border;
    }

    .categories-mobile-view {
      width: 320px !important;
    }
    .v-expansion-panel-content__wrap {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
