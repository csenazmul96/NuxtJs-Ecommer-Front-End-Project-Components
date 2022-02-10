export const state = () => ({
  user: null,
});

export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
}

export const actions = {
  nuxtServerInit ({ dispatch }, { req }) {
    dispatch('loadStore');
  },
  loadStore({commit, dispatch}) {
    let user = this.$auth.$storage.getUniversal('user') || null;

    if (user) {
      commit('setUser', user);
    } else {
      dispatch('resetUser');
    }
  },
  login({dispatch}, payload) {
    return new Promise(async (resolve, reject) => {
      dispatch('resetUser');

      this.$auth.loginWith('local', {
        data: payload
      }).then((response) => {
        let user = response.data.data;
        dispatch('setNewUser', user);
        localStorage.setItem('loginTime', 0);

        dispatch('cartModule/loadCart', null, {root:true})
        resolve(user);
      }).catch((error) => {
        reject(error.response.data)
      });
    });
  },
  register({}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/register', payload).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error.response.data)
      });
    });
  },
  logout({dispatch}) {
    return new Promise(async (resolve, reject) => {
      await this.$auth.logout()
      dispatch('resetUser');

      resolve();
    });
  },
  setNewUser({commit}, user) {
    commit('setUser', user);
    this.$auth.setUser(user);
    this.$auth.setUserToken(user.token);
    this.$auth.$storage.setUniversal('user', JSON.stringify(user))
    this.$axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  },
  resetUser({commit}) {
    commit('setUser', null);
    this.$auth.$storage.removeUniversal('user')
  },
}

export const getters = {
  getUser: (state) => state.user,
}
