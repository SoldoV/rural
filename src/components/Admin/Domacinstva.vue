<template>
  <div class="domacinstva">
    <div class="domacinstva-btn-wrapper">
      <v-btn
        color="primary"
        dark
        class="mb-2 domacinstva-btn"
        @click="newHousehold()"
        >Dodaj Domacinstvo</v-btn
      >
    </div>
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
  }),
  methods: {
    newHousehold() {
      console.log("ddodaj");
    }
  }
};
</script>

