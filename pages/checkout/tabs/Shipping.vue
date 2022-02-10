<template>
  <div>
    <tab-summery @changeTab="changeTab" :currentTab="'shipping'"></tab-summery>
    <h3 class="hl_checkout_subtitle mt_20">Shipping Method</h3>
    <div class="c_custom_section">
      <div class="inner" v-for="(shipMethod, shipMethodIndex) in shippingMethods" :key="'shipMethod_' + shipMethodIndex">
        <div class="custom_radio">
          <input type="radio" :id="'shipMethod_' + shipMethodIndex" name="shipMethod" :value="shipMethod" v-model="shippingMethod">
          <label :for="'shipMethod_' + shipMethodIndex">{{shipMethod.courier ? (shipMethod.courier.name + ' | ') : '' }} {{shipMethod.name }}</label>
        </div>
        <span>{{ shipMethod.fee ? ('USD $' + Number(shipMethod.fee).toFixed(2)) : 'Actual Cost' }}</span>
      </div>
    </div>
    <div v-if="errorsCheck"><small><span class="text-danger">Please Select Shipping Method.</span></small></div>
    <div class="d_flex_end c_shipping above_mobile">
      <nuxt-link :to="{ name: 'cart'}">Return to cart</nuxt-link>
      <button @click="changeTab('payment')" class="btn_common width_200p step_1_btn"> Continue Payment</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import TabSummery from './TabSummery';
export default {
  middleware: 'auth',
  components:{TabSummery},
  data() {
    return {
      shippingMethod: '',
      errorsCheck: false,
    }
  },
  props:{
    shippingMethods:{},
  },
  computed: {
    ...mapGetters({
      shippingAddress: 'checkoutModule/getShippingAddress',
      shippingMethodStore: 'checkoutModule/getShippingMethod',
    }),
  },
  watch: {
    shippingMethod: {
      deep: true,
      handler(val) {
        this.$store.commit('checkoutModule/setShippingMethod', _.cloneDeep(val));
      }
    },
  },
  created() {
    this.shippingMethod = this.shippingMethodStore
  },
  methods:{
    changeTab(tab){
      if(this.shippingMethod === '' && tab === 'payment') {
        this.errorsCheck = true;
        return false;
      }else{
        this.$store.commit('checkoutModule/setBillingAddress', _.cloneDeep(this.shippingAddress));//billing address same to billing address
        this.errorsCheck = false;
        this.$emit('changeTab', tab)
      }
    }
  }
}
</script>
