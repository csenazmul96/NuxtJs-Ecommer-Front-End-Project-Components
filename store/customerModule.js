export const state = () => ({
  customerDetails: null,
  shippingAddress: null,
  billingAddress: null,
});

export const mutations = {
  setCustomerDetails(state, payload) {
    state.customerDetails = payload
  },
  setShippingAddress(state, payload) {
    state.shippingAddress = payload
  },
  setBillingAddress(state, payload) {
    state.billingAddress = payload
  },
}

export  const actions= {
  dispatchCustomerDetails({commit}){
    this.$axios.get('/customer/details')
      .then((response)=>{
        commit('setCustomerDetails', response.data.data);
      })
  },
  dispatchShippingAddress({commit}){
    this.$axios.get('/customer/shipping-address')
      .then((response)=>{
        commit('setShippingAddress', response.data.data);
      })
  },
  dispatchBillingAddress({commit}){
    this.$axios.get('/customer/billing-address')
      .then((response)=>{
        commit('setBillingAddress', response.data.data);
      })
  },
}


export const getters = {
  getCustomerDetails: (state) => state.customerDetails,
  getShippingAddress: (state) => state.shippingAddress,
  getBillingAddress: (state) => state.billingAddress,
}
