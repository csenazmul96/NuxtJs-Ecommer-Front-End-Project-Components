export const state = () => ({
  shippingAddress: {
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
  billingAddress: null,
  cardInfo: null,
  shippingMethod: null,
  promotionInfo: [],
  storeCredit: 0,
  usedPoint: 0,
  loading: false,
});

export const mutations = {
  setShippingAddress(state, payload) {
    state.shippingAddress = payload;
  },
  setBillingAddress(state, payload) {
    state.billingAddress = payload;
  },
  setCardInfo(state, payload) {
    state.cardInfo = payload;
  },
  setShippingMethod(state, payload) {
    state.shippingMethod = payload;
  },
  setPromotionInfo(state, payload) {
    state.promotionInfo = payload;
  },
  setStoreCredit(state, payload) {
    state.storeCredit = payload;
  },
  setUsedPoint(state, payload) {
    state.usedPoint = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
}


export const getters = {
  getShippingAddress: (state) => state.shippingAddress,
  getBillingAddress: (state) => state.billingAddress,
  getCardInfo: (state) => state.cardInfo,
  getShippingMethod: (state) => state.shippingMethod,
  getPromotionInfo: (state) => state.promotionInfo,
  getStoreCredit: (state) => state.storeCredit,
  getUsedPoint: (state) => state.usedPoint,
  getLoading: (state) => state.loading,
}
