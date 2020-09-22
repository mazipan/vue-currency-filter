import { __isString, __isArray, __map, __defaults, __isObject } from './utils'

const lib = {
  settings: {
    currency: {
      symbol: '$', // default currency symbol is '$'
      format: '%s%v', // controls output: %s = symbol, %v = value (can be object, see docs)
      decimal: '.', // decimal point separator
      thousand: ',', // thousands separator
      precision: 2, // decimal places
      grouping: 3 // digit grouping (not implemented yet)
    },
    number: {
      precision: 0, // default precision on numbers is 0
      grouping: 3, // digit grouping (not implemented yet)
      thousand: ',',
      decimal: '.'
    }
  }
}

/**
 * Check and normalise the value of precision (must be positive integer)
 */
export function checkPrecision(val, base = 0) {
  val = Math.round(Math.abs(val))
  return isNaN(val) ? base : val
}

/**
 * Parses a format string or object and returns format obj for use in rendering
 *
 * `format` is either a string with the default (positive) format, or object
 * containing `pos` (required), `neg` and `zero` values (or a function returning
 * either a string or object)
 *
 * Either string or format.pos must contain "%v" (value) to be valid
 */
export function checkCurrencyFormat(format) {
  var defaults = lib.settings.currency.format

  // Allow function as format parameter (should return string or object):
  if (typeof format === 'function') format = format()

  // Format can be a string, in which case `value` ("%v") must be present:
  if (__isString(format) && format.match('%v')) {
    // Create and return positive, negative and zero formats:
    return {
      pos: format,
      neg: format.replace('-', '').replace('%v', '-%v'),
      zero: format
    }

    // If no format, or object is missing valid positive value, use defaults:
  } else if (!format || !format.pos || !format.pos.match('%v')) {
    // If defaults is a string, casts it to an object for faster checking next time:
    return !__isString(defaults)
      ? defaults
      // @ts-ignore
      : (lib.settings.currency.format = {
        pos: defaults,
        neg: defaults.replace('%v', '-%v'),
        zero: defaults
      })
  }
  // Otherwise, assume format was fine:
  return format
}

export const unformat = function (value, decimal?) {
  // Recursively unformat arrays:
  if (__isArray(value)) {
    return __map(value, function (val) {
      return unformat(val, decimal)
    })
  }

  // Fails silently (need decent errors):
  value = value || 0

  // Return the value as-is if it's already a number:
  if (typeof value === 'number') return value

  // Default decimal point comes from settings, but could be set to eg. "," in opts:
  decimal = decimal || lib.settings.number.decimal

  // Build regex to strip out everything except digits, decimal point and minus sign:
  // @ts-ignore
  var regex = new RegExp('[^0-9-' + decimal + ']', ['g'])
  var unformatted = parseFloat(
    ('' + value)
      .replace(/\((?=\d+)(.*)\)/, '-$1') // replace bracketed values with negatives
      .replace(regex, '') // strip out any cruft
      .replace(decimal, '.') // make sure decimal point is standard
  )

  // This will fail silently which may cause trouble, let's wait and see:
  return !isNaN(unformatted) ? unformatted : 0
}

/**
 * Implementation of toFixed() that treats floats more like decimals
 *
 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present
 * problems for accounting- and finance-related software.
 */
export const toFixed = function (value, precision) {
  precision = checkPrecision(precision, lib.settings.number.precision)

  var exponentialForm = Number(unformat(value) + 'e' + precision)
  var rounded = Math.round(exponentialForm)
  var finalResult = Number(rounded + 'e-' + precision).toFixed(precision)
  return finalResult
}

/**
 * Format a number, with comma-separated thousands and custom precision/decimal places
 * Alias: `accounting.format()`
 *
 * Localise by overriding the precision and thousand / decimal separators
 * 2nd parameter `precision` can be an object matching `settings.number`
 */
export const formatNumber = function (
  number,
  precision,
  thousand,
  decimal,
  avoidEmptyDecimals
) {
  // Resursively format arrays:
  if (__isArray(number)) {
    return __map(number, function (val) {
      return formatNumber(val, precision, thousand, decimal, avoidEmptyDecimals)
    })
  }

  // Clean up number:
  number = unformat(number)

  // Build options object from second param (if object) or all params, extending defaults:
  var opts = __defaults(
    __isObject(precision)
      ? precision
      : {
        precision: precision,
        thousand: thousand,
        decimal: decimal
      },
    lib.settings.number
  )
  // Clean up precision
  var usePrecision = checkPrecision(opts.precision)
  // Do some calc:
  var negative = number < 0 ? '-' : ''
  var base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + ''
  var mod = base.length > 3 ? base.length % 3 : 0

  var precisionString = ''
  if (usePrecision) {
    // default behaviour
    // 1234.56 and avoidEmptyDecimals whatever   => 1234.56
    // 1234.00 and avoidEmptyDecimals undefined  => 1234.00
    precisionString = opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1]

    // 1234.00 and avoidEmptyDecimals == ''    => 1234
    // 1234.00 and avoidEmptyDecimals == '##'  => 1234.##
    if (avoidEmptyDecimals !== undefined && parseInt(toFixed(Math.abs(number || 0), 1), 10) == number) {
      precisionString = avoidEmptyDecimals === '' ? '' : opts.decimal + avoidEmptyDecimals
    }
  }

  // Format the number:
  return (
    negative +
    (mod ? base.substr(0, mod) + opts.thousand : '') +
    base.substr(mod).replace(/(\d{3})(?=\d)/g, '$1' + opts.thousand) +
    precisionString
  )
}

/**
 * Format a number into currency
 *
 * Usage: accounting.formatMoney(number, symbol, precision, thousandsSep, decimalSep, format)
 * defaults: (0, "$", 2, ",", ".", "%s%v")
 *
 * Localise by overriding the symbol, precision, thousand / decimal separators and format
 * Second param can be an object matching `settings.currency` which is the easiest way.
 *
 * To do: tidy up the parameters
 */
export const formatMoney = function (
  number,
  symbol,
  precision,
  thousand,
  decimal,
  format,
  avoidEmptyDecimals
) {
  // Resursively format arrays:
  if (__isArray(number)) {
    return __map(number, function (val) {
      return formatMoney(val, symbol, precision, thousand, decimal, format, avoidEmptyDecimals)
    })
  }

  // Clean up number:
  number = unformat(number)

  // Build options object from second param (if object) or all params, extending defaults:
  var opts = __defaults(
    __isObject(symbol)
      ? symbol
      : {
        symbol: symbol,
        precision: precision,
        thousand: thousand,
        decimal: decimal,
        format: format,
        avoidEmptyDecimals: avoidEmptyDecimals,
      },
    lib.settings.currency
  )
  // Check format (returns object with pos, neg and zero):
  var formats = checkCurrencyFormat(opts.format)
  // Choose which format to use for this value:
  var useFormat =
    number > 0 ? formats.pos : number < 0 ? formats.neg : formats.zero

  // Return with currency symbol added:
  return useFormat
    .replace('%s', opts.symbol)
    .replace(
      '%v',
      formatNumber(
        Math.abs(number),
        checkPrecision(opts.precision),
        opts.thousand,
        opts.decimal,
        opts.avoidEmptyDecimals
      )
    )
}
