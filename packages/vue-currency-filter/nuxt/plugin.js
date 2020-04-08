import Vue from 'vue'
import VueCurrencyFilter from 'vue-currency-filter'

Vue.use(VueCurrencyFilter, <%= serialize(options) %>)
