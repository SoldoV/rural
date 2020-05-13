<template>
  <div class="new-household">
    <v-row class="justify-center mt-10">
      <v-col cols="6">
        <v-form ref="form" v-model="valid" lazy-validation>
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
            outlined
            required
            v-model="household.title"
            label="Naziv"
          ></v-text-field>
          <v-textarea
            required
            v-model="household.title"
            outlined
            label="Opis"
          ></v-textarea>
          <v-text-field
            required
            outlined
            type="number"
            v-model="household.price"
            label="Cijena(KM)"
          ></v-text-field>
          <v-text-field
            required
            outlined
            v-model="household.bookingLink"
            label="Booking link"
          ></v-text-field>
          <v-text-field
            required
            outlined
            v-model="household.airbnbLink"
            label="AirBnb link"
          ></v-text-field>
          <v-text-field
            required
            outlined
            type="number"
            v-model="household.beds"
            label="Kreveti"
          ></v-text-field>
          <v-text-field
            required
            outlined
            type="number"
            v-model="household.baths"
            label="Kupaonice"
          ></v-text-field>
          <v-text-field
            required
            outlined
            type="number"
            v-model="household.rooms"
            label="Sobe"
          ></v-text-field>
          <div class="new-household-btn-wrapper">
            <v-btn
              depressed
              color="primary"
              class="new-household-btn"
              @click="close"
              >Cancel</v-btn
            >
            <v-btn
              depressed
              color="primary"
              class="new-household-btn"
              @click="save"
              >Save</v-btn
            >
          </div>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    household: {
      images: {},
      title: "",
      description: "",
      tags: {},
      price: null,
      bookingLink: "",
      airbnbLink: "",
      beds: null,
      baths: null,
      rooms: null
    }
  }),
  methods: {
    img(val) {
      console.log(val);
      this.household.images = val;
    },
    save() {
      if (this.$refs.form.validate()) {
        console.log(this.household);
      }
    },
    close() {
      console.log(this.household);
    }
  }
};
</script>

<style lang="scss">
.new-household-btn-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .new-household-btn {
    margin: 0px 0px 2em 20px;
  }
}
</style>
