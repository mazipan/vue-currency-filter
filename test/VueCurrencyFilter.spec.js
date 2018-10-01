import {
  createLocalVue,
  shallowMount
} from '@vue/test-utils'

import App from '../demo/App.vue'
import VueCurrencyFilter from '../VueCurrencyFilter'

import helper from './helper'
helper.initHelper();

describe('test VueCurrencyFilter', () => {
  it('Test with all default config', () => {
    let localVue = createLocalVue()

    localVue.use(VueCurrencyFilter)

    let wrapper = shallowMount(App, {
      localVue
    })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('$ 20.000')
  })

  it('Test with negative value', () => {
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallowMount(App, {
      localVue
    })
    wrapper.setData({
      textInput: -20000
    })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('-$ 20.000')
  })
  it('Test change config on the fly', () => {
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallowMount(App, {
      localVue
    })

    wrapper.setData({
      configSymbol: 'Rp',
      configSeparator: ',',
      configFractionCount: 2,
      configFractionSeparator: '.',
      configSymbolPosition: 'back',
      configSymbolSpacing: false,
      textInput: 5000
    })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('5,000.00Rp')
  })
  it('Test thousandsSeparator has number value', () => {
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallowMount(App, {
      localVue
    })

    wrapper.setData({
      textInput: 5000,
      configSeparator: 5
    })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('$ 55000')
  })
  it('Test symbolPosition:front symbolSpacing:true', () => {
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallowMount(App, {
      localVue
    })

    wrapper.setData({
      configSymbolPosition: 'front',
      configSymbolSpacing: true,
      textInput: 5000
    })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('$ 5.000')
  })
  it('Test symbolPosition:front symbolSpacing:false', () => {
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallowMount(App, {
      localVue
    })

    wrapper.setData({
      configSymbolPosition: 'front',
      configSymbolSpacing: false,
      textInput: 5000
    })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('$5.000')
  })
  it('Test symbolPosition:end symbolSpacing:false', () => {
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallowMount(App, {
      localVue
    })

    wrapper.setData({
      configSymbolPosition: 'end',
      configSymbolSpacing: false,
      textInput: 5000
    })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('5.000$')
  })
  it('Test symbolPosition:end symbolSpacing:true', () => {
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallowMount(App, {
      localVue
    })

    wrapper.setData({
      configSymbolPosition: 'end',
      configSymbolSpacing: true,
      textInput: 5000
    })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('5.000 $')
  })
  it('Test rounding up value', () => {
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallowMount(App, {
      localVue
    })

    wrapper.setData({
      textInput: '9.0755555555',
      configFractionCount: 2
    })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('$ 9,08')
  })

  it('Test rounding down value', () => {
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallowMount(App, {
      localVue
    })

    wrapper.setData({
      textInput: '9.074444444444',
      configFractionCount: 2
    })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('$ 9,07')
  })

  it('Test value isNaN', () => {
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallowMount(App, {
      localVue
    })

    wrapper.setData({
      textInput: 'NotANumber'
    })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('$ 0')
  })
  // should be in last test case
  it('Test set all config to undefined', () => {
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallowMount(App, {
      localVue
    })

    wrapper.setData({
      configSymbol: undefined,
      configSeparator: undefined,
      configFractionCount: undefined,
      configFractionSeparator: undefined,
      configSymbolPosition: undefined,
      configSymbolSpacing: undefined,
      textInput: 5000
    })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('5.000')
  })

  it('Test pass config with object', () => {
    let localVue = createLocalVue()

    localVue.use(VueCurrencyFilter)

    let wrapper = shallowMount(App, {
      localVue
    })

    let result = wrapper.find('.result__filter--object')
    expect(result.text()).toEqual('¥ 20.000,00')
  })

  it('Test hit $CurrencyFilter.setConfig', () => {
    let localVue = createLocalVue()

    localVue.use(VueCurrencyFilter)

    let wrapper = shallowMount(App, {
      localVue
    })

    wrapper.setData({
      configSymbol: undefined,
      configSeparator: undefined,
      configFractionCount: undefined,
      configFractionSeparator: undefined,
      configSymbolPosition: undefined,
      configSymbolSpacing: undefined,
      textInput: 5000
    })

    expect(typeof wrapper.vm.$CurrencyFilter.setConfig).toEqual('function')
    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('5.000')

    wrapper.vm.$CurrencyFilter.setConfig({
      symbol: '$'
    })
    wrapper.vm.updateData({
      thousandsSeparator: ','
    })
    expect(result.text()).toEqual('$ 5,000')
  })
});