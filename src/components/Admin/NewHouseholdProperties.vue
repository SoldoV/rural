<template>
  <div class="new-household-properties">
    <v-form v-model="valid" ref="form">
      <v-file-input
        counter
        outlined
        chips
        multiple
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Izaberite slike"
        prepend-icon="mdi-camera"
        label="Slike"
        @change="img"
      ></v-file-input>
      <v-text-field
        required
        type="number"
        outlined
        v-model="price.price"
        label="Cijena"
      ></v-text-field>
      <div class="new-household-properties-price">Datum od do:</div>
      <v-date-picker v-model="dates" range></v-date-picker>
      <v-text-field
        required
        outlined
        v-model="links.airBnb"
        label="Link na airbnb.com"
        class="mt-10"
      ></v-text-field>
      <v-text-field
        required
        outlined
        v-model="links.booking"
        label="Link na booking.com"
      ></v-text-field>
      <div class="new-household-btn-wrapper">
        <v-btn
          depressed
          color="primary"
          class="new-household-btn"
          @click="close"
          >Odustani</v-btn
        >
        <v-btn depressed color="primary" class="new-household-btn" @click="save"
          >Dalje</v-btn
        >
      </div>
    </v-form>
    <v-alert type="success" class="success-alert" v-if="success">
      Uspješno dodano domaćinstvo
    </v-alert>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    success: false,
    dates: [],
    image: {
      household_id: null,
      image: "",
      cover: "",
      sequence: ""
    },
    price: {
      household_id: null,
      price: "",
      date_to: "",
      date_from: ""
    },
    links: {
      airBnb: "",
      booking: ""
    }
  }),
  methods: {
    img(val) {
      console.log(val);
      //this.image = val;
    },
    close() {
      console.log("close");
    },
    save() {
      console.log("save");
      this.success = true;
    }
  }
};
</script>

<style lang="scss">
.new-household-properties {
  margin-top: 4em;
}
.success-alert {
  position: sticky;
  bottom: 30px;
}
</style>
