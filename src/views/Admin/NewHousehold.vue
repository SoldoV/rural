<template>
  <div class="newHousehold">
    <v-stepper :value="stepper">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="stepper > 1">{{
          $t("common.desc")
        }}</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="stepper > 2">{{
          $t("common.props")
        }}</v-stepper-step>
      </v-stepper-header>
    </v-stepper>
    <router-view @setStepper="setStepper" />
  </div>
</template>

<script>
export default {
  data: () => ({
    stepper: 1
  }),
  methods: {
    setStepper(val) {
      this.stepper = val;
    }
  }
};
</script>
