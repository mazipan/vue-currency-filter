<template>
  <c-stack spacing="4">
    <c-form-control mb="4">
      <c-input-group>
        <c-input-left-addon>Symbol</c-input-left-addon>
        <c-input type="text" placeholder="Type a symbol, e.g. $" v-model="configSymbol" />
      </c-input-group>
      <c-form-helper-text>
        Symbol for currency, e.g: $
      </c-form-helper-text>
    </c-form-control>

    <c-form-control mb="4">
      <c-input-group>
        <c-input-left-addon>Symbol Position</c-input-left-addon>
        <c-radio-group v-model="configSymbolPosition" is-inline>
          <c-radio value="front">Front</c-radio>
          <c-radio variant-color="red" value="back">Back</c-radio>
        </c-radio-group>
      </c-input-group>
      <c-form-helper-text>
        A symbol positions
      </c-form-helper-text>
    </c-form-control>

    <c-form-control mb="4">
      <c-input-group>
        <c-input-left-addon>Symbol Spacing</c-input-left-addon>
        <c-radio-group v-model="configSymbolSpacing" is-inline>
          <c-radio :value="true">Use spacing</c-radio>
          <c-radio variant-color="red" :value="false">NOT use spacing</c-radio>
        </c-radio-group>
      </c-input-group>
      <c-form-helper-text>
        Applied a spacing between numbers and the symbol
      </c-form-helper-text>
    </c-form-control>

    <c-form-control mb="4">
      <c-input-group>
        <c-input-left-addon>Separator</c-input-left-addon>
        <c-input type="text" placeholder="Type a separator, e.g. ," v-model="configSeparator" />
      </c-input-group>
      <c-form-helper-text>
        A thousand separator
      </c-form-helper-text>
    </c-form-control>

    <c-form-control mb="4">
      <c-input-group>
        <c-input-left-addon>Fraction Count</c-input-left-addon>
        <c-input
          type="tel"
          pattern="[0-9]*"
          placeholder="Type a fraction count, e.g. 2"
          v-model="configFractionCount"
        />
      </c-input-group>
      <c-form-helper-text>
        A fraction count after comma
      </c-form-helper-text>
    </c-form-control>

    <c-form-control mb="4">
      <c-input-group>
        <c-input-left-addon>Fraction Separator</c-input-left-addon>
        <c-input
          type="text"
          placeholder="Type a fraction separator, e.g. ."
          v-model="configFractionSeparator"
        />
      </c-input-group>
      <c-form-helper-text>
        A seperator used for a fraction
      </c-form-helper-text>
    </c-form-control>

    <c-form-control mb="4">
      <c-input-group>
        <c-input-left-addon>Avoid empty decimals</c-input-left-addon>
        <c-radio-group v-model="isUseAvoidEmptyDecimals">
          <c-radio :value="true">Custom string instead of decimal zeros</c-radio>
          <c-radio variant-color="red" :value="false">Display decimal zeros</c-radio>
        </c-radio-group>
      </c-input-group>
      <c-form-helper-text>
        If you prefer to not showing teh trailing zero decimal
      </c-form-helper-text>
    </c-form-control>

    <c-form-control mb="4" v-if="isUseAvoidEmptyDecimals">
      <c-input-group >
        <c-input-left-addon>Empty decimals string</c-input-left-addon>
        <c-input
          type="text"
          placeholder="Type an empty decimals, e.g. ##"
          v-model="configAvoidEmptyDecimals"
        />
      </c-input-group>
      <c-form-helper-text>
        Custom trailing decimal symbol
      </c-form-helper-text>
    </c-form-control>

    <c-form-control mb="4">
      <c-input-group>
        <c-input-left-addon>Currency</c-input-left-addon>
        <c-input
          type="tel"
          pattern="[0-9]*"
          placeholder="Type a number to be converted, e.g. 123000"
          v-model="textInput"
        />
      </c-input-group>
      <c-form-helper-text>
        Number to be converted
      </c-form-helper-text>
    </c-form-control>

    <c-stat-group mb="4">
      <!-- <c-stat>
          <c-stat-label>Result - Default Setup</c-stat-label>
          <c-stat-number>{{ textInput | currency }}</c-stat-number>
          <c-stat-helper-text>
            <c-stat-arrow type="increase" />
          </c-stat-helper-text>
      </c-stat>-->
      <c-stat>
        <c-stat-label>Result - Custom Setup</c-stat-label>
        <c-stat-number>{{ textInput | currency(configSymbol, configSeparator, configFractionCount, configFractionSeparator, configSymbolPosition, configSymbolSpacing, configUseAvoidEmptyDecimals ? configAvoidEmptyDecimals : undefined) }}</c-stat-number>
        <c-stat-helper-text>
          <c-stat-arrow type="increase" />
        </c-stat-helper-text>
      </c-stat>
      <!-- <c-stat>
          <c-stat-label>Result - Static Setup</c-stat-label>
          <c-stat-number>{{ textInput | currency({ fractionCount: 2, symbol: '¥' }) }}</c-stat-number>
          <c-stat-helper-text>
            <c-stat-arrow type="increase" />
          </c-stat-helper-text>
      </c-stat>-->
    </c-stat-group>
  </c-stack>
</template>

<script>
import {
  CFormControl,
  CFormHelperText,
  CInput,
  CRadio,
  CRadioGroup,
  CStat,
  CStatLabel,
  CStatNumber,
  CStatArrow,
  CStatGroup
} from '@chakra-ui/vue'

function __isNull (obj) {
  return typeof obj === 'undefined' || obj === null
}

export default {
  name: 'Form',
  components: {
    CFormControl,
    CFormHelperText,
    CInput,
    CRadio,
    CRadioGroup,
    CStat,
    CStatLabel,
    CStatNumber,
    CStatArrow,
    CStatGroup
  },
  data () {
    return {
      isUseAvoidEmptyDecimals: false,
      textInput: 20000,
      configSymbol: '$',
      configSeparator: '.',
      configFractionCount: 0,
      configFractionSeparator: ',',
      configSymbolPosition: 'front',
      configSymbolSpacing: true,
      configAvoidEmptyDecimals: ''
    }
  },
  methods: {
    updateData (options) {
      if (!__isNull(options.symbol)) {
        this.configSymbol = options.symbol
      }
      if (!__isNull(options.thousandsSeparator)) {
        this.configSeparator = options.thousandsSeparator
      }
      if (!__isNull(options.fractionCount)) {
        this.configFractionCount = options.fractionCount
      }
      if (!__isNull(options.fractionSeparator)) {
        this.configFractionSeparator = options.fractionSeparator
      }
      if (!__isNull(options.symbolPosition)) {
        this.configSymbolPosition = options.symbolPosition
      }
      if (!__isNull(options.symbolSpacing)) {
        this.configSymbolSpacing = options.symbolSpacing
      }
    }
  }
}
</script>
