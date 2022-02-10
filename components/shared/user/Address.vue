<template>
  <div class="account_info_right">
    <h2 class="my_acc_subtitle">MY ADDRESSES</h2>
    <ul class="acc_address">
      <li>
        <span>DEFAULT BILLING ADDRESS</span>
        <address v-if="billingAddress && billingAddress.length">
          {{ billingAddress[0].first_name }} {{ billingAddress[0].last_name }} <br/>
          {{ billingAddress[0].address }} <br/>
          {{ billingAddress[0].city }} - {{ billingAddress[0].zip }} <br/>
          {{ billingAddress[0].country ?  billingAddress[0].country.name : null}} <br/>
          PHONE: {{ billingAddress[0].phone}}
        </address>
      </li>
      <li>

        <span>DEFAULT SHIPPING ADDRESS</span>
        <address v-if="shippingAddress && shippingAddress.length">
          {{ shippingAddress[0].first_name }} {{ shippingAddress[0].last_name }} <br/>
          {{ shippingAddress[0].address }} <br/>
          {{ shippingAddress[0].city }} - {{ shippingAddress[0].zip }} <br/>
          {{ shippingAddress[0].country ?  shippingAddress[0].country.name : null}} <br/>
          PHONE: {{ shippingAddress[0].phone}}
        </address>
      </li>
    </ul>
    <nuxt-link :to="{name:'user-address'}" class="btn btn_grey">
      Manage Addresses
    </nuxt-link>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  middleware: 'auth',
  name: "Address",
  computed: {
    ...mapGetters({
      billingAddress: 'customerModule/getBillingAddress',
      shippingAddress: 'customerModule/getShippingAddress',
    }),
  },
}
</script>

<style scoped>

</style>
