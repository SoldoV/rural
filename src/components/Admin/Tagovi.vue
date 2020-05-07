<template>
  <div class="tagovi">
    <v-col class="d-flex" cols="12" sm="6">
      <v-select :items="categories" outlined label="Kategorija"></v-select>
    </v-col>
    <v-data-table :headers="headers" :items="tags" class="elevation-1">
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
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import tagItems from "./TagItems.vue";

export default {
  components: {
    tagItems
  },
  data: () => ({
    categories: ["rooms", "benefits", "nearby"],
    dialog: false,
    headers: [
      { text: "Ime", value: "name" },
      { text: "Kategorija", value: "category" },
      { text: "Akcije", value: "actions", sortable: false }
    ],
    tags: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      category: ""
    },
    defaultItem: {
      name: "",
      category: ""
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

  created() {
    this.initialize();
  },

  methods: {
    returnItem() {
      return this.editedIndex === -1 ? 0 : this.editedItem;
    },
    initialize() {
      this.tags = [
        {
          name: "Kuhinja",
          quantity: "2",
          category: "rooms",
          icon: "rural-kuhinja"
        },
        {
          name: "Teretana",
          category: "benefits",
          icon: "rural-gym"
        },
        {
          name: "Bolnica",
          category: "nearby",
          distance: "1.2km"
        }
      ];
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
  }
};
</script>

<style lang="scss">
.edit-tags-row {
  display: flex;
  flex-direction: column;
}
</style>
