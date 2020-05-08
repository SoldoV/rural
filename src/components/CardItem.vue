<template>
  <div class="card-item-wrapper">
    <div class="card-item-image"></div>
    <div class="card-item-location">
      <v-icon>mdi-map-marker</v-icon>
      <div class="card-item-location-text">{{ cardItem.location }}</div>
    </div>
    <div class="card-item-name">
      {{ cardItem.name }}
    </div>
    <div class="card-item-price">
      cijena <b>{{ cardItem.price }}</b
      >/noć
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardItem: {
      required: true,
      type: Object
    }
  },
  data: () => ({})
};
</script>

<style lang="scss">
.card-item-wrapper {
  display: flex;
  width: 282px;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 56px;
  margin-left: 10px;
  margin-right: 10;

  .card-item-image {
    background-image: url("../assets/a.jpeg");
    background-size: 100%;
    border-radius: 8px;
    width: 282px;
    height: 165px;
  }
  .card-item-price {
    color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;

    b {
      color: black;
    }
  }

  .card-item-name {
    color: rgba(0, 0, 0, 0.87);
    font-size: 16px;
    margin: 8px 0px 8px 0px !important;
    font-weight: 600;
    height: 20px;
    width: 282px;
    word-break: break-all;
  }
  .card-item-location {
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    height: 14px;
    align-items: center;

    .v-icon {
      font-size: 12px;
      color: #319647;
    }

    .card-item-location-text {
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      font-weight: 400;
      line-height: 17.07px;
      width: 252px;
      word-break: break-all;
    }
  }
}

.card-item-wrapper:hover {
  .card-item-name {
    color: #319647;
  }
}
</style>
