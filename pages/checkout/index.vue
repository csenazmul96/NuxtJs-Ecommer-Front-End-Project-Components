<template>
  <section class="hl_checkout">
    <div class="hl_checkout_wrap">
      <div class="container" v-if="load && $auth.loggedIn && cartItems.length">
        <div class="row" v-if="cartItems.length">
          <div class="col-12">
            <div class="checkout_step_head_wrap">
              <div class="checkout_step_head">
                <ul>
<!--                  <li :class="{active: activeTab === 'information'}"><span>1</span> Information</li>-->
                  <li :class="{active: activeTab === 'information'}"><span>1</span> Shipping</li>
                  <li :class="{active: activeTab === 'payment'}"><span>2</span> Payment</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-md-7 col-lg-8">
            <div class="checkout_table_mobile below_mobile">
              <div class="hl_checkout_right pt_0">
                <button class="btn btn-link checkout_mobile_collapse_ic" type="button">
                  <span class="checkout_text_toggle"><i class="lni lni-cart"></i><b id="toggle_text"> order summary <i class="lni lni-chevron-down"></i></b> </span> <span>${{ total | round(2)}}</span>
                </button>
                <div class="checkout_mobile_collapse_content">
                  <div class="hl_order_show" :class="{scroll: cartItems.length > 3}">
                    <table>
                      <tbody>
                      <template v-if="cartItems && cartItems.length > 0">
                        <tr v-for="(cartItem, cartItemKey) in cartItems" :key="'cartItem_' + cartItemKey">
                          <td>
                            <div class="inner">
                              <img :src="getColorImage(cartItem.color.id, cartItem.item)" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
                              <div class="text">
                                <h2>{{cartItem.item && cartItem.item.name ? cartItem.item.name : 'No Specific Name'}}</h2>
                                <p>${{cartItem.item ? cartItem.item.price_formatted : '0'}}</p>
                                <p>Qty : {{cartItem.quantity}}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </template>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <keep-alive>
              <information v-if="activeTab === 'information'" @changeTab="changeTab" :shippingAddress="shippingAddress" ref="information"></information>
              <shipping v-if="activeTab === 'shipping'" @changeTab="changeTab" ref="shipping" :shippingMethods="shippingMethods"></shipping>
              <payment v-if="activeTab === 'payment'" @changeTab="changeTab" ref="payment"></payment>
            </keep-alive>
          </div>
          <div class="col-md-5 col-lg-4">
            <div class="hl_checkout_right above_mobile">
              <h2 class="hl_checkout_title">Order Summery</h2>
              <div class="hl_order_show pl_0 pr-0" :class="{scroll: cartItems.length > 3}">
                <table>
                  <tbody>
                  <template v-if="cartItems && cartItems.length > 0">
                    <tr v-for="(cartItem, cartItemKey) in cartItems" :key="'cartItem_' + cartItemKey">
                      <td>
                        <div class="inner">
                          <img :src="getColorImage(cartItem.color.id, cartItem.item)" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
                          <div class="text">
                            <h2>{{ cartItem.item.name ? cartItem.item.name : 'No Specific Name' }}</h2>
                            <p>${{ cartItem.item.price_formatted }}</p>
                            <p>Qty : {{ cartItem.quantity }}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </template>
                  </tbody>
                </table>
              </div>
              <div class="checkout_promo">
                <input type="text" placeholder="Enter Promo Code" class="form-control" v-model="form.coupon_code">
                <button class="btn_common" @click.prevent="applyCoupon"  ref="couponButton">apply now</button>
              </div>
              <v-errors class="text-danger" :errors="errorFor('coupon_code')"></v-errors>
              <span>You can use one coupon for one order</span>

              <div class="checkout_reword mt_15" v-if="(pointSystem && pointSystem.point_discount && pointSystem.point_use && customer && customer.points && (customer.points > 0))">
                <input type="number" placeholder="Reward" class="form-control" min="0" v-model="used_point" @input="applyPoint">
                <span>Remaining Reward ({{ customer.points }})</span>
              </div>
              <div class="hl_total_show pl_0 pr-0 mt_15" v-if="cartItems && cartItems.length > 0">
                <table>
                  <tbody>
                  <tr>
                    <td class="pl-0 pr-0">Items({{ cartItems.length }})</td>
                    <td class="pl-0 pr-0">${{ cartTotal | round(2) }}</td>
                  </tr>
                  <tr v-if="shippingMethod">
                    <td class="pl-0 pr-0">Shipping</td>
                    <td v-if="promotionInfo && promotionInfo.applied && promotionInfo.applied.free_shipping" class="pl-0 pr-0"><small><span class="text-danger">free by promotion</span></small> ${{ shippingMethod.fee | round(2) }} </td>
                    <td v-else class="pl-0 pr-0">${{ shippingMethod.fee | round(2) }}</td>
                  </tr>
                  <tr v-if="storeCredit && storeCredit > 0">
                    <td class="pl-0 pr-0">Store Credit</td>
                    <td class="pl-0 pr-0">-${{ storeCredit | round(2) }}</td>
                  </tr>
                  <tr v-if="computedUsedPoint && computedUsedPoint > 0">
                    <td class="pl-0 pr-0">Point Discount</td>
                    <td class="pl-0 pr-0">-${{ computedUsedPoint | round(2) }}</td>
                  </tr>
                  <tr v-if="discount && discount > 0">
                    <td class="pl-0 pr-0">Discount</td>
                    <td class="pl-0 pr-0">-${{ discount | round(2) }}</td>
                  </tr>
                  <tr>
                    <td class="pl-0 pr-0"><b>TOTAL</b></td>
                    <td class="pl-0 pr-0"><b>${{ total | round(2) }}</b></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
