<template>
  <div class="tagovi">
    <v-data-table
      :footer-props="{
        itemsPerPageText: rowsPerPage
      }"
      :headers="headers"
      :items="getTags"
      class="elevation-1"
    >
      <template v-slot:item.title="{ item }">
        <div class="p-2">
          <div>{{ item.title }}</div>
        </div>
      </template>
      <template v-slot:item.icon="{ item }">
        <div class="p-2" v-if="item.icon">
          <v-img
            class="tagovi-image"
            v-lazy="getImgUrl(item.icon)"
            :alt="item.title[0]"
          ></v-img>
        </div>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{ $t("admin.navigation.tags") }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2 common-btn" v-on="on">{{
                $t("admin.householdTags.new")
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
                          v-model="editedItem.title.bhs"
                          :label="$t('common.titleLabel') + ' (bhs)'"
                        ></v-text-field>
                        <v-text-field
                          required
                          :rules="titleRules"
                          v-model="editedItem.title.en"
                          :label="$t('common.titleLabel') + ' (en)'"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="24">
                        <v-select
                          required
                          :rules="titleRules"
                          :items="categories"
                          v-model="editedItem.category_id"
                          item-value="id"
                          item-text="title"
                          :label="$t('admin.householdTags.category')"
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          required
                          :items="icons"
                          v-model="editedItem.icon"
                          :label="$t('admin.householdTags.icon')"
                        ></v-select>
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
      categories: [
        { title: this.$t("admin.householdTags.main"), id: 1 },
        { title: this.$t("admin.householdTags.additional"), id: 2 },
        { title: this.$t("admin.householdTags.distance"), id: 3 },
        { title: this.$t("admin.householdTags.mainFilters"), id: 4 }
      ],
      icons: [
        "icon-gym",
        "icon-ac",
        "icon-heater",
        "icon-kitchen",
        "icon-parking",
        "icon-pool",
        "icon-tv",
        "icon-wifi",
        "icon-ac",
        "icon-shower",
        "icon-bed"
      ],
      headers: [
        { text: this.$t("common.titleLabel") + " (en)", value: "title.en" },
        { text: this.$t("common.titleLabel") + " (bhs)", value: "title.bhs" },
        {
          text: this.$t("admin.householdTags.category"),
          value: "category_id",
          sortable: true
        },
        { text: this.$t("admin.householdTags.icon"), value: "icon" },
        { text: this.$t("common.actions"), value: "actions", sortable: false }
      ],
      tags: [],
      editedIndex: -1,
      editedItem: {
        title: { en: "", bhs: "" },
        category_id: "",
        icon: "",
        created_at: "",
        updated_at: "",
        id: ""
      },
      defaultItem: {
        title: { en: "", bhs: "" },
        category_id: "",
        icon: ""
      }
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? this.$t("common.newItem")
        : this.$t("common.editItem");
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
    ...mapActions(["fetchTags", "editTag", "postTag", "deleteTag"]),
    ...mapGetters(["GET_TAGS", "GET_TAG_RESP"]),

    popSnackbar(text) {
      this.snackbarText = text;
      this.snackbar = true;
    },
    getImgUrl(img) {
      return require("../../assets/icons/" + img + ".svg");
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
      confirm(this.$t("common.deleteConfirm")) &&
        this.deleteTag(item.id).then(() => {
          if (this.GET_TAG_RESP())
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
    isValid() {
      if ([1, 2].indexOf(this.editedItem.category_id) > -1)
        return (
          this.editedItem.icon.length &&
          this.editedItem.title.en.length &&
          this.editedItem.title.bhs.length
        );
      if ([3, 4].indexOf(this.editedItem.category_id) > -1)
        return (
          this.editedItem.title.en.length && this.editedItem.title.bhs.length
        );
    },
    save() {
      if (this.$refs.form.validate() && this.isValid()) {
        let data = {
          category_id: this.editedItem.category_id,
          icon: this.editedItem.icon,
          title: {
            en: this.editedItem.title.en,
            bhs: this.editedItem.title.bhs
          }
        };
        if (this.editedIndex > -1) {
          let editedData = {
            id: this.editedItem.id,
            created_at: this.editedItem.created_at,
            updated_at: this.editedItem.updated_at,
            ...data
          };
          this.editTag(editedData).then(() => {
            if (this.GET_TAG_RESP())
              this.popSnackbar(this.$t("common.editSuccess"));
            else this.popSnackbar(this.$t("common.editFail"));
          });
        } else {
          this.postTag(data).then(() => {
            if (this.GET_TAG_RESP())
              this.popSnackbar(this.$t("common.addSuccess"));
            else this.popSnackbar(this.$t("common.addFail"));
          });
        }
        this.close();
      }
    }
  },
  mounted() {
    this.fetchTags({ withTranslations: 1 });
  }
};
</script>
