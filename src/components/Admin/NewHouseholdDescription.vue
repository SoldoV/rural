<template>
  <div class="new-household">
    <v-row class="justify-center mt-10">
      <v-col cols="6">
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
          <div>
            <h2>Search and add a pin</h2>
            <label>
              <gmap-autocomplete @place_changed="setPlace"> </gmap-autocomplete>
              <button @click="addMarker">Add</button>
            </label>
            <br />
          </div>
          <br />
          <gmap-map
            :center="center"
            :zoom="12"
            style="width:100%;  height: 400px;"
          >
            <gmap-marker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              @click="center = m.position"
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
    markers: [],
    places: [],
    currentPlace: null,
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

    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
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
      if (this.$refs.form.validate()) {
        let data = {
          title: this.household.title,
          description: this.household.description,
          address: this.household.address,
          city_id: this.household.city_id.id,
          latitude: "50",
          longitude: "40",
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

<style lang="scss">
</style>
