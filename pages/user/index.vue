<template>
    <div class="div">
      <Header></Header>
      <dashboard></dashboard>
<!--      <wishlist></wishlist>-->
      <div class="my_acc_container">
          <div class="account_info">
              <account-details></account-details>
              <Address></Address>
          </div>
      </div>
      <facebook></facebook>
      <subscription></subscription>
      <order-list></order-list>
      <store-credit></store-credit>
      <point-history></point-history>
      <message></message>
      <logout></logout>
    </div>
</template>

<script>

import Header from "../../components/shared/user/Header";
import Wishlist from "../../components/shared/user/Wishlist";
import Dashboard from "../../components/shared/user/Dashboard";
import AccountDetails from "../../components/shared/user/AccountDetails";
import Address from "../../components/shared/user/Address";
import OrderList from "../../components/shared/user/OrderList";
import Message from "../../components/shared/user/Message";
import Logout from "../../components/shared/user/Logout";
import Facebook from "../../components/shared/user/FacebookLogin";
import Subscription from "../../components/shared/user/Subscription";
import StoreCredit from "../../components/shared/user/StoreCredit";
import PointHistory from "../../components/shared/user/PointHistory";

export default {
  middleware: 'auth',
  name: "index",
  components: {
    StoreCredit,
    PointHistory,
    Header, Facebook, Subscription, Logout, Message, OrderList, AccountDetails, Dashboard, Wishlist, Address},
  created() {
    this.$store.dispatch('customerModule/dispatchCustomerDetails')
    this.$store.dispatch('customerModule/dispatchShippingAddress')
    this.$store.dispatch('customerModule/dispatchBillingAddress')
  },
  watch: {
    $route() {
      if (process.client) {
        this.headerCommonMargin();
      }
    }
  },
  mounted() {
    if (process.client) {
      this.headerCommonMargin();
      window.addEventListener('resize', this.headerCommonMargin);
    }
  },
  methods:{
    headerCommonMargin() {
      let common_margin = $('.cm_header').outerHeight();
      if(common_margin === 0)
        common_margin = $('.header_area').outerHeight();

      if(this.$route.name !== 'index')
        $('.ct_margin').css({'height' : `${common_margin}px`});
      else
        $('.ct_margin').css({'height' : `0px`});

    },
  }
}
</script>

<style scoped>

</style>
