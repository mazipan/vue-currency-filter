var webpack = require('webpack')
var path = require('path')
var npm = require("./package.json")
const CompressionPlugin = require("compression-webpack-plugin")

require('es6-promise').polyfill();

module.exports = {
  entry: {
    app: './VueCurrencyFilter.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'VueCurrencyFilter.bundle.js',
    library: 'VueCurrencyFilter',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    jsonpFunction: 'WebpackJsonp'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel-loader'
      }
    ]
  },
  externals: {
    "vue": "Vue"
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
    new webpack.BannerPlugin({
      banner: `VueCurrencyFilter v.${npm.version}`
    }),
    new CompressionPlugin({
      algorithm: 'gzip'
    })
  ]
}
