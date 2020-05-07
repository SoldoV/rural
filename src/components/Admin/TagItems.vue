<template>
  <div>
    <v-select
      v-if="item == 0"
      :items="categories"
      v-model="category"
      outlined
      label="Kategorija"
    ></v-select>
    <div>
      <v-row
        class="edit-tags-row"
        v-if="item.category == 'rooms' || category == 'rooms'"
      >
        <v-col cols="24">
          <v-text-field v-model="item.name" label="Ime"></v-text-field>
        </v-col>
        <v-col cols="24">
          <v-text-field
            type="number"
            v-model="item.quantity"
            label="Količina"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="item.icon" label="Ikona"></v-text-field>
        </v-col>
      </v-row>
      <v-row
        class="edit-tags-row"
        v-else-if="item.category == 'benefits' || category == 'benefits'"
      >
        <v-col cols="24">
          <v-text-field v-model="item.name" label="Ime"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="item.icon" label="Ikona"></v-text-field>
        </v-col>
      </v-row>
      <v-row
        class="edit-tags-row"
        v-else-if="item.category == 'nearby' || category == 'nearby'"
      >
        <v-col cols="12">
          <v-text-field v-model="item.name" label="Ime"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="item.distance"
            label="Udaljenost"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      required: true
    }
  },
  data: () => ({
    category: "",
    categories: ["rooms", "benefits", "nearby"]
  })
};
</script>

<style>
</style>
