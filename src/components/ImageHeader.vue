<template>
  <div>
    <div class="image-header" :style="{ backgroundImage: `url(${imgSrc})` }">
      <div class="image-header-text">{{ headerText }}</div>
      <div class="image-header-searchbar" v-if="!single">
        <v-text-field
          :placeholder="searchText"
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
    },
    single: {
      required: true
    },
    searchText: {
      required: true
    }
  },
  data: () => ({
    searchVal: ""
  }),
  methods: {
    search(val) {
      this.$emit("search", { title: `~=${val}` });
    }
  }
};
</script>
