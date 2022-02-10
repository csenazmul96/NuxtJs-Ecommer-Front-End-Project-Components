<template>
  <div class="my_account_dashboard">
    <Header></Header>
    <div class="m_a_dashboard_title my_acc_container">
      <h2>My Account Information</h2>
      <p>Please fill out the forms below and press save.</p>
    </div>
    <div class="my_acc_container">
      <div class="account_info">
        <div class="account_info_left" style="position:relative">
          <h2 class="my_acc_subtitle">ACCOUNT INFORMATION</h2>

          <template v-if="form">
            <div class="form_inline_border form_inline">
              <label class="required">First Name</label>
              <input type="text" class="form-control" placeholder="First Name" v-model="form.first_name">
              <v-errors :errors="errorFor('first_name')"></v-errors>
            </div>
            <div class="form_inline_border form_inline">
              <label class="required">Last Name</label>
              <input type="text" class="form-control" placeholder="Last Name" v-model="form.last_name">
              <v-errors :errors="errorFor('last_name')"></v-errors>
            </div>
            <div class="form_inline_border form_inline">
              <label class="required">Company Name</label>
              <input type="text" class="form-control" placeholder="Company Name" v-model="form.company_name">
              <v-errors :errors="errorFor('company_name')"></v-errors>
            </div>
            <div class="form_inline_border form_inline">
              <label class="required">Email</label>
              <input type="text" class="form-control" disabled="disabled" placeholder="Email Address" v-model="form.email">
            </div>
            <div class="custom_checkbox mb_15">
              <input type="checkbox" id="buyerNewsletter" v-model="form.receive_offers">
              <label for="buyerNewsletter">Receive special offers and information</label>
            </div>
          </template>
        </div>
        <div class="account_info_right">
        </div>
        <button class="btn_grey width_200p" @click.prevent="updateCustomer" ref="customerProfileButton">save</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import Header from "../../../components/shared/user/Header";
export default {
  middleware: 'auth',
  components:{
    Header
  },
  name: "index",
  data(){
    return {
      form:{
        first_name: '',
        last_name: '',
        company_name: '',
        receive_offers: false,
        birth_date: '',
      }
    }
  },
  computed: {
    ...mapGetters({
      customer: 'customerModule/getCustomerDetails',
    }),
  },
  watch:{
    customer: {
      deep: true,
        handler() {
          this.form = _.clone(this.customer)
      }
    },
  },
  created() {
    this.getUserData()
  },
  methods:{
    getUserData(){
      if(!this.customer)
        this.$store.dispatch('customerModule/dispatchCustomerDetails')
      this.form = _.clone(this.customer)
    },
    updateCustomer(){
      this.allErrors = null;
      this.$axios.post('customer/update', this.form)
        .then((response)=>{
          this.$store.commit('customerModule/setCustomerDetails', response.data.data)
          this.showSuccessMsg('Profile Update Success.')
        })
        .catch((err) => {
          this.showFailMsg('Profile Update Not Success.')
          this.allErrors = err.response.data.errors
        })
    },
  }
}
</script>

<style scoped>

</style>
