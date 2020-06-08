<template>
  <div class="tagovi">
    <v-data-table
      :footer-props="{
        itemsPerPageText: rowsPerPage
      }"
      :headers="headers"
      :items="getArticles"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{ $t("admin.articles.title") }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog fullscreen v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2 common-btn" v-on="on">{{
                $t("admin.articles.new")
              }}</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container class="container-height">
                  <v-row class="edit-tags-row">
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-col cols="24">
                        <v-text-field
                          required
                          :rules="titleRules"
                          v-model="editedItem.title.bhs"
                          :label="$t('common.titleLabel') + '(bhs)'"
                        ></v-text-field>
                        <v-text-field
                          required
                          :rules="titleRules"
                          v-model="editedItem.title.en"
                          :label="$t('common.titleLabel') + '(en)'"
                        ></v-text-field>
                      </v-col>
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
                        <div class="p-2" v-if="editedItem.image_path">
                          <img
                            class="new-household-image"
                            :src="imageSrc(editedItem.image_path)"
                          />
                        </div>
                      </v-col>
                      <v-col cols="12">
                        <v-checkbox
                          hide-details
                          v-model="editedItem.active"
                          :label="$t('admin.articles.active')"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="12">
                        <div class="articles-label">
                          {{ $t("admin.articles.labelEn") }}
                        </div>
                        <tiptap-vuetify
                          v-model="editedItem.text.en"
                          :extensions="extensions"
                        />
                      </v-col>
                      <v-col cols="12">
                        <div class="articles-label">
                          {{ $t("admin.articles.labelBhs") }}
                        </div>
                        <tiptap-vuetify
                          v-model="editedItem.text.bhs"
                          :extensions="extensions"
                        />
                      </v-col>
                    </v-form>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  depressed
                  outlined
                  class="common-btn-outlined"
                  @click="close"
                  :disabled="loading"
                  >{{ $t("common.cancel") }}</v-btn
                >
                <v-btn
                  depressed
                  color="primary"
                  class="common-btn"
                  @click="save"
                  :loading="loading"
                  >{{ $t("common.save") }}</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.title.en="{ item }">
        <div class="p-2 article-title">
          {{ item.title.en }}
        </div>
      </template>
      <template v-slot:item.title.bhs="{ item }">
        <div class="p-2 article-title">
          {{ item.title.bhs }}
        </div>
      </template>
      <template v-slot:item.image_path="{ item }">
        <div class="p-2">
          <img class="new-household-image" :src="imageSrc(item.image_path)" />
        </div>
      </template>
      <template v-slot:item.active="{ item }">
        <v-checkbox hide-details readonly v-model="item.active"></v-checkbox>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        {{ $t("common.noData") }}
      </template>
    </v-data-table>
    <v-snackbar v-model="snackbar" :timeout="3000">
      {{ snackbarText }}
      <v-btn color="white" text @click="snackbar = false">
        {{ $t("common.close") }}
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from "tiptap-vuetify";

export default {
  components: { TiptapVuetify },
  data: function() {
    return {
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3]
            }
          }
        ],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak
      ],
      loading: false,
      rowsPerPage: this.$t("common.rowsPerPage"),
      dialog: false,
      snackbar: false,
      titleRules: [v => !!v || this.$t("common.required")],
      valid: false,
      snackbarText: "",
      headers: [
        { text: this.$t("common.titleLabel") + " (bhs)", value: "title.bhs" },
        { text: this.$t("common.titleLabel") + " (en)", value: "title.en" },
        {
          text: this.$t("common.img"),
          value: "image_path",
          sortable: true
        },
        { text: this.$t("admin.articles.active"), value: "active" },
        {
          text: this.$t("common.actions"),
          value: "actions",
          sortable: false
        }
      ],
      articles: [],
      editedIndex: -1,
      image: "",
      editedItem: {
        title: { en: "", bhs: "" },
        image_path: "",
        active: false,
        text: { en: ``, bhs: `` },
        id: ""
      },
      defaultItem: {
        title: { en: "", bhs: "" },
        image_path: "",
        active: false,
        text: { en: ``, bhs: `` }
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? this.$t("common.newItem")
        : this.$t("common.editItem");
    },
    getArticles() {
      return JSON.parse(JSON.stringify(this.GET_ARTICLES()));
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    ...mapActions([
      "fetchArticles",
      "editArticle",
      "postArticle",
      "deleteArticle"
    ]),
    ...mapGetters(["GET_ARTICLES", "GET_ARTICLE_RESP"]),
    ...mapMutations(["SET_ARTICLES"]),
    upload(val) {
      val.stopImmediatePropagation();
      let file = val.target.files[0];
      this.editedItem.image_path = file;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.image = e.target.result;
      };
    },
    popSnackbar(text) {
      this.snackbarText = text;
      this.snackbar = true;
    },
    imageSrc(src) {
      if (this.editedItem.image_path instanceof File) {
        return this.image;
      } else
        return !src.startsWith("data:image")
          ? "http://test-api.rural.ba/storage/news_images/" + src
          : src;
    },
    editItem(item) {
      this.editedIndex = this.getArticles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      confirm(this.$t("common.deleteConfirm")) &&
        this.deleteArticle(item.id).then(() => {
          if (this.GET_ARTICLE_RESP())
            this.popSnackbar(this.$t("common.deleteSuccess"));
          else this.popSnackbar(this.$t("common.deleteFail"));
        });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.image = null;
        this.editedIndex = -1;
      });
    },
    isValid() {
      return (
        this.editedItem.image_path &&
        this.editedItem.text &&
        this.editedItem.title
      );
    },
    save() {
      if (this.isValid()) {
        this.loading = true;
        var articlesObj = new FormData();
        articlesObj.append("title[en]", this.editedItem.title.en);
        articlesObj.append("title[bhs]", this.editedItem.title.bhs);
        articlesObj.append("text[en]", this.editedItem.text.en);
        articlesObj.append("text[bhs]", this.editedItem.text.bhs);
        articlesObj.append("active", this.editedItem.active ? 1 : 0);
        if (this.editedIndex > -1) {
          if (this.editedItem.image_path instanceof File)
            articlesObj.append("image", this.editedItem.image_path);
          articlesObj.append("_method", "PUT");
          articlesObj.append("id", this.editedItem.id);
          this.editArticle([articlesObj, this.editedItem.id]).then(() => {
            if (this.GET_ARTICLE_RESP())
              this.popSnackbar(this.$t("common.editSuccess"));
            else this.popSnackbar(this.$t("common.editFail"));
            this.loading = false;
            this.close();
          });
        } else {
          articlesObj.append("image", this.editedItem.image_path);
          this.postArticle(articlesObj).then(() => {
            if (this.GET_ARTICLE_RESP())
              this.popSnackbar(this.$t("common.addSuccess"));
            else this.popSnackbar(this.$t("common.addFail"));
            this.loading = false;
            this.close();
          });
        }
      }
    }
  },
  beforeMount() {
    this.SET_ARTICLES();
    this.fetchArticles([{ withTranslations: 1 }]);
  }
};
</script>
