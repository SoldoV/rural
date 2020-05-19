<template>
  <div class="new-household-properties">
    <v-form v-model="valid" ref="form">
      <tags @setTags="setTags" />
      <v-data-table
        :headers="headers"
        :items="images"
        hide-default-footer
        sort-by="calories"
        class="elevation-1 new-household-table"
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
        type="number"
        outlined
        v-model="price.price"
        label="Cijena"
      ></v-text-field>
      <div class="new-household-properties-price">Datum od do:</div>
      <v-date-picker v-model="dates" range></v-date-picker>
      <v-text-field
        required
        outlined
        v-model="links.airBnb"
        label="Link na airbnb.com"
        class="mt-10"
      ></v-text-field>
      <v-text-field
        required
        outlined
        v-model="links.booking"
        label="Link na booking.com"
      ></v-text-field>
      <div class="new-household-btn-wrapper">
        <v-btn depressed color="primary" class="new-household-btn"
          >Odustani</v-btn
        >
        <v-btn depressed color="primary" class="new-household-btn" @click="save"
          >Dalje</v-btn
        >
      </div>
    </v-form>
    <v-alert type="success" class="success-alert" v-if="success">
      Uspješno dodano domaćinstvo
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
    householdId: null,
    valid: false,
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
  methods: {
    ...mapGetters([
      "GET_HOUSEHOLD_ID",
      "PRICE_RESP",
      "PLATFORM_RESP",
      "HOUSEHOLD_TAG_RESP",
      "HOUSEHOLD_IMAGE_RESP"
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
      console.log(file);
      this.imagesBg.push(file);
      let reader = new FileReader();
      console.log(reader);
      reader.readAsDataURL(file);
      reader.onload = e => {
        console.log(e);
        this.images.push({ image: e.target.result });
      };
    },
    save() {
      let priceData = {
        household_id: this.householdId,
        price: this.price.price,
        date_to: this.dates[1],
        date_from: this.dates[0]
      };
      this.postPrice(priceData).then(() => {
        if (this.PRICE_RESP()) {
          let platforms = {
            household_id: this.householdId,
            platform_id: 1,
            uid: this.links.airBnb
          };
          this.postPlatforms(platforms).then(() => {
            if (this.PLATFORM_RESP()) {
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
                if (this.HOUSEHOLD_TAG_RESP()) {
                  var imagesObj = new FormData();
                  imagesObj.append("method", "createMany");
                  this.imagesBg.forEach((a, i) => {
                    imagesObj.append(`data[${i}][image]`, a);
                  });
                  this.postHouseholdImages([imagesObj, this.householdId]).then(
                    () => {
                      if (this.HOUSEHOLD_IMAGE_RESP()) {
                        console.log("slikaaa");
                      }
                    }
                  );
                }
              });
            }
          });
          //this.$router.push("/dashboard/newhousehold/properties");
        }
      });
      this.success = true;
    }
  },
  created() {
    this.householdId = this.GET_HOUSEHOLD_ID();
  }
};
</script>

<style lang="scss">
.new-household-properties {
  margin-top: 4em;
}
.success-alert {
  position: sticky;
  bottom: 30px;
}
.file-input-btn {
  position: relative;
  .file-input {
    cursor: pointer !important;
    opacity: 0;
    position: absolute;
    height: 36px;
    width: 147px;
    input {
      cursor: pointer !important;
      width: 100px;
    }
  }
}
.new-household-image {
  width: 100%;
  max-width: 400px;
  height: 100%;
  max-height: 400px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.new-household-table {
  margin: 4em 0 4em 0;
  border: 1px solid $border;
}
</style>
