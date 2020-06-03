<template>
  <div class="tagovi">
    <v-data-table :headers="headers" :items="articles" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Članci</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog fullscreen v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2 common-btn" v-on="on"
                >Novi članak</v-btn
              >
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
                          v-model="editedItem.title"
                          label="Naziv"
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
                          Nova slika
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
                          label="Aktivan"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="12">
                        <tiptap-vuetify
                          v-model="editedItem.text"
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
                  >Cancel</v-btn
                >
                <v-btn
                  depressed
                  color="primary"
                  class="common-btn"
                  @click="save"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
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
        No data
      </template>
    </v-data-table>
    <v-snackbar v-model="snackbar" :timeout="3000">
      {{ snackbarText }}
      <v-btn color="white" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
  data: () => ({
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
    dialog: false,
    snackbar: false,
    titleRules: [v => !!v || "Popuniti polje"],
    valid: false,
    snackbarText: "",
    headers: [
      { text: "Ime", value: "title" },
      { text: "Slika", value: "image_path", sortable: true },
      { text: "Aktivan", value: "active" },
      { text: "Akcije", value: "actions", sortable: false }
    ],
    articles: [],
    editedIndex: -1,
    image: "",
    editedItem: {
      title: "",
      image_path: "",
      active: false,
      text: ``,
      id: ""
    },
    defaultItem: {
      title: "",
      image_path: "",
      text: ``,
      active: false
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
      confirm("Are you sure you want to delete this item?") &&
        this.deleteArticle(item.id).then(() =>
          this.popSnackbar("Item successfully deleted")
        );
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
        var articlesObj = new FormData();
        articlesObj.append("title", this.editedItem.title);
        articlesObj.append("text", this.editedItem.text);
        articlesObj.append("active", this.editedItem.active ? 1 : 0);
        if (this.editedIndex > -1) {
          if (this.image) articlesObj.append("image", this.image);
          this.editArticle(articlesObj);
          this.popSnackbar("Item successfully edited");
        } else {
          articlesObj.append("image", this.editedItem.image_path);
          this.postArticle(articlesObj).then(() => {
            if (this.GET_ARTICLE_RESP())
              this.popSnackbar("Item successfully added");
            else this.popSnackbar("Couldn't add article");
            this.close();
          });
        }
      }
    },
    getArticles() {
      this.fetchArticles().then(() => {
        console.log(this.articles);
      });
    }
  },
  mounted() {
    this.getArticles();
  }
};
</script>
<style lang="scss">
.container-height {
  height: calc(100% - 0vh) !important;
  max-height: calc(100% - 0vh) !important;
}
</style>
