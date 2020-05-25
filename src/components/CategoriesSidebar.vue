<template>
  <div class="categories-sidebar">
    <div class="categories-sidebar-title">
      Kategorije
    </div>
    <div class="categories-sidebar-subtitle">
      Vrste domaćinstava
    </div>
    <div class="categories-sidebar-checkboxes">
      <div v-for="item in checkboxes" :key="item.name">
        <v-checkbox
          hide-details
          v-model="item.value"
          :label="item.name"
        ></v-checkbox>
      </div>
    </div>
    <div class="categories-sidebar-locations">
      <div class="categories-sidebar-subtitle categories-sidebar-label">
        Lokacija
      </div>
      <v-select
        required
        hide-details
        outlined
        :items="getCities"
        item-value="id"
        item-text="title"
        return-object
        v-model="household.city_id"
        label="Sve lokacije"
      ></v-select>
    </div>
    <div class="categories-sidebar-price">
      <div class="categories-sidebar-subtitle">
        Cijena:
      </div>
      <div class="categories-sidebar-price-wrapper align-row-center">
        <v-text-field
          type="number"
          min="0"
          hide-details
          outlined
          onkeydown="return event.keyCode !== 69"
          v-model="price.min"
          label="min"
        ></v-text-field>
        <div class="categories-sidebar-divider">—</div>
        <v-text-field
          type="number"
          hide-details
          outlined
          min="0"
          onkeydown="return event.keyCode !== 69"
          v-model="price.max"
          label="max"
        ></v-text-field>
      </div>
    </div>
    <div class="categories-sidebar-additional">
      <v-btn
        depressed
        @click="toggleAdditionalFilters"
        class="header-log-in categories-sidebar-btn"
        >Dodatni filteri <v-icon>mdi-filter-variant</v-icon></v-btn
      >
    </div>
    <additionalFilters
      :dialog="dialog"
      @toggleAdditionalFilters="toggleAdditionalFilters"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    additionalFilters: () => import("./AdditionalFilters.vue")
  },
  data: () => ({
    dialog: false,
    household: {
      city_id: null
    },
    price: {
      min: null,
      max: null
    },
    checkboxes: [
      {
        name: "Izletište",
        value: false
      },
      {
        name: "Seosko domaćinstvo",
        value: false
      },
      {
        name: "Etno selo",
        value: false
      },
      {
        name: "Apartman",
        value: false
      },
      {
        name: "Vila",
        value: false
      },
      {
        name: "Gostinjska kuća",
        value: false
      },
      {
        name: "Kamp",
        value: false
      }
    ]
  }),
  computed: {
    getCities() {
      return JSON.parse(JSON.stringify(this.GET_CITIES()));
    }
  },
  methods: {
    ...mapGetters(["GET_CITIES"]),
    ...mapActions(["fetchCities"]),
    toggleAdditionalFilters() {
      this.dialog = !this.dialog;
    }
  },
  created() {
    this.fetchCities();
  }
};
</script>

<style lang="scss">
.categories-sidebar {
  min-width: 258px;
  .categories-sidebar-title {
    color: $primary-text;
    font-family: "BalooPaaji2";
    font-size: 34px;
    font-weight: 600;
    line-height: 59.87px;
  }
  .categories-sidebar-subtitle {
    margin-top: 32px;
    margin-bottom: 24px;
    color: $secondary-text;
    font-size: 14px;
    font-weight: 400;
    line-height: 17.07px;
  }

  .categories-sidebar-checkboxes,
  .categories-sidebar-locations,
  .categories-sidebar-price {
    padding-bottom: 32px;
    border-bottom: 1px solid $border;
  }
  .categories-sidebar-label {
    margin: 24px 0 16px 0;
  }

  .categories-sidebar-price-wrapper {
    justify-content: space-between;
    .v-input {
      max-width: 100px !important;
    }
  }

  .categories-sidebar-divider {
    font-size: 16px;
    color: $primary-text;
  }

  .categories-sidebar-btn {
    width: 100%;
    text-transform: none;
    font-size: 14px;
    font-weight: 600;
    line-height: 17.07px;
    text-align: left;
    margin: 0px !important;

    .v-icon {
      margin-left: 12px;
      font-size: 20px;
    }
  }

  .categories-sidebar-additional {
    margin-top: 24px;
  }
}
</style>
