<template>
  <div
    @click="goToArticle()"
    class="news-item"
    v-bind:class="{ singleNews: selected }"
  >
    <img class="news-item-image" :src="image" />
    <div class="news-items-wrapper">
      <div class="news-item-date">
        <v-icon>mdi-calendar</v-icon>
        <div class="news-item-date-text">
          {{ dateText }}
        </div>
      </div>
      <div class="news-item-header">{{ header }}</div>
      <div class="news-item-text" v-html="text" v-if="!selected"></div>
      <div v-if="!selected" class="news-item-read-more">
        Procitajte više
        <v-icon>mdi-arrow-right</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dateText: {
      required: true
    },
    header: {
      required: true
    },
    text: {
      required: true
    },
    image: {
      required: true
    },
    id: {
      required: true
    },
    selected: {
      required: true
    }
  },
  methods: {
    goToArticle() {
      this.$router.push(`/news/article/${this.id}`);
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss">
.singleNews {
  flex-direction: column !important;
  max-width: 100% !important;

  .news-items-wrapper {
    padding: 0 10px 0 10px;
  }

  .news-item-image {
    margin-right: 0px !important;
    max-width: 100% !important;
    width: initial !important;
  }
}
</style>
