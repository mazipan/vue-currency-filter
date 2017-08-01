// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCurrencyFilter from './VueCurrencyFilter.js'

Vue.use(VueCurrencyFilter, {symbol: '$'})

new Vue({
  el: '#app',
  template: `    
    <div class="VueCurrencyFilter">
      <h1>VueCurrencyFilter Demo</h1>
      <div>Before filter : 20000</div>
      <div>After filter : {{ 20000 | currency}}</div>
    </div>
  `,
})
