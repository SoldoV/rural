<template>
  <div class="map">
    <div class="selected-news-title mb-6">
      {{ $t("common.allHouseholds") }}
    </div>
    <gmap-map
      class="map-gmap"
      :options="{
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        rotateControl: false,
        fullscreenControl: false
      }"
      :center="markers.position"
      :zoom="12"
    >
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
        :icon="{ url: require('../assets/marker.svg') }"
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
    options: {
      disableDefaultUI: true
    },
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
    ...mapActions(["fetchCities"]),
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
    },
    getData() {
      this.fetchCities().then(() => {
        if (this.HOUSEHOLD_RESP()) {
          this.households = this.GET_HOUSEHOLDS().data;
          this.cities = this.GET_CITIES();
          this.households.forEach(e => {
            e.position = {
              lat: parseFloat(e.latitude),
              lng: parseFloat(e.longitude)
            };
          });
        }
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="scss">
.map {
  margin-bottom: 80px;
  .gm-style-iw,
  .gm-style-iw-d {
    height: 320px;
    max-height: 320px !important;
  }
  .map-gmap {
    width: 100vw;
    position: relative;
    overflow: visible;
    height: 298px;
  }
}
</style>
