<template>
  <div class="account_info_left" v-if="customer">
    <h2 class="my_acc_subtitle">ACCOUNT INFORMATION</h2>
    <ul>
      <li><span>First Name</span> <span>{{ customer.first_name }}</span></li>
      <li><span>Last Name</span> <span>{{ customer.last_name }}</span></li>
      <li><span>Email</span> <span>{{ customer.email }}</span></li>
      <li>
        <span>Password</span>
        <span> <nuxt-link :to="{name: 'user-change-password'}" class="td_underline"> Change Password </nuxt-link> </span>
      </li>
    </ul>
    <nuxt-link :to="{name: 'user-update' }" class="btn btn_grey"> Update Account Details </nuxt-link>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  middleware: 'auth',
  name: "AccountDetails",
  data(){
    return {
      userDetails: [],
      form:[],
    }
  },
  computed: {
    ...mapGetters({
      customer: 'customerModule/getCustomerDetails',
    }),
  },


}
</script>

<style scoped>

</style>
