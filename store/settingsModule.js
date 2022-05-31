export const state = () => ({
  blackLogo: null,
  whiteLogo: null,
  defaultImage: null,
  jnnaLogo: null,
  jnnalink: null,
  contentLoad: true,
  liveContent: null,
  showLiveNow: false,
  liveData: null,
  daviTvVideoBanner: null,
  daviTvVideoThumb: null,
  pubnubEvents: null,
  topNotificationContent: null,
  topNotificationColor: null,
  topNotificationBackground: null,
});

export const mutations = {
  setDefaultSettings(state, payload) {
    state.blackLogo = payload.black_logo
    state.defaultImage = payload.default_image
    state.whiteLogo = payload.white_logo
    state.jnnaLogo = payload.jnna_logo
    state.jnnalinkn = payload.jnna_link
    state.daviTvVideoBanner = payload.video_list_banner
    state.daviTvVideoThumb = payload.video_list_thumb
  },
  setContentLoad(state, payload) {
    state.contentLoad = payload
  },
  setPubnubEvents(state, payload) {
    state.pubnubEvents = payload
  },
  setLiveContent(state, payload) {
    state.liveContent = payload
  },
  setShowLiveNow(state, payload) {
    state.showLiveNow = payload
  },
  setLiveData(state, payload) {
    state.liveData = payload
  },
  setTopNotification(state, payload) {
    state.topNotificationContent = payload.content_1
    state.topNotificationColor = payload.color
    state.topNotificationBackground = payload.background
  },
}
export const actions = {
  getLiveVideo({commit, rootState}) {
    this.$axios.get(process.env.NUXT_ENV_BROADCAST_API + '/current-live/' + process.env.NUXT_ENV_BROADCAST_VENDOR_ID)
      .then((response) => {
        if (response.data) {
          commit('setLiveData', response.data.data);
          commit('setShowLiveNow', true);
        } else {
          commit('setShowLiveNow', false);
          commit('setLiveData', null);
        }
      }).catch(() => {})
  },
}


export const getters = {
  getDefaultImage: (state) => state.defaultImage,
  getBlackLogo: (state) => state.blackLogo,
  getWhiteLogo: (state) => state.whiteLogo,
  getJnnaLogo: (state) => state.jnnaLogo,
  getJnnaLink: (state) => state.jnnalink,
  getContentLoad: (state) => state.contentLoad,
  getLiveContent: (state) => state.liveContent,
  getShowLiveNow: (state) => state.showLiveNow,
  getLiveData: (state) => state.liveData,
  getDaviTvVideoBanner: (state) => state.daviTvVideoBanner,
  getDaviTvVideoThumb: (state) => state.daviTvVideoThumb,
  getPubnubEvents: (state) => state.pubnubEvents,
  getTopNotificationContent: (state) => state.topNotificationContent,
  getTopNotificationColor: (state) => state.topNotificationColor,
  getTopNotificationBackground: (state) => state.topNotificationBackground,
}
