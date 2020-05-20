<template>
  <div class="new-household">
    <v-row class="justify-center mt-10">
      <v-col cols="12" lg="6" sm="10">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            outlined
            :rules="descRules"
            required
            v-model="household.title"
            label="Naziv"
          ></v-text-field>
          <v-textarea
            required
            :rules="descRules"
            v-model="household.description"
            outlined
            label="Opis"
          ></v-textarea>
          <v-text-field
            required
            :rules="descRules"
            outlined
            v-model="household.address"
            label="Adresa"
          ></v-text-field>
          <v-select
            required
            outlined
            :rules="descRules"
            :items="getCities"
            item-text="title"
            return-object
            v-model="household.city_id"
            label="Grad"
          ></v-select>
          <gmap-map
            :center="center"
            :zoom="12"
            @click="addMarker"
            style="width:100%;  height: 400px;"
          >
            <gmap-marker
              :position="markers.position"
              @click="center = markers.position"
            ></gmap-marker>
          </gmap-map>
          <v-checkbox
            v-model="household.popular"
            label="Izdvojeno"
          ></v-checkbox>
          <div class="new-household-btn-wrapper">
            <v-btn
              depressed
              color="primary"
              class="new-household-btn"
              @click="close"
              >Odustani</v-btn
            >
            <v-btn
              depressed
              color="primary"
              class="new-household-btn"
              @click="save"
              >Dalje</v-btn
            >
          </div>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    center: { lat: 45.508, lng: -73.587 },
    markers: {},
    valid: false,
    descRules: [v => !!v || "Popuniti polje"],
    latRules: [
      v => (v >= -90 && v <= 90) || "Vrijednost treba biti od -90 do 90"
    ],
    longRules: [
      v => (v >= -180 && v <= 80) || "Vrijednost treba biti od -180 do 80"
    ],
    household: {
      title: "",
      description: "",
      address: "",
      city_id: null,
      latitude: null,
      longitude: null,
      popular: false
    }
  }),
  computed: {
    getCities() {
      return JSON.parse(JSON.stringify(this.GET_CITIES()));
    }
  },

  methods: {
    ...mapGetters(["GET_CITIES"]),
    ...mapGetters(["HOUSEHOLD_RESP"]),
    ...mapActions(["fetchCities"]),
    ...mapActions(["postHousehold"]),

    addMarker(e) {
      this.markers = {
        position: {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        }
      };
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    save() {
      if (
        this.$refs.form.validate() &&
        typeof this.markers.position !== "undefined"
      ) {
        let data = {
          title: this.household.title,
          description: this.household.description,
          address: this.household.address,
          city_id: this.household.city_id.id,
          latitude: this.markers.position.lat.toFixed(8),
          longitude: this.markers.position.lng.toFixed(8),
          popular: this.household.popular
        };
        this.postHousehold(data).then(() => {
          if (this.HOUSEHOLD_RESP()) {
            this.$emit("increaseStepper");
            this.$router.push("/dashboard/newhousehold/properties");
          }
        });
      }
    },
    close() {
      this.$router.push("/dashboard/households");
    }
  },
  mounted() {
    this.geolocate();
    this.fetchCities();
  }
};
</script>
