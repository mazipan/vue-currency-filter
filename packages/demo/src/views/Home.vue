<template>
  <div class="home VueCurrencyFilter">
    <section class="container hero">
      <HeaderComponent/>
    </section>

    <section class="container">
      <c-text fontSize="3xl" textAlign="center">⚙️ Demo for Custom Config</c-text>
      <FormComponent />
    </section>
    
    <section class="container ads">
      <c-flex align="center" justify="center" direction="column">
        <c-box w="100%" border-width="1px" rounded="lg" overflow="hidden">
          <InArticleAdsense
            style="width: 100%; min-width: 250px;"
            data-ad-client="ca-pub-5442972248172818"
            data-ad-slot="7974047383"
          />
        </c-box>
      </c-flex>
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
