<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="prices"
      sort-by="calories"
      class="new-household-table mt-10"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Cijene</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn depressed color="primary" class="common-btn" v-on="on"
                >Nova cijena</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Nova cijena</span>
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
                          v-model="price.price"
                          label="Cijena"
                        ></v-text-field>
                        <div class="new-household-properties-price">
                          Datum od do:
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
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        No Prices
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    prices: {
      required: true
    },
    householdId: {
      required: true
    }
  },
  data: () => ({
    dialog: false,
    valid: false,
    priceRules: [v => !!v || "Morate unijeti ovo polje"],
    price: {
      price: "",
      date: []
    },
    defaultPrice: {
      price: "",
      date: []
    },
    headers: [
      { text: "Cijena", value: "price", sortable: false },
      { text: "Datum", value: "date" },
      { text: "Actions", value: "actions", sortable: false }
    ]
  }),
  methods: {
    ...mapActions(["postPrice", "deletePrice"]),
    ...mapGetters(["PRICE_RESP", "GET_ERROR_MSG"]),
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.price = Object.assign({}, this.defaultPrice);
      });
    },
    post() {
      let priceData = {
        household_id: this.householdId,
        price: this.price.price,
        date_to: this.price.date[1],
        date_from: this.price.date[0]
      };
      this.postPrice(priceData).then(() => {
        if (!this.PRICE_RESP())
          return this.$emit("errorNotif", this.GET_ERROR_MSG());
        this.prices.push(this.price);
        this.close();
      });
    },
    save() {
      if (this.$refs.form.validate() && this.price.date.length > 0) {
        this.post();
      }
    },
    deleteItem(item) {
      const index = this.prices.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.deletePrice(item.id) &&
        this.prices.splice(index, 1);
    }
  }
};
</script>
