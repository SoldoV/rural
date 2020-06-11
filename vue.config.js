const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    transpileDependencies: ["vuetify"],
    chainWebpack(config) {
        config.plugins.delete('prefetch');
        config.plugin('CompressionPlugin').use(CompressionPlugin);
    },
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