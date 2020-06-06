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
        {{ $t("common.readMore") }}
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
      window.scrollTo(0, 0);
    }
  }
};
</script>
