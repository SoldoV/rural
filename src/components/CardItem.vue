<template>
  <div>
    <div class="card-item-wrapper" @click="getHousehold(cardItem.id)">
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
        {{ $t("cardItem.price") }} <b>{{ cardItem.current_price }} KM</b
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
    getImageSrc() {
      return `http://test-api.rural.ba/${this.cardItem.images[0].file_path}`;
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
