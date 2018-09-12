import accounting from 'accounting'

const VueCurrencyFilter = {
  install (Vue, options) {

    // helper to check undefined variable
    function _isUndefined (obj) {
      return typeof obj === "undefined"
    }

    function _resetAllConfig (options) {
      symbol = _isUndefined(options.symbol) ? '' : options.symbol
      thousandsSeparator = _isUndefined(options.thousandsSeparator) ? '.' : options.thousandsSeparator
      fractionCount = _isUndefined(options.fractionCount) ? 0 : options.fractionCount
      fractionSeparator = _isUndefined(options.fractionSeparator) ? ',' : options.fractionSeparator
      symbolPosition = _isUndefined(options.symbolPosition) ? 'front' : options.symbolPosition
      symbolSpacing = _isUndefined(options.symbolSpacing) ? true : options.symbolSpacing
    }

    if (_isUndefined(options)) options = {}

    // init default config
    let symbol = ''
    let thousandsSeparator = '.'
    let fractionCount = 0
    let fractionSeparator = ','
    let symbolPosition = 'front'
    let symbolSpacing = true

    // overide with custom config if exist
    _resetAllConfig(options)

    Vue.filter('currency',
      function (value,
        _symbol,
        _thousandsSeparator,
        _fractionCount,
        _fractionSeparator,
        _symbolPosition,
        _symbolSpacing) {

      // reset first before re-apply config
      _resetAllConfig(options)

      if (typeof _symbol === 'object') {
        _thousandsSeparator = _symbol.thousandsSeparator
        _fractionCount = _symbol.fractionCount
        _fractionSeparator = _symbol.fractionSeparator
        _symbolPosition = _symbol.symbolPosition
        _symbolSpacing = _symbol.symbolSpacing
        _symbol = _symbol.symbol
      }

      // overide again with on the fly config
      if (!_isUndefined(_symbol)) symbol = _symbol
      if (!_isUndefined(_thousandsSeparator)) thousandsSeparator = _thousandsSeparator
      if (!_isUndefined(_fractionCount)) fractionCount = _fractionCount
      if (!_isUndefined(_fractionSeparator)) fractionSeparator = _fractionSeparator
      if (!_isUndefined(_symbolPosition)) symbolPosition = _symbolPosition
      if (!_isUndefined(_symbolSpacing)) symbolSpacing = _symbolSpacing

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

      if (fractionCount > 0) {
        value = accounting.toFixed(value, fractionCount)
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

      return result
    })
  }
}

export default VueCurrencyFilter
