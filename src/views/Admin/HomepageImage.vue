<template>
  <v-col cols="12">
    <v-btn
      depressed
      color="primary"
      class="common-btn file-input-btn"
      @change="upload"
    >
      <label class="file-input">
        <input type="file" @change="upload" />
      </label>
      {{ $t("common.newImg") }}
    </v-btn>
    <div class="p-2" v-if="itemUrl">
      <img class="new-household-image" v-lazy="imageSrc(itemUrl)" />
    </div>
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    itemUrl: "",
    image: null
  }),
  methods: {
    ...mapActions(["fetchCoverImage"]),
    ...mapGetters(["GET_COVER_IMAGE"]),
    imageSrc(src) {
      if (this.image instanceof File) {
        return this.image;
      } else return src;
    },
    upload(val) {
      val.stopImmediatePropagation();
      let file = val.target.files[0];
      this.image = file;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.image = e.target.result;
      };
    }
  },
  mounted() {
    this.fetchCoverImage().then(() => {
      this.itemUrl = this.GET_COVER_IMAGE();
    });
  }
};
</script>

<style>
</style>
