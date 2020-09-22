<template>
  <c-stack spacing="2">
    <c-form-control mb="4">
      <c-form-label for="symbol">Symbol</c-form-label>
      <c-input id="symbol" type="text" placeholder="Type a symbol, e.g. $" v-model="configSymbol" />
      <c-form-helper-text>Symbol for currency, e.g: $</c-form-helper-text>
    </c-form-control>

    <c-form-control mb="4">
      <c-form-label for="symbol-position">Symbol Position</c-form-label>
      <c-radio-group id="symbol-position" v-model="configSymbolPosition" is-inline>
        <c-radio value="front">Front</c-radio>
        <c-radio variant-color="red" value="back">Back</c-radio>
      </c-radio-group>
      <c-form-helper-text>A symbol positions</c-form-helper-text>
    </c-form-control>

    <c-form-control mb="4">
      <c-form-label for="symbol-spacing">Symbol Spacing</c-form-label>
      <c-radio-group id="symbol-spacing" v-model="configSymbolSpacing" is-inline>
        <c-radio value="yes">Use spacing</c-radio>
        <c-radio variant-color="red" value="no">NOT use spacing</c-radio>
      </c-radio-group>
      <c-form-helper-text>Applied a spacing between numbers and the symbol</c-form-helper-text>
    </c-form-control>

    <c-form-control mb="4">
      <c-form-label for="separator">Separator</c-form-label>
      <c-input id="separator" type="text" placeholder="Type a separator, e.g. ," v-model="configSeparator" />
      <c-form-helper-text>A thousand separator</c-form-helper-text>
    </c-form-control>

    <c-form-control mb="4">
      <c-form-label for="fraction-count">Fraction Count</c-form-label>
      <c-input
        id="fraction-count"
        type="tel"
        pattern="[0-9]*"
        placeholder="Type a fraction count, e.g. 2"
        v-model="configFractionCount"
      />
      <c-form-helper-text>A fraction count after comma</c-form-helper-text>
    </c-form-control>

    <c-form-control mb="4">
      <c-form-label for="fraction-sep">Fraction Separator</c-form-label>
      <c-input
        id="fraction-sep"
        type="text"
        placeholder="Type a fraction separator, e.g. ."
        v-model="configFractionSeparator"
      />
      <c-form-helper-text>A seperator used for a fraction</c-form-helper-text>
    </c-form-control>

    <c-form-control mb="4">
      <c-form-label for="is-empty-decimal">Avoid empty decimals</c-form-label>
      <c-radio-group id="is-empty-decimal" v-model="isUseAvoidEmptyDecimals">
        <c-radio value="yes">Custom string instead of decimal zeros</c-radio>
        <c-radio variant-color="red" value="no">Display decimal zeros</c-radio>
      </c-radio-group>
      <c-form-helper-text>If you prefer to not showing teh trailing zero decimal</c-form-helper-text>
    </c-form-control>

    <c-form-control mb="4" v-if="isUseAvoidEmptyDecimals === 'yes'">
      <c-form-label for="empty-decimal">Empty decimals string</c-form-label>
      <c-input
        id="empty-decimal"
        type="text"
        placeholder="Type an empty decimals, e.g. ##"
        v-model="configAvoidEmptyDecimals"
      />
      <c-form-helper-text>Custom trailing decimal symbol</c-form-helper-text>
    </c-form-control>

    <c-form-control mb="4">
      <c-form-label for="currency">Currency</c-form-label>
      <c-input
        id="currency"
        type="tel"
        pattern="[0-9]*"
        placeholder="Type a number to be converted, e.g. 123000"
        v-model="textInput"
      />
      <c-form-helper-text>Number to be converted</c-form-helper-text>
    </c-form-control>

    <c-stat-group mb="4">
      <c-stat>
        <c-stat-label>Result - Custom Setup</c-stat-label>
        <c-stat-number>
          {{ textInput | currency({
            symbol: configSymbol,
            thousandsSeparator: configSeparator,
            fractionCount: Number(configFractionCount),
            fractionSeparator: configFractionSeparator,
            symbolPosition: configSymbolPosition,
            symbolSpacing: configSymbolSpacing === 'yes',
            avoidEmptyDecimals: isUseAvoidEmptyDecimals  === 'yes' ? configAvoidEmptyDecimals : undefined
          })
          }}
        </c-stat-number>
        <c-stat-helper-text>
          <c-stat-arrow type="increase" />
        </c-stat-helper-text>
      </c-stat>
    </c-stat-group>
  </c-stack>
</template>

<script>
import {
  CStack,
  CFormLabel,
  CFormControl,
  CFormHelperText,
  CInput,
  CRadio,
  CRadioGroup,
  CStat,
  CStatLabel,
  CStatNumber,
  CStatHelperText,
  CStatArrow,
  CStatGroup
} from '@chakra-ui/vue'

export default {
  name: 'Form',
  components: {
    CStack,
    CFormLabel,
    CFormControl,
    CFormHelperText,
    CInput,
    CRadio,
    CRadioGroup,
    CStat,
    CStatLabel,
    CStatNumber,
    CStatHelperText,
    CStatArrow,
    CStatGroup
  },
  data () {
    return {
      isUseAvoidEmptyDecimals: 'yes',
      textInput: 20000,
      configSymbol: '$',
      configSeparator: '.',
      configFractionCount: 0,
      configFractionSeparator: ',',
      configSymbolPosition: 'front',
      configSymbolSpacing: 'yes',
      configAvoidEmptyDecimals: ''
    }
  }
}
</script>
