<template>
  <div class="hero">
    <c-flex mb="2" align="center" justify="center">
      <img src="img/icons/VueJS-Currency-128px.png" />
    </c-flex>

    <c-flex mb="4" align="center" justify="center" direction="column">
      <c-text as="h1" fontSize="5xl">Vue Currency Filter</c-text>
      <c-text as="h3" fontSize="3xl">Lightweight vue currency filter based</c-text>
    </c-flex>

    <c-flex mb="2" align="center" justify="center" direction="column">
      <a href="https://github.com/mazipan/vue-currency-filter">
        <c-button variant-color="green">Github Repo</c-button>
      </a>
    </c-flex>

    <c-flex align="center" justify="center">
      <a
        href="https://www.npmjs.com/package/vue-currency-filter"
        target="_blank"
        rel="noopener noreferer"
      >
        <img alt="NPM Version" src="https://img.shields.io/npm/v/vue-currency-filter.svg" />
      </a>
      &nbsp;
      <a
        href="https://github.com/mazipan/vue-currency-filter"
        target="_blank"
        rel="noopener noreferer"
      >
        <img
          alt="GitHub Stars"
          src="https://img.shields.io/github/stars/mazipan/vue-currency-filter.svg?style=social"
        />
      </a>
    </c-flex>
  </div>
</template>

<script>
import { CFlex, CText, CButton } from '@chakra-ui/vue'

export default {
  name: 'Header',
  components: {
    CFlex,
    CText,
    CButton
  }
}
</script>
