<template>
  <div>
    <v-data-table
      :footer-props="{
        itemsPerPageText: rowsPerPage
      }"
      :headers="headers"
      :items="householdPrices"
      class="new-household-table mt-10"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{
            $t("admin.newHouseholdPrice.prices")
          }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn depressed color="primary" class="common-btn" v-on="on">{{
                $t("admin.newHouseholdPrice.new")
              }}</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{
                  $t("admin.newHouseholdPrice.new")
                }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="24">
                      <v-form v-model="valid" ref="form" lazy-validation>
                        <v-text-field
                          required
                          :rules="priceRules"
                          type="number"
                          outlined
                          onkeydown="return event.keyCode !== 69"
                          v-model="price.value"
                          :label="$t('admin.newHouseholdPrice.price')"
                        ></v-text-field>
                        <div class="new-household-properties-price">
                          {{ $t("admin.newHouseholdPrice.fromTo") }}
                        </div>
                        <v-date-picker
                          v-model="price.date"
                          range
                        ></v-date-picker>
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
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:item.date="{ item }">
        <div>
          {{ getDate(item) }}
        </div>
      </template>
      <template v-slot:no-data>
        {{ $t("admin.newHouseholdPrice.noPrices") }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  props: {
    prices: {
      required: true
    },
    householdId: {
      required: true
    }
  },
  data: function() {
    return {
      rowsPerPage: this.$t("common.rowsPerPage"),
      householdPrices: this.prices,
      dialog: false,
      valid: false,
      priceRules: [v => !!v || this.$t("common.required")],
      price: {
        value: "",
        date: []
      },
      defaultPrice: {
        value: "",
        date: []
      },
      headers: [
        {
          text: this.$t("admin.newHouseholdPrice.price"),
          value: "value",
          sortable: false
        },
        { text: this.$t("admin.newHouseholdPrice.date"), value: "date" },
        { text: this.$t("common.actions"), value: "actions", sortable: false }
      ]
    };
  },
  methods: {
    ...mapActions(["postPrice", "deletePrice", "getHouseholdById"]),
    ...mapGetters([
      "PRICE_RESP",
      "GET_ERROR_MSG",
      "GET_HOUSEHOLDID_RESP",
      "GET_SINGLE_HOUSEHOLD"
    ]),
    getDate(item) {
      return (
        moment(item.date[0], "YYYY-MM-DD").format("DD-MM-YYYY") +
        " - " +
        moment(item.date[1], "YYYY-MM-DD").format("DD-MM-YYYY")
      );
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.price = Object.assign({}, this.defaultPrice);
      });
    },
    post() {
      let priceData = {
        household_id: this.householdId,
        value: this.price.value,
        date_to: this.price.date[1],
        date_from: this.price.date[0]
      };
      this.postPrice(priceData).then(() => {
        if (!this.PRICE_RESP())
          return this.$emit("errorNotif", this.GET_ERROR_MSG());
        this.getHouseholdById([this.householdId, { withTranslations: 1 }]).then(
          () => {
            if (this.GET_HOUSEHOLDID_RESP()) {
              this.householdPrices = this.GET_SINGLE_HOUSEHOLD().prices;
              this.householdPrices.forEach(e => {
                e.date = [e.date_from, e.date_to];
              });
            }
          }
        );
        this.close();
      });
    },
    save() {
      if (this.$refs.form.validate() && this.price.date.length > 0) {
        this.post();
      }
    },
    deleteItem(item) {
      const index = this.householdPrices.indexOf(item);
      confirm(this.$t("common.deleteConfirm")) &&
        this.deletePrice(item.id).then(() =>
          this.householdPrices.splice(index, 1)
        );
    }
  }
};
</script>
