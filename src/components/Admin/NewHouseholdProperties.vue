<template>
  <div class="new-household-properties">
    <v-form v-model="valid" ref="form" lazy-validation>
      <tags ref="tagsComp" @errorNotif="errorNotif" :tags="tags" />
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
            <img class="new-household-image" :src="imageSrc(item.image)" />
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
      <priceComp @errorNotif="errorNotif" ref="pricesComp" :prices="prices" />
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
import priceComp from "./NewHouseholdPrice.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    tags,
    priceComp
  },
  data: () => ({
    inputRules: [v => !!v || "Popuniti polje"],
    householdId: null,
    valid: false,
    error: false,
    btnLoad: false,
    errorValue: "",
    success: false,
    prices: [],
    tags: [],
    newTags: [],
    image: {
      image: ""
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
      "PLATFORM_RESP",
      "HOUSEHOLD_IMAGE_RESP",
      "GET_ERROR_MSG",
      "GET_SINGLE_HOUSEHOLD"
    ]),
    ...mapActions([
      "postPlatforms",
      "postHouseholdTags",
      "postHouseholdImages"
    ]),
    imageSrc(src) {
      return !src.startsWith("data:image")
        ? "http://18.156.183.119/" + src
        : src;
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
        this.$refs.form.validate() && this.tags.length && this.images.length
      );
    },
    save() {
      if (this.isValid()) {
        this.btnLoad = true;
        this.$refs.pricesComp.post(this.householdId);
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

          this.$refs.tagsComp.post(this.householdId);

          var imagesObj = new FormData();
          imagesObj.append("method", "createMany");
          this.imagesBg.forEach((a, i) => {
            imagesObj.append(`data[${i}][image]`, a);
          });
          this.postHouseholdImages([imagesObj, this.householdId]).then(() => {
            if (!this.HOUSEHOLD_IMAGE_RESP())
              return this.errorNotif(this.GET_ERROR_MSG());
            this.success = true;
            this.btnLoad = false;
            setTimeout(() => this.$router.push("/dashboard/households"), 2000);
          });
        });
      }
    },
    errorNotif(val) {
      this.error = true;
      this.errorValue = val;
      this.btnLoad = false;
    },
    setEditedHouseholdItems() {
      this.householdId = this.$route.params.id;
      let data = this.GET_SINGLE_HOUSEHOLD();
      data.tags.forEach(a => {
        this.tags.push({
          type: {
            category_id: a.category_id,
            created_at: a.created_at,
            icon: a.icon,
            id: a.id,
            title: {
              en: a.title.en
            },
            updated_at: a.updated_at
          },
          value: a.pivot.value
        });
      });
      data.images.forEach(a => {
        this.images.push({ image: a.file_path });
      });
      data.prices.forEach(a => {
        this.prices.push({
          price: a.price,
          date: [a.date_from, a.date_to]
        });
      });
      this.links = {
        airBnb: data.platforms[0].pivot.uid,
        booking: data.platforms[1].pivot.uid
      };
      this.dates = [data.prices[0].date_from, data.prices[0].date_to];
    }
  },
  created() {
    if (this.$route.params.id) this.setEditedHouseholdItems();
    else this.householdId = this.GET_HOUSEHOLD_ID();
  }
};
</script>
