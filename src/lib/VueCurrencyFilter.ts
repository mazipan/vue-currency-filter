import { toFixed, formatMoney } from './accounting'
import utils from './utils'

const VueCurrencyFilter = {
  install (Vue, options) {
    const defaultConfig = {
      name: 'currency',
      symbol: '',
      thousandsSeparator: '.',
      fractionCount: 0,
      fractionSeparator: ',',
      symbolPosition: 'front',
      symbolSpacing: true
    }

    if (utils.__isNull(options)) options = {}
    const globalConfigs = utils.__defaults(options, defaultConfig)
    let { name, ...configs } = globalConfigs

    const filterCurrency = function (value,
      _symbol,
      _thousandsSeparator,
      _fractionCount,
      _fractionSeparator,
      _symbolPosition,
      _symbolSpacing) {
      let runtimeConfig = utils.__defaults({
        symbol: _symbol,
        thousandsSeparator: _thousandsSeparator,
        fractionCount: _fractionCount,
        fractionSeparator: _fractionSeparator,
        symbolPosition: _symbolPosition,
        symbolSpacing: _symbolSpacing
      }, configs)

      if (typeof _symbol === 'object') {
        runtimeConfig = utils.__defaults(_symbol, configs)
      }

      let result = 0.0
      const isNegative = String(value).charAt(0) === '-'

      if (isNegative) {
        value = String(value).slice(1)
      }

      const amount = parseFloat(value)
      if (!isNaN(amount)) {
        result = amount
      }

      let formatConfig = '%s%v'
      if (runtimeConfig.symbolPosition === 'front') {
        formatConfig = runtimeConfig.symbolSpacing ? '%s %v' : '%s%v'
      } else {
        formatConfig = runtimeConfig.symbolSpacing ? '%v %s' : '%v%s'
      }

      if (runtimeConfig.fractionCount > 0) {
        value = toFixed(value, runtimeConfig.fractionCount)
      }

      // @ts-ignore
      result = formatMoney(value, {
        format: formatConfig,
        symbol: runtimeConfig.symbol,
        precision: runtimeConfig.fractionCount,
        thousand: runtimeConfig.thousandsSeparator,
        decimal: runtimeConfig.fractionSeparator
      })

      if (isNegative) {
        // @ts-ignore
        result = '-' + result
      }

      return result
    }

    Vue.filter(name, filterCurrency)
    Vue.prototype.$CurrencyFilter = {
      setConfig: (options) => {
        configs = utils.__defaults(options, defaultConfig)
      },
      getConfig: () => {
        return configs
      }
    }
  }
}

export default VueCurrencyFilter
