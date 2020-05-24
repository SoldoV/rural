<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <div class="additional-filters">
        <div class="filter-header align-row-center">
          <div class="filter-header-text">Dodatni filteri</div>
          <v-spacer />
          <v-btn icon><v-icon>mdi-close</v-icon></v-btn>
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
          <v-btn depressed outlined class="fiter-btn">Odustani</v-btn>
          <v-btn depressed class="header-log-in fiter-btn">Potvrda</v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: true,
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
    }
  }
};
</script>

<style lang="scss">
.additional-filters {
  height: 100%;
  width: 100%;
  padding: 28px 24px 32px 24px;

  .filter-header-text {
    color: $primary-text;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
  }

  .v-btn {
    border-color: $border;
    min-width: 34px !important;
    height: 34px !important;
    width: 34px !important;
  }

  .filter-counter-text {
    display: inline-block;
    margin: 0px 18px 0px 18px;
    width: 10px;
  }
  .filter-text {
    color: $secondary-text;
    font-size: 16px;
    font-weight: 400;
  }
  .filter-rooms {
    padding: 32px 0px 24px 0px;
    border-bottom: 1px solid $border;
  }

  .filter-extras {
    height: 144px;
    display: flex;
    flex-flow: column wrap;
    margin: 24px 0 36px 0;
  }
  .v-input--selection-controls {
    margin: 0 0 10px 0 !important;
    padding: 0px !important;
  }

  .filter-footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .fiter-btn {
    width: 116px !important;
    margin-right: 0px !important;
    height: 36px !important;
    text-transform: none !important;
    font-weight: 600;
  }
}
</style>
