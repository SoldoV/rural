<template>
  <div class="homepage">
    <image-header
      class="image-header-parent households-header"
      :headerText="text"
      :searchText="$t('homepage.searchText')"
      :single="false"
      :imgSrc="'bg.jpg'"
      @search="search"
    />
    <selectedDestinations />
    <featured class="homepage-selected-households" />
    <selected-news />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import imageHeader from "./ImageHeader.vue";
import featured from "./FeaturedHouseholds.vue";
import selectedNews from "./SelectedNews.vue";
import selectedDestinations from "./SelectedDestinations.vue";

export default {
  components: {
    imageHeader,
    featured,
    selectedNews,
    selectedDestinations
  },
  data: () => ({
    text: "Lorem Ipsum is simply dummy text"
  }),
  methods: {
    ...mapMutations(["STORE_SEARCH_FILTER"]),
    search(val) {
      this.STORE_SEARCH_FILTER(val);
      this.$router.push("/households");
    }
  }
};
</script>
