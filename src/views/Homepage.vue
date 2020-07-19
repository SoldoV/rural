<template>
  <div class="homepage">
    <image-header
      class="image-header-parent households-header"
      :headerText="text"
      :searchText="$t('homepage.searchText')"
      :single="false"
      :imgSrc="image"
      @search="search"
    />
    <selectedDestinations />
    <featured class="homepage-selected-households" />
    <selected-news
      :seeAll="true"
      :items="false"
      :title="$t('selectedNews.selected')"
    />
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import imageHeader from "../components/ImageHeader.vue";
import featured from "../components/FeaturedHouseholds.vue";
import selectedNews from "../components/SelectedNews.vue";
import selectedDestinations from "../components/SelectedDestinations.vue";

export default {
  components: {
    imageHeader,
    featured,
    selectedNews,
    selectedDestinations
  },
  data: function() {
    return {
      image: "",
      text: this.$t("common.search")
    };
  },
  methods: {
    ...mapMutations(["STORE_SEARCH_FILTER"]),
    ...mapActions(["fetchCoverImage"]),
    ...mapGetters(["GET_COVER_IMAGE"]),
    search(val) {
      this.STORE_SEARCH_FILTER(val);
      this.$router.push("/households");
    }
  },
  mounted() {
    this.fetchCoverImage().then(() => {
      this.image = this.GET_COVER_IMAGE();
    });
  }
};
</script>
