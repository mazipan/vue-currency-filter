(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueCurrencyFilter = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var nativeMap = Array.prototype.map,
      nativeIsArray = Array.isArray,
      toString = Object.prototype.toString;
  var utils = {
    __isNull: function __isNull(obj) {
      return typeof obj === 'undefined' || obj === null;
    },
    __isString: function __isString(obj) {
      return !!(obj === '' || obj && obj.charCodeAt && obj.substr);
    },
    __isArray: function __isArray(obj) {
      return nativeIsArray ? nativeIsArray(obj) : toString.call(obj) === '[object Array]';
    },
    __isObject: function __isObject(obj) {
      return obj && toString.call(obj) === '[object Object]';
    },
    __defaults: function __defaults(object, defs) {
      var key;
      object = object || {};
      defs = defs || {}; // Iterate over object non-prototype properties:

      for (key in defs) {
        if (defs.hasOwnProperty(key)) {
          // Replace values with defaults only if undefined (allow empty/zero values):
          if (object[key] == null) object[key] = defs[key];
        }
      }

      return object;
    },
    __map: function __map(obj, iterator, context) {
      var results = [],
          i,
          j;
      if (!obj) return results; // Use native .map method if it exists:

      if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context); // Fallback for native .map:

      for (i = 0, j = obj.length; i < j; i++) {
        results[i] = iterator.call(context, obj[i], i, obj);
      }

      return results;
    }
  };

  /*
   * accounting.js v0.4.2, Copyright 2014 Open Exchange Rates, Docs: http://openexchangerates.github.io/accounting.js/
   * --0-- Moderate and maintain by Irfan Maulana <github.com/mazipan> for Vue-Currency-Filter needed --0--
   */
  // Create the local library object, to be exported or referenced globally later

  var lib = {};
  /* --- Exposed settings --- */
  // The library's settings configuration object. Contains default parameters for
  // currency and number formatting

  lib.settings = {
    currency: {
      symbol: '$',
      // default currency symbol is '$'
      format: '%s%v',
      // controls output: %s = symbol, %v = value (can be object, see docs)
      decimal: '.',
      // decimal point separator
      thousand: ',',
      // thousands separator
      precision: 2,
      // decimal places
      grouping: 3 // digit grouping (not implemented yet)

    },
    number: {
      precision: 0,
      // default precision on numbers is 0
      grouping: 3,
      // digit grouping (not implemented yet)
      thousand: ',',
      decimal: '.'
    }
    /**
     * Check and normalise the value of precision (must be positive integer)
     */

  };

  function checkPrecision(val, base) {
    val = Math.round(Math.abs(val));
    return isNaN(val) ? base : val;
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


  function checkCurrencyFormat(format) {
    var defaults = lib.settings.currency.format; // Allow function as format parameter (should return string or object):

    if (typeof format === 'function') format = format(); // Format can be a string, in which case `value` ("%v") must be present:

    if (utils.__isString(format) && format.match('%v')) {
      // Create and return positive, negative and zero formats:
      return {
        pos: format,
        neg: format.replace('-', '').replace('%v', '-%v'),
        zero: format // If no format, or object is missing valid positive value, use defaults:

      };
    } else if (!format || !format.pos || !format.pos.match('%v')) {
      // If defaults is a string, casts it to an object for faster checking next time:
      return !utils.__isString(defaults) ? defaults : lib.settings.currency.format = {
        pos: defaults,
        neg: defaults.replace('%v', '-%v'),
        zero: defaults
      };
    } // Otherwise, assume format was fine:


    return format;
  }
  /* --- API Methods --- */

  /**
   * Takes a string/array of strings, removes all formatting/cruft and returns the raw float value
   * Alias: `accounting.parse(string)`
   *
   * Decimal must be included in the regular expression to match floats (defaults to
   * accounting.settings.number.decimal), so if the number uses a non-standard decimal 
   * separator, provide it as the second argument.
   *
   * Also matches bracketed negatives (eg. "$ (1.99)" => -1.99)
   *
   * Doesn't throw any errors (`NaN`s become 0) but this may change in future
   */


  var unformat = lib.unformat = lib.parse = function (value, decimal) {
    // Recursively unformat arrays:
    if (utils.__isArray(value)) {
      return utils.__map(value, function (val) {
        return unformat(val, decimal);
      });
    } // Fails silently (need decent errors):


    value = value || 0; // Return the value as-is if it's already a number:

    if (typeof value === 'number') return value; // Default decimal point comes from settings, but could be set to eg. "," in opts:

    decimal = decimal || lib.settings.number.decimal; // Build regex to strip out everything except digits, decimal point and minus sign:

    var regex = new RegExp('[^0-9-' + decimal + ']', ['g']),
        unformatted = parseFloat(('' + value).replace(/\((?=\d+)(.*)\)/, '-$1') // replace bracketed values with negatives
    .replace(regex, '') // strip out any cruft
    .replace(decimal, '.') // make sure decimal point is standard
    ); // This will fail silently which may cause trouble, let's wait and see:

    return !isNaN(unformatted) ? unformatted : 0;
  };
  /**
   * Implementation of toFixed() that treats floats more like decimals
   *
   * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present
   * problems for accounting- and finance-related software.
   */


  var toFixed = lib.toFixed = function (value, precision) {
    precision = checkPrecision(precision, lib.settings.number.precision);
    var exponentialForm = Number(lib.unformat(value) + 'e' + precision);
    var rounded = Math.round(exponentialForm);
    var finalResult = Number(rounded + 'e-' + precision).toFixed(precision);
    return finalResult;
  };
  /**
   * Format a number, with comma-separated thousands and custom precision/decimal places
   * Alias: `accounting.format()`
   *
   * Localise by overriding the precision and thousand / decimal separators
   * 2nd parameter `precision` can be an object matching `settings.number`
   */


  var formatNumber = lib.formatNumber = lib.format = function (number, precision, thousand, decimal) {
    // Resursively format arrays:
    if (utils.__isArray(number)) {
      return utils.__map(number, function (val) {
        return formatNumber(val, precision, thousand, decimal);
      });
    } // Clean up number:


    number = unformat(number); // Build options object from second param (if object) or all params, extending defaults:

    var opts = utils.__defaults(utils.__isObject(precision) ? precision : {
      precision: precision,
      thousand: thousand,
      decimal: decimal
    }, lib.settings.number),
        // Clean up precision
    usePrecision = checkPrecision(opts.precision),
        // Do some calc:
    negative = number < 0 ? '-' : '',
        base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + '',
        mod = base.length > 3 ? base.length % 3 : 0; // Format the number:


    return negative + (mod ? base.substr(0, mod) + opts.thousand : '') + base.substr(mod).replace(/(\d{3})(?=\d)/g, '$1' + opts.thousand) + (usePrecision ? opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1] : '');
  };
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


  var formatMoney = lib.formatMoney = function (number, symbol, precision, thousand, decimal, format) {
    // Resursively format arrays:
    if (utils.__isArray(number)) {
      return utils.__map(number, function (val) {
        return formatMoney(val, symbol, precision, thousand, decimal, format);
      });
    } // Clean up number:


    number = unformat(number); // Build options object from second param (if object) or all params, extending defaults:

    var opts = utils.__defaults(utils.__isObject(symbol) ? symbol : {
      symbol: symbol,
      precision: precision,
      thousand: thousand,
      decimal: decimal,
      format: format
    }, lib.settings.currency),
        // Check format (returns object with pos, neg and zero):
    formats = checkCurrencyFormat(opts.format),
        // Choose which format to use for this value:
    useFormat = number > 0 ? formats.pos : number < 0 ? formats.neg : formats.zero; // Return with currency symbol added:


    return useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(number), checkPrecision(opts.precision), opts.thousand, opts.decimal));
  };

  var VueCurrencyFilter = {
    install: function install(Vue, options) {
      var defaultConfig = {
        symbol: '',
        thousandsSeparator: '.',
        fractionCount: 0,
        fractionSeparator: ',',
        symbolPosition: 'front',
        symbolSpacing: true,
        precision: 0 // Support fixed-point currency: 0 for float, 2 for 1000¢ -> $10.00

      };
      if (utils.__isNull(options)) options = {};

      var configs = utils.__defaults(options, defaultConfig);

      var filterCurrency = function filterCurrency(value, _symbol, _thousandsSeparator, _fractionCount, _fractionSeparator, _symbolPosition, _symbolSpacing, _precision) {
        var runtimeConfig = utils.__defaults({
          symbol: _symbol,
          thousandsSeparator: _thousandsSeparator,
          fractionCount: _fractionCount,
          fractionSeparator: _fractionSeparator,
          symbolPosition: _symbolPosition,
          symbolSpacing: _symbolSpacing,
          precision: _precision
        }, configs);

        if (_typeof(_symbol) === 'object') {
          runtimeConfig = utils.__defaults(_symbol, configs);
        }

        var result = 0.0;
        var isNegative = String(value).charAt(0) === '-';

        if (isNegative) {
          value = String(value).slice(1);
        }

        var amount = parseFloat(value);

        if (!isNaN(amount)) {
          result = amount;
        }

        var formatConfig = '%s%v';

        if (runtimeConfig.symbolPosition === 'front') {
          formatConfig = runtimeConfig.symbolSpacing ? '%s %v' : '%s%v';
        } else {
          formatConfig = runtimeConfig.symbolSpacing ? '%v %s' : '%v%s';
        }

        if (runtimeConfig.precision > 0) {
          value = lib.unformat(value) / Math.pow(10, runtimeConfig.precision); // 1095 -> 10.95
        }

        if (runtimeConfig.fractionCount > 0) {
          value = lib.toFixed(value, runtimeConfig.fractionCount);
        }

        result = lib.formatMoney(value, {
          format: formatConfig,
          symbol: runtimeConfig.symbol,
          precision: runtimeConfig.fractionCount,
          thousand: runtimeConfig.thousandsSeparator,
          decimal: runtimeConfig.fractionSeparator
        });

        if (isNegative) {
          result = '-' + result;
        }

        return result;
      };

      Vue.filter('currency', filterCurrency);
      Vue.prototype.$CurrencyFilter = {
        setConfig: function setConfig(options) {
          configs = utils.__defaults(options, defaultConfig);
        },
        getConfig: function getConfig() {
          return configs;
        }
      };
    }
  };

  return VueCurrencyFilter;

})));
