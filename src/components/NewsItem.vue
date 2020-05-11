<template>
  <div class="news-item">
    <div class="news-item-image"></div>
    <div>
      <div class="news-item-date">
        <v-icon>mdi-calendar</v-icon>
        <div class="news-item-date-text">
          {{ dateText }}
        </div>
      </div>
      <div class="news-item-header">{{ header }}</div>
      <div class="news-item-text">{{ text }}</div>
      <div class="news-item-read-more">
        {{ readMore }}
        <v-icon>mdi-arrow-right</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    dateText: "08 Feb 2020",
    header: "Enlightenment Is Not Just One State",
    text:
      "Lorem Ipsum is simply text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type …",
    readMore: "Pročitajte više"
  }),
  mounted() {
    this.text = this.text.match(/.{1,192}/g)[0] + "...";
  }
};
</script>

<style lang="scss">
.news-item {
  display: flex;
  flex-direction: row;
  height: 216px !important;

  .news-item-image {
    margin-right: 24px;
    background-image: url("../assets/image.jpg");
    background-size: 100%;
    border-radius: 8px;
    min-width: 384px;
    height: 216px;
  }

  .news-item-header {
    margin-bottom: 16px;
    color: $primary-text;
    font-family: "MontserratBold";
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    width: 588px;
    text-align: left;
  }

  .news-item-text {
    margin-bottom: 34px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
    font-weight: 400;
    line-height: 19.5px;
    max-width: 588px;
    height: 58px;
    text-align: left;
  }

  .news-item-read-more {
    cursor: pointer;
    color: $primary;
    font-family: "MontserratBold";
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: left;

    .v-icon {
      color: $primary;
    }
  }

  .news-item-date {
    display: flex;
    flex-direction: row;
    margin: 16px 0 16px 0;

    .news-item-date-text {
      margin-left: 8px;
      color: $secondary-text;
      font-size: 14px;
      font-weight: 400;
      line-height: 17.07px;
      text-align: left;
    }

    .v-icon {
      color: $primary;
      font-size: 12px;
    }
  }
}

.news-item:hover {
  .news-item-header {
    color: $primary;
  }
}
</style>
