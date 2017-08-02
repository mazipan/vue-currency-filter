// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCurrencyFilter from './VueCurrencyFilter.js'

Vue.use(VueCurrencyFilter, {symbol: '$'})

new Vue({
  el: '#app',
  template: `    
    <div class="VueCurrencyFilter">
    	<div class="grid__row content centered">
	      <h1>Lightweight and Customizable Vue Currency Filter Plugins By Irfan Maulana</h1>

	      <h2>Example : </h2>
	      <div><b>Before filter</b> : 20000</div>
	      <div><b>After filter</b> : {{ 20000 | currency}}</div>

	      <h2>Using setup : </h2>
	      <pre><code>
	      	Vue.use(VueCurrencyFilter, {symbol: '$'})
	      </code></pre>
      </div>

      <div class="grid__row content centered">
	      <h2>Contribute</h2>

	      <p>
	        Feel free to fork <i class="fa fa-code-fork"></i> on <a href="https://github.com/mazipan/vue-currency-filter"
	       target="_blank">GitHub <i class="fa fa-github"></i></a> if you have any features <i class="fa fa-cart-plus"></i> or bugs <i class="fa fa-bug"></i>!    
	      </p>      

	    </div>

	    <div class="grid__row content centered">
	      <h2>Contact Developer</h2>

	      <p>    

	        <a href="https://github.com/mazipan">
	          <img src="https://img.shields.io/badge/mazipan-Github-lightgrey.svg?maxAge=3600" 
	            alt="Github">
	        </a>

	        <a href="mailto:mazipanneh@gmail.com">
	          <img src="https://img.shields.io/badge/mazipanneh-Email-yellow.svg?maxAge=3600" 
	            alt="Email">
	        </a>

	        <a href="https://mazipanneh.com/blog/">
	          <img src="https://img.shields.io/badge/mazipanneh-Blog-brightgreen.svg?maxAge=3600"   alt="Blog">
	        </a>

	        <a href="https://facebook.com/mazipanneh">
	          <img src="https://img.shields.io/badge/mazipanneh-Facebook-blue.svg?maxAge=3600" 
	            alt="Facebook">
	        </a>

	        <br/>

	        <a href="https://twitter.com/Maz_Ipan">
	          <img src="https://img.shields.io/badge/Maz_Ipan-Twitter-55acee.svg?maxAge=3600" 
	            alt="Twitter">
	        </a>  

	        <a href="https://id.linkedin.com/in/irfanmaulanamazipan">
	          <img src="https://img.shields.io/badge/irfanmaulanamazipan-Linkedin-0077b5.svg?maxAge=3600" 
	            alt="Linkedin">
	        </a> 

	        <a href="https://www.slideshare.net/IrfanMaulana21">
	          <img src="https://img.shields.io/badge/IrfanMaulana21-Slideshare-0077b5.svg?maxAge=3600" 
	            alt="Slideshare">
	        </a>  
	      </p>      

	    </div>

	    <div class="grid__row content centered">
	      <p>
	        Copyright © 2017 <a href="https://mazipanneh.com/blog/">Irfan Maulana</a>, All Rights Reserved.   
	      </p>      
	    </div>
    </div>
  `,
})
