<template>
  <v-data-table
    :footer-props="{
      itemsPerPageText: rowsPerPage
    }"
    :headers="headers"
    :items="images"
    class="new-household-table"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{
          $t("admin.newHouseholdImg.images")
        }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn
          depressed
          :loading="loading"
          color="primary"
          class="common-btn file-input-btn"
          @change="upload"
        >
          <label class="file-input">
            <input type="file" @change="upload" />
          </label>
          {{ $t("common.newImg") }}
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.image="{ item }">
      <div class="p-2">
        <img class="new-household-image" v-lazy="imageSrc(item.image)" />
      </div>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      {{ $t("common.noData") }}
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    images: {
      required: true
    },
    householdId: {
      required: true
    }
  },
  data: function() {
    return {
      rowsPerPage: this.$t("common.rowsPerPage"),
      loading: false,
      image: {
        image: ""
      },
      headers: [
        { text: this.$t("common.img"), value: "image" },
        { text: this.$t("common.actions"), value: "actions", sortable: false }
      ]
    };
  },
  methods: {
    ...mapGetters([
      "HOUSEHOLD_IMAGE_RESP",
      "GET_ERROR_MSG",
      "GET_SINGLE_HOUSEHOLD"
    ]),
    ...mapActions(["postHouseholdImages", "deleteImage", "getHouseholdById"]),

    imageSrc(src) {
      return src;
    },
    deleteItem(item) {
      const index = this.images.indexOf(item);
      confirm(this.$t("common.deleteConfirm")) &&
        this.deleteImage(item.id).then(() => this.images.splice(index, 1));
    },
    upload(val) {
      this.loading = true;
      val.stopImmediatePropagation();
      let file = val.target.files[0];
      this.post(file);
    },
    setImages() {
      this.getHouseholdById([localStorage.getItem("household_id"), {}]).then(
        () => {
          this.$emit("setImages", this.GET_SINGLE_HOUSEHOLD());
        }
      );
    },
    post(file) {
      var imagesObj = new FormData();
      imagesObj.append("method", "createMany");
      imagesObj.append(`data[0][image]`, file);
      this.postHouseholdImages([imagesObj, this.householdId]).then(() => {
        this.loading = false;
        if (!this.HOUSEHOLD_IMAGE_RESP())
          return this.$emit("errorNotif", this.GET_ERROR_MSG());
        this.setImages();
      });
    }
  }
};
</script>
