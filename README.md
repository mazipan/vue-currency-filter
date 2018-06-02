# 💸🍻 Vue Currency Filter


<a href="https://github.com/mazipan/vue-currency-filter"><img
  src="https://raw.githubusercontent.com/mazipan/vue-currency-filter/master/assets/VueJS-Currency-128px.png" alt="Vue Currency Filter Logo"
  width="128" align="right"></a>
  
> Lightweight vue currency filter based on accounting.js

[![version](https://img.shields.io/npm/v/vue-currency-filter.svg)](https://www.npmjs.com/package/vue-currency-filter) [![downloads](https://img.shields.io/npm/dt/vue-currency-filter.svg)](https://www.npmjs.com/package/vue-currency-filter) [![Travis](https://img.shields.io/travis/mazipan/vue-currency-filter.svg)](https://travis-ci.org/mazipan/vue-currency-filter)
[![codecov](https://codecov.io/gh/mazipan/vue-currency-filter/branch/master/graph/badge.svg)](https://codecov.io/gh/mazipan/vue-currency-filter)


## Demo

[https://mazipan.github.io/vue-currency-filter/](https://mazipan.github.io/vue-currency-filter/)

## Download

```bash
# NPM
npm install vue-currency-filter

# Yarn
yarn add vue-currency-filter
```

## Sample Usage

#### Import in `main.js`

```javascript
import VueCurrencyFilter from 'vue-currency-filter'
```

#### Use Plugins

```javascript
Vue.use(VueCurrencyFilter)
```

#### Add Global Configuration

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

#### Use in View

```html
<span>{{ 20000 | currency}}</span>
```

#### Usage in Nuxt.js

Create file `plugins/currency.js`, with code :

```js
import VueCurrencyFilter from 'vue-currency-filter'
import Vue from 'vue'
Vue.use(VueCurrencyFilter, {
  symbol: '$',
  thousandsSeparator: ',',
  fractionCount: 2,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: true
})
```

Then update your nuxt.config.js, with code :

```js
module.exports = {
  plugins: [
    { src: '~/plugins/currency', ssr: false }
  ]
}
```

See [this commit](https://github.com/mazipan/nuxt-blog/commit/59b69e67ca47da973d3c065f57ddecb36ce6da2b) for sample in Nuxt.js.

#### Add Configuration In Specific Place

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

## Credit

- [@iqbalhood](https://github.com/iqbalhood): VueCurrencyFilter logo creator (see [#19](https://github.com/mazipan/vue-currency-filter/issues/19))

## Hope this will be useful for you all

Copyright © 2017 Built with ❤️ by Irfan Maulana
