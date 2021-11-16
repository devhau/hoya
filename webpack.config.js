const { VueLoaderPlugin } = require('vue-loader');
const { ModuleFederationPlugin } = require('webpack').container;
module.exports = {
  resolve: {
    extensions: ["*", ".js", ".vue"]
  },
  module: {
    rules: [
      // ... other rules omitted
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      // this will apply to both plain `.scss` files
      // AND `<style lang="scss">` blocks in `.vue` files
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  externals: {
    // Here you tell webpack to take Vue from CDN
    vue: "Vue"
  },
  // plugin omitted
  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      // adds vue as shared module
      // there is no local version provided
      // it will emit a warning if the shared vue is < 2.6.5 or >= 3
      shared: {
        vue: {
          singleton: true,
        },
      },
    })]
}