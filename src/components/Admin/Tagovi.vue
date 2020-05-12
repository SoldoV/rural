<template>
  <div class="tagovi">
    <v-data-table :headers="headers" :items="tags" class="elevation-1">
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
                  <tagItems :item="returnItem()" />
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
  </div>
</template>

<script>
import tagItems from "./TagItems.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    tagItems
  },
  data: () => ({
    dialog: false,
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
      icon: ""
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
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    ...mapActions(["fetchTags"]),
    ...mapGetters(["GET_TAGS"]),

    getImgUrl(img) {
      var images = require.context("../../assets/icons/", false, /\.svg$/);
      return images("./" + img + ".svg");
    },
    initialize(val) {
      this.tags = val;
    },
    returnItem() {
      return this.editedIndex === -1 ? 0 : this.editedItem;
    },

    editItem(item) {
      this.editedIndex = this.tags.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.tags.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.tags.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.tags[this.editedIndex], this.editedItem);
      } else {
        this.tags.push(this.editedItem);
      }
      this.close();
    }
  },
  created() {
    this.fetchTags().then(
      this.initialize(JSON.parse(JSON.stringify(this.GET_TAGS())))
    );
  }
};
</script>

<style lang="scss">
</style>
