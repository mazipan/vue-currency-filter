<template>
  <div class="home VueCurrencyFilter">
    <section class="container hero">
      <HeaderComponent/>
    </section>

    <section class="container">
      <c-text fontSize="3xl" textAlign="center">⚙️ Demo for Custom Config</c-text>
      <FormComponent />
    </section>

    <footer class="footer">
      <c-flex m="2" align="center" justify="center">
        <c-text textAlign="center">Built with ❤️ by <a href="https://mazipan.space">Irfan Maulana</a></c-text>
      </c-flex>
    </footer>
  </div>
</template>

<script lang="js">
import { CFlex, CText } from '@chakra-ui/vue'
import HeaderComponent from '../components/Header'
import FormComponent from '../components/Form'

export default {
  name: 'Home',
  components: {
    HeaderComponent,
    FormComponent,
    CFlex,
    CText
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
pre:not(:last-of-type) {
  margin-bottom: 2rem;
}

.container{
  margin-top: 2em;

  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 760px) {
    padding-left: 14rem;
    padding-right: 14rem;
  }
}
</style>
