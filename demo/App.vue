<template>
  <div id="app" class="VueCurrencyFilter">

		<header role="header" class="site__header header">
      <div class="header__wrapper">
        <div class="header__brand">
          <a href="#">
            <img src="favicon/favicon-96x96.png" alt="Vue-Currency-Filter Logo" title="Vue-Currency-Filter Logo">
          </a>
          <div class="header__title"> Vue-Currency-Filter</div>
        </div>
      </div>
    </header>

		<div class="app">
    	<div class="grid__row content centered">
	      <h1>Lightweight vue currency filter based on accounting.js By Irfan Maulana</h1>

				<h2>Example : </h2>
				<input type="tel" pattern="[0-9]*" v-model="textInput" class="textfield textfield--shadow"/>

				<div><b>Before filter</b> : {{ textInput }}</div>

	      <div>
					<b>After filter - Default Configuration</b> :
					<b class="result__filter--default">{{ textInput | currency}}</b>
				</div>

				<div>
					<b>After filter - Custom Configuration</b> :
					<b class="result__filter">{{ textInput | currency(configSymbol, configSeparator, configFractionCount, configFractionSeparator, configSymbolPosition, configSymbolSpacing, configPrecision) }}</b>
				</div>

        <div>
					<b>After filter - Custom Configuration Using Object</b> :
					<b class="result__filter--object">{{ textInput | currency({ fractionCount: 2, symbol: '¥' }) }}</b>
				</div>

        <InArticleAdsense
            data-ad-client="ca-pub-5442972248172818"
            data-ad-slot="7974047383">
        </InArticleAdsense>

				<h2>Customize Config :</h2>
				<div class="form__group">
					<div class="form__icon form__icon--radius-left">
						Symbol
					</div>
					<input class="textfield" type="text" v-model="configSymbol">
				</div>

				<div class="form__group">
					<div class="form__icon form__icon--radius-left">
						Separator
					</div>
					<input class="textfield" type="text" v-model="configSeparator">
				</div>

				<div class="form__group">
					<div class="form__icon form__icon--radius-left">
						Fraction Count
					</div>
					<input class="textfield" type="tel" pattern="[0-9]*" v-model="configFractionCount">
				</div>

				<div class="form__group">
					<div class="form__icon form__icon--radius-left">
						Fraction Separator
					</div>
					<input class="textfield" type="text" v-model="configFractionSeparator">
				</div>

				<div class="form__group m-b-5">
					<div class="form__icon form__icon--radius-left">
						Symbol Position
					</div>
					<div class="form__wrapper">
						<input class="radio radio--blue" type="radio" id="radio-form-1" name="radio-symbol" v-model="configSymbolPosition" v-bind:value="'front'">
						<label for="radio-form-1">Front</label>
						<input class="radio radio--blue" type="radio" id="radio-form-2" name="radio-symbol" v-model="configSymbolPosition" v-bind:value="'back'">
						<label for="radio-form-2">End of text</label>
					</div>
				</div>

				<div class="form__group m-b-5">
					<div class="form__icon form__icon--radius-left">
						Symbol Spacing
					</div>
					<div class="form__wrapper">
						<input class="radio radio--blue" type="radio" id="radio-form-3" name="radio-spacing" v-model="configSymbolSpacing" v-bind:value="true">
						<label for="radio-form-3">Yes</label>
						<input class="radio radio--blue" type="radio" id="radio-form-4" name="radio-spacing" v-model="configSymbolSpacing" v-bind:value="false">
						<label for="radio-form-4">No</label>
					</div>
				</div>

      </div>
    </div>

    <InArticleAdsense
        data-ad-client="ca-pub-5442972248172818"
        data-ad-slot="7974047383">
    </InArticleAdsense>

    <div class="grid__row content centered">
      <h2>Download</h2>

      <pre v-highlightjs>
        <code class="bash">
          # NPM
          npm install vue-currency-filter

          # Yarn
          yarn add vue-currency-filter
        </code>
      </pre>

    </div>

    <div class="grid__row content centered">
      <h2>Usage Guide</h2>

      <h3>In main.js</h3>
      <pre v-highlightjs>
        <code class="javascript">
          import VueCurrencyFilter from 'vue-currency-filter'
          Vue.use(VueCurrencyFilter) // or with custom config
          Vue.use(VueCurrencyFilter,
          {
            symbol : '$',
            thousandsSeparator: '.',
            fractionCount: 2,
            fractionSeparator: ',',
            symbolPosition: 'front',
            symbolSpacing: true
          })
        </code>
      </pre>

      <h3>In template</h3>
      <pre v-highlightjs>
        <code class="html">
          {{ templateHtml }}
          {{ templateHtmlCustom }}
        </code>
      </pre>

    </div>

    <div class="grid__row content centered">
      <h2>For Nuxt.js Project</h2>

      <h3>Create file `plugins/currency.js`, with code :</h3>
      <pre v-highlightjs>
        <code class="javascript">
          import VueCurrencyFilter from 'vue-currency-filter'
          Vue.use(VueCurrencyFilter) // or with custom config
          Vue.use(VueCurrencyFilter,
          {
            symbol : '$',
            thousandsSeparator: '.',
            fractionCount: 2,
            fractionSeparator: ',',
            symbolPosition: 'front',
            symbolSpacing: true
          })
        </code>
      </pre>

      <h3>Then update your nuxt.config.js, with code :</h3>
      <pre v-highlightjs>
        <code class="javascript">
          module.exports = {
            plugins: [
              { src: '~/plugins/currency', ssr: false }
            ]
          }
        </code>
      </pre>

    </div>

    <div class="grid__row content centered"><h2>Contribute</h2><p> Feel free to fork <i class="fa fa-code-fork"></i> on <a href="https://github.com/mazipan/vue-currency-filter" target="_blank">GitHub <i class="fa fa-github"></i></a> if you have any features <i class="fa fa-cart-plus"></i> or bugs <i class="fa fa-bug"></i>!</p></div>

    <footer class="footer">
      Copyright © 2017 Irfan Maulana, All Rights Reserved.
    </footer>

  </div>
