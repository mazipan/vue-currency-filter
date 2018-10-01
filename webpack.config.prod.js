const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin")

const NODE_ENV = process.env.NODE_ENV;

const setPath = function(folderName) {
  return path.join(__dirname, folderName);
}

const config = {
  entry: {
    app: './VueCurrencyFilter.js'
  },
  output: {
    filename: "VueCurrencyFilter.bundle.js",
    libraryTarget: 'commonjs2'
  },
  resolveLoader: {
    modules: [
      setPath('node_modules')
    ]
  },
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        isStaging: (NODE_ENV === 'development'),
        NODE_ENV: '"'+NODE_ENV+'"'
      }
    }),
    new CompressionPlugin({
      algorithm: 'gzip'
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
module.exports = config;
