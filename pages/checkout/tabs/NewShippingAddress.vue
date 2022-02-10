<template>
  <div>
    <div class="form-row mb_10">
      <div class="col-md-4">
        <div class="custom_radio">
          <input type="radio" id="locationUS" name="location" @change="changeShippingLocation('US')" value="US" v-model="form.location">
          <label for="locationUS">United States</label>
        </div>
      </div>
      <div class="col-md-4">
        <div class="custom_radio">
          <input type="radio" id="locationCA" name="location" @change="changeShippingLocation('CA')" value="CA" v-model="form.location">
          <label for="locationCA">Canada</label>
        </div>
      </div>
      <div class="col-md-4">
        <div class="custom_radio">
          <input type="radio" id="locationINT" name="location" @change="changeShippingLocation('INT')" value="INT" v-model="form.location">
          <label for="locationINT">International</label>
        </div>
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
</template>

<script>
import {mapGetters} from "vuex";
export default {
  middleware: 'auth',
  data() {
    return {
      states: [],
      usStates: [],
      caStates: [],
      countries: [],
      form: {
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
      name: ''
    }
  },
  props:{
    errors:{}
  },
  computed: {
    ...mapGetters({
      shippingAddress: 'checkoutModule/getShippingAddress',
    }),
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.$emit('getNewAddress', _.cloneDeep(this.form))
        // this.$store.commit('checkoutModule/setShippingAddress', _.cloneDeep(this.form));
      }
    },
    errors:{
      deep: true,
      handler(){
        this.allErrors = this.errors
      }
    }
  },
  created() {
    this.$emit('getNewAddress', _.cloneDeep(this.form))
    // this.$store.commit('checkoutModule/setShippingAddress', _.cloneDeep(this.form));

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
    changeShippingLocation(location){
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
  },
}
</script>
