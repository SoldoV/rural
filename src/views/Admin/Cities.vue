<template>
  <div class="tagovi">
    <v-data-table
      :footer-props="{
        itemsPerPageText: rowsPerPage
      }"
      :headers="headers"
      :items="getCities"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{ $t("admin.cities.cities") }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2 common-btn" v-on="on">{{
                $t("admin.cities.new")
              }}</v-btn>
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
                          :label="$t('common.titleLabel')"
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
                  outlined
                  class="common-btn-outlined"
                  @click="close"
                  >{{ $t("common.cancel") }}</v-btn
                >
                <v-btn
                  depressed
                  color="primary"
                  class="common-btn"
                  @click="save"
                  >{{ $t("common.save") }}</v-btn
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
import { mapActions, mapGetters } from "vuex";

export default {
  data: function() {
    return {
      dialog: false,
      rowsPerPage: this.$t("common.rowsPerPage"),
      snackbar: false,
      titleRules: [v => !!v || this.$t("common.required")],
      valid: false,
      snackbarText: "",
      headers: [
        { text: this.$t("common.titleLabel"), value: "title" },
        { text: this.$t("common.id"), value: "id", sortable: true },
        {
          text: this.$t("common.actions"),
          value: "actions",
          sortable: false
        }
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
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? this.$t("common.newItem")
        : this.$t("common.editItem");
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
    ...mapActions(["deleteCity", "editCity", "postCity", "fetchCities"]),
    ...mapGetters(["GET_CITIES", "GET_CITY_RESP"]),

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
      confirm(this.$t("common.deleteConfirm")) &&
        this.deleteCity(item.id).then(() => {
          if (this.GET_CITY_RESP())
            this.popSnackbar(this.$t("common.deleteSuccess"));
          else this.popSnackbar(this.$t("common.deleteFail"));
        });
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
          this.editCity(data).then(() => {
            if (this.GET_CITY_RESP())
              this.popSnackbar(this.$t("common.editSuccess"));
            else this.popSnackbar(this.$t("common.editFail"));
          });
        } else {
          let data = {
            title: this.editedItem.title
          };
          this.postCity(data).then(() => {
            if (this.GET_CITY_RESP())
              this.popSnackbar(this.$t("common.addSuccess"));
            else this.popSnackbar(this.$t("common.addFail"));
          });
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
