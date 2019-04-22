# 🍒 Vue Currency Filter

<p align="center"><a href="https://mazipan.github.io/vue-currency-filter/" target="_blank" rel="noopener noreferrer"><img width="128" src="https://raw.githubusercontent.com/mazipan/vue-currency-filter/master/assets/VueJS-Currency-128px.png" alt="Vue Currency Logo"></a></p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-currency-filter">
    <img src="https://img.shields.io/npm/v/vue-currency-filter.svg" alt="NPM Version">
  </a>
  <a href="https://bundlephobia.com/result?p=vue-currency-filter">
    <img src="https://badgen.net/bundlephobia/minzip/vue-currency-filter" alt="Bundlephobia Size">
  </a>
  <a href="https://www.npmjs.com/package/vue-currency-filter">
    <img src="https://img.shields.io/npm/dt/vue-currency-filter.svg" alt="Download All Time">
  </a>
  <a href="https://travis-ci.org/mazipan/vue-currency-filter">
    <img src="https://img.shields.io/travis/mazipan/vue-currency-filter.svg" alt="Travis Build">
  </a>
  <a href="https://codecov.io/gh/mazipan/vue-currency-filter">
    <img src="https://codecov.io/gh/mazipan/vue-currency-filter/branch/master/graph/badge.svg" alt="Code Coverage">
  </a>
  <a href="#contributors">
    <img src="https://img.shields.io/badge/all_contributors-4-orange.svg" alt="All Contributors">
  </a>
  <a href="https://greenkeeper.io/">
    <img src="https://badges.greenkeeper.io/mazipan/vue-currency-filter.svg" alt="Greenkeeper">
  </a>
</p>

> Lightweight vue currency filter based on accounting.js

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

Step by step to using  `vue-currency-filter`:

### Import in `main.js`

```javascript
import VueCurrencyFilter from 'vue-currency-filter'
```

### Use Plugins

```javascript
Vue.use(VueCurrencyFilter)
```

### Add Global Configuration

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

### Use in View

```html
<span>{{ 20000 | currency}}</span>
```

### Usage in Nuxt.js

Add `vue-currency-filter/nuxt` to modules section of `nuxt.config.js`

```js
{
  modules: [
    'vue-currency-filter/nuxt',

    // Or if you have custom options...
    ['vue-currency-filter/nuxt', {
      symbol: '$',
      thousandsSeparator: ',',
      fractionCount: 2,
      fractionSeparator: '.',
      symbolPosition: 'front',
      symbolSpacing: true
    }],
  ]
}
```

### Usage without NPM

Add script dependencies

```html
<!-- Vue Dependency -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>

<!-- Vue Currency Filter Dependency -->
<script src="https://unpkg.com/vue-currency-filter@3.2.3/dist/vue-currency-filter.iife.js"></script>
<!-- Change 3.2.3 with latest version -->
```

Use filters in global

```js
if (VueCurrencyFilter) {
  Vue.use(VueCurrencyFilter, {
    symbol: "£",
    thousandsSeparator: ",",
    fractionCount: 0,
    fractionSeparator: ".",
    symbolPosition: "front",
    symbolSpacing: false
  })
}

var app = new Vue({
  el: '#app',
  data: {
    curr: 1000
  }
});

```

