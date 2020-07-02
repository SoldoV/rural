<template>
  <div>
    <div
      v-if="isCard"
      class="card-item-wrapper"
      @click="getHousehold(cardItem.id)"
    >
      <img class="card-item-image" v-lazy="getImageSrc()" />
      <div class="card-item-location">
        <v-icon>mdi-map-marker</v-icon>
        <div class="card-item-location-text">
          {{ cityName }}
        </div>
      </div>
      <div class="card-item-name">
        {{ cardItem.title }}
      </div>
      <div class="card-item-price">
        {{ $t("cardItem.price") }}
        <b>{{ getPrice(cardItem.current_price) }} KM</b
        >{{ $t("cardItem.night") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardItem: {
      required: true,
      type: Object
    },
    cities: {
      required: true,
      type: Array
    }
  },
  data: () => ({
    cityName: ""
  }),
  methods: {
    isCard() {
      return this.cardItem.current_price;
    },
    getPrice(price) {
      return price ? price.value : "";
    },
    getImageSrc() {
      return this.cardItem.images.length > 0
        ? this.cardItem.images[0].small_image_url
        : "";
    },
    getHousehold(id) {
      this.$emit("getHousehold", id);
    }
  },
  created() {
    this.cities.forEach(e => {
      if (e.id == this.cardItem.city_id) this.cityName = e.title;
    });
  }
};
</script>
