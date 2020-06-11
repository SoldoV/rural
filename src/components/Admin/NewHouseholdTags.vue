<template>
  <div>
    <v-data-table
      :footer-props="{
        itemsPerPageText: rowsPerPage
      }"
      :headers="headers"
      :items="tags"
      class="new-household-table mt-10"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{ $t("admin.navigation.tags") }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn depressed color="primary" class="common-btn" v-on="on">{{
                $t("admin.householdTags.new")
              }}</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{
                  $t("admin.householdTags.new")
                }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="24">
                      <v-form v-model="valid" ref="form" lazy-validation>
                        <v-select
                          required
                          outlined
                          :items="getTags"
                          item-text="title"
                          return-object
                          :rules="tagRules"
                          v-model="tag.type"
                          :label="$t('admin.householdTags.tag')"
                        ></v-select>
                        <v-text-field
                          outlined
                          :rules="tagRules"
                          type="number"
                          v-model="tag.value"
                          :label="$t('common.val')"
                        ></v-text-field>
                      </v-form>
                    </v-col>
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
      <template v-slot:item.image="{ item }">
        <div class="p-2" v-if="item.type.icon">
          <img class="tagovi-image" v-lazy="getImgUrl(item.type.icon)" />
        </div>
      </template>
      <template v-slot:item.title="{ item }">
        <div class="p-2">
          {{ item.type.title }}
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        {{ $t("admin.householdTags.noTags") }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    tags: {
      required: true
    },
    householdId: {
      required: true
    }
  },
  data: function() {
    return {
      rowsPerPage: this.$t("common.rowsPerPage"),
      dialog: false,
      valid: false,
      tagRules: [v => !!v || this.$t("common.required")],
      newTags: [],
      tag: {
        type: {},
        value: ""
      },
      defaultTag: {
        type: {},
        value: ""
      },
      headers: [
        { text: this.$t("common.img"), value: "image", sortable: false },
        { text: this.$t("common.title"), value: "title" },
        { text: this.$t("common.val"), value: "value" },
        { text: this.$t("common.actions"), value: "actions", sortable: false }
      ]
    };
  },
  computed: {
    getTags() {
      return JSON.parse(JSON.stringify(this.GET_TAGS()));
    }
  },
  methods: {
    ...mapActions(["fetchTags", "postHouseholdTags", "deleteHouseholdTag"]),
    ...mapGetters([
      "GET_TAGS",
      "HOUSEHOLD_TAG_RESP",
      "GET_ERROR_MSG",
      "GET_HOUSEHOLD_ID"
    ]),
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.tag = Object.assign({}, this.defaultTag);
      });
    },
    post() {
      let tagsObj = {
        method: "syncWithoutDetaching",
        data: {}
      };
      tagsObj.data[this.tag.type.id] = {
        value: this.tag.value
      };
      this.postHouseholdTags([tagsObj, this.householdId]).then(() => {
        if (!this.HOUSEHOLD_TAG_RESP())
          return this.$emit("errorNotif", this.GET_ERROR_MSG());
        this.tags.push(this.tag);
        this.newTags.push(this.tag);
        this.close();
      });
    },
    save() {
      if ((this.$refs.form.validate(), this.tag.type.id)) {
        this.post();
      }
    },
    deleteItem(item) {
      const index = this.tags.indexOf(item);
      confirm(this.$t("common.deleteConfirm")) &&
        this.deleteHouseholdTag([
          this.householdId,
          { method: "detach", data: [item.type.id] }
        ]);
      this.tags.splice(index, 1);
    },
    getImgUrl(img) {
      var images = require.context("../../assets/icons/", false, /\.svg$/);
      return images("./" + img + ".svg");
    }
  },
  created() {
    this.fetchTags({ withTranslations: 1 });
  }
};
</script>
