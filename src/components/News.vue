<template>
  <div class="news">
    <image-header class="image-header-parent" :headerText="text" />
    <news-item
      v-for="item in newsItems"
      :key="item.header"
      :dateText="item.dateText"
      :header="item.header"
      :text="item.text"
      :readMore="item.readMore"
      class="news-item-parent"
    />
    <v-pagination
      v-model="page"
      :length="10"
      :page="page"
      :total-visible="4"
    ></v-pagination>
  </div>
</template>

<script>
import imageHeader from "./ImageHeader.vue";
import newsItem from "./NewsItem.vue";

export default {
  components: {
    imageHeader,
    newsItem
  },
  data: () => ({
    page: 1,
    text: "Lorem Ipsum is simply dummy text",
    newsItems: [
      {
        dateText: "08 Feb 2020",
        header: "Enlightenment Is Not Juste State",
        text:
          "Lorem Ipsum is simply text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type …",
        readMore: "Pročitajte više"
      },
      {
        dateText: "08 Feb 2020",
        header: "Enlightenment Is NoJust One State",
        text:
          "Lorem Ipsum is simply text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type …",
        readMore: "Pročitajte više"
      },
      {
        dateText: "08 Feb 2020",
        header: "Enlightenment Is Not t One State",
        text:
          "Lorem Ipsum is simply text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type …",
        readMore: "Pročitajte više"
      },
      {
        dateText: "08 Feb 2020",
        header: "Enlighment Is Not Just One State",
        text:
          "Lorem Ipsum is simply text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type …",
        readMore: "Pročitajte više"
      },
      {
        dateText: "08 Feb 2020",
        header: "Enlightment Is Not Just One State",
        text:
          "Lorem Ipsum is simply text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type …",
        readMore: "Pročitajte više"
      }
    ]
  })
};
</script>

<style lang="scss">
</style>
