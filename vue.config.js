module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/style/_.sass"` // empty file
      },
      scss: {
        // My very particular set of styles I have acquired over a long career
        prependData: `@import "@/style/main.scss";`
      }
    },
  },
}
