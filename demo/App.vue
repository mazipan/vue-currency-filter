<template>
  <div id="app" class="VueCurrencyFilter">

		<header role="header" class="site__header header"><div class="header__wrapper"><div class="header__brand"> <a href="https://mazipan.github.io/demo/"> <img src="https://mazipan.github.io/images/irfan-maulana.jpg" alt="Irfan Maulana" title="Irfan Maulana"> </a><div class="header__title"> Irfan Maulana | Demo</div></div></div> </header>

		<div class="app">
    	<div class="grid__row content centered">
	      <h1>Lightweight vue currency filter based on accounting.js By Irfan Maulana</h1>

				<h2>Example : </h2>
				<input type="tel" pattern="[0-9]*" v-model="textInput" class="textfield textfield--shadow"/>

				<div><b>Before filter</b> : {{ textInput }}</div>

				<div>
					<b>After filter - Custom Configuration</b> :
					<b class="result__filter">{{ textInput | currency(configSymbol, configSeparator, configFractionCount, configFractionSeparator, configSymbolPosition, configSymbolSpacing) }}</b>
				</div>
	      <div>
					<b>After filter - Default Configuration</b> :
					<b class="result__filter--default">{{ textInput | currency}}</b>
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

    <div class="grid__row content centered"><h2>Contribute</h2><p> Feel free to fork <i class="fa fa-code-fork"></i> on <a href="https://github.com/mazipan/vue-currency-filter" target="_blank">GitHub <i class="fa fa-github"></i></a> if you have any features <i class="fa fa-cart-plus"></i> or bugs <i class="fa fa-bug"></i>!</p></div>
    <div class="grid__row content centered"><h2>Contact Developer</h2><p><a href="https://github.com/mazipan"> <img src="https://img.shields.io/badge/mazipan-Github-lightgrey.svg?maxAge=3600" alt="Github"> </a><a href="mailto:mazipanneh@gmail.com"> <img src="https://img.shields.io/badge/mazipanneh-Email-yellow.svg?maxAge=3600" alt="Email"> </a><a href="https://mazipanneh.com/blog/"> <img src="https://img.shields.io/badge/mazipanneh-Blog-brightgreen.svg?maxAge=3600" alt="Blog"> </a><a href="https://facebook.com/mazipanneh"> <img src="https://img.shields.io/badge/mazipanneh-Facebook-blue.svg?maxAge=3600" alt="Facebook"> </a><br/><a href="https://twitter.com/Maz_Ipan"> <img src="https://img.shields.io/badge/Maz_Ipan-Twitter-55acee.svg?maxAge=3600" alt="Twitter"> </a><a href="https://id.linkedin.com/in/irfanmaulanamazipan"> <img src="https://img.shields.io/badge/irfanmaulanamazipan-Linkedin-0077b5.svg?maxAge=3600" alt="Linkedin"> </a><a href="https://www.slideshare.net/IrfanMaulana21"> <img src="https://img.shields.io/badge/IrfanMaulana21-Slideshare-0077b5.svg?maxAge=3600" alt="Slideshare"> </a></p></div>
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
			configSymbolSpacing: true
    }
  }
}
</script>

<style lang="scss">
.form__group{
	max-width: 500px;
}
.form__icon{
	width: 180px;
}
.form__wrapper{
	margin-left: 5px;
}
.m-b-5{
	margin-bottom: 5px;
}
</style>