See [https://codepen.io/mazipan/pen/YdmNMy](https://codepen.io/mazipan/pen/YdmNMy) for code sample.

### Add Configuration In Specific Place

```html
<span>
{{ textInput | currency(configSymbol, configSeparator, configFractionCount,
configFractionSeparator, configSymbolPosition, configSymbolSpacing)}}
</span>
```

**Now configurations is also available as Object**, thanks to [sunhengzhe](https://github.com/sunhengzhe) in [PR #25](https://github.com/mazipan/vue-currency-filter/pull/25/commits/052a741644556f4d1140e7b7e1ba96a8e2c0d015):

```html
<span>
{{ textInput | currency({
  symbol: '',
  thousandsSeparator: '',
  fractionCount: '',
  fractionSeparator: '',
  symbolPosition: '',
  symbolSpacing: ''
})}}
</span>
```

## Available Options

```javascript
{
  name: 'string (default: currency)', // using for multiple instance filters
  symbol: 'string (default : empty string)',
  thousandsSeparator: 'string (default : .)',
  fractionCount: 'number (default : 0)',
  fractionSeparator: 'string (default: ",")',
  symbolPosition: 'string (default: front)',
  symbolSpacing: 'boolean (default: true)'
}
```

## Update Global Configs

Since global config only can be setted from `Vue.use(VueCurrencyFilter, configs)`, but sometimes we need to update this global configs on runtime process.

from v3.1.0 we intoduce prototype method that can be update this global configs. You can use anywhere in your components like this code below:

```js
this.$CurrencyFilter.setConfig(newConfigs)
```

But please be aware, this method is only update global configs without trigger to re-run filter function. So maybe you will face not sync data from your configs and your view. You need to update some value to trigger this new configs applied.

## How to test in Unit Test

Using `@vue/test-utils` we can create test for any Vue Plugins, like:

```js
/* eslint-env jest */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueCurrencyFilter from "vue-currency-filter";

import Component from "../pages/myComponent.vue";

describe("test myComponent", () => {
  it("vue-currency-filter should working correctly", () => {
    let localVue = createLocalVue();
    localVue.use(VueCurrencyFilter, {
      symbol: "$",
      thousandsSeparator: ",",
      fractionCount: 2,
      fractionSeparator: ".",
      symbolPosition: "front",
      symbolSpacing: true
    });

    let wrapper = shallowMount(Component, {
      localVue
    });

    let result = wrapper.find(".curr");
    expect(result.text()).toEqual("$ 1,000.00");
  });
});
```

See sample test here: [https://codesandbox.io/s/6xk1mv694n](https://codesandbox.io/s/6xk1mv694n)

## Contributing

If you'd like to contribute, head to the [contributing guidelines](/CONTRIBUTING.md). Inside you'll find directions for opening issues, coding standards, and notes on development.

## Credit

- [@iqbalhood](https://github.com/iqbalhood) as logo creator (see [#19](https://github.com/mazipan/vue-currency-filter/issues/19))
- [Jetbrain](https://www.jetbrains.com/?from=vue-currency-filter) for amazing WebStorm IDE

[<img src="https://raw.githubusercontent.com/mazipan/vue-currency-filter/master/jetbrains.png" width="100px;" />](https://www.jetbrains.com/?from=vue-currency-filter)

## Hope this will be useful for you all

Copyright © 2017 Built with ❤️ by Irfan Maulana

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://www.mazipan.xyz/"><img src="https://avatars0.githubusercontent.com/u/7221389?v=4" width="100px;" alt="Irfan Maulana"/><br /><sub><b>Irfan Maulana</b></sub></a><br /><a href="https://github.com/mazipan/vue-currency-filter/commits?author=mazipan" title="Code">💻</a></td><td align="center"><a href="https://about.me/iqbalhood"><img src="https://avatars3.githubusercontent.com/u/1563756?v=4" width="100px;" alt="iqbalhood"/><br /><sub><b>iqbalhood</b></sub></a><br /><a href="#design-iqbalhood" title="Design">🎨</a></td><td align="center"><a href="https://sunhengzhe.com"><img src="https://avatars3.githubusercontent.com/u/8614151?v=4" width="100px;" alt="孙恒哲"/><br /><sub><b>孙恒哲</b></sub></a><br /><a href="https://github.com/mazipan/vue-currency-filter/commits?author=sunhengzhe" title="Code">💻</a></td><td align="center"><a href="https://github.com/ricardogobbosouza"><img src="https://avatars3.githubusercontent.com/u/13064722?v=4" width="100px;" alt="Ricardo Gobbo de Souza"/><br /><sub><b>Ricardo Gobbo de Souza</b></sub></a><br /><a href="https://github.com/mazipan/vue-currency-filter/commits?author=ricardogobbosouza" title="Code">💻</a></td><td align="center"><a href="https://github.com/dsfx3d"><img src="https://avatars1.githubusercontent.com/u/14162837?v=4" width="100px;" alt="Yashodhan Singh Rathore"/><br /><sub><b>Yashodhan Singh Rathore</b></sub></a><br /><a href="https://github.com/mazipan/vue-currency-filter/commits?author=dsfx3d" title="Code">💻</a></td><td align="center"><a href="http://gijsroge.github.io"><img src="https://avatars0.githubusercontent.com/u/2242498?v=4" width="100px;" alt="Gijs Rogé"/><br /><sub><b>Gijs Rogé</b></sub></a><br /><a href="https://github.com/mazipan/vue-currency-filter/commits?author=gijsroge" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
