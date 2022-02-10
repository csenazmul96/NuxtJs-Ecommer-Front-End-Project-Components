<template>
  <div>
    <tab-summery @changeTab="changeTab" :currentTab="'information'"></tab-summery>
    <h3 class="hl_checkout_subtitle pt_20">Shipping Address</h3>
    <div class="form-group" v-if="shippingAddress.length">
      <select class="form-control active" v-model="newShippingAddress" @change="selectShipping">
        <option value="">Select Shipping Address</option>
        <option :value="billing.id" v-for="(billing, i) in shippingAddress" :key="'address_'+i"> {{billing.address}} </option>
        <option value="0">New Address</option>
      </select>
      <div v-if="errorsCheck"><small><span class="text-danger">Please Select Shipping Address.</span></small></div>
    </div>

    <keep-alive>
      <new-shipping-address v-if="newShippingAddress === '0'" @getNewAddress="setNewAddress" :errors="errors"></new-shipping-address>
    </keep-alive>

    <div class="d_flex_end c_shipping above_mobile">
      <nuxt-link :to="{ name: 'cart'}">Return to cart</nuxt-link>
      <button @click="changeTab('shipping')" class="btn_common width_200p step_1_btn"> Continue Shipping</button>
    </div>

  </div>
</template>

<script>
import NewShippingAddress from './NewShippingAddress';
import TabSummery from "./TabSummery";
import {mapGetters} from "vuex";

export default {
  middleware: 'auth',
  components: {TabSummery, NewShippingAddress},
  data() {
    return {
      newShippingAddress: '',
      errorsCheck: false,
      errors: null,
      currentAddress: null,
    }
  },
  props:{
    shippingAddress:{}
  },
  created() {
    if(!this.shippingAddress.length){
      this.newShippingAddress = '0';
    }else{
      this.newShippingAddress = this.storeShippingAddress ? this.storeShippingAddress.id : '';
      this.currentAddress = this.storeShippingAddress;
    }
  },
  computed: {
    ...mapGetters({
      storeShippingAddress: 'checkoutModule/getShippingAddress',
      storeShippingMethod: 'checkoutModule/getShippingMethod',
    }),
  },

  methods:{
    changeTab(tab){
      this.$store.commit('checkoutModule/setShippingAddress', _.cloneDeep(this.currentAddress));
      if(this.newShippingAddress === '') {
        this.errorsCheck = true;
        return false;
      }
      if(this.newShippingAddress === '0'){
        this.allErrors = null;
        this.load = false;
        this.$axios.post('/customer/shipping-address/validation', this.currentAddress)
          .then(()=>{
            // if(this.storeShippingMethod) {
            //   this.$emit('changeTab', 'payment')
            // }else {
              this.$emit('changeTab', tab)
            // }
          })
          .catch((err) => {
              this.errors = err.response.data.errors
          })
      }

      if(this.newShippingAddress != '0' || this.newShippingAddress === ''){
        // if(this.storeShippingMethod)
        //   this.$emit('changeTab', 'payment')
        // else
          this.$emit('changeTab', tab)
      }
    },
    selectShipping(){
      let address =  this.shippingAddress.filter((address)=>{ return address.id === this.newShippingAddress})
      if(address)
        this.currentAddress = address[0]
    },
    setNewAddress(address){
      this.currentAddress = address
    },
  },
}
</script>

