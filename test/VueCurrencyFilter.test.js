import { createLocalVue, shallow } from 'vue-test-utils'

import App from '../App.vue'
import VueCurrencyFilter from '../VueCurrencyFilter'

describe('test VueCurrencyFilter', () => {
  it('Test with all default config', () => {    
    const localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    const wrapper = shallow(App, {
      localVue
    })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('$ 20.000')
  })

  it('Test with negative value', () => {    
    const localVue = createLocalVue()
    localVue.use(VueCurrencyFilter)

    const wrapper = shallow(App, {
      localVue
    })
    wrapper.setData({ textInput: -20000 })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('-$ 20.000')
  })
});
