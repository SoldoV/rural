<template>
  <div
    @click="goToArticle()"
    class="news-item"
    v-bind:class="{ singleNews: selected }"
  >
    <img class="news-item-image" v-lazy="image" />
    <div class="news-items-wrapper">
      <div class="news-item-date">
        <v-icon>mdi-calendar</v-icon>
        <div class="news-item-date-text">
          {{ getDate(dateText) }}
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
import moment from "moment";

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
    },
    getDate(item) {
      return moment(item.slice(0, 10), "YYYY-MM-DD").format("DD-MM-YYYY");
    }
  }
};
</script>
