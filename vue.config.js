module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/style/main.scss"`
      },
      scss: {
        prependData: `@import "@/style/main.scss";`
      }
    },
  },
}
