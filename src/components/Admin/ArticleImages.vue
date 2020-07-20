<template>
  <v-data-table
    :footer-props="{
      itemsPerPageText: rowsPerPage
    }"
    :headers="headers"
    :items="images"
    class="new-household-table article-images-table"
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
        <img
          class="new-household-image"
          v-lazy="imageSrc(item.small_image_url)"
        />
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
    newItem: {
      required: true
    }
  },
  data: function() {
    return {
      rowsPerPage: this.$t("common.rowsPerPage"),
      loading: false,
      images: [],
      image: {
        image: ""
      },
      headers: [
        { text: this.$t("common.img"), value: "image" },
        { text: this.$t("common.actions"), value: "actions", sortable: false }
      ]
    };
  },
  watch: {
    newItem(a) {
      if (a) this.images = [];
    }
  },
  computed: {
    articleId() {
      return this.GET_ARTICLE_RESP()[0];
    }
  },
  methods: {
    ...mapGetters([
      "GET_ARTICLE_IMAGE_RESP",
      "GET_ERROR_MSG",
      "GET_ARTICLE_IMAGES",
      "GET_ARTICLE_RESP"
    ]),
    ...mapActions([
      "deleteArticleImage",
      "fetchArticleImages",
      "postArticleImages"
    ]),
    imageSrc(src) {
      return src;
    },
    deleteItem(item) {
      confirm(this.$t("common.deleteConfirm")) &&
        this.deleteArticleImage([this.articleId, item.id]).then(() =>
          this.setImages()
        );
    },
    upload(val) {
      this.loading = true;
      val.stopImmediatePropagation();
      let file = val.target.files[0];
      this.post(file);
    },
    setImages() {
      this.fetchArticleImages(this.articleId).then(() => {
        this.images = this.GET_ARTICLE_IMAGES();
      });
    },
    post(file) {
      var imagesObj = new FormData();
      imagesObj.append("method", "createMany");
      imagesObj.append(`data[0][image]`, file);
      this.postArticleImages([imagesObj, this.articleId]).then(() => {
        this.loading = false;
        if (this.GET_ARTICLE_IMAGE_RESP()) this.setImages();
      });
    }
  },
  mounted() {
    this.setImages();
  }
};
</script>
