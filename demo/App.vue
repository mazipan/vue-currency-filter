<template>
  <div id="app" class="VueCurrencyFilter">

		<header role="header" class="site__header header"><div class="header__wrapper"><div class="header__brand"> <a href="https://mazipan.github.io/demo/"> <img src="https://mazipan.github.io/images/irfan-maulana.jpg" alt="Irfan Maulana" title="Irfan Maulana"> </a><div class="header__title"> Irfan Maulana | Demo</div></div></div> </header>

		<div class="app">
    	<div class="grid__row content centered">
	      <h1>Lightweight vue currency filter based on accounting.js By Irfan Maulana</h1>

        <InArticleAdsense
            data-ad-client="ca-pub-5442972248172818"
            data-ad-slot="7974047383">
        </InArticleAdsense>

				<h2>Example : </h2>
				<input type="tel" pattern="[0-9]*" v-model="textInput" class="textfield textfield--shadow"/>

				<div><b>Before filter</b> : {{ textInput }}</div>

	      <div>
					<b>After filter - Default Configuration</b> :
					<b class="result__filter--default">{{ textInput | currency}}</b>
				</div>

				<div>
					<b>After filter - Custom Configuration</b> :
					<b class="result__filter">{{ textInput | currency(configSymbol, configSeparator, configFractionCount, configFractionSeparator, configSymbolPosition, configSymbolSpacing) }}</b>
				</div>

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
    <div class="grid__row content centered"><p> Copyright © 2017 <a href="https://mazipanneh.com/blog/">Irfan Maulana</a>, All Rights Reserved.</p></div>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
			textInput: 20000,
			configSymbol: '$',
			configSeparator: '.',
			configFractionCount: 0,
			configFractionSeparator: ',',
			configSymbolPosition: 'front',
      configSymbolSpacing: true,
      templateHtml: '<span>{{ 20000 | currency}}</span>',
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
  }
}
</script>

<style lang="scss">
.form__group{
	max-width: 500px;
}
.form__icon{
	width: 250px;
}
.form__wrapper{
	margin-left: 5px;
}
.m-b-5{
	margin-bottom: 5px;
}
.result__filter, .result__filter--default{
  font-size: 20px;
}
.left{
  text-align: left;
}
</style>
