export interface currencyOptions {
  name?: string,
  symbol?: string,
  thousandsSeparator?: string,
  fractionCount?: number,
  fractionSeparator?: string,
  symbolPosition?: string,
  symbolSpacing?: boolean,
  avoidEmptyDecimals?: string,
}

export interface CurrencyFilterMethodInstance {
  setConfig (options: currencyOptions): void,
  getConfig (): currencyOptions,
  format (value: string,
          _symbol?: string,
          _thousandsSeparator?: string,
          _fractionCount?: number,
          _fractionSeparator?: string,
          _symbolPosition?: string,
          _symbolSpacing?: boolean,
          avoidEmptyDecimals?: string): string
}
