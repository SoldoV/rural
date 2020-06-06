<template>
  <div class="selected-destinations">
    <div class="selected-news-title mb-6">
      {{ $t("selectedDestinations.selected") }}
    </div>
    <div class="selected-destinations-wrapper">
      <div
        class="destination-img"
        :style="{ backgroundImage: `url(${getUrl(i + 1)})` }"
        v-for="(item, i) in destinations"
        :key="i"
        @click="goToHouseholds(item)"
      >
        <div class="destination-img-text">
          {{ item.title }}
          <div class="destination-img-second-text">
            {{ $t("selectedDestinations.offer") }}
            <v-icon>mdi-arrow-right</v-icon>
          </div>
        </div>
        <div class="overlay"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data: () => ({
    destinations: []
  }),
  methods: {
    ...mapGetters(["GET_FILTERS"]),
    ...mapActions(["fetchFilters"]),
    ...mapMutations(["STORE_FILTER"]),
    getUrl(val) {
      return require("@/assets/homepage/selected" + val + ".webp");
    },
    goToHouseholds(item) {
      let tag = { tags: { id: item.id } };
      this.STORE_FILTER(tag);
      this.$router.push("/households");
    }
  },
  created() {
    this.fetchFilters(4).then(() => {
      this.destinations = this.GET_FILTERS().slice(0, 6);
    });
  }
};
</script>

