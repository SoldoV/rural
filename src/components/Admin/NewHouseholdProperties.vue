<template>
  <div class="new-household-properties">
    <v-form v-model="valid" ref="form" lazy-validation>
      <tags @setTags="setTags" />
      <v-data-table
        :headers="headers"
        :items="images"
        hide-default-footer
        sort-by="calories"
        class="new-household-table"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Slike</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              depressed
              color="primary"
              class="action-button file-input-btn"
              @change="upload"
            >
              <label class="file-input">
                <input type="file" @change="upload" />
              </label>
              New image
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.image="{ item }">
          <div class="p-2">
            <img class="new-household-image" :src="item.image" />
          </div>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          No images
        </template>
      </v-data-table>
      <v-text-field
        required
        :rules="inputRules"
        type="number"
        outlined
        onkeydown="return event.keyCode !== 69"
        v-model="price.price"
        label="Cijena"
      ></v-text-field>
      <div class="new-household-properties-price">Datum od do:</div>
      <v-date-picker v-model="dates" range></v-date-picker>
      <v-text-field
        required
        :rules="inputRules"
        outlined
        v-model="links.airBnb"
        label="Airbnb uid"
        class="mt-10"
      ></v-text-field>
      <v-text-field
        :rules="inputRules"
        required
        outlined
        v-model="links.booking"
        label="Booking uid"
      ></v-text-field>
      <div class="new-household-btn-wrapper">
        <v-btn
          depressed
          color="primary"
          class="new-household-btn"
          :loading="btnLoad"
          @click="save"
          >Dalje</v-btn
        >
      </div>
    </v-form>
    <v-alert type="success" class="success-alert" v-if="success">
      Uspješno dodano domaćinstvo
    </v-alert>
    <v-alert type="error" class="success-alert" v-if="error">
      {{ errorValue }}
    </v-alert>
  </div>
</template>

<script>
import tags from "./NewHouseholdTags.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    tags
  },
  data: () => ({
    inputRules: [v => !!v || "Popuniti polje"],
    householdId: null,
    valid: false,
    error: false,
    btnLoad: false,
    errorValue: "",
    success: false,
    dates: [],
    tags: [],
    image: {
      household_id: null,
      image: ""
    },
    price: {
      household_id: null,
      price: "",
      date_to: "",
      date_from: ""
    },
    links: {
      airBnb: "",
      booking: ""
    },
    headers: [
      { text: "Slika", value: "image" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    images: [],
    imagesBg: []
  }),
  watch: {
    success(val) {
      if (val) setTimeout(() => (this.success = false), 2000);
    },
    error(val) {
      if (val) setTimeout(() => (this.error = false), 5000);
    }
  },
  methods: {
    ...mapGetters([
      "GET_HOUSEHOLD_ID",
      "PRICE_RESP",
      "PLATFORM_RESP",
      "HOUSEHOLD_TAG_RESP",
      "HOUSEHOLD_IMAGE_RESP",
      "GET_ERROR_MSG"
    ]),
    ...mapActions([
      "postPrice",
      "postPlatforms",
      "postHouseholdTags",
      "postHouseholdImages"
    ]),
    setTags(val) {
      this.tags = val;
    },
    deleteItem(item) {
      const index = this.images.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.images.splice(index, 1);
    },
    upload(val) {
      val.stopImmediatePropagation();
      let file = val.target.files[0];
      this.imagesBg.push(file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.images.push({ image: e.target.result });
      };
    },
    isValid() {
      return (
        this.$refs.form.validate() &&
        this.tags.length &&
        this.images.length &&
        this.dates.length === 2
      );
    },
    save() {
      if (this.isValid()) {
        this.btnLoad = true;
        let priceData = {
          household_id: this.householdId,
          price: this.price.price,
          date_to: this.dates[1],
          date_from: this.dates[0]
        };
        this.postPrice(priceData).then(() => {
          if (!this.PRICE_RESP()) return this.errorNotif(this.GET_ERROR_MSG());
          let platforms = {
            method: "attach",
            data: {
              1: {
                uid: this.links.airBnb
              },
              2: {
                uid: this.links.booking
              }
            }
          };
          this.postPlatforms([platforms, this.householdId]).then(() => {
            if (!this.PLATFORM_RESP())
              return this.errorNotif(this.GET_ERROR_MSG());
            let tagsObj = {
              method: "attach",
              data: {}
            };
            this.tags.forEach((x, i) => {
              tagsObj.data[this.tags[i].type.id] = {
                value: this.tags[i].value
              };
            });
            this.postHouseholdTags([tagsObj, this.householdId]).then(() => {
              if (!this.HOUSEHOLD_TAG_RESP())
                return this.errorNotif(this.GET_ERROR_MSG());
              var imagesObj = new FormData();
              imagesObj.append("method", "createMany");
              this.imagesBg.forEach((a, i) => {
                imagesObj.append(`data[${i}][image]`, a);
              });
              this.postHouseholdImages([imagesObj, this.householdId]).then(
                () => {
                  if (!this.HOUSEHOLD_IMAGE_RESP())
                    return this.errorNotif(this.GET_ERROR_MSG());
                  this.success = true;
                  this.btnLoad = false;
                  setTimeout(
                    () => this.$router.push("/dashboard/households"),
                    2000
                  );
                }
              );
            });
          });
        });
      }
    },
    errorNotif(val) {
      this.error = true;
      this.errorValue = val;
      this.btnLoad = false;
    }
  },
  created() {
    this.householdId = this.$route.params.id || this.GET_HOUSEHOLD_ID();
  }
};
</script>
