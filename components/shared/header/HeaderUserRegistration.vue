<template>
  <div class="inner_form">
    <div class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="registration_title">
              <h2>My Information</h2>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form_inline">
              <label class="required">First Name</label>
              <input type="text" class="form-control" v-model="form.first_name">
              <v-errors :errors="errorFor('first_name')"></v-errors>
            </div>
            <div class="form_inline">
              <label class="required">Last Name</label>
              <input type="text" class="form-control" v-model="form.last_name">
              <v-errors :errors="errorFor('last_name')"></v-errors>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form_inline">
              <label class="required">Email</label>
              <input type="text" class="form-control" v-model="form.email">
              <v-errors :errors="errorFor('email')"></v-errors>
            </div>
            <div class="form_inline">
              <label class="required">Password</label>
              <input type="password" class="form-control" v-model="form.password">
              <v-errors :errors="errorFor('password')"></v-errors>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">
            <div class="registration_title">
              <h2>My Company Information</h2>
            </div>
          </div>
          <div class="col-md-6">
              <div class="form_inline">
                  <label class="required">Seller Permit Number *</label>
                  <input type="text" class="form-control" v-model="form.seller_permit_number">
                  <v-errors :errors="errorFor('seller_permit_number')"></v-errors>
              </div>
              <div class="form_inline">
                <label class="required">Business License, Federal Tax ID (EIN) *</label>
                <input type="file" class="form-control file-form-control" @input="(event) => form.ein = event.target.files[0]">
                <span>Max upload Size 2MB</span>
                <v-errors :errors="errorFor('ein')"></v-errors>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form_inline">
              <label class="required">Company Name *</label>
              <input type="text" class="form-control" v-model="form.company_name">
              <v-errors :errors="errorFor('company_name')"></v-errors>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="registration_title">
          <h2>Shipping Address</h2>
        </div>
      </div>
      <div class="col-md-12">
        <div class="inner_checkbox mb_15">
          <span class="pr_20">Location</span>
          <div class="custom_radio">
            <input type="radio" id="shipping_location_us" @change="changeShippingLocation('US')" name="shipping_location" value="US" v-model="form.shipping_location">
            <label for="shipping_location_us">United States</label>
          </div>
          <div class="custom_radio">
            <input type="radio" id="shipping_location_ca" @change="changeShippingLocation('CA')" name="shipping_location" value="CA" v-model="form.shipping_location">
            <label for="shipping_location_ca">Canada</label>
          </div>
          <div class="custom_radio">
            <input type="radio" id="shipping_location_int" @change="changeShippingLocation('INT')" name="shipping_location" value="INT" v-model="form.shipping_location">
            <label for="shipping_location_int">International</label>
          </div>
        </div>
        <v-errors :errors="errorFor('shipping_location')"></v-errors>
      </div>
      <div class="col-md-4">
        <div class="form_inline">
          <label>Store No.</label>
          <input type="text" class="form-control" placeholder="" v-model="form.shipping_store_no">
        </div>
      </div>
      <div class="col-md-4">
        <div class="form_inline">
          <label>Attention</label>
          <input type="text" class="form-control " placeholder=""  v-model="form.shipping_attention">
        </div>
      </div>
      <div class="col-md-4">
        <div class="form_inline">
          <label class="required">Address</label>
          <input type="text" class="form-control" placeholder="" v-model="form.shipping_address">
          <v-errors :errors="errorFor('shipping_address')"></v-errors>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form_inline">
          <label>Unit #</label>
          <input type="text" class="form-control " placeholder="" v-model="form.shipping_unit">
        </div>
      </div>
      <div class="col-md-4">
        <div class="form_inline">
          <label class="required">City</label>
          <input type="text" class="form-control" placeholder="" v-model="form.shipping_city">
          <v-errors :errors="errorFor('shipping_city')"></v-errors>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form_inline" v-if="form.shipping_location === 'US' || form.shipping_location === 'CA'">
          <label class="required">State</label>
          <select class="form-control" v-model="form.shipping_state_id">
            <option v-for="state in shippingStates" :value="state.id" :key="'shippingState_'+state.id"> {{ state.name }}</option>
          </select>
          <v-errors :errors="errorFor('shipping_state_id')"></v-errors>
        </div>

        <div class="form_inline" v-else>
          <label class="required">State Name</label>
          <input type="text" class="form-control" placeholder="" v-model="form.shipping_state_text">
          <v-errors :errors="errorFor('shipping_state_text')"></v-errors>
        </div>

      </div>
      <div class="col-md-4">
        <div class="form_inline">
          <label class="required">Zip Code</label>
          <input type="text" class="form-control" placeholder="" v-model="form.shipping_zip">
          <v-errors :errors="errorFor('shipping_zip')"></v-errors>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form_inline">
          <label class="required">Country</label>
          <select class="form-control" v-model="form.shipping_country_id" :disabled="form.shipping_location === 'US' || form.shipping_location === 'CA'">
            <option v-for="country in countries" :value="country.id" :key="'country_'+country.id"> {{ country.name }}</option>
          </select>
          <v-errors :errors="errorFor('shipping_country_id')"></v-errors>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form_inline">
          <label class="required">Phone</label>
          <input type="text" class="form-control" placeholder="" v-model="form.shipping_phone">
          <v-errors :errors="errorFor('shipping_phone')"></v-errors>
        </div>
      </div>
      <div class="col-md-12">
        <div class="inner_checbox mb_15">
          <div class="c_checkbox">
            <input type="checkbox" id="2buyerNewsletter141" name="commercial21" v-model="form.shipping_commercial">
            <label for="2buyerNewsletter141">This address is commercial.</label>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="registration_title">
          <h2>Billing Address</h2>
        </div>
        <div class="inner_checbox mb_15">
          <div class="c_checkbox">
            <input type="checkbox" id="billing_to_shipping" value="1" name="commercial2" v-model="form.billing_to_shipping" @change="billingToShipping">
            <label for="billing_to_shipping">Check here if same as shipping address.</label>
          </div>
        </div>
      </div>
      <template v-if="!this.form.billing_to_shipping">
        <div class="col-md-12">
          <div class="inner_checkbox mb_15">
            <span class="pr_20">Location</span>
            <div class="custom_radio">
              <input type="radio" id="billing_location_us" @change="changeBillingLocation('US')" name="billing_location" value="US" v-model="form.billing_location">
              <label for="billing_location_us">United States</label>
            </div>
            <div class="custom_radio">
              <input type="radio" id="billing_location_ca" @change="changeBillingLocation('CA')" name="billing_location" value="CA" v-model="form.billing_location">
              <label for="billing_location_ca">Canada</label>
            </div>
            <div class="custom_radio">
              <input type="radio" id="billing_location_int" @change="changeBillingLocation('INT')" name="billing_location" value="INT" v-model="form.billing_location">
              <label for="billing_location_int">International</label>
            </div>
          </div>
          <v-errors :errors="errorFor('billing_location')"></v-errors>
        </div>
        <div class="col-md-4">
          <div class="form_inline">
            <label>Store No.</label>
            <input type="text" class="form-control" placeholder="" v-model="form.billing_store_no">
          </div>
        </div>
        <div class="col-md-4">
          <div class="form_inline">
            <label>Attention</label>
            <input type="text" class="form-control " placeholder=""  v-model="form.billing_attention">
          </div>
        </div>
        <div class="col-md-4">
          <div class="form_inline">
            <label class="required">Address</label>
            <input type="text" class="form-control" placeholder="" v-model="form.billing_address">
            <v-errors :errors="errorFor('billing_address')"></v-errors>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form_inline">
            <label>Unit #</label>
            <input type="text" class="form-control " placeholder="" v-model="form.billing_zip">
            <v-errors :errors="errorFor('billing_zip')"></v-errors>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form_inline">
            <label class="required">City</label>
            <input type="text" class="form-control" placeholder="" v-model="form.billing_city">
            <v-errors :errors="errorFor('billing_city')"></v-errors>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form_inline" v-if="form.billing_location === 'US' || form.billing_location === 'CA'">
            <label class="required">State</label>
            <select class="form-control" v-model="form.billing_state_id">
              <option v-for="state in billingStates" :value="state.id" :key="'billingState_'+state.id"> {{ state.name }}</option>
            </select>
            <v-errors :errors="errorFor('billing_state_id')"></v-errors>
          </div>
          <div class="form_inline" v-else>
            <label class="required">State Name</label>
            <input type="text" class="form-control" placeholder="" v-model="form.billing_state_text">
            <v-errors :errors="errorFor('billing_state_text')"></v-errors>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form_inline">
            <label class="required">Zip Code</label>
            <input type="text" class="form-control" placeholder="" v-model="form.billing_zip">
            <v-errors :errors="errorFor('billing_zip')"></v-errors>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form_inline">
            <label class="required">Country</label>
            <select class="form-control" v-model="form.billing_country_id" :disabled="form.billing_location === 'US' || form.billing_location === 'CA'">
              <option v-for="country in countries" :value="country.id" :key="'billingCountry_'+country.id"> {{ country.name }}</option>
            </select>
            <v-errors :errors="errorFor('billing_country_id')"></v-errors>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form_inline">
            <label class="required">Phone</label>
            <input type="text" class="form-control" placeholder="" v-model="form.billing_phone">
            <v-errors :errors="errorFor('billing_phone')"></v-errors>
          </div>
        </div>
      </template>
      <div class="col-md-12">
        <div class="inner_checbox">
          <div class="c_checkbox mb_5">
            <input type="checkbox" id="billing_commercial" name="billing_commercial" v-model="form.billing_commercial">
            <label for="billing_commercial">This address is commercial</label>
          </div>
        </div>
        <div class="inner_checbox mb_15">
          <div class="c_checkbox">
            <input type="checkbox" id="receive_offers" name="receive_offers" v-model="form.receive_offers">
            <label for="receive_offers">Sign up to receive special offers and information.</label>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="d_flex_btwn">
          <button class="btn_common width_200p" @click.prevent="$emit('changeModal', 'login')">Back To Login</button>
          <button class="btn_common width_200p" @click.prevent="register">Register <span v-show="loading"> <i class="fas fa-circle-notch fa-spin"></i></span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shippingStates: [],
      billingStates: [],
      caStates: [],
      usStates: [],
      countries: [],
      form: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        primary_customer_market: '1',
        sell_online: '0',
        company_name: '',
        seller_permit_number: '',
        ein: '',
        receive_offers: 1,
        billing_to_shipping: 1,

        shipping_location: 'US',
        shipping_store_no: '',
        shipping_attention: '',
        shipping_unit: '',
        shipping_address: '',
        shipping_city: '',
        shipping_state_id: 1,
        shipping_state_text: '',
        shipping_zip: '',
        shipping_country_id: 1,
        shipping_phone: '',
        shipping_fax: '',
        shipping_commercial:1,

        billing_location: 'US',
        billing_store_no: '',
        billing_attention: '',
        billing_unit: '',
        billing_address: '',
        billing_city: '',
        billing_state_id: 1,
        billing_state_text: '',
        billing_zip: '',
        billing_country_id: 1,
        billing_phone: '',
        billing_fax: '',
        billing_commercial: '',
      }
    }
  },
  mounted() {
    if (process.client) {
      this.resizeWindow();

      $(window).resize(() => {
        this.resizeWindow();
      });
    }
  },
  created() {
    this.$axios.get('/countries').then((response) => {
      this.countries = response.data.data;
    })
    this.$axios.get('/us-states').then((response) => {
      this.usStates = response.data.data;
      this.shippingStates = response.data.data;
      this.billingStates = response.data.data;
    })
    this.$axios.get('/ca-states').then((response) => {
      this.caStates = response.data.data;
    })
  },
  methods: {
    register() {
      this.allErrors = null;
      this.loading = true;
      if(this.billingToShipping()){
        let formData = new FormData()

        Object.keys(this.form).forEach(key => {
          formData.append(key, this.form[key] ? this.form[key] : '');
        })

        this.$store.dispatch('authModule/register', formData)
          .then(() => {
            this.$router.push({name:'register-complete'})
            this.$emit('changeModal', 'login');
            if(process.client)
              $('*[data-target="#user"]').click();
            this.showSuccessMsg('Registration successfully!')
          })
          .catch((err) => this.allErrors = err.errors)
          .finally(() => this.loading = false);
      }
    },
    resizeWindow() {
      let headerHeight = $('.header_area ').outerHeight();
      let windowHeight = $(window).height();
      let regFormHeight = windowHeight - headerHeight;
      $('.header_registration_form ').css({
        'height' : `${regFormHeight}px`
      })
    },
    changeShippingLocation(location){
      this.shippingStates = [];
      if(location === 'US') {
        this.shippingStates = this.usStates
        this.form.shipping_country_id = 1
        this.form.shipping_state_id = 1
      }
      if(location === 'CA'){
        this.shippingStates = this.caStates
        this.form.shipping_country_id = 2
        this.form.shipping_state_id = 66
      }
    },
    changeBillingLocation(location){
      this.billingStates = [];
      if(location === 'US') {
        this.billingStates = this.usStates
        this.form.billing_country_id = 1
        this.form.billing_state_id = 1
      }
      if(location === 'CA'){
        this.billingStates = this.caStates
        this.form.billing_country_id = 2
        this.form.billing_state_id = 66
      }
    },
    billingToShipping(){
      if(this.form.billing_to_shipping){
        this.form.billing_location = this.form.shipping_location;
        this.form.billing_store_no = this.form.shipping_store_no;
        this.form.billing_attention = this.form.shipping_attention;
        this.form.billing_unit = this.form.shipping_unit;
        this.form.billing_address = this.form.shipping_address;
        this.form.billing_city = this.form.shipping_city;
        this.form.billing_state_id = this.form.shipping_state_id;
        this.form.billing_state_text = this.form.shipping_state_text;
        this.form.billing_zip = this.form.shipping_zip;
        this.form.billing_country_id = this.form.shipping_country_id;
        this.form.billing_phone = this.form.shipping_phone;
        this.form.billing_fax = this.form.shipping_fax;
        this.form.billing_commercial = this.form.shipping_commercial;
      }
      return true;
    },
  }
}
</script>