</template>

<script>
import utils from '../src/utils'

export default {
  name: "app",
  data() {
    return {
      textInput: 20000,
      configSymbol: "$",
      configSeparator: ".",
      configFractionCount: 0,
      configFractionSeparator: ",",
      configSymbolPosition: "front",
      configSymbolSpacing: true,
      configPrecision:0,
      templateHtml: "<span>{{ 20000 | currency}}</span>",
      templateHtmlCustom: `
          <!-- or with custom config -->
          <span>
          {{ 20000 | currency(
              configSymbol, configSeparator, configFractionCount,
              configFractionSeparator, configSymbolPosition, configSymbolSpacing,
              configPrecision
            )
          }}
          </span>`
    };
  },
  methods: {
    updateData(options) {
      if (!utils.__isNull(options.symbol)){
        this.configSymbol = options.symbol
      }
      if (!utils.__isNull(options.thousandsSeparator)){
        this.configSeparator = options.thousandsSeparator
      }
      if (!utils.__isNull(options.fractionCount)){
        this.configFractionCount = options.fractionCount
      }
      if (!utils.__isNull(options.fractionSeparator)){
        this.configFractionSeparator = options.fractionSeparator
      }
      if (!utils.__isNull(options.symbolPosition)){
        this.configSymbolPosition = options.symbolPosition
      }
      if (!utils.__isNull(options.symbolSpacing)){
        this.configSymbolSpacing = options.symbolSpacing
      }
      if (!utils.__isNull(options.precision)){
        this.precision = options.precision
      }
    }
  }
};
</script>

<style lang="scss">
$theme: #f0843b;

a{
  color: $theme;
}
pre{
  border-left: solid .25em $theme;
}
.radio--blue:checked+label:before {
    background-color: $theme;
}
.radio--blue+label:after, .radio--blue+label:before {
    border: 1px solid $theme;
}
.header{-webkit-box-shadow:0 1px 2px rgba(0,0,0,.075);-moz-box-shadow:0 1px 2px rgba(0,0,0,.075);box-shadow:0 1px 2px rgba(0,0,0,.075);position:fixed;top:0;z-index:100;width:100%;height:60px;background:rgba(240, 133, 59, 1)}
.header__wrapper{display:flex;justify-content:space-between;align-items:center}
.header__brand{display:flex;justify-content:space-between;align-items:center;margin:.2em}
.header__brand img{width:50px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}
.header__title{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-style:normal;font-size:1.8rem;font-weight:500;margin-left:.5em}.app{margin-top:70px}

.form__group {
  max-width: 500px;
}
.form__icon {
  width: 250px;
  background-color: $theme;
}
.form__wrapper {
  margin-left: 5px;
}
.m-b-5 {
  margin-bottom: 5px;
}
.result__filter,
.result__filter--default {
  font-size: 20px;
}
.left {
  text-align: left;
}
.footer{
  width:100%;
  background:rgba(240, 133, 59, 1);
  text-align: center;
  padding: 1em;
}
</style>
