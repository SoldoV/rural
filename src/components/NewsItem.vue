<template>
  <div class="news-item">
    <img class="news-item-image" :src="image" />
    <div class="news-items-wrapper">
      <div class="news-item-date">
        <v-icon>mdi-calendar</v-icon>
        <div class="news-item-date-text">
          {{ dateText }}
        </div>
      </div>
      <div class="news-item-header">{{ header }}</div>
      <div class="news-item-text" ref="itemText">
        {{ text }}
      </div>
      <div class="news-item-read-more">
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
    }
  }
};
</script>
