# vue-currency-filter
[![License](https://img.shields.io/github/license/mazipan/vue-currency-filter.svg?maxAge=3600)](https://github.com/mazipan/vue-currency-filter) 
[![Github Issue](https://img.shields.io/github/issues/mazipan/vue-currency-filter.svg?maxAge=3600)](https://github.com/mazipan/vue-currency-filter/issues) 
[![GitHub Fork](https://img.shields.io/github/forks/mazipan/vue-currency-filter.svg?maxAge=3600)](https://github.com/mazipan/vue-currency-filter/network) 
[![GitHub Star](https://img.shields.io/github/stars/mazipan/vue-currency-filter.svg?maxAge=3600)](https://github.com/mazipan/vue-currency-filter/stargazers) 

[![version](https://img.shields.io/npm/v/vue-currency-filter.svg)](https://www.npmjs.com/package/vue-currency-filter)
[![downloads monthly](https://img.shields.io/npm/dm/vue-currency-filter.svg)](https://www.npmjs.com/package/vue-currency-filter) 
[![downloads](https://img.shields.io/npm/dt/vue-currency-filter.svg)](https://www.npmjs.com/package/vue-currency-filter) 

[![Travis](https://img.shields.io/travis/mazipan/vue-currency-filter.svg)](https://travis-ci.org/mazipan/vue-currency-filter)
[![codecov](https://codecov.io/gh/mazipan/vue-currency-filter/branch/master/graph/badge.svg)](https://codecov.io/gh/mazipan/vue-currency-filter)

:heavy_dollar_sign: Lightweight and Customizeable Vue 2 Currency Filter

## Demo
[https://mazipan.github.io/vue-currency-filter/](https://mazipan.github.io/vue-currency-filter/)


## Download

NPM :
```bash
npm install vue-currency-filter
```

Yarn :
```bash
yarn add vue-currency-filter
```

## Sample Usage

#### Import in `main.js` :

```javascript
import VueCurrencyFilter from 'vue-currency-filter'
```

#### Use Plugins : 

```javascript
Vue.use(VueCurrencyFilter)
```

#### Add Global Configuration : 

```javascript
Vue.use(VueCurrencyFilter, 
{
  symbol : '$', 
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})
```

#### Use in View :

```html
<span>{{ 20000 | currency}}</span>
```

#### Add Configuration In Specific Place :

```html
<span>
{{ textInput | currency(configSymbol, configSeparator, configFractionCount, 
configFractionSeparator, configSymbolPosition, configSymbolSpacing)}}
</span>
					
```

## Available Options

```javascript
{
  symbol: 'string (default : empty string)',
  thousandsSeparator: 'string (default : .)',
  fractionCount: 'number (default : 0)',
  fractionSeparator: 'string (default: ",")',
  symbolPosition: 'string (default: front)',
  symbolSpacing: 'boolean (default: true)'
}
```

## Contributing

If you'd like to contribute, head to the [contributing guidelines](/CONTRIBUTING.md). Inside you'll find directions for opening issues, coding standards, and notes on development.

### Hope this will be useful for you all.

Contact Me :

[![Email](https://img.shields.io/badge/mazipanneh-Email-yellow.svg?maxAge=3600)](mailto:mazipanneh@gmail.com) 
[![Website](https://img.shields.io/badge/mazipanneh-Blog-brightgreen.svg?maxAge=3600)](https://mazipanneh.com/blog/)
[![Facebook](https://img.shields.io/badge/mazipanneh-Facebook-blue.svg?maxAge=3600)](https://facebook.com/mazipanneh) 

[![Twitter](https://img.shields.io/badge/Maz_Ipan-Twitter-55acee.svg?maxAge=3600)](https://twitter.com/Maz_Ipan) 
[![Linkedin](https://img.shields.io/badge/irfanmaulanamazipan-Linkedin-0077b5.svg?maxAge=3600)](https://id.linkedin.com/in/irfanmaulanamazipan) 
[![Slideshare](https://img.shields.io/badge/IrfanMaulana21-Slideshare-0077b5.svg?maxAge=3600)](https://www.slideshare.net/IrfanMaulana21) 
