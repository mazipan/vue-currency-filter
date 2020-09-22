import Vue from 'vue'
import Ads from 'vue-google-adsense'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueCurrencyFilter from 'vue-currency-filter'
import Chakra, { CThemeProvider, CReset } from '@chakra-ui/vue'

const script2 = require('vue-script2')

Vue.use(Chakra)
Vue.use(script2)
Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)

// @ts-ignore
Vue.use(VueCurrencyFilter, { symbol: '$' })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  el: '#app',
  render: (h) => h(CThemeProvider, [h(CReset), h(App)])
}).$mount()
