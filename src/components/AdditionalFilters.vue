<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <div class="additional-filters">
        <div class="filter-header align-row-center">
          <div class="filter-header-text">
            {{ $t("additionalFilters.additional") }}
          </div>
          <v-spacer />
          <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
        </div>
        <div class="filter-rooms">
          <div
            class="filter-beds my-2 align-row-center"
            v-for="(item, i) in firstCategoryFilters"
            :key="i"
          >
            <div class="filter-text">{{ item.title }}</div>
            <v-spacer />
            <div class="filter-counter">
              <v-btn
                outlined
                :disabled="isDisabled(item.value)"
                @click="item.value--"
                >-</v-btn
              >
              <div class="filter-counter-text">
                {{ item.value }}
              </div>
              <v-btn outlined @click="item.value++">+</v-btn>
            </div>
          </div>
        </div>
        <div class="filter-extras">
          <div v-for="item in secondCategoryFilters" :key="item.title">
            <v-checkbox
              hide-details
              v-model="item.value"
              :label="item.title"
            ></v-checkbox>
          </div>
        </div>
        <div class="filter-footer">
          <v-btn
            depressed
            outlined
            class="common-btn-outlined common-btn-footer"
            @click="close"
            >{{ $t("common.cancel") }}</v-btn
          >
          <v-btn
            depressed
            class="common-btn common-btn-footer"
            @click="apply"
            >{{ $t("common.confirm") }}</v-btn
          >
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    dialog: {
      required: true
    }
  },
  data: () => ({
    beds: 0,
    bedrooms: 0,
    toilets: 0,
    firstCategoryFilters: [],
    filters: [],
    secondCategoryFilters: []
  }),
  methods: {
    ...mapGetters(["GET_FILTERS"]),
    ...mapActions(["fetchFilters"]),
    isDisabled(val) {
      if (val > 0) return false;
      return true;
    },
    close() {
      this.$emit("toggleAdditionalFilters");
    },
    apply() {
      let tags = { householdTags: {} };
      let secondaryTags = [];
      let counter = 0;
      this.firstCategoryFilters.forEach(e => {
        if (e.value) {
          tags.householdTags[counter] = { tag_id: e.tag_id, value: e.value };
          counter++;
        }
      });
      this.secondCategoryFilters.forEach(e => {
        if (e.value) secondaryTags.push({ id: e.tag_id });
      });
      this.$emit("additionalFilters", tags, secondaryTags);
      this.$emit("toggleAdditionalFilters");
    },
    clearFilters() {
      this.firstCategoryFilters.forEach(e => {
        e.value = 0;
      });
      this.secondCategoryFilters.forEach(e => {
        e.value = 0;
      });
      this.$emit("additionalFilters", { householdTags: {} }, []);
    },
    setFilters() {
      this.fetchFilters(1).then(() => {
        this.filters = this.GET_FILTERS();
        this.firstCategoryFilters = this.filters.map(e => {
          return { title: e.title, tag_id: e.id, value: 0 };
        });
      });
      this.fetchFilters(2).then(() => {
        this.filters = this.GET_FILTERS();
        this.secondCategoryFilters = this.filters.map(e => {
          return { title: e.title, tag_id: e.id, value: false };
        });
      });
    }
  },
  created() {
    this.setFilters();
  }
};
</script>
