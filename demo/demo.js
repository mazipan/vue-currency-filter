import Vue from 'vue'
import Ads from 'vue-google-adsense'
import VueHighlightJS from 'vue-highlightjs'

import VueCurrencyFilter from '../src/VueCurrencyFilter.js'
import App from './App.vue'

/* global process */
if (process.env.NODE_ENV !== 'production') {
  Vue.config.devtools = true
} else {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/vue-currency-filter/sw.js')
      .then(() => {
        console.log('Service Worker has been registered')
      })
      .catch(e =>
        console.error('Error during service worker registration:', e)
      )
  } else {
    console.warn('Service Worker is not supported')
  }
}

Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)

Vue.use(VueHighlightJS)

Vue.use(VueCurrencyFilter, { symbol: '$' })

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(App)
})
