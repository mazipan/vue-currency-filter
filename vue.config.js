module.exports = {
  publicPath: '/vue-currency-filter',
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  },
  pwa: {
    themeColor: '#000'
  }
  // chainWebpack: config => {
  //   config.module
  //     .rule('vue')
  //     .use('vue-loader')
  //     .loader('vue-loader')
  //     .tap(options => {
  //       // modify the options...
  //       return options
  //     })
  // }
}
