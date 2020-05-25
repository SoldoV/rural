<template>
  <div class="households">
    <image-header class="image-header-parent" :headerText="text" />
    <categoriesSidebar />
  </div>
</template>

<script>
import imageHeader from "./ImageHeader.vue";
import categoriesSidebar from "./CategoriesSidebar.vue";

export default {
  components: {
    imageHeader,
    categoriesSidebar
  },
  data: () => ({
    text: "Lorem Ipsum is simply dummy text"
  })
};
</script>

<style lang="scss">
</style>
