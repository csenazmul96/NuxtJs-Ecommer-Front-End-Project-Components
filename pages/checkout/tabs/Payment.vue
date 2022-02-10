<template>
  <div>
    <tab-summery @changeTab="changeTab"></tab-summery>
    <h3 class="hl_checkout_subtitle mt_10">Billing Address</h3>
    <div class="form-row mb_10">
      <div class="col-md-12">
        <div class="custom_checkbox">
          <input type="checkbox" id="sameToShipping" name="sameToShipping" value="false" v-model="sameToShipping">
          <label for="sameToShipping">Billing same to shipping address</label>
        </div>
      </div>
    </div>
    <template v-if="!sameToShipping">
      <div class="form-group" v-if="billingAddress.length">
        <select class="form-control active" v-model="newBillingAddress" @change="selectBilling">
          <option value="">Select Billing Address</option>
          <option :value="billing.id" v-for="(billing, i) in billingAddress" :key="'address_'+i"> {{ billing.address }}, {{ billing.city }}, {{ billing.location }} - {{ billing.zip }} </option>
          <option value="0">New Address</option>
        </select>
        <div v-if="billingError"><small><span class="text-danger">Please Select Billing Address.</span></small></div>
      </div>
      <keep-alive>
        <new-billing-address v-if="newBillingAddress === '0'" :errors="errors"></new-billing-address>
      </keep-alive>
    </template>


    <h3 class="hl_checkout_subtitle mt_10">Pay By</h3>
    <keep-alive>
      <card-info :errors="errors"></card-info>
    </keep-alive>
    <h3 class="hl_checkout_subtitle mt_10">Note</h3>
    <div class="form-row">
      <div class="form-group col-12">
        <textarea class="form-control h-100" name="note" v-model="form.note" placeholder="Buyer note"></textarea>
        <v-errors :errors="errorFor('note')"></v-errors>
      </div>
    </div>

    <div class="d_flex_end c_shipping above_mobile">
      <nuxt-link :to="{ name: 'cart'}">Return to cart</nuxt-link>
      <button class="btn_common width_200p step_1_btn" @click="submitCheckout" :disabled="isButtonDisabled">Continue to Payment  <span v-show="getLoad"> <i class="fas fa-circle-notch fa-spin"></i></span></button>
    </div>

  </div>
</template>

<script>
import NewBillingAddress from './NewBillingAddress';
import CardInfo from './CardInfo';
import {mapGetters} from "vuex";
import TabSummery from "./TabSummery";

export default {
  middleware: 'auth',
  components:{TabSummery, NewBillingAddress, CardInfo},
  data(){
    return {
      newBillingAddress: '',
      billingAddress: [],
      errors: [],
      form:{
        note: '',
      },
      billingError: false,
      sameToShipping: true,
      isButtonDisabled: false,
    }
  },
  created() {
    this.getBillingAddress();
  },
  computed: {
    ...mapGetters({
      user: 'authModule/getUser',
      shippingAddress: 'checkoutModule/getShippingAddress',
      shippingMethod: 'checkoutModule/getShippingMethod',
      storageBillingAddress: 'checkoutModule/getBillingAddress',
      cardInfo: 'checkoutModule/getCardInfo',
      promotionInfo: 'checkoutModule/getPromotionInfo',
      storeCredit: 'checkoutModule/getStoreCredit',
      used_point: 'checkoutModule/getUsedPoint',
      getLoad: 'checkoutModule/getLoading',
    }),
  },
  methods:{
    changeTab(tab){
      this.$emit('changeTab', tab)
    },
    getBillingAddress(){
      this.$axios.get('/customer/billing-address')
        .then((response) => {
          this.billingAddress = response.data.data
          if(!this.billingAddress.length){
            this.newBillingAddress = '0';
          }else{
            this.$store.commit('checkoutModule/setBillingAddress', _.cloneDeep(this.billingAddress[0]));
            this.newBillingAddress = this.billingAddress[0].id;
          }
        })
    },
    selectBilling(){
      let billing =  this.billingAddress.filter((address)=>{ return address.id === this.newBillingAddress})
      if(billing)
        billing = billing[0]
      this.$store.commit('checkoutModule/setBillingAddress', _.cloneDeep(billing));
      if(this.newBillingAddress != '' || this.newBillingAddress != 0)
        this.billingError = false
    },
    submitCheckout(){
      this.isButtonDisabled = true;
      $(".mobileCheckoutBtn").prop("disabled",true)
      this.loading = true;
      this.$store.commit('checkoutModule/setLoading', true)
      if(this.newBillingAddress === '') {
        this.billingError = true;
        return false;
      }
      this.allErrors = null;
      this.load = false;
      let formData = new FormData();
      formData.append('billing', JSON.stringify(this.storageBillingAddress));
      formData.append('shipping', JSON.stringify(this.shippingAddress));
      formData.append('shipping_method', JSON.stringify(this.shippingMethod));
      formData.append('card_info', JSON.stringify(this.cardInfo))
      formData.append('promotion', JSON.stringify(this.promotionInfo))
      formData.append('store_credit', JSON.stringify(this.storeCredit))
      formData.append('used_point', JSON.stringify(this.used_point))
      formData.append('note', JSON.stringify(this.form.note))

      this.$axios.post('/checkout/submit', formData)
        .then((response)=>{
          if(response.data.status === 'success' && response.data.order){
            this.isButtonDisabled = true;
            $(".mobileCheckoutBtn").prop("disabled",true)
            if(process.browser)
              localStorage.setItem("orderNumber", response.data.order.order_number)

            this.$store.commit('checkoutModule/setStoreCredit', 0);
            this.$store.commit('checkoutModule/setCardInfo', []);
            this.$store.commit('checkoutModule/setPromotionInfo', []);
            this.$store.commit('checkoutModule/setUsedPoint', 0);
            this.$store.dispatch('cartModule/loadCart')
            this.$router.push({name:'checkout-complete'})
          }
        })
        .catch((err) => {
          this.errors = err.response.data.errors
          this.isButtonDisabled = false
          $(".mobileCheckoutBtn").prop("disabled",false)
        })
        .finally(() => {
          this.$store.commit('checkoutModule/setLoading', false)
          this.loading = false
          $(".mobileCheckoutBtn").prop("disabled",false)
        });

    },
  }
}
</script>
