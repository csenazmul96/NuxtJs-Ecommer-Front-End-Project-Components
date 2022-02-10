<template>
  <div class="my_account_dashboard">
    <Header></Header>
    <div class="m_a_dashboard_title my_acc_container">
      <h2>Customer Address</h2>
      <p>Please fill the form below and press Save.</p>
    </div>
    <div class="my_acc_container" id="my_acc_container">
      <div class="account_info account_info_vertical">
        <h2 class="my_acc_subtitle">
          <span class=" mr_15">SHIPPING ADDRESSES </span>
          <button class="btn_grey add_new_address width_full float-right" @click.prevent="addNewAddress('shipping')"><span> Add New Address </span></button>
        </h2>
        <ul class="acc_address">
          <li v-for="(address, addressKey) in shippingAddress" :key="'address_' + addressKey">
              <span>ADDRESS #{{ addressKey + 1}}
                  <div class="text-danger">
                    <a href="javascript:void(0)" @click.prevent="updateAddress(address, 'shipping')">Edit</a> |
                    <a href="javascript:void(0)" @click.prevent="deleteAddresses(address.id, 'shipping')">Delete</a>
                  </div>
              </span>
            <address>
              <template v-if="address.first_name || address.last_name">{{address.first_name }} {{address.last_name }}<br></template>
              <template v-if="address.city">{{address.city}} <br></template>
              <template v-if="address.address">{{address.address }} <br></template>
              <template v-if="address.address2">{{address.address2}} <br></template>
              <template v-if="address.state || address.zip">{{address.state ? address.state.name : ''}} - {{address.zip}} <br></template>
              <template v-if="address.country">{{address.country ? address.country.name : ''}} <br></template>
              <template v-if="address.phone">Phone: {{address.phone}}  </template>
              <template v-if="address.fax">FAX: {{address.fax}}</template>
            </address>
          </li>
        </ul>
      </div>
    </div>
    <div class="my_acc_container"  >
      <div class="account_info account_info_vertical">
        <h2 class="my_acc_subtitle">
          <span class=" mr_15">Billing ADDRESSES </span>
          <button class="btn_grey add_new_address width_full float-right" @click.prevent="addNewAddress('billing')"><span> Add New Address </span></button>
        </h2>
        <ul class="acc_address">
          <li v-for="(address, addressKey) in billingAddress" :key="'address_' + addressKey">
              <span>ADDRESS #{{ addressKey + 1}}
                  <div class="text-danger">
                    <a href="javascript:void(0)" @click.prevent="updateAddress(address, 'billing')">Edit</a> |
                    <a href="javascript:void(0)" @click.prevent="deleteAddresses(address.id, 'billing')">Delete</a>
                  </div>
              </span>
            <address>
              <template v-if="address.first_name || address.last_name">{{address.first_name }} {{address.last_name }}<br></template>
              <template v-if="address.city">{{address.city}} <br></template>
              <template v-if="address.address">{{address.address }} <br></template>
              <template v-if="address.address2">{{address.address2}} <br></template>
              <template v-if="address.state || address.zip">{{address.state ? address.state.name : ''}} - {{address.zip}} <br></template>
              <template v-if="address.country">{{address.country ? address.country.name : ''}} <br></template>
              <template v-if="address.phone">Phone: {{address.phone}}  </template>
              <template v-if="address.fax">FAX: {{address.fax}}</template>
            </address>
          </li>
        </ul>
      </div>
    </div>
    <address-modal :active="activeForm" :PropsForm="address" @closeModal="closeModal" :type="editAddressType" :newAddress="newAddress"></address-modal>
  </div>

</template>

<script>
import {mapGetters} from "vuex";
import Header from "../../../components/shared/user/Header";
import AddressModal from "../../../components/shared/user/AddressModal";
export default {
  components:{AddressModal, Header},
  middleware: 'auth',
  name: "index",
  data(){
    return {
      activeForm:false,
      address:[],
      editAddressType: '',
      newAddress: false,
      deleteform:{
        id: '',
        type: ''
      }
    }
  },
  created() {
    this.$store.dispatch('customerModule/dispatchShippingAddress')
    this.$store.dispatch('customerModule/dispatchBillingAddress')
  },
  computed: {
    ...mapGetters({
      shippingAddress: 'customerModule/getShippingAddress',
      billingAddress: 'customerModule/getBillingAddress',
    }),
  },

  methods:{
    updateAddress(address, type){
      this.address = []
      this.editAddressType = type;
      this.newAddress = false;
      this.address = _.clone(address)
      this.activeForm = true;
    },
    closeModal(){
      this.activeForm = false;
    },
    addNewAddress(address){
      this.address = []
      this.newAddress = true;
      this.editAddressType = address;
      this.activeForm = true;
    },
    deleteAddresses(id, type){
      this.deleteform.id = id
      this.deleteform.type = type
      this.$axios.post('/customer/address/delete', this.deleteform)
      .then((response)=>{
        if(this.deleteform.type === 'billing')
          this.$store.dispatch('customerModule/dispatchBillingAddress')
        if(this.deleteform.type === 'shipping')
          this.$store.dispatch('customerModule/dispatchShippingAddress')

        this.showSuccessMsg('Address delete successfully.')
        this.$emit('closeModal')
      })
    }
  }
}
</script>
