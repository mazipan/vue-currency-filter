<template>
  <div id="app" class="app">    
    <div class="VueCurrencyFilter">
    	<div class="grid__row content centered">
	      <h1>Lightweight and Customizable Vue Currency Filter Plugins By Irfan Maulana</h1>

				<h2>Example : </h2>
				<input type="text" v-model="textInput" class="textfield textfield--shadow"/>
	      <div><b>Before filter</b> : {{ textInput }}</div>
	      <div><b>After filter</b> : {{ textInput | currency}}</div>

	      <h2>Using setup : </h2>
	      <pre><code>
	      	Vue.use(VueCurrencyFilter, {symbol: '$'})
	      </code></pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
			textInput: 20000
    }
  }
}

</script>

<style lang="scss">
</style>
