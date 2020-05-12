module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/style/main.scss";`
      }
    },
  },
  rules: [{
    test: /\.scss$/,
    use: [
      'vue-style-loader',
      'css-loader',
      'sass-loader'
    ]
  }]
}
