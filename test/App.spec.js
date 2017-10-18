import { createLocalVue, shallow } from 'vue-test-utils'

import App from '../App.vue'
import VueCurrencyFilter from '../VueCurrencyFilter'

describe('test App.vue', () => {
  it('Test with all default config', () => {    
    let localVue = createLocalVue()
    
    localVue.use(VueCurrencyFilter, 
    {
      symbol : 'Rp', 
      thousandsSeparator: ',',
      fractionCount: 3,
      fractionSeparator: '-',
      symbolPosition: 'back',
      symbolSpacing: false
    })

    let wrapper = shallow(App, {
      localVue
    })

    let result = wrapper.find('.result__filter')
    expect(result.text()).toEqual('$ 20.000')
  })
});

