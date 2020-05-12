<template>
  <div>
    <div>
      <v-row class="edit-tags-row">
        <v-col cols="24">
          <v-text-field v-model="item.title" label="Naziv"></v-text-field>
        </v-col>
        <v-col cols="24">
          <v-select
            :items="categories"
            v-model="item.category_id"
            label="Kategorija"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="item.icon" label="Ikona"></v-text-field>
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
    category: null,
    categories: [1, 2, 3]
  })
};
</script>

<style></style>
