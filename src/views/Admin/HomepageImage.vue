<template>
  <v-col cols="12">
    <v-btn
      depressed
      color="primary"
      class="common-btn file-input-btn"
      @change="upload"
      :loading="loading"
    >
      <label class="file-input">
        <input type="file" @change="upload" />
      </label>
      {{ $t("common.newImg") }}
    </v-btn>
    <div class="p-2" v-if="image">
      <img class="homepage-image" v-lazy="image" />
    </div>
    <v-snackbar v-model="snackbar" :timeout="3000">
      {{ snackbarText }}
      <v-btn color="white" text @click="snackbar = false">
        {{ $t("common.close") }}
      </v-btn>
    </v-snackbar>
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: function() {
    return {
      image: null,
      imageFile: null,
      snackbar: false,
      loading: false,
      snackbarText: ""
    };
  },
  methods: {
    ...mapActions(["fetchCoverImage", "postCoverImage"]),
    ...mapGetters(["GET_COVER_IMAGE", "GET_COVER_IMAGE_RESP"]),
    upload(val) {
      val.stopImmediatePropagation();
      let file = val.target.files[0];
      this.imageFile = file;
      this.save();
    },
    popSnackbar(text) {
      this.snackbarText = text;
      this.snackbar = true;
    },
    save() {
      this.loading = true;
      var articlesObj = new FormData();
      articlesObj.append("image", this.imageFile);
      this.postCoverImage(articlesObj).then(() => {
        if (this.GET_COVER_IMAGE_RESP()) {
          this.popSnackbar(this.$t("common.addSuccess"));
          this.setImage();
        } else this.popSnackbar(this.$t("common.addFail"));
        this.loading = false;
      });
    },
    setImage() {
      this.fetchCoverImage().then(() => {
        this.image = this.GET_COVER_IMAGE();
      });
    }
  },
  mounted() {
    this.setImage();
  }
};
</script>

<style></style>
