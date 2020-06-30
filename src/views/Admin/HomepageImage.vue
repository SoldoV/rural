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
export default {
  data: () => ({
    itemUrl: ""
  }),
  methods: {
    imageSrc(src) {
      if (this.editedItem.image_url instanceof File) {
        return this.image;
      } else return src;
    },
    upload(val) {
      val.stopImmediatePropagation();
      let file = val.target.files[0];
      this.editedItem.image_url = file;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.image = e.target.result;
      };
    }
  }
};
</script>

<style>
</style>
