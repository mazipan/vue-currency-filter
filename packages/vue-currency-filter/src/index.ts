import { toFixed, formatMoney } from './accounting'
import { __isNull, __defaults } from './utils'

const defaultConfig = {
  name: 'currency',
  symbol: '',
  thousandsSeparator: '.',
  fractionCount: 0,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
}

const VueCurrencyFilter = {
  install (Vue, options) {
    if (__isNull(options)) options = {}
    const globalConfigs = __defaults(options, defaultConfig)
    let { name, ...configs } = globalConfigs

    const filterCurrency = function (value,
      _symbol,
      _thousandsSeparator,
      _fractionCount,
      _fractionSeparator,
      _symbolPosition,
      _symbolSpacing) {

      let runtimeConfig = __defaults({
        symbol: _symbol,
        thousandsSeparator: _thousandsSeparator,
        fractionCount: _fractionCount,
        fractionSeparator: _fractionSeparator,
        symbolPosition: _symbolPosition,
        symbolSpacing: _symbolSpacing
      }, configs)

      if (typeof _symbol === 'object') {
        runtimeConfig = __defaults(_symbol, configs)
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
        configs = __defaults(options, defaultConfig)
      },
      getConfig: () => {
        return configs
      }
    }
  }
}

export default VueCurrencyFilter
