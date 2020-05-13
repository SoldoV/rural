<template>
  <div class="tagovi">
    <v-data-table :headers="headers" :items="getTags" class="elevation-1">
      <template v-slot:item.icon="{ item }">
        <div class="p-2">
          <v-img
            class="tagovi-image"
            :src="getImgUrl(item.icon)"
            :alt="item.title"
          ></v-img>
        </div>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Tagovi</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on"
                >Novi tag</v-btn
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
                        <v-select
                          required
                          :rules="titleRules"
                          :items="categories"
                          v-model="editedItem.category_id"
                          label="Kategorija"
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          required
                          :rules="titleRules"
                          v-model="editedItem.icon"
                          label="Ikona"
                        ></v-text-field>
                      </v-col>
                    </v-form>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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

export default {
  data: () => ({
    dialog: false,
    snackbar: false,
    titleRules: [v => !!v || "Popuniti polje"],
    valid: false,
    snackbarText: "",
    categories: [1, 2, 3],
    headers: [
      { text: "Ime", value: "title" },
      { text: "Kategorija", value: "category_id", sortable: true },
      { text: "Ikona", value: "icon" },
      { text: "Akcije", value: "actions", sortable: false }
    ],
    tags: [],
    editedIndex: -1,
    editedItem: {
      title: "",
      category_id: "",
      icon: "",
      created_at: "",
      updated_at: "",
      id: ""
    },
    defaultItem: {
      title: "",
      category_id: "",
      icon: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
    ...mapActions(["fetchTags"]),
    ...mapActions(["postTag"]),
    ...mapActions(["deleteTag"]),
    ...mapActions(["editTag"]),
    ...mapGetters(["GET_TAGS"]),

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
    setTags() {
      this.tags = JSON.parse(JSON.stringify(this.GET_TAGS()));
    },
    editItem(item) {
      this.editedIndex = this.getTags.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.deleteTag(item.id);
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
            category_id: this.editedItem.category_id,
            icon: this.editedItem.icon,
            title: this.editedItem.title,
            id: this.editedItem.id,
            created_at: this.editedItem.created_at,
            updated_at: this.editedItem.updated_at
          };
          this.editTag(data);
          this.popSnackbar("Item successfully edited");
        } else {
          let data = {
            category_id: this.editedItem.category_id,
            icon: this.editedItem.icon,
            title: this.editedItem.title
          };
          this.postTag(data);
          this.popSnackbar("Item successfully added");
        }
        this.close();
      }
    }
  },
  mounted() {
    this.fetchTags();
  }
};
</script>

