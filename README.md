# Vue Currency Filter

<a href="https://github.com/mazipan/vue-currency-filter"><img
  src="https://raw.githubusercontent.com/mazipan/vue-currency-filter/master/assets/VueJS-Currency-128px.png" alt="Vue Currency Filter Logo"
  width="128" align="right"></a>
  
> Lightweight vue currency filter based on accounting.js

[![version](https://img.shields.io/npm/v/vue-currency-filter.svg)](https://www.npmjs.com/package/vue-currency-filter) ![minified](https://badgen.net/bundlephobia/minzip/vue-currency-filter) [![downloads](https://img.shields.io/npm/dt/vue-currency-filter.svg)](https://www.npmjs.com/package/vue-currency-filter) [![Travis](https://img.shields.io/travis/mazipan/vue-currency-filter.svg)](https://travis-ci.org/mazipan/vue-currency-filter)
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

- [@iqbalhood](https://github.com/iqbalhood): VueCurrencyFilter logo creator (see [#19](https://github.com/mazipan/vue-currency-filter/issues/19))

## Hope this will be useful for you all

Copyright © 2017 Built with ❤️ by Irfan Maulana
