<template>
  <div class="wcmodel modal" :class="{open_modal: active}"  data-modal="wcm">
    <div class="modal_overlay" data-modal-close="wcm"></div>
    <div class="welcome_modal_wrapper">
      <div class="modal_inner modal_600p mt-3">
        <span class="close_modal" data-modal-close="wcm" @click="closeModal"></span>
        <div class="col-md-12">
          <div class="attatch_file">
            <div class="form-row mb_10">
              <div class="col-md-4">
                <div class="custom_radio">
                  <input type="radio" id="locationUS" name="location" @change="changeLocation('US')" value="US" v-model="form.location">
                  <label for="locationUS">United States</label>
                </div>
              </div>
              <div class="col-md-4">
                <div class="custom_radio">
                  <input type="radio" id="locationCA" name="location" @change="changeLocation('CA')" value="CA" v-model="form.location">
                  <label for="locationCA">Canada</label>
                </div>
              </div>
              <div class="col-md-4">
                <div class="custom_radio">
                  <input type="radio" id="locationINT" name="location" @change="changeLocation('INT')" value="INT" v-model="form.location">
                  <label for="locationINT">International</label>
                </div>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-6">
                <input type="text" class="form-control" placeholder="First Name" v-model="form.first_name">
                <v-errors :errors="errorFor('first_name')"></v-errors>
              </div>
              <div class="form-group col-6">
                <input type="text" class="form-control" placeholder="Last Name" v-model="form.last_name">
                <v-errors :errors="errorFor('last_name')"></v-errors>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-6">
                <input type="text" class="form-control" placeholder="Store no" v-model="form.store_no">
              </div>
              <div class="form-group col-6">
                <input type="text" class="form-control" placeholder="Attention" v-model="form.attention">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-6">
                <input type="text" class="form-control" placeholder="Street Address" v-model="form.address">
                <v-errors :errors="errorFor('address')"></v-errors>
              </div>

              <div class="form-group col-6">
                <input type="text" class="form-control" placeholder="Unit" v-model="form.unit">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-6">
                <input type="text" class="form-control" placeholder="City" v-model="form.city">
                <v-errors :errors="errorFor('city')"></v-errors>
              </div>
              <div class="form-group col-6" v-if="form.location === 'US' || form.location === 'CA'">
                <select class="form-control" v-model="form.state_id" @change="selectState('id')">
                  <option value="">Select State</option>
                  <option :value="state.id" v-for="(state, i) in states" :key="'us_'+i">{{ state.name }}</option>
                </select>
                <v-errors :errors="errorFor('state_id')"></v-errors>
              </div>
              <div class="form-group col-6" v-else>
                <input type="text" class="form-control" placeholder="State Name" v-model="form.state_text" @input="selectState('text')">
                <v-errors :errors="errorFor('state_text')"></v-errors>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-6">
                <input type="number" min="0" class="form-control" placeholder="Zip" v-model="form.zip">
                <v-errors :errors="errorFor('zip')"></v-errors>
              </div>
              <div class="form-group col-6">
                <select class="form-control" v-model="form.country_id" :disabled="form.location === 'US' || form.location === 'CA'">
                  <option value="">Select Country</option>
                  <option :value="country.id" v-for="(country, i) in countries" :key="'country_'+i">{{ country.name }}</option>
                </select>
                <v-errors :errors="errorFor('country_id')"></v-errors>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-6">
                <input type="text" class="form-control" placeholder="Phone" v-model="form.phone">
                <v-errors :errors="errorFor('phone')"></v-errors>
              </div>
              <div class="form-group col-6">
                <input type="text" class="form-control" placeholder="Fax" v-model="form.fax">
              </div>
            </div>
          </div>
          <br>
          <span class="btn_grey width_200p text-center float-right mb_15" @click.prevent="saveAddress">Save</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  name: "AddressModal",
  data(){
    return {
      states: [],
      usStates: [],
      caStates: [],
      countries: [],
      form: {
        first_name: '',
        last_name: '',
        type: '',
        location: 'US',
        address: '',
        store_no: '',
        attention: '',
        city: '',
        state_text: '',
        state_id: 1,
        unit: '',
        zip: '',
        country_id: 1,
        phone: '',
        fax: ''
      }
    }
  },
  watch:{
    PropsForm: {
      deep: true,
      handler() {
        this.form = _.clone(this.PropsForm)
        if(this.PropsForm.country_id) {
          this.form.location = this.PropsForm.location
          this.form.country_id = this.PropsForm.country_id
          this.form.state_id = this.PropsForm.state_id
        }else {
          this.form.location = 'US'
          this.form.country_id = 1
          this.form.state_id = 1
        }
        this.form.type = this.type
      }
    },
  },
  props:{
    PropsForm:{},
    active:false,
    type: '',
    newAddress: false,
  },
  created() {
    this.$axios.get('/countries')
      .then((response) => {
        this.countries = response.data.data;
      })

    this.$axios.get('/us-states')
      .then((response) => {
        this.usStates = response.data.data;
        this.states = response.data.data;
      })

    this.$axios.get('/ca-states')
      .then((response) => {
        this.caStates = response.data.data;
      })
  },
  methods:{
    closeModal(){
      this.$emit('closeModal')
    },
    changeLocation(location){
      this.billingStates = [];
      if(location === 'US') {
        this.states = this.usStates
        this.form.country_id = 1
        this.form.state_id = 1
      }
      if(location === 'CA'){
        this.states = this.caStates
        this.form.country_id = 2
        this.form.state_id = 66
      }
    },
    selectState(type){
      if(this.form.state_id && type === 'id')
        this.form.state_text = '';

      if(this.form.state_text && type === 'text')
        this.form.state_id = null;
    },
    saveAddress(){
      let url = null;
      this.form.type = this.type
      if(this.newAddress) {
        url = '/customer/address/add'
      }else {
        url = '/customer/address/update/' + this.form.id
      }
      this.allErrors = null;

      let formData = new FormData();
      formData.append('first_name', this.form.first_name ?? '');
      formData.append('last_name', this.form.last_name ?? '');
      formData.append('type', this.form.type);
      formData.append('location', this.form.location);
      formData.append('address', this.form.address ?? '');
      formData.append('store_no', this.form.store_no ?? '');
      formData.append('attention', this.form.attention ?? '');
      formData.append('city', this.form.city);
      formData.append('state_text', this.form.state_text ?? '');
      formData.append('state_id', this.form.state_id ?? '');
      formData.append('unit', this.form.unit ?? '');
      formData.append('zip', this.form.zip ?? '');
      formData.append('country_id', this.form.country_id);
      formData.append('phone', this.form.phone);
      formData.append('fax', this.form.fax ?? '');
      formData.append('id', this.form.id);

      this.$axios.post(url, formData)
      .then(()=>{
        if(this.form.type === 'billing')
          this.$store.dispatch('customerModule/dispatchBillingAddress')
        if(this.form.type === 'shipping')
          this.$store.dispatch('customerModule/dispatchShippingAddress')
        this.$emit('closeModal')
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
