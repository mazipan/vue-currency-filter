const VueCurrencyFilter = {
  install (Vue, options) {

    // helper to check undefined variable
    function _isUndefined (obj) {
      return typeof obj === "undefined"
    }

    if(_isUndefined(options)) options = {}

    // init default config
    let symbol = ''
    let thousandsSeparator = '.'
    let fractionCount = 0
    let fractionSeparator = ','
    let symbolPosition = 'front'
    let symbolSpacing = true

    // overide with custom config if exist
    if(!_isUndefined(options.symbol)) {
      symbol = options.symbol
    }
    if(!_isUndefined(options.thousandsSeparator)) {
      thousandsSeparator = options.thousandsSeparator
    }
    if(!_isUndefined(options.fractionCount)) {
      fractionCount = options.fractionCount
    }
    if(!_isUndefined(options.fractionSeparator)) {
      fractionSeparator = options.fractionSeparator
    }
    if(!_isUndefined(options.symbolPosition)) {
      symbolPosition = options.symbolPosition
    }
    if(!_isUndefined(options.symbolSpacing)) {
      symbolSpacing = options.symbolSpacing
    }

    Vue.filter('currency', 
      function (value, 
        _symbol, _thousandsSeparator, _fractionCount, 
        _fractionSeparator, _symbolPosition, _symbolSpacing) {

      let emptySeparator = false
      let spaceSeparator = false

      // overide again with on the fly config    
      if(!_isUndefined(_symbol)) symbol = _symbol
      if(!_isUndefined(_thousandsSeparator)) thousandsSeparator = _thousandsSeparator
      if(!_isUndefined(_fractionCount)) fractionCount = _fractionCount
      if(!_isUndefined(_fractionSeparator)) fractionSeparator = _fractionSeparator
      if(!_isUndefined(_symbolPosition)) symbolPosition = _symbolPosition
      if(!_isUndefined(_symbolSpacing)) symbolSpacing = _symbolSpacing
      
      if(thousandsSeparator === ''){
        emptySeparator = true
        thousandsSeparator = 'empty'
      }
      else if(thousandsSeparator === ' '){
        spaceSeparator = true
        thousandsSeparator = 'space'
      }
      // reset to default --prevent unresponding browser
      else if(!isNaN(parseInt(thousandsSeparator))) thousandsSeparator = '.'

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
      if(emptySeparator) {
        result = result.replace(thousandsSeparator, '')
      }
      if(spaceSeparator) {
        result = result.replace(thousandsSeparator, ' ')
      }

      return result
    })
  }
}

export default VueCurrencyFilter
