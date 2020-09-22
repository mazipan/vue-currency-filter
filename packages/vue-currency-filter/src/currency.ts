import { toFixed, formatMoney } from './accounting'

export default function (value, options) {
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
  if (options.symbolPosition === 'front') {
    formatConfig = options.symbolSpacing ? '%s %v' : '%s%v'
  } else {
    formatConfig = options.symbolSpacing ? '%v %s' : '%v%s'
  }

  if (options.fractionCount > 0) {
    value = toFixed(value, options.fractionCount)
  }

  // @ts-ignore
  result = formatMoney(value, {
    format: formatConfig,
    symbol: options.symbol,
    precision: options.fractionCount,
    thousand: options.thousandsSeparator,
    decimal: options.fractionSeparator
  })

  if (isNegative) {
    // @ts-ignore
    result = '-' + result
  }

  return result
}
