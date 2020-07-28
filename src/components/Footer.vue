<template>
  <div class="footer">
    <div class="footer-logo"></div>
    <div class="footer-copyright">Rural.ba © 2020 {{ $t("footer") }}</div>
    <div class="footer-social">
      <a href="https://instagram.com/rural.ba/" target="_blank">
        <div class="footer-social-box"><v-icon>mdi-instagram</v-icon></div>
      </a>
      <a
        href="https://www.facebook.com/Ruralba-107119387731176"
        target="_blank"
      >
        <div class="footer-social-box"><v-icon>mdi-facebook</v-icon></div>
      </a>
      <v-select
        prepend-inner-icon="mdi-earth"
        class="footer-lang"
        :items="items"
        dense
        @change="changeLang()"
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
    items: ["English", "BHS"],
    selected: "English"
  }),
  methods: {
    changeLang() {
      let lang = this.selected == "English" ? "en" : "bhs";
      this.$i18n.locale = lang;
      localStorage.setItem("Lang", lang);
      location.reload();
    },
    setSelected() {
      if (localStorage.Lang != null)
        this.selected = localStorage.Lang == "en" ? "English" : "BHS";
      else this.selected = "English";
    }
  },
  mounted() {
    this.setSelected();
    if (localStorage.Lang != null) {
      this.$i18n.locale = localStorage.Lang;
    } else {
      localStorage.setItem("Lang", "en");
      this.$i18n.locale = "en";
    }
  }
};
</script>
