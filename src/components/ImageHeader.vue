<template>
  <div>
    <div
      class="image-header"
      :style="{ backgroundImage: `url(${require('@/assets/' + imgSrc)})` }"
    >
      <div class="image-header-text">{{ headerText }}</div>
      <div class="image-header-searchbar">
        <v-text-field
          placeholder="Pretražite novosti..."
          background-color="white"
          outlined
          v-model="searchVal"
          append-icon="mdi-magnify"
          v-on:keyup.enter="search(searchVal)"
          @click:append="search(searchVal)"
        ></v-text-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headerText: {
      required: true
    },
    imgSrc: {
      required: true
    }
  },
  data: () => ({
    searchVal: ""
  }),
  methods: {
    search(val) {
      this.$emit("search", val);
    }
  }
};
</script>
