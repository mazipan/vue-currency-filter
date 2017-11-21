const VueCurrencyFilter = {
  install (Vue, options) {

    // helper function
    function _isUndefined (obj) {
      return typeof obj === "undefined"
    }

    if(_isUndefined(options)) options = {}
    // init default config
    let symbolSpacing = true

    let symbol = options.symbol || ''
    let thousandsSeparator = options.thousandsSeparator || '.'
    let fractionCount = options.fractionCount || 0
    let fractionSeparator = options.fractionSeparator || ','
    let symbolPosition = options.symbolPosition || 'front'
    
    if(!_isUndefined(options.symbolSpacing)) {
      symbolSpacing = options.symbolSpacing
    }

    Vue.filter('currency', 
      function (value, 
        _symbol, _thousandsSeparator, _fractionCount, 
        _fractionSeparator, _symbolPosition, _symbolSpacing) {

      if(!_isUndefined(_symbol)) symbol = _symbol
      if(!_isUndefined(_thousandsSeparator)) thousandsSeparator = _thousandsSeparator
      if(!_isUndefined(_fractionCount)) fractionCount = _fractionCount
      if(!_isUndefined(_fractionSeparator)) fractionSeparator = _fractionSeparator
      if(!_isUndefined(_symbolPosition)) symbolPosition = _symbolPosition
      if(!_isUndefined(_symbolSpacing)) symbolSpacing = _symbolSpacing
      
      // Back to default --prevent unresponding browser
      if(!thousandsSeparator || !isNaN(thousandsSeparator)) thousandsSeparator = '.'

      let result = 0.0
      let afterDot, beforeDot, pattern, _ref
      let isNegative = String(value).charAt(0) === '-'
      
      if(isNegative) {
        value = String(value).slice(1)
      }

      let amount = parseFloat(value)
      if (!isNaN(amount)) {
        result = amount
      }

      result = result.toFixed(fractionCount)
      _ref = result.split('.')
      beforeDot = _ref[0]
      afterDot = _ref[1]
      pattern = /(-?\d+)(\d{3})/
      while (pattern.test(beforeDot)) {
        beforeDot = beforeDot.replace(pattern, '$1' + thousandsSeparator + '$2')
      }
      if (fractionCount > 0) {
        result = [beforeDot, afterDot].join(fractionSeparator)
      } else {
        result = beforeDot
      }

      let string
      string = [result]
      string.splice((symbolPosition === 'front' ? 0 : 1), 0, symbol)
      result = string.join(symbolSpacing ? ' ' : '')

      if(isNegative) {
        result = '-' + result
      }
      return result
    })
  }
}

export default VueCurrencyFilter
