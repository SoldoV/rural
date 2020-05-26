<template>
  <div class="tagovi">
    <v-data-table :headers="headers" :items="getArticles" class="elevation-1">
      <template v-slot:item.title="{ item }">
        <div class="p-2">
          <div>{{ item.title }}</div>
        </div>
      </template>
      <template v-slot:item.icon="{ item }">
        <div class="p-2">
          <v-img
            class="tagovi-image"
            :src="getImgUrl(item.icon)"
            :alt="item.title[0]"
          ></v-img>
        </div>
      </template>
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
                <v-container>
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
                      <v-col cols="24">
                        <v-text-field
                          required
                          :rules="titleRules"
                          v-model="editedItem.text"
                          label="Tekst"
                        ></v-text-field>
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
                          v-model="content"
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
    content: ``,
    dialog: false,
    snackbar: false,
    titleRules: [v => !!v || "Popuniti polje"],
    valid: false,
    snackbarText: "",
    headers: [
      { text: "Ime", value: "title" },
      { text: "Slika", value: "image", sortable: true },
      { text: "Aktivan", value: "active" },
      { text: "Akcije", value: "actions", sortable: false }
    ],
    articles: [],
    editedIndex: -1,
    editedItem: {
      title: "",
      image: "",
      active: false,
      text: "",
      id: ""
    },
    defaultItem: {
      title: "",
      image: "",
      active: false
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    getArticles() {
      return [];
      //return JSON.parse(JSON.stringify(this.GET_TAGS()));
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
    ...mapGetters(["GET_ARTICLES"]),

    popSnackbar(text) {
      this.snackbarText = text;
      this.snackbar = true;
    },
    getImgUrl(img) {
      var images = require.context("../../assets/icons/", false, /\.svg$/);
      return images("./" + img + ".svg");
    },
    returnItem() {
      return this.editedItem;
    },
    editItem(item) {
      this.editedIndex = this.getArticles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.deleteArticle(item.id);
      this.popSnackbar("Item successfully deleted");
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          let data = {
            title: this.editedItem.title,
            text: this.editedItem.text,
            image: this.editedItem.image,
            id: this.editedItem.id,
            active: this.editedItem.active
          };
          this.editArticle(data);
          this.popSnackbar("Item successfully edited");
        } else {
          let data = {
            title: this.editedItem.title,
            text: this.editedItem.text,
            image: this.editedItem.image,
            active: this.editedItem.active
          };
          this.postArticle(data);
          this.popSnackbar("Item successfully added");
        }
        this.close();
      }
    }
  },
  mounted() {
    this.fetchArticles();
  }
};
</script>

