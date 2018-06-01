import Vue from 'vue'
import Ads from 'vue-google-adsense'
import VueHighlightJS from 'vue-highlightjs'

import VueCurrencyFilter from '../VueCurrencyFilter.js'
import App from './App.vue'

/* global process */
if (process.env.NODE_ENV !== 'production') {
  Vue.config.devtools = true
}

Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)

Vue.use(VueHighlightJS)

Vue.use(VueCurrencyFilter, {symbol: '$'})

new Vue({
  el: '#app',
  render: h => h(App)
})

