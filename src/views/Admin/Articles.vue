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
              <v-btn color="primary" dark class="mb-2 common-btn" v-on="on">
                {{
                $t("admin.articles.new")
                }}
              </v-btn>
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
                          outlined
                          required
                          :rules="titleRules"
                          v-model="editedItem.title.bhs"
                          :label="$t('common.titleLabel') + '(bhs)'"
                        ></v-text-field>
                        <v-text-field
                          outlined
                          required
                          :rules="titleRules"
                          v-model="editedItem.title.en"
                          :label="$t('common.titleLabel') + '(en)'"
                        ></v-text-field>
                        <v-select
                          clearable
                          required
                          hide-details
                          outlined
                          :items="getTags"
                          item-value="id"
                          item-text="title"
                          v-model="editedItem.tag_id"
                          :placeholder="$t('admin.navigation.tags')"
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                        <v-checkbox
                          hide-details
                          v-model="editedItem.active"
                          :label="$t('admin.articles.active')"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="12">
                        <div class="articles-label">{{ $t("admin.articles.labelEn") }}</div>
                        <tiptap-vuetify v-model="editedItem.text.en" :extensions="extensions"/>
                      </v-col>
                      <v-col cols="12">
                        <div class="articles-label">{{ $t("admin.articles.labelBhs") }}</div>
                        <tiptap-vuetify v-model="editedItem.text.bhs" :extensions="extensions"/>
                      </v-col>
                      <div v-if="ready" class="article-images">
                        <images :itemId="articleId" :newItem="editedIndex === -1"/>
                        <v-btn
                          depressed
                          color="primary"
                          class="common-btn"
                          @click="saveAndClose"
                        >{{ $t("common.save") }}</v-btn>
                      </div>
                    </v-form>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions v-if="!ready" class="mr-7">
                <v-spacer></v-spacer>
                <v-btn
                  depressed
                  outlined
                  class="common-btn-outlined"
                  @click="close"
                  :disabled="loading"
                >{{ $t("common.cancel") }}</v-btn>
                <v-btn
                  depressed
                  color="primary"
                  class="common-btn"
                  @click="save"
                  :loading="loading"
                >{{ $t("common.next") }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.title.en="{ item }">
        <div class="p-2 article-title">{{ item.title.en }}</div>
      </template>
      <template v-slot:item.title.bhs="{ item }">
        <div class="p-2 article-title">{{ item.title.bhs }}</div>
      </template>
      <template v-slot:item.image_url="{ item }">
        <div class="p-2">
          <img
            class="new-household-image"
            :src="item.images[0] ? item.images[0].small_image_url : ''"
          >
        </div>
      </template>
      <template v-slot:item.active="{ item }">
        <v-checkbox class="articles-checkbox" hide-details readonly v-model="item.active"></v-checkbox>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>{{ $t("common.noData") }}</template>
    </v-data-table>
    <v-snackbar v-model="snackbar" :timeout="3000">
      {{ snackbarText }}
      <v-btn color="white" text @click="snackbar = false">{{ $t("common.close") }}</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import images from "../../components/Admin/ArticleImages.vue";
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
  components: { TiptapVuetify, images },
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
      ready: false,
      loading: false,
      rowsPerPage: this.$t("common.rowsPerPage"),
      dialog: false,
      tags: [],
      snackbar: false,
      titleRules: [v => !!v || this.$t("common.required")],
      valid: false,
      snackbarText: "",
      headers: [
        { text: this.$t("common.titleLabel") + " (bhs)", value: "title.bhs" },
        { text: this.$t("common.titleLabel") + " (en)", value: "title.en" },
        {
          text: this.$t("common.img"),
          value: "image_url",
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
      articleId: null,
      editedItem: {
        title: { en: "", bhs: "" },
        active: false,
        text: { en: ``, bhs: `` },
        id: "",
        tag_id: ""
      },
      defaultItem: {
        title: { en: "", bhs: "" },
        active: false,
        text: { en: ``, bhs: `` },
        tag_id: ""
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
    },
    getTags() {
      return JSON.parse(JSON.stringify(this.GET_TAGS()));
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
      "deleteArticle",
      "fetchCategoryTags"
    ]),
    ...mapGetters(["GET_ARTICLES", "GET_ARTICLE_RESP", "GET_TAGS"]),
    ...mapMutations(["SET_ARTICLES"]),
    saveAndClose() {
      this.close();
      this.editedItem = Object.assign({}, this.defaultItem);
      if (this.editedIndex > -1)
        this.popSnackbar(this.$t("common.editSuccess"));
      else this.popSnackbar(this.$t("common.addSuccess"));
    },
    popSnackbar(text) {
      this.snackbarText = text;
      this.snackbar = true;
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
      this.ready = false;
      this.articleId = null;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    isValid() {
      return this.editedItem.text && this.editedItem.title;
    },
    save() {
      if (this.isValid()) {
        this.loading = true;
        let data = {
          title: {
            en: this.editedItem.title.en,
            bhs: this.editedItem.title.bhs
          },
          text: {
            en: this.editedItem.text.en,
            bhs: this.editedItem.text.bhs
          },
          actitve: this.editedItem.active ? 1 : 0,
          tag_id: this.editedItem.tag_id || null
        };
        console.log(data);
        if (this.editedIndex > -1) {
          let editedData = {
            _method: "PUT",
            id: this.editedItem.id,
            ...data
          };
          this.editArticle([editedData, this.editedItem.id]).then(() => {
            if (this.GET_ARTICLE_RESP()[1]) {
              this.articleId = this.GET_ARTICLE_RESP()[0];
              this.ready = true;
            } else this.popSnackbar(this.$t("common.editFail"));
            this.loading = false;
          });
        } else {
          this.postArticle(data).then(() => {
            if (this.GET_ARTICLE_RESP()[1]) {
              this.articleId = this.GET_ARTICLE_RESP()[0];
              this.ready = true;
            } else this.popSnackbar(this.$t("common.addFail"));
            this.loading = false;
          });
        }
      }
    }
  },
  beforeMount() {
    this.SET_ARTICLES();
    this.fetchCategoryTags([{ withTranslations: 0 }, 5]);
    this.fetchArticles([{ withTranslations: 1 }]);
  }
};
</script>
