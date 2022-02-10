<template>
  <div class="inner">
    <div class="c_custom_section" v-if="(shippingAddress && shippingAddress.address) || shippingMethod">
      <div class="inner" v-if="shippingAddress && shippingAddress.address">
        <div class="c_custom_address c_ship_to pb_0">
          <span>Ship to</span>
          <p>
            {{ shippingAddress.address }}, {{ shippingAddress.city }}, {{ shippingAddress.location }} - {{ shippingAddress.zip }}
          </p>
          <span @click="changeTab('information')">Change</span>
        </div>
      </div>
      <div class="inner" v-if="shippingMethod">
        <div class="c_custom_address c_ship_to pb_0">
          <span class="mr-5">Shipping Method </span>
          <p class="ml-5">
            <i class="ml_20 pl_20">{{ shippingMethod.courier ? shippingMethod.courier.name+' / ' : null  }} {{ shippingMethod.name }} {{shippingMethod.fee ? ' / USD$ '+shippingMethod.fee : '/ Actual Cost' }}</i>
          </p>
          <span  @click="changeTab('shipping')">Change</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  middleware: 'auth',
  name: "TabSummery",
  props:{
    tab:{},
    currentTab:null,
  },
  computed: {
    ...mapGetters({
      shippingAddress: 'checkoutModule/getShippingAddress',
      shippingMethod: 'checkoutModule/getShippingMethod',
      userInfo: 'authModule/getUser',
    }),
  },
  methods:{
    changeTab(tab){
      this.$emit('changeTab', tab)
    }
  },
}
</script>

<style scoped>

</style>
