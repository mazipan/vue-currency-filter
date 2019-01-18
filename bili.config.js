module.exports = {
	format: ['umd'],
  input: './VueCurrencyFilter.js',
  filename: 'VueCurrencyFilter.bundle.js',
  moduleName: 'VueCurrencyFilter',
  plugins: [
    'vue',
  ],
  vue: {
    css: false,
    template: {
      isProduction: true,
      compilerOptions: {
        preserveWhitespace: false
      }
    }
  }
}
