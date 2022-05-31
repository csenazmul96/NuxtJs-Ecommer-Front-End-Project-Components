<template>
  <div>
    <section class="cart_area text-center mt_20 pt_20">
      <div class="cart_title">
        <h2>Order complete</h2>
      </div>
      <div class="full_width">
        <div class="s_r_inner">
          <p v-if="orderNumber">Your order {{ orderNumber }} is complete and getting ready to be shipped.

          </p>
          <p v-else>Your order is is complete and getting ready to be shipped.</p>
          <p>If you need help, please contact us info@davidani.com Monday-Friday 9AM-6PM PST</p>
        </div>
      </div>
    </section>
    <instagram-section></instagram-section>
  </div>
</template>

<script>
import InstagramSection from "../../../components/shared/InstagramSection";
export default {
  middleware: 'auth',
  name: "index",
  components: {InstagramSection},
  data(){
    return {
      orderNumber: null,
      prevRoute: null
    }
  },
  beforeRouteEnter(to, from, next) {
      next(vm => {
          vm.prevRoute = from.name;
      });
  },
  mounted() {
    if (this.prevRoute != 'checkout') {
      this.$router.push({path:'/'})
    }

    if (process.browser) {
      if(process.env.NUXT_ENV_STATUS == 'production'){
        this.$gtag('event', 'conversion', {
          send_to: 'AW-597806317/eEojCO3y2rcDEO2Zh50C',
          transaction_id: '',
        })
      }
    }
  },
  beforeCreate() {
    this.$store.commit('settingsModule/setContentLoad', false);
  },
  created() {
    this.getOrder();
  },
  methods:{
    getOrder(){
      if(process.browser)
        this.orderNumber = localStorage.getItem("orderNumber")

      this.$store.commit('settingsModule/setContentLoad', true);
    },
  }
}
</script>
