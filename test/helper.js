import Vue from 'vue'
import Dummy from './Dummy.vue'

export default {
  initHelper () {
    Vue.component('InArticleAdsense', Dummy)
    Vue.directive('highlightjs', {})
  }
}