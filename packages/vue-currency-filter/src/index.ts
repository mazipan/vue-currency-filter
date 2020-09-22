import { toFixed, formatMoney } from './accounting'
import { __isNull, __defaults } from './utils'
import { PluginObject } from 'vue'
import { CurrencyFilterMethodInstance, currencyOptions } from './types';

const defaultConfig: currencyOptions = {
  name: 'currency',
  symbol: '',
  thousandsSeparator: '.',
  fractionCount: 0,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true,
  avoidEmptyDecimals: undefined,
}

const VueCurrencyFilter: PluginObject<currencyOptions[] | currencyOptions> = {
  install (Vue, pluginOptions) {
    const createFilter = (options: currencyOptions) => {
      if (__isNull(options)) options = {}
      const globalConfigs = __defaults(options, defaultConfig)
      let { name, ...configs } = globalConfigs

      const filterCurrency = function (value: string,
                                       _symbol?: string,
                                       _thousandsSeparator?: string,
                                       _fractionCount?: number,
                                       _fractionSeparator?: string,
                                       _symbolPosition?: string,
                                       _symbolSpacing?: boolean,
                                       _avoidEmptyDecimals?: string): string | number {

        let runtimeConfig = __defaults({
          symbol: _symbol,
          thousandsSeparator: _thousandsSeparator,
          fractionCount: _fractionCount,
          fractionSeparator: _fractionSeparator,
          symbolPosition: _symbolPosition,
          symbolSpacing: _symbolSpacing,
          avoidEmptyDecimals: _avoidEmptyDecimals
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
          decimal: runtimeConfig.fractionSeparator,
          avoidEmptyDecimals: runtimeConfig.avoidEmptyDecimals,
        })

        if (isNegative) {
          // @ts-ignore
          result = '-' + result
        }

        return result
      }

      Vue.filter(name, filterCurrency)
      Vue.prototype['$' + name] = {
        setConfig: (options) => {
          configs = __defaults(options, defaultConfig)
        },
        getConfig: () => {
          return configs
        },
        format: filterCurrency
      } as CurrencyFilterMethodInstance
    }

    if (Array.isArray(pluginOptions)) {
      pluginOptions.forEach(options => createFilter(options))
    } else {
      createFilter(pluginOptions!)
    }
  }
}

export default VueCurrencyFilter