<!---->
            <div class="hl_checkout_right below_mobile">
              <div class="checkout_promo">
                <input type="text" placeholder="Enter Promo Code" class="form-control" v-model="form.coupon_code">
                <button class="btn_common" @click.prevent="applyCoupon" >apply now</button>
              </div>
              <v-errors class="text-danger" :errors="errorFor('coupon_code')"></v-errors>
              <span>You can use one coupon for one order</span>
              <div class="checkout_reword mt_15" v-if="(pointSystem && pointSystem.point_discount && pointSystem.point_use && customer && customer.points && (customer.points > 0))">
                <input type="number" placeholder="Reward" class="form-control" v-model="used_point" @input="applyPoint">
                <span>Remaining Reward ({{ customer.points }})</span>
              </div>

              <div class="hl_total_show" v-if="cartItems && cartItems.length > 0">
                <table>
                  <tbody>
                  <tr>
                    <td class="pl-0 pr-0">Items({{ cartItems.length }})</td>
                    <td class="pl-0 pr-0">${{ cartTotal | round(2) }}</td>
                  </tr>
                  <tr v-if="shippingMethod">
                    <td class="pl-0 pr-0">Shipping</td>
                    <td v-if="promotionInfo && promotionInfo.applied && promotionInfo.applied.free_shipping" class="pl-0 pr-0"><small><span class="text-danger">free by promotion</span></small> ${{ shippingMethod.fee | round(2) }} </td>
                    <td v-else class="pl-0 pr-0">${{ shippingMethod.fee | round(2) }}</td>
                  </tr>
                  <tr v-if="storeCredit && storeCredit > 0">
                    <td class="pl-0 pr-0">Store Credit</td>
                    <td class="pl-0 pr-0">-${{ storeCredit | round(2) }}</td>
                  </tr>
                  <tr v-if="computedUsedPoint && computedUsedPoint > 0">
                    <td class="pl-0 pr-0">Point Discount</td>
                    <td class="pl-0 pr-0">-${{ computedUsedPoint | round(2) }}</td>
                  </tr>
                  <tr v-if="discount && discount > 0">
                    <td class="pl-0 pr-0">discount</td>
                    <td class="pl-0 pr-0">-${{ discount | round(2) }}</td>
                  </tr>
                  <tr>
                    <td class="pl-0 pr-0"><b>TOTAL</b></td>
                    <td class="pl-0 pr-0"><b>${{ total | round(2) }}</b></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="d_flex_end cs_btn_mobile show_mobile bil pb_20">
              <div class="d_flex_end cs_btn_mobile ipad_none pb_20">
                <button v-if="activeTab === 'information'" @click.prevent="trigerMblTab('shipping')" class="btn_common"> Continue Shipping</button>
                <button v-if="activeTab === 'shipping'" @click.prevent="trigerMblTab('payment')" class="btn_common"> Continue to Payment</button>
                <button v-if="activeTab === 'payment'" @click.prevent="trigerMblTab('checkout')" class="btn_common mobileCheckoutBtn"> Continue to Checkout <span v-show="getLoad"> <i class="fas fa-circle-notch fa-spin"></i></span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
