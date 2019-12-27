<template>
  <div class="home VueCurrencyFilter">
    <section class="hero is-primary is-medium">
      <div class="hero-body">
        <div class="container has-text-centered">
          <figure
            class="image is-128x128"
            style="margin: 0 auto 2em;">
            <img src="/img/icons/VueJS-Currency-128px.png">
          </figure>
          <h1 class="title">
            Vue Currency Filter
          </h1>
          <h2 class="subtitle">
            Lightweight vue currency filter based
          </h2>
          <a
            href="https://github.com/mazipan/vue-currency-filter"
            class="button is-primary is-inverted is-outlined">
            Fork in Github
          </a>
          <br><br>
          <a
            href="https://www.npmjs.com/package/vue-currency-filter"
            target="_blank"
            rel="noopener noreferer">
            <img
              alt="NPM Version"
              src="https://img.shields.io/npm/v/vue-currency-filter.svg">
          </a>
          <a
            href="https://github.com/mazipan/vue-currency-filter"
            target="_blank"
            rel="noopener noreferer">
            <img
              alt="GitHub Stars"
              src="https://img.shields.io/github/stars/mazipan/vue-currency-filter.svg?style=social">
          </a>
        </div>
      </div>
    </section>

    <section class="ads">
      <InArticleAdsense
        data-ad-client="ca-pub-5442972248172818"
        data-ad-slot="7974047383" />
    </section>

    <section class="container configs">
      <h2 class="title">
        ⚙️ Customize Config
      </h2>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">
            Symbol:
          </label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                v-model="configSymbol"
                class="input"
                type="text"
                placeholder="e.g. $">
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">
            Separator:
          </label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                v-model="configSeparator"
                class="input"
                type="text"
                placeholder="e.g. .">
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">
            Fraction Count:
          </label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                v-model="configFractionCount"
                class="input"
                type="tel"
                pattern="[0-9]*"
                placeholder="e.g. 2">
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">
            Fraction Separator:
          </label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                v-model="configFractionSeparator"
                class="input"
                type="text"
                placeholder="e.g. .">
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">
            Symbol Position:
          </label>
        </div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <label class="radio">
                <input
                  id="radio-form-1"
                  v-model="configSymbolPosition"
                  type="radio"
                  name="radio-symbol"
                  :value="'front'">
                Before Text
              </label>
              <label class="radio">
                <input
                  id="radio-form-2"
                  v-model="configSymbolPosition"
                  type="radio"
                  name="radio-symbol"
                  :value="'back'">
                After Text
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">
            Symbol Spacing:
          </label>
        </div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <label class="radio">
                <input
                  id="radio-form-3"
                  v-model="configSymbolSpacing"
                  type="radio"
                  name="radio-spacing"
                  :value="true">
                Use Spacing
              </label>
              <label class="radio">
                <input
                  id="radio-form-4"
                  v-model="configSymbolSpacing"
                  type="radio"
                  name="radio-spacing"
                  :value="false">
                Remove Spacing
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">
            Currency:
          </label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                v-model="textInput"
                type="tel"
                pattern="[0-9]*"
                class="input"
                placeholder="e.g. 123456789">
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">
            Result - Global Config:
          </label>
        </div>
        <div
          class="field-body"
          style="align-items: flex-end;">
          <div class="field" style="text-align: left">
            <b class="subtitle result__filter--default">
              {{ textInput | currency }}
            </b>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">
            Result - Custom Config:
          </label>
        </div>
        <div
          class="field-body"
          style="align-items: flex-end;">
          <div class="field" style="text-align: left">
            <b class="subtitle result__filter">
              {{ textInput | currency(configSymbol, configSeparator, configFractionCount, configFractionSeparator, configSymbolPosition, configSymbolSpacing) }}
            </b>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">
            Result - Static Config:
          </label>
        </div>
        <div
          class="field-body"
          style="align-items: flex-end;">
          <div class="field" style="text-align: left">
            <b class="subtitle result__filter--object">
              {{ textInput | currency({ fractionCount: 2, symbol: '¥' }) }}
            </b>
          </div>
        </div>
      </div>
    </section>

    <section class="ads">
      <InArticleAdsense
        data-ad-client="ca-pub-5442972248172818"
        data-ad-slot="7974047383" />
    </section>

    <section class="container docs">
      <h2 class="title">
        🚀 Download
      </h2>
      <prism language="javascript">
          {{ templateDownload }}
      </prism>
    </section>

    <section class="container docs">
      <h2 class="title">
        ❓ Usage Guide
      </h2>
      <br>
      <h3 class="subtitle">
        In main.js
      </h3>
      <prism language="javascript">
          {{ templateMainJS }}
      </prism>

      <h3 class="subtitle">
        In template
      </h3>
      <prism language="html">
          {{ templateHtml }}
          {{ templateHtmlCustom }}
      </prism>
    </section>

    <section class="container docs">
      <h2 class="title">
        📟 For Nuxt.js Project
      </h2>
      <br>
      <h3 class="subtitle">
        Create file `plugins/currency.js`, with code :
      </h3>
      <prism language="javascript">
          {{ templatePlugin }}
      </prism>

      <h3 class="subtitle">
        Then update your nuxt.config.js, with code :
      </h3>
      <prism language="javascript">
        {{ templateNuxtConfig }}
      </prism>
    </section>

    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          Built with ❤️ by Irfan Maulana
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue'
import 'prismjs'
import 'prismjs/themes/prism-twilight.css'
import 'prismjs/components/prism-scss.min'
import 'prismjs/plugins/autolinker/prism-autolinker.min'
import 'prismjs/plugins/autolinker/prism-autolinker.css'
import Prism from 'vue-prism-component'

