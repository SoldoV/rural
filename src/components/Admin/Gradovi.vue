<template>
  <div class="tagovi">
    <v-data-table :headers="headers" :items="getCities" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Gradovi</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2 action-button" v-on="on"
                >Novi grad</v-btn
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
                    </v-form>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  depressed
                  color="primary"
                  class="action-button"
                  @click="close"
                  >Cancel</v-btn
                >
                <v-btn
                  depressed
                  color="primary"
                  class="action-button"
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

export default {
  data: () => ({
    dialog: false,
    snackbar: false,
    titleRules: [v => !!v || "Popuniti polje"],
    valid: false,
    snackbarText: "",
    headers: [
      { text: "Ime", value: "title" },
      { text: "Id", value: "id", sortable: true },
      { text: "Akcije", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      title: "",
      id: "",
      created_at: "",
      updated_at: ""
    },
    defaultItem: {
      title: "",
      id: "",
      created_at: "",
      updated_at: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    getCities() {
      return JSON.parse(JSON.stringify(this.GET_CITIES()));
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    ...mapActions(["fetchCities"]),
    ...mapActions(["postCity"]),
    ...mapActions(["deleteCity"]),
    ...mapActions(["editCity"]),
    ...mapGetters(["GET_CITIES"]),

    popSnackbar(text) {
      this.snackbarText = text;
      this.snackbar = true;
    },
    editItem(item) {
      this.editedIndex = this.getCities.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.deleteCity(item.id);
      this.popSnackbar("Grad uspješno izbrisan");
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
            id: this.editedItem.id,
            title: this.editedItem.title,
            created_at: this.editedItem.created_at,
            updated_at: this.editedItem.updated_at
          };
          this.editCity(data);
          this.popSnackbar("Grad uspješno uređen");
        } else {
          let data = {
            title: this.editedItem.title
          };
          this.postCity(data);
          this.popSnackbar("Grad uspješno dodan");
        }
        this.close();
      }
    }
  },
  mounted() {
    this.fetchCities();
  }
};
</script>

