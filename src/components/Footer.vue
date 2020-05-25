<template>
  <div class="footer">
    <div class="footer-logo"></div>
    <div class="footer-copyright">
      Rural.ba © 2020 All rights reserved.
    </div>
    <div class="footer-social">
      <a href="https://instagram.com" target="_blank">
        <div class="footer-social-box"><v-icon>mdi-instagram</v-icon></div>
      </a>
      <a href="https://facebook.com" target="_blank">
        <div class="footer-social-box"><v-icon>mdi-facebook</v-icon></div>
      </a>
      <v-select
        class="footer-lang"
        :items="items"
        dense
        v-model="selected"
        :menu-props="{ top: true, offsetY: true }"
        outlined
        hide-details
      ></v-select>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: ["English", "Hrvatski"],
    selected: "English"
  })
};
</script>
