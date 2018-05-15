import Vue from 'vue'
import App from './App.vue'
import VueCurrencyFilter from '../VueCurrencyFilter.js'

/* global process */
if (process.env.NODE_ENV !== 'production') {
  Vue.config.devtools = true
}

Vue.use(VueCurrencyFilter, {symbol: '$'})

new Vue({
  el: '#app',
  render: h => h(App)
})

