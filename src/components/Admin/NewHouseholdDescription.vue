<template>
  <div class="new-household">
    <div class="align-column-center mt-10">
      <v-btn
        depressed
        @click="deleteItem"
        :to="'/dashboard/household/description'"
        class="common-btn"
        ><v-icon class="mr-3">mdi-delete</v-icon>Izbriši domacinstvo</v-btn
      >
    </div>
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
            item-value="id"
            item-text="title"
            return-object
            v-model="household.city_id"
            label="Grad"
          ></v-select>
          <gmap-map
            :center="markers.position || center"
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
              outlined
              class="new-household-btn common-btn-outlined"
              @click="close"
              >Odustani</v-btn
            >
            <v-btn depressed color="primary" class="common-btn" @click="save"
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
    markers: {
      position: {
        lat: 45.508,
        lng: -73.587
      }
    },
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
    ...mapGetters([
      "HOUSEHOLD_RESP",
      "GET_CITIES",
      "GET_SINGLE_HOUSEHOLD",
      "GET_EDIT_HOUSEHOLD_RESP",
      "GET_HOUSEHOLDID_RESP"
    ]),
    ...mapActions([
      "fetchCities",
      "editHousehold",
      "postHousehold",
      "deleteHousehold",
      "getHouseholdById"
    ]),
    deleteItem() {
      confirm("Are you sure you want to delete this item?") &&
        this.deleteHousehold(this.household.id).then(() => {
          this.$router.push("/dashboard/households");
        });
    },
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
        this.markers.position = {
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
        let householdId = this.$route.params.id;
        if (householdId) {
          data.city_id = this.household.city_id;
          this.editHousehold([data, householdId]).then(() => {
            if (this.GET_EDIT_HOUSEHOLD_RESP()) {
              this.navigateNext(
                `/dashboard/household/${householdId}/properties`
              );
            }
          });
        } else {
          this.postHousehold(data).then(() => {
            if (this.HOUSEHOLD_RESP()) {
              this.navigateNext("/dashboard/household/properties");
            }
          });
        }
      }
    },
    navigateNext(url) {
      this.$emit("increaseStepper");
      this.$router.push(url);
    },
    close() {
      this.$router.push("/dashboard/households");
    },
    storeHousehold() {
      let data = this.GET_SINGLE_HOUSEHOLD();
      this.household = {
        title: data.title,
        description: data.description,
        address: data.address,
        city_id: data.city_id,
        latitude: data.latitude,
        longitude: data.longitude,
        popular: data.popular,
        id: data.id
      };
      this.markers = {
        position: {
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude)
        }
      };
    }
  },
  mounted() {
    this.geolocate();
    this.fetchCities();
    this.getHouseholdById(this.$route.params.id).then(() => {
      if (this.GET_HOUSEHOLDID_RESP()) {
        this.storeHousehold();
      }
    });
  }
};
</script>
