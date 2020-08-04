const { resolve } = require('path')

module.exports = function nuxtVueCurrencyFilter (moduleOptions) {
  const options = this.options.currencyFilter || moduleOptions

  this.addPlugin({
    ssr: true,
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'vue-currency-filter.js',
    options
  })
}

module.exports.meta = require('../package.json')
