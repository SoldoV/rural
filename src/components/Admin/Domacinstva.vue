<template>
  <div class="domacinstva">
    <div class="domacinstva-wrapper">
      <card
        class="domacinstva-item"
        v-for="item in cards"
        :key="item.name"
        :cardItem="item"
      ></card>
    </div>
    <v-pagination
      v-model="page"
      :length="10"
      :page="page"
      :total-visible="4"
    ></v-pagination>
  </div>
</template>

<script>
import card from "../CardItem.vue";

export default {
  components: {
    card
  },
  data: () => ({
    page: 1,
    cards: [
      {
        location: "Istočni Stari grad",
        name: 'Domaćinstvo "Ivana"',
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
        name: "Seosko Marija",
        price: "32KM"
      },
      {
        location: "Tromedja",
        name: "Livada tromedja",
        price: "29KM"
      },
      {
        location: "Ogradjenik",
        name: "dsmakdma",
        price: "30KM"
      },
      {
        location: "Ggfmj asmgeo",
        name: "fsdgfdhfd",
        price: "29KM"
      }
    ]
  })
};
</script>

<style lang="scss">
.domacinstva-wrapper {
  display: flex;
  flex-flow: wrap;
  flex-direction: row;
  justify-content: space-evenly;
}
.domacinstva {
  padding: 2em;

  .v-pagination__navigation,
  .v-pagination__item {
    box-shadow: none !important;
  }
  .v-pagination__item {
    border: 1px solid rgba(151, 151, 151, 0.12);
    border-radius: 4px;
  }

  .v-pagination__item--active {
    background-color: #319647 !important;
    border-color: #319647 !important;
  }
}
</style>
