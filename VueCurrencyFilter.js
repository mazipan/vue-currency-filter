const VueCurrencyFilter = {
  install (Vue, options) {

    if(typeof options === "undefined") options = {}
    let symbol = options.symbol || 'Rp'
    let thousandsSeparator = options.thousandsSeparator || '.'
    let fractionCount = options.fractionCount || 0
    let fractionSeparator = options.fractionSeparator || ','
    let symbolPosition = options.symbolPosition || 'front'
    let symbolSpacing = options.symbolSpacing || true

    Vue.filter('currency', 
      function (value, 
        _symbol, _thousandsSeparator, _fractionCount, 
        _fractionSeparator, _symbolPosition, _symbolSpacing) {

      if(typeof _symbol !== 'undefined') symbol = _symbol
      if(typeof _thousandsSeparator !== 'undefined') thousandsSeparator = _thousandsSeparator
      if(typeof _fractionCount !== 'undefined') fractionCount = _fractionCount
      if(typeof _fractionSeparator !== 'undefined') fractionSeparator = _fractionSeparator
      if(typeof _symbolPosition !== 'undefined') symbolPosition = _symbolPosition
      if(typeof _symbolSpacing !== 'undefined') symbolSpacing = _symbolSpacing
      
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
        result = '- ' + result
      }
      return result
    })
  }
}

export default VueCurrencyFilter