<!--      <div class="container" v-else>-->
<!--          <div class="row">-->
<!--            <div class="col-12">-->
<!--              <div class="empty_checkout">-->
<!--                <img src="https://img.icons8.com/ios/100/000000/empty-box.png"/>-->
<!--                <p>Your cart is empty!</p>-->
<!--                <nuxt-link :to="{name:'index'}" class="btn_common width_200p">Back to home</nuxt-link>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--      </div>-->
    </div>
    <div class="hl_checkout_footer" v-if="!contentLoad">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="hl_footer_inner">
              <img data-src="/images/hl-c-left.png" alt="Wholesale women's clothing Davi & Dani" class="img-fluid" v-lazy-load>
              <p>All major card accepted</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="hl_footer_inner right">
              <img data-src="/images/hl-c-right.png" alt="Wholesale women's clothing Davi & Dani" class="img-fluid" v-lazy-load>
              <p>100% Satisfied guarranted</p>
            </div>
          </div>
          <div class="col-12">
            <div class="hl_footer_copyright">
              <p>davidani.com © ALL RIGHTS RESERVED</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mapGetters} from "vuex";
import Information from './tabs/Information'
import Shipping from './tabs/Shipping'
import Payment from './tabs/Payment'

export default {
  middleware: 'auth',
  components: {Information, Shipping, Payment},
  data() {
    return {
      activeTab: 'information',
      customer: null,
      load: false,
      couponCode: '',
      pointSystem: null,
      shippingMethods: [],
      shippingAddress: [],
      used_point: null,
      form:{
        coupon_code: '',
      },
      shippingForm: {
        location: 'US',
        store_no: '',
        attention: '',
        address: '',
        city: '',
        state_text: '',
        state_id: '',
        unit: '',
        zip: '',
        country_id: '1',
        phone: '',
        fax: ''
      },
    }
  },
  watch: {
    shippingAddress: {
      deep: true,
      handler() {
        if(this.shippingAddress && this.shippingAddress.length)
          this.activeTab = 'payment'
      }
    },
    shippingMethods: {
      deep: true,
      handler() {
        if(this.shippingAddress.length && this.shippingMethods.length)
          this.activeTab = 'payment'

      }
    },

  },
  beforeCreate() {
    this.$store.commit('preLoaderModule/setPreloader', true);
    this.$store.commit('settingsModule/setContentLoad', false);
  },
  created() {
    this.$store.commit('checkoutModule/setShippingMethod', null);
    this.$store.commit('checkoutModule/setBillingAddress', _.cloneDeep(this.shippingForm));
    this.getShippingAddress();
    this.getShippingMethod();
    this.loadDefaultData()
  },
  computed: {
    ...mapGetters({
      cartItems: 'cartModule/getCartItems',
      cartTotal: 'cartModule/getCartTotal',
      shippingMethod: 'checkoutModule/getShippingMethod',
      promotionInfo: 'checkoutModule/getPromotionInfo',
      storeCredit: 'checkoutModule/getStoreCredit',
      usedPoint: 'checkoutModule/getUsedPoint',
      contentLoad: 'settingsModule/getContentLoad',
      defaultImage: 'settingsModule/getDefaultImage',
      getLoad: 'checkoutModule/getLoading',
      user: 'authModule/getUser'
    }),
    total() {
      let total = 0;
      let shippingCost = this.shippingMethod ? this.shippingMethod.fee : 0;
      if(this.promotionInfo && this.promotionInfo.applied && this.promotionInfo.applied.free_shipping)
        shippingCost = 0;

      total =  shippingCost + this.cartTotal - (this.discount) - (this.storeCredit) - (this.computedUsedPoint)

      return total;
    },
    discount(){
      let discount = 0;
      if(this.promotionInfo && this.promotionInfo.applied)
        discount =  this.promotionInfo.applied.coupon_amount

      return discount;
    },
    computedUsedPoint() {
      let used_point = 0;
      if(this.usedPoint && this.pointSystem && this.pointSystem.point_discount && this.pointSystem.point_use)
      {
        used_point = (Number(this.usedPoint) * Number(this.pointSystem.point_discount)) / Number(this.pointSystem.point_use);
      }
      return used_point.toFixed(2);
    },
  },

  filters: {
    round: function (value, decimals) {
      if(!value) {
        value = 0;
      }

      if(!decimals) {
        decimals = 0;
      }
      var value = Number(value);
      value = value.toFixed(decimals);

      return value;
    },
  },
  methods: {
    async getShippingAddress(){
      await this.$axios.get('/customer/shipping-address')
        .then((response) => {
          this.shippingAddress = response.data.data
          if(this.shippingAddress && this.shippingAddress.length){
            this.activeTab = 'payment'
            this.$store.commit('checkoutModule/setShippingAddress', _.cloneDeep(this.shippingAddress[0]));
          }else{
            this.$store.commit('checkoutModule/setShippingAddress', _.cloneDeep(this.shippingForm));
          }
        })
    },
    async getShippingMethod(){
      await this.$axios.get('/shipping-methods')
        .then((response) => {
          this.shippingMethods = response.data.data;
          if(this.shippingMethods && this.shippingMethods.length)
            this.$store.commit('checkoutModule/setShippingMethod', this.shippingMethods[0]);
        })
    },

    async loadDefaultData(){
      await this.$axios.get('/customer/details')
        .then((response)=>{
          this.customer = response.data.data
        })
      .finally(()=>this.load = true)
      if(this.$auth.loggedIn) {
        this.$axios.get('/point-systems').then((response) => this.pointSystem = response.data.data)
        this.$axios.get('/default/coupon').then((response) => {
          this.$store.commit('checkoutModule/setPromotionInfo', _.cloneDeep(response.data.data));
        })
        .finally(()=>{
          this.$store.commit('settingsModule/setContentLoad', true);
          this.$store.commit('preLoaderModule/setPreloader', false);
        })
      }
    },
    changeTab(tab) {
      this.activeTab = tab;
    },
    applyCoupon() {
      this.allErrors = null;
      this.$axios.post('/apply/coupon', this.form)
        .then((response)=>{
          this.$store.commit('checkoutModule/setPromotionInfo', _.cloneDeep(response.data.data));
        })
        .catch((err) => {
          this.allErrors = err.response.data.errors
        })
    },
    applyPoint() {
      if(this.used_point <= 0){
        this.used_point = null
      }else if(this.used_point > this.customer.points){
        this.showFailMsg("Used points can not be greater than remain points!!");
        this.used_point = null
      }
      this.$store.commit('checkoutModule/setUsedPoint', _.cloneDeep(Number(this.used_point)));
    },
    trigerMblTab(tab){
      this.$store.commit('checkoutModule/setLoading', false)
      if(tab === 'shipping')
        this.$refs.information.changeTab(tab)

      if(tab === 'payment')
        this.$refs.shipping.changeTab(tab)

      if(tab === 'checkout')
        this.$refs.payment.submitCheckout()

      if(!tab === 'checkout')
        this.activeTab = tab
    },
  }
}
</script>