import utils from '../lib/utils'
Vue.component('prism', Prism)

export default {
  name: 'Home',
  data () {
    return {
      textInput: 20000,
      configSymbol: '$',
      configSeparator: '.',
      configFractionCount: 0,
      configFractionSeparator: ',',
      configSymbolPosition: 'front',
      configSymbolSpacing: true,
      templateDownload: `
# NPM
npm install vue-currency-filter

# Yarn
yarn add vue-currency-filter
`,
      templateMainJS: `
import VueCurrencyFilter from 'vue-currency-filter'
Vue.use(VueCurrencyFilter)
// or with custom config
Vue.use(VueCurrencyFilter, {
  symbol : '$',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})
      `,
      templatePlugin: `
import VueCurrencyFilter from 'vue-currency-filter'

Vue.use(VueCurrencyFilter)
// or with custom config
Vue.use(VueCurrencyFilter, {
  symbol : '$',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})
      `,
      templateNuxtConfig: `
module.exports = {
  plugins: [
    { src: '~/plugins/currency', ssr: false }
  ]
}
      `,
      templateHtml: `
<span>{{ 20000 | currency}}</span>

`,
      templateHtmlCustom: `
<!-- or with custom config -->
<span>
{{ 20000 | currency(
    configSymbol, configSeparator, configFractionCount,
    configFractionSeparator, configSymbolPosition, configSymbolSpacing
  )
}}
</span>`
    }
  },
  methods: {
    updateData (options) {
      if (!utils.__isNull(options.symbol)) {
        this.configSymbol = options.symbol
      }
      if (!utils.__isNull(options.thousandsSeparator)) {
        this.configSeparator = options.thousandsSeparator
      }
      if (!utils.__isNull(options.fractionCount)) {
        this.configFractionCount = options.fractionCount
      }
      if (!utils.__isNull(options.fractionSeparator)) {
        this.configFractionSeparator = options.fractionSeparator
      }
      if (!utils.__isNull(options.symbolPosition)) {
        this.configSymbolPosition = options.symbolPosition
      }
      if (!utils.__isNull(options.symbolSpacing)) {
        this.configSymbolSpacing = options.symbolSpacing
      }
    }
  }
}
</script>

<style lang="scss">
@import "~bulma-dracula/src/bulma-dracula.scss";

pre:not(:last-of-type) {
  margin-bottom: 2rem;
}

.radio, .footer{
  color: #fff;
}

.number{
  text-align: center;
  vertical-align: middle;
  font-size: .9rem;
  border-radius: 0;
  background-color: transparent;
  margin: 0;
  padding: 0;
}
.container{
  margin-top: 2em;
}
</style>
