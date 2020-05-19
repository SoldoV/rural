<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="tags"
      hide-default-footer
      sort-by="calories"
      class="elevation-1 new-household-table mt-10"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Tagovi</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn depressed color="primary" class="action-button" v-on="on"
                >New tag</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Novi tag</span>
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
                          item-text="icon"
                          return-object
                          :rules="tagRules"
                          v-model="tag.type"
                          label="Tag"
                        ></v-select>
                        <v-text-field
                          outlined
                          :rules="tagRules"
                          type="number"
                          v-model="tag.value"
                          label="Vrijednost"
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
      <template v-slot:item.image="{ item }">
        <div class="p-2">
          <img class="tagovi-image" :src="getImgUrl(item.type.icon)" />
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        No Tags
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false,
    valid: false,
    tagRules: [v => !!v || "Morate unijeti ovo polje"],
    tag: {
      type: {},
      value: ""
    },
    defaultTag: {
      type: {},
      value: ""
    },
    headers: [
      { text: "Slika", value: "image", sortable: false },
      { text: "Vrijednost", value: "value" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    tags: []
  }),
  updated() {
    this.$emit("setTags", this.tags);
  },
  computed: {
    getTags() {
      return JSON.parse(JSON.stringify(this.GET_TAGS()));
    }
  },
  methods: {
    ...mapActions(["fetchTags"]),
    ...mapGetters(["GET_TAGS"]),
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.tag = Object.assign({}, this.defaultTag);
      });
    },
    save() {
      if (this.$refs.form.validate()) {
        this.tags.push(this.tag);
        this.close();
      }
    },
    deleteItem(item) {
      const index = this.tags.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.tags.splice(index, 1);
    },
    getImgUrl(img) {
      var images = require.context("../../assets/icons/", false, /\.svg$/);
      return images("./" + img + ".svg");
    }
    // upload(val) {
    //   val.stopImmediatePropagation();
    //   let file = val.target.files[0];
    //   let reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = e => {
    //     this.images.push({ image: e.target.result });
    //   };
    // }
  },
  mounted() {
    this.fetchTags();
  }
};
</script>

<style>
</style>
