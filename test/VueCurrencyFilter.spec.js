import { createLocalVue, shallow } from 'vue-test-utils'

import App from '../App.vue'
import VueCurrencyFilter from '../VueCurrencyFilter'

describe('test VueCurrencyFilter', () => {
  it('Test with all default config', () => {    
    let localVue = createLocalVue()
    
    localVue.use(VueCurrencyFilter)

    let wrapper = shallow(App, {
      localVue
    })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('$ 20.000')
  })

  it('Test with negative value', () => {    
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallow(App, {
      localVue
    })
    wrapper.setData({ textInput: -20000 })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('-$ 20.000')
  })
  it('Test change config on the fly', () => {    
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallow(App, {
      localVue
    })

    wrapper.setData({ textInput: 5000 })
    wrapper.setData({ configSymbol: 'Rp' })
    wrapper.setData({ configSeparator: ',' })
    wrapper.setData({ configFractionCount: 2 })
    wrapper.setData({ configFractionSeparator: '.' })
    wrapper.setData({ configSymbolPosition: 'back' })
    wrapper.setData({ configSymbolSpacing: false })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('5,000.00Rp')
  })
  it('Test thousandsSeparator has number value', () => {    
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallow(App, {
      localVue
    })

    wrapper.setData({ textInput: 5000 })
    wrapper.setData({ configSeparator: 5 })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('$ 55000')
  })
  it('Test symbolPosition:front symbolSpacing:true', () => {    
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallow(App, {
      localVue
    })

    wrapper.setData({ textInput: 5000 })
    wrapper.setData({ configSymbolPosition: 'front' })
    wrapper.setData({ configSymbolSpacing: true })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('$ 5.000')
  })
  it('Test symbolPosition:front symbolSpacing:false', () => {    
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallow(App, {
      localVue
    })

    wrapper.setData({ textInput: 5000 })
    wrapper.setData({ configSymbolPosition: 'front' })
    wrapper.setData({ configSymbolSpacing: false })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('$5.000')
  })
  it('Test symbolPosition:end symbolSpacing:false', () => {    
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallow(App, {
      localVue
    })

    wrapper.setData({ textInput: 5000 })
    wrapper.setData({ configSymbolPosition: 'end' })
    wrapper.setData({ configSymbolSpacing: false })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('5.000$')
  })
  it('Test symbolPosition:end symbolSpacing:true', () => {    
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallow(App, {
      localVue
    })

    wrapper.setData({ textInput: 5000 })
    wrapper.setData({ configSymbolPosition: 'end' })
    wrapper.setData({ configSymbolSpacing: true })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('5.000 $')
  })
  it('Test value isNan', () => {    
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallow(App, {
      localVue
    })

    wrapper.setData({ textInput: 'NotANumber' })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('$ 0')
  })
  // should be in last test case
  it('Test set all config to undefined', () => {    
    let localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    let wrapper = shallow(App, {
      localVue
    })

    wrapper.setData({ textInput: 5000 })
    wrapper.setData({ configSymbol: undefined })
    wrapper.setData({ configSeparator: undefined})
    wrapper.setData({ configFractionCount: undefined })
    wrapper.setData({ configFractionSeparator: undefined })
    wrapper.setData({ configSymbolPosition: undefined })
    wrapper.setData({ configSymbolSpacing: undefined })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('$ 5.000')
  })
});

