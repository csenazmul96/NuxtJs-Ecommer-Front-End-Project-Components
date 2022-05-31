export const state = () => ({
  productsByCategory: {},
  productsList: [],
  paginations: {},
  singleProduct: null,
  category: null,
  sortOrPaginateClick: false,
});

export const mutations = {
  setSingleProduct(state, payload) {
    state.singleProduct = payload;
  },
  setProductList(state, payload) {
    state.productsList = payload;
  },
  setPaginations(state, payload) {
    state.paginations = payload;
  },
  setCategory(state, payload) {
    state.category = payload;
  },
  setProductsByCategory(state, payload) {
    state.productsByCategory = payload;
  },
  setSortOrPaginateClick(state, payload) {
    state.sortOrPaginateClick = payload;
  }
}

export const actions = {
  LoadProduct({state, commit}, payload){
    return new Promise(async (resolve, reject) => {
      await this.$axios.get('/category-products/'+payload.slug, {
        params: {...payload.params}
      })
        .then((response) => {
          let productsByCategory = {...state.productsByCategory};
          let pagination = {...state.paginations}

          productsByCategory[payload.slug] = response.data.data;
          pagination[payload.slug] = response.data.meta
          commit('setProductsByCategory', productsByCategory);
          commit("setPaginations", pagination)
          resolve();
        })
    });
  },
  LoadCategory({state, commit}, payload) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.get('/categories/' + payload)
        .then((res) => {
          commit("setCategory", res.data.data)

          resolve();
        })
    });
  },
  LoadSingleProduct({state, commit}, payload) {
    return new Promise(async (resolve, reject) => {
      await this.$axios.get('/item/' + payload)
        .then((res) => {
          commit("setSingleProduct", res.data.data)
          resolve();
        })
    });
  },
}

export const getters = {
  getProductList: (state) => state.productsList,
  getSingleProduct: (state) => state.singleProduct,
  getPaginations: (state) => state.paginations,
  getProductCategory: (state) => state.category,
  getProductsByCategory: (state) => state.productsByCategory,
  getSortOrPaginateClick: (state) => state.sortOrPaginateClick,
}


