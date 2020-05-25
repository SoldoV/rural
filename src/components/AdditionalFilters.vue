<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <div class="additional-filters">
        <div class="filter-header align-row-center">
          <div class="filter-header-text">Dodatni filteri</div>
          <v-spacer />
          <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
        </div>
        <div class="filter-rooms">
          <div class="filter-beds my-2 align-row-center">
            <div class="filter-text">Kreveta</div>
            <v-spacer />
            <div class="filter-counter">
              <v-btn outlined :disabled="isDisabled(beds)" @click="beds--"
                >-</v-btn
              >
              <div class="filter-counter-text">
                {{ beds }}
              </div>
              <v-btn outlined @click="beds++">+</v-btn>
            </div>
          </div>
          <div class="filter-bedrooms my-2 align-row-center">
            <div class="filter-text">Spavaćih soba</div>
            <v-spacer />
            <div class="filter-counter">
              <v-btn
                outlined
                :disabled="isDisabled(bedrooms)"
                @click="bedrooms--"
                >-</v-btn
              >
              <div class="filter-counter-text">
                {{ bedrooms }}
              </div>
              <v-btn outlined @click="bedrooms++">+</v-btn>
            </div>
          </div>
          <div class="filter-toilets my-2 align-row-center">
            <div class="filter-text">Kupaonica</div>
            <v-spacer />
            <div class="filter-counter">
              <v-btn outlined :disabled="isDisabled(toilets)" @click="toilets--"
                >-</v-btn
              >
              <div class="filter-counter-text">
                {{ toilets }}
              </div>
              <v-btn outlined @click="toilets++">+</v-btn>
            </div>
          </div>
        </div>
        <div class="filter-extras">
          <div v-for="item in extras" :key="item.name">
            <v-checkbox
              hide-details
              v-model="item.value"
              :label="item.name"
            ></v-checkbox>
          </div>
        </div>
        <div class="filter-footer">
          <v-btn depressed outlined class="common-btn-outlined" @click="close"
            >Odustani</v-btn
          >
          <v-btn depressed class="common-btn" @click="close">Potvrda</v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      required: true
    }
  },
  data: () => ({
    beds: 0,
    bedrooms: 0,
    toilets: 0,
    extras: [
      {
        name: "Kuhinja",
        value: false
      },
      {
        name: "Klima",
        value: false
      },
      {
        name: "TV",
        value: false
      },
      {
        name: "Teretana",
        value: false
      },
      {
        name: "Grijanje",
        value: false
      },
      {
        name: "Wi-Fi",
        value: false
      },
      {
        name: "Besplatani parking",
        value: false
      },
      {
        name: "Bazen",
        value: false
      }
    ]
  }),
  methods: {
    isDisabled(val) {
      if (val > 0) return false;
      return true;
    },
    close() {
      this.$emit("toggleAdditionalFilters");
    }
  }
};
</script>
