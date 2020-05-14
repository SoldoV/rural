<template>
  <div class="newHousehold">
    <v-stepper :value="stepper">
      <v-stepper-header>
        <v-stepper-step step="1" complete>Opis</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2">Svojstva</v-stepper-step>
      </v-stepper-header>
    </v-stepper>
    <router-view @increaseStepper="increaseStepper" />
  </div>
</template>

<script>
export default {
  data: () => ({
    stepper: 1
  }),
  methods: {
    increaseStepper() {
      this.stepper = 2;
      console.log("ddad");
    }
  }
};
</script>

<style lang="scss">
.v-stepper {
  box-shadow: none !important;
  border: 1px solid $border;
}
</style>
