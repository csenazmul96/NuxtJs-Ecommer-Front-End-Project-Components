<template>
  <main-header v-if="$route.name !== 'checkout'"></main-header>
  <checkout-header v-else></checkout-header>
</template>

<script>
import MainHeader from './MainHeader';
import CheckoutHeader from './CheckoutHeader';
import {mapGetters} from "vuex";

export default {
  components: {MainHeader, CheckoutHeader},
  computed: {
    ...mapGetters({
      user: 'authModule/getUser',
    }),
  },
  mounted() {
      this.$store.dispatch('cartModule/loadCart');
  }
}
</script>
