import accounting from 'accounting'

const VueCurrencyFilter = {
  install (Vue, options) {

    // helper to check undefined variable
    function _isUndefined (obj) {
      return typeof obj === "undefined"
    }

    if (_isUndefined(options)) options = {}

    const EMPTY = 'empty'
    const SPACE = 'space'

    // init default config
    let symbol = ''
    let thousandsSeparator = '.'
    let fractionCount = 0
    let fractionSeparator = ','
    let symbolPosition = 'front'
    let symbolSpacing = true

    // overide with custom config if exist
    if (!_isUndefined(options.symbol)) {
      symbol = options.symbol
    }
    if (!_isUndefined(options.thousandsSeparator)) {
      thousandsSeparator = options.thousandsSeparator
    }
    if (!_isUndefined(options.fractionCount)) {
      fractionCount = options.fractionCount
    }
    if (!_isUndefined(options.fractionSeparator)) {
      fractionSeparator = options.fractionSeparator
    }
    if (!_isUndefined(options.symbolPosition)) {
      symbolPosition = options.symbolPosition
    }
    if (!_isUndefined(options.symbolSpacing)) {
      symbolSpacing = options.symbolSpacing
    }

    Vue.filter('currency', 
      function (value, 
        _symbol, _thousandsSeparator, _fractionCount, 
        _fractionSeparator, _symbolPosition, _symbolSpacing) {

      // overide again with on the fly config    
      if (!_isUndefined(_symbol)) symbol = _symbol
      if (!_isUndefined(_thousandsSeparator)) thousandsSeparator = _thousandsSeparator
      if (!_isUndefined(_fractionCount)) fractionCount = _fractionCount
      if (!_isUndefined(_fractionSeparator)) fractionSeparator = _fractionSeparator
      if (!_isUndefined(_symbolPosition)) symbolPosition = _symbolPosition
      if (!_isUndefined(_symbolSpacing)) symbolSpacing = _symbolSpacing
      
      if (thousandsSeparator === '') thousandsSeparator = EMPTY 
      else if (thousandsSeparator === ' ') thousandsSeparator = SPACE

      let result = 0.0
      let isNegative = String(value).charAt(0) === '-'
      
      if (isNegative) {
        value = String(value).slice(1)
      }

      let amount = parseFloat(value)
      if (!isNaN(amount)) {
        result = amount
      }

      let formatConfig = "%s%v"
      if (symbolPosition === 'front'){
        formatConfig = symbolSpacing ? "%s %v": "%s%v"
      } else {
        formatConfig = symbolSpacing ? "%v %s" : "%v%s"
      }

      result = accounting.formatMoney(value, {
        format:  formatConfig,
        symbol: symbol,
        precision : fractionCount,
        thousand : thousandsSeparator,
        decimal : fractionSeparator,
      })

      if (isNegative) {
        result = '-' + result
      }
      
      result = result.replace(EMPTY, '').replace(SPACE, ' ')

      return result
    })
  }
}

export default VueCurrencyFilter
