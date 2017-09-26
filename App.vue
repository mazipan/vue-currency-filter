<template>
  <div id="app" class="app">    
    <div class="VueCurrencyFilter">
    	<div class="grid__row content centered">
	      <h1>Lightweight and Customizable Vue Currency Filter Plugins By Irfan Maulana</h1>

				<h2>Example : </h2>
				<input type="tel" pattern="[0-9]*" v-model="textInput" class="textfield textfield--shadow"/>
	      
				<div><b>Before filter</b> : {{ textInput }}</div>
	      <div>
					<b>After filter</b> : 
					<b>
					{{ textInput | currency(configSymbol, configSeparator, configFractionCount, configFractionSeparator, configSymbolPosition, configSymbolSpacing)}}
					</b>
				</div>

				<h2>Customize Config :</h2>
				<div class="form__group">
					<div class="form__icon form__icon--radius-left">
						Symbol
					</div>
					<input class="textfield" v-model="configSymbol">                
				</div>
				
				<div class="form__group">
					<div class="form__icon form__icon--radius-left">
						Separator
					</div>
					<input class="textfield" v-model="configSeparator">                
				</div>

				<div class="form__group">
					<div class="form__icon form__icon--radius-left">
						Fraction Count
					</div>
					<input class="textfield" v-model="configFractionCount">                
				</div>

				<div class="form__group">
					<div class="form__icon form__icon--radius-left">
						Fraction Separator
					</div>
					<input class="textfield" v-model="configFractionSeparator">                
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
