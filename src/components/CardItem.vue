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

