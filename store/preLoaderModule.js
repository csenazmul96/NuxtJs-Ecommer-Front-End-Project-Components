export const state = () => ({
  preloader: false,
  preProducts: [],
});

export const mutations = {
  setPreloader(state, payload) {
    state.preloader = payload
  },
  setPreProducts(state, payload) {
    state.preProducts = payload
  },
}

export  const actions= {

}


export const getters = {
  preloader: (state) => state.preloader,
  getPreProducts: (state) => state.preProducts,
}
