export const state = () => ({
  cartItems: [],
});

export const mutations = {
  setCartItems(state, payload) {
    state.cartItems = payload;
  },
}

export const actions = {
  addToCart({state, commit, rootState}, payload) {
    let cartItems = [];
    payload.colors.forEach((color) => {
      if (color.quantity > 0) {
        cartItems.push({
          customer_id: rootState.authModule.user.id,
          item_id: payload.item.id,
          indicator: color.indicator,
          color_id: color.id,
          quantity: color.quantity,
        });
      }
    })
    if (cartItems.length) {
      if (this.$auth.loggedIn) {
        return new Promise((resolve, reject) => {
          this.$axios.post('/carts', {items: cartItems}).then((response) => {
            commit('setCartItems', response.data.data);
            resolve(response.data);
          }).catch((error) => {
            reject(error.response.data)
          });
        });
      }
    }
  },
  removeFromCart({state, commit}, payload) {
    let items = [...state.cartItems];

    this.$axios.delete('/carts/'+payload)
      .then((response) => {
        let idx = items.findIndex((i) => i.id === payload);
        items.splice(idx, 1);
        commit('setCartItems', items);
      }).catch((error) => {});


  },
  loadCart({commit, rootState}) {
    if (this.$auth.loggedIn) {
      this.$axios.get('/carts')
        .then((response) => {
          commit('setCartItems', response.data.data);
        }).catch((error) => {
      });
    }
  }
}

export const getters = {
  getCartItems: (state) => state.cartItems,
  getCartTotal: (state) => state.cartItems.reduce((a, b) => a + (b.item.pack.total_item * b.quantity * b.item.price), 0),
}


