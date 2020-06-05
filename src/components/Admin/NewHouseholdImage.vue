<template>
  <v-data-table
    :headers="headers"
    :items="images"
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
          :loading="loading"
          color="primary"
          class="common-btn file-input-btn"
          @change="upload"
        >
          <label class="file-input">
            <input type="file" @change="upload" />
          </label>
          Nova slika
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
  data: () => ({
    loading: false,
    image: {
      image: ""
    },
    headers: [
      { text: "Slika", value: "image" },
      { text: "Actions", value: "actions", sortable: false }
    ]
  }),

  methods: {
    ...mapGetters(["HOUSEHOLD_IMAGE_RESP", "GET_ERROR_MSG"]),
    ...mapActions(["postHouseholdImages", "deleteImage"]),

    imageSrc(src) {
      return !src.startsWith("data:image")
        ? "http://test-api.rural.ba/" + src
        : src;
    },
    deleteItem(item) {
      const index = this.images.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.deleteImage(item.id) &&
        this.images.splice(index, 1);
    },
    upload(val) {
      this.loading = true;
      val.stopImmediatePropagation();
      let file = val.target.files[0];
      this.post(file);
    },
    post(file) {
      var imagesObj = new FormData();
      imagesObj.append("method", "createMany");
      imagesObj.append(`data[0][image]`, file);
      this.postHouseholdImages([imagesObj, this.householdId]).then(() => {
        this.loading = false;
        if (!this.HOUSEHOLD_IMAGE_RESP())
          return this.$emit("errorNotif", this.GET_ERROR_MSG());
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          this.images.push({ image: e.target.result });
        };
      });
    }
  }
};
</script>
