<template>
  <div class="homepage">
    <image-header
      class="image-header-parent households-header"
      :headerText="text"
      :single="false"
      :imgSrc="'bg.jpg'"
    />
    <selectedDestinations />
    <featured class="homepage-selected-households" />
    <selected-news />
  </div>
</template>

<script>
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
  })
};
</script>

<style lang="scss">
.homepage-selected-households {
  margin-bottom: 80px;
  background: #f7f7f7;
  position: relative;
  width: 100vw;
  .selected-news-title {
    padding-top: 56px;
  }
}
</style>
