module.exports = {
  transpileDependencies: ["vuetify"],

  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/style/_variables.scss";`
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "bhs",
      localeDir: "locales",
      enableInSFC: true
    }
  }
};
