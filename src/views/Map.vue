<template>
  <div class="map">
    <gmap-map class="map-gmap" :center="markers.position" :zoom="12">
      <gmap-info-window
        class="map-window"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
        <card
          v-if="infoWinOpen"
          @getHousehold="getHouseholdPage"
          class="domacinstva-item"
          :cardItem="infoContent"
          :cities="cities"
        ></card>
      </gmap-info-window>
      <gmap-marker
        :clickable="true"
        v-for="(item, i) in households"
        @click="toggleInfoWindow(item, i)"
        :key="i"
        :position="item.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import card from "../components/CardItem.vue";

export default {
  components: {
    card
  },
  data: () => ({
    households: [],
    cities: [],
    infoContent: {},
    infoWindowPos: null,
    infoWinOpen: false,
    currentMidx: null,
    markers: {
      position: {
        lat: 43.344377868090525,
        lng: 17.805408243266328
      }
    }
  }),
  methods: {
    ...mapActions(["fetchCities", "fetchHouseholds"]),
    ...mapGetters(["GET_HOUSEHOLDS", "HOUSEHOLD_RESP", "GET_CITIES"]),
    toggleInfoWindow(item, idx) {
      this.infoWindowPos = item.position;
      this.infoContent = item;
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    getHouseholdPage(id) {
      this.$router.push(`/households/${id}`);
    }
  },
  mounted() {
    this.fetchHouseholds([null, null, {}, {}, {}, {}, {}]).then(() => {
      this.fetchCities().then(() => {
        if (this.HOUSEHOLD_RESP()) {
          this.households = this.GET_HOUSEHOLDS();
          this.cities = this.GET_CITIES();
          this.households.forEach(e => {
            e.position = {
              lat: parseFloat(e.latitude),
              lng: parseFloat(e.longitude)
            };
          });
        }
      });
    });
  }
};
</script>

<style lang="scss">
.map {
  .gm-style-iw,
  .gm-style-iw-d {
    height: 320px;
    max-height: 320px !important;
  }
  .map-gmap {
    width: 100%;
    height: 73vh;
  }
}
</style>
