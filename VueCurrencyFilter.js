const VueCurrencyFilter = {
  install (Vue, options) {
    Vue.filter('currency', function (value) {
      if(typeof options === "undefined") options = {}
      let symbol = options.symbol || 'Rp'
      let thousandsSeparator = options.thousandsSeparator || '.'
      let fractionCount = options.fractionCount || 0
      let fractionSeparator = options.fractionSeparator || ','
      let symbolPosition = options.symbolPosition || 'front'
      let symbolSpacing = options.symbolSpacing || true

      let result = 0.0
      let afterDot, beforeDot, pattern, _ref

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

      return result
    })
  }
}

export default VueCurrencyFilter
