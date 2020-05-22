<template>
  <div>
    <div class="card-item-wrapper" @click="getHousehold(cardItem.id)">
      <img class="card-item-image" :src="getImageSrc()" />
      <div class="card-item-location">
        <v-icon>mdi-map-marker</v-icon>
        <div class="card-item-location-text">
          {{ cityName }}
        </div>
      </div>
      <div class="card-item-name">
        {{ cardItem.title.en }}
      </div>
      <div class="card-item-price">
        cijena <b>{{ cardItem.prices[0].price }} KM</b>/noć
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
  watch: {
    cities() {
      this.cities.forEach(e => {
        if (e.id == this.cardItem.city_id) this.cityName = e.title;
      });
    }
  },
  methods: {
    getImageSrc() {
      return `http://18.156.183.119/${this.cardItem.images[0].file_path}`;
    },
    getHousehold(id) {
      this.$emit("getHousehold", id);
    }
  }
};
</script>

