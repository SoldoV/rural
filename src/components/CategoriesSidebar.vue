<template>
  <div class="categories-sidebar">
    <div class="categories-sidebar-title">
      {{ $t("catSidebar.cats") }}
    </div>
    <div class="categories-sidebar-subtitle">
      {{ $t("catSidebar.types") }}
    </div>
    <div class="categories-sidebar-checkboxes">
      <div v-for="(item, i) in checkboxes" :key="i">
        <v-checkbox
          hide-details
          @change="updateFilters"
          v-model="item.value"
          :label="item.title"
        ></v-checkbox>
      </div>
    </div>
    <div class="categories-sidebar-locations">
      <div class="categories-sidebar-subtitle categories-sidebar-label">
        {{ $t("catSidebar.location") }}
      </div>
      <v-select
        required
        multiple
        hide-details
        outlined
        :items="getCities"
        @change="updateFilters"
        item-value="id"
        item-text="title"
        return-object
        v-model="city"
        :placeholder="$t('catSidebar.allLocations')"
      ></v-select>
    </div>
    <div class="categories-sidebar-price">
      <div class="categories-sidebar-subtitle">{{ $t("cardItem.price") }}:</div>
      <div class="categories-sidebar-price-wrapper align-row-center">
        <v-text-field
          type="number"
          min="0"
          outlined
          :rules="rules.concat(minRules)"
          onkeydown="return event.keyCode !== 69"
          v-model="price.min"
          :label="$t('catSidebar.min')"
          @change="updateFilters"
        ></v-text-field>
        <div class="categories-sidebar-divider">—</div>
        <v-text-field
          type="number"
          outlined
          :rules="rules.concat(maxRules)"
          min="0"
          onkeydown="return event.keyCode !== 69"
          @change="updateFilters"
          v-model="price.max"
          :label="$t('catSidebar.max')"
        ></v-text-field>
      </div>
    </div>
    <div class="categories-sidebar-additional">
      <v-btn
        depressed
        @click="toggleAdditionalFilters"
        class="header-log-in categories-sidebar-btn"
        >{{ $t("additionalFilters.additional") }}
        <v-icon>mdi-filter-variant</v-icon></v-btn
      >
    </div>
    <div class="categories-sidebar-additional">
      <v-btn
        depressed
        outlined
        @click="clearFilters"
        class="common-btn-outlined categories-sidebar-btn-clear mr-0"
        >{{ $t("catSidebar.clear") }} <v-icon>mdi-filter-remove</v-icon></v-btn
      >
    </div>
    <additionalFilters
      ref="additionalFilters"
      :dialog="dialog"
      @additionalFilters="setAdditionalFilters"
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
    filters: [],
    dialog: false,
    firstFilter: {},
    rules: [],
    secondFilter: [],
    city: [],
    price: {
      min: null,
      max: null
    },
    checkboxes: []
  }),
  computed: {
    getCities() {
      return JSON.parse(JSON.stringify(this.GET_CITIES()));
    },
    maxRules() {
      let min = parseInt(this.price.min);
      let max = parseInt(this.price.max);
      if (isNaN(min) || isNaN(max)) return true;
      return max > min || "Max > Min";
    },
    minRules() {
      let min = parseInt(this.price.min);
      let max = parseInt(this.price.max);
      if (isNaN(min) || isNaN(max)) return true;
      return max > min || "Max > Min";
    }
  },
  methods: {
    ...mapGetters(["GET_CITIES", "GET_FILTERS"]),
    ...mapActions(["fetchCities", "fetchFilters"]),
    clearFilters() {
      this.price = {
        min: null,
        max: null
      };
      this.city = [];
      this.checkboxes.forEach(e => {
        e.value = false;
      });
      this.$refs.additionalFilters.clearFilters();
    },
    toggleAdditionalFilters() {
      this.dialog = !this.dialog;
    },
    setAdditionalFilters(first, second) {
      this.firstFilter = first;
      this.secondFilter = second;
      this.updateFilters();
    },
    getPriceFilter() {
      let priceObj = {};
      let min = parseInt(this.price.min);
      let max = parseInt(this.price.max);
      if (!isNaN(min) && !isNaN(max) && min < max) {
        priceObj = { price: `<>${min},${max}` };
      } else if (isNaN(max) && min > 0) {
        priceObj = { price: `v>${min}` };
      } else if (isNaN(min) && max > 0) {
        priceObj = { price: `v<${max}` };
      }
      return priceObj;
    },
    updateFilters() {
      let price = this.getPriceFilter();
      let cityFilter = { city_id: "i=" };
      this.city.map(e => {
        cityFilter.city_id += e.id + ",";
      });
      cityFilter.city_id = cityFilter.city_id.slice(0, -1);
      let tags = { tags: {} };
      let counter = 0;
      if (this.checkboxes.some(e => e.value === true)) {
        tags = { tags: { 0: { id: "i=" } } };
        this.checkboxes.forEach(e => {
          if (e.value) tags.tags[0].id += e.id + ",";
        });
        counter++;
        tags.tags[0].id = tags.tags[0].id.slice(0, -1);
      }
      this.secondFilter.forEach(e => {
        tags.tags[counter] = e;
        counter++;
      });
      this.$emit(
        "setFilters",
        tags,
        this.firstFilter,
        cityFilter.city_id == "i" ? {} : cityFilter,
        price
      );
    }
  },
  created() {
    this.fetchCities();
    this.fetchFilters(4).then(() => {
      this.filters = this.GET_FILTERS();
      this.checkboxes = this.filters.map(e => {
        return { ...e, value: false };
      });
    });
  }
};
</script>
