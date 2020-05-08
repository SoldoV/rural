<template>
  <div class="domacinstva">
    <card
      class="domacinstva-item"
      v-for="item in cards"
      :key="item.name"
      :cardItem="item"
    ></card>
  </div>
</template>

<script>
import card from "../CardItem.vue";

export default {
  components: {
    card
  },
  data: () => ({
    cards: [
      {
        location: "Istočni Stari grad",
        name: 'Seosko domaćinstvo "Ivana"',
        price: "15KM"
      },
      {
        location: "Mostar",
        name: "Seosko dsadas",
        price: "34KM"
      },
      {
        location: "Stari grad",
        name: 'dsadas domaćinstvo "ddd2fds"',
        price: "22KM"
      },
      {
        location: "Sarajevo",
        name: 'Seosko dsad "Ivana"',
        price: "10KM"
      },
      {
        location: "New York",
        name: 'Seosko dsad "Ivana"',
        price: "32KM"
      },
      {
        location: "Tromedja",
        name: "Livada tromedja",
        price: "29KM"
      }
    ]
  })
};
</script>

<style lang="scss">
.domacinstva {
  display: flex;
  flex-flow: wrap;
  flex-direction: row;
  align-content: space-around;
}
</style>
