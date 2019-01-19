module.exports = {
	format: ['umd', 'es', 'cjs', 'umd-min', 'iife'],
  input: './src/VueCurrencyFilter.js',
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
