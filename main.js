// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'

/* global process */
if (process.env.NODE_ENV !== 'production') {
  Vue.config.devtools = true
}

import VueCurrencyFilter from './VueCurrencyFilter.js'
Vue.use(VueCurrencyFilter, {symbol: '$'})


new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})

