<template>
  <div class="new-household">
    <v-row class="justify-center mt-10">
      <v-col cols="12" lg="6" sm="10">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            outlined
            :rules="descRules"
            required
            v-model="household.title.bhs"
            :label="$t('common.titleLabel') + ' (bhs)'"
          ></v-text-field>
          <v-text-field
            outlined
            :rules="descRules"
            required
            v-model="household.title.en"
            :label="$t('common.titleLabel') + ' (en)'"
          ></v-text-field>
          <v-textarea
            required
            :rules="descRules"
            v-model="household.description.bhs"
            outlined
            :label="$t('admin.newHouseholdDesc.desc') + ' (bhs)'"
          ></v-textarea>
          <v-textarea
            required
            :rules="descRules"
            v-model="household.description.en"
            outlined
            :label="$t('admin.newHouseholdDesc.desc') + ' (en)'"
          ></v-textarea>
          <v-text-field
            required
            :rules="descRules"
            outlined
            v-model="household.address"
            :label="$t('admin.newHouseholdDesc.address')"
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
            :label="$t('admin.newHouseholdDesc.city')"
          ></v-select>
          <gmap-map
            :center="markers.position"
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
            :label="$t('admin.newHouseholdDesc.selected')"
          ></v-checkbox>
          <div class="household-description-buttons mt-10">
            <v-btn
              v-if="$route.params.id"
              depressed
              color="error"
              @click="deleteItem"
              class="common-btn delete-btn"
              ><v-icon class="mr-3">mdi-delete</v-icon
              >{{ $t("admin.newHouseholdDesc.delete") }}</v-btn
            >
            <div class="new-household-btn-wrapper">
              <v-btn
                depressed
                outlined
                class="new-household-btn common-btn-outlined"
                @click="close"
                >{{ $t("common.cancel") }}</v-btn
              >
              <v-btn
                depressed
                color="primary"
                class="common-btn"
                @click="save"
                >{{ $t("common.next") }}</v-btn
              >
            </div>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: function() {
    return {
      markers: {
        position: {
          lat: 43.344377868090525,
          lng: 17.805408243266328
        }
      },
      valid: false,
      descRules: [v => !!v || this.$t("common.required")],
      household: {
        title: {
          en: "",
          bhs: ""
        },
        description: {
          en: "",
          bhs: ""
        },
        address: "",
        city_id: null,
        latitude: null,
        longitude: null,
        popular: false
      }
    };
  },
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
      confirm(this.$t("common.deleteConfirm")) &&
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
          title: {
            en: this.household.title.en,
            bhs: this.household.title.bhs
          },
          description: {
            en: this.household.description.en,
            bhs: this.household.description.bhs
          },
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
      this.$router.push(url);
    },
    close() {
      this.$router.push("/dashboard/households");
    },
    storeHousehold() {
      let data = this.GET_SINGLE_HOUSEHOLD();
      this.household = {
        title: {
          en: data.title.en,
          bhs: data.title.bhs
        },
        description: {
          en: data.description.en,
          bhs: data.description.bhs
        },
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
    this.$emit("setStepper", 1);
    this.geolocate();
    this.fetchCities();
    if (this.$route.params.id) {
      this.getHouseholdById([
        this.$route.params.id,
        { withTranslations: 1 }
      ]).then(() => {
        if (this.GET_HOUSEHOLDID_RESP()) {
          this.storeHousehold();
        }
      });
    }
  }
};
</script>
