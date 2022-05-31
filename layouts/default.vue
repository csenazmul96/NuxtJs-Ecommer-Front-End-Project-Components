<template>
  <div :class="[{home_page:$route.name === 'index'}, {'has_topbar': topNotification }]">
  <!-- <div :class="[{home_page:$route.name === 'index'}]"> -->
    <header-component></header-component>
    <client-only>
      <pre-loader></pre-loader>
    </client-only>
    <div class="fixed_schedule">
      <div class="inner">
        <nuxt-link :to="{ name: 'schedule'}">Show Schedule</nuxt-link>
      </div>
    </div>
    <Nuxt :class="['common_top_padding']"></Nuxt>
    <newsletter v-show="!noSubscription.includes($route.name)"></newsletter>
    <footer-component v-show="!noFooter.includes($route.name)"></footer-component>
    <!-- live chat start -->

    <livechat-component v-if="liveData && $auth.loggedIn" :liveData="liveData" ref="live" :events="events"></livechat-component>
    <div class="right_fixed_wrap" v-if="liveData && !$auth.loggedIn">
      <div class="live_now">
          <span>
            <router-link  :to="{name:'login'}">Live</router-link>
          </span>
      </div>
    </div>

    <!-- live chat end -->
  </div>
</template>

<script>
import HeaderComponent from '../components/shared/header/HeaderComponent';
import FooterComponent from "../components/shared/footer/FooterComponent";
import Newsletter from "../components/shared/NewsLetter";
import PreLoader from '../components/shared/PreLoader.vue';
import {mapGetters} from "vuex";
import LivechatComponent from "../components/livechat/LivechatComponent";

export default {
  components: {Newsletter, FooterComponent, HeaderComponent, PreLoader, LivechatComponent},
  async mounted() {
    if (process.client) {
      let self = this;
      self.minHeight = window.outerHeight;
      $(window).resize(function() {
        self.minHeight = window.outerHeight;
      });

      setTimeout(() => {
        this.getLiveStatus();
      }, 1000);

    }
    await this.$store.dispatch('authModule/loadStore');
  },
  watch: {
    $route(){
      if (process.client) {
        this.headerCommonMargin();
        $(".show_from_right").removeClass('open_h_menu'); //if route change then close all modal
        $("body").removeClass('overflow_hidden'); //if route change then close all modal
        window.$('.stage61_model').removeClass('open_animation');
        window.$('body').removeClass('model_open');
        window.$('body').removeClass('bg_black');
        window.$('.stage61_model').removeClass('open_modal');
      }
    },
    'liveData.status': function () {
      if(process.client && !this.liveData.status){
        // window.$('body').removeClass('model_open');
        // window.$('.stage61_model').removeClass('open_modal');
      }
    },
    'userLoginStatus': function () {
      if(this.liveData && this.userLoginStatus){
        if(this.user && this.user.fb_user_id){
          window.$('.stage61_model').addClass('open_animation');
          window.$('body').addClass('model_open');
          window.$('.stage61_model').addClass('open_modal');
          setTimeout (function () {
            window.$(".we_are_live_now_notice").addClass('open_modal')
          } , 1000 )
        }else{
          window.$('.stage61_model').addClass('open_animation');
          window.$('body').addClass('model_open');
          window.$('.stage61_model').addClass('open_modal');
          setTimeout (function () {
            window.$(".has_facebook_profile").addClass('open_modal')
          } , 1000 )
        }
      }
    },
  },
  data(){
    return{
      noFooter: ['checkout'],
      noSubscription: ['checkout'],
      minHeight: 0,
      pubnub: null,
      events: null,
    }
  },
  updated() {
    this.headerCommonMargin();
  },

  async created() {
    if (process.client) {
      let checkAuthUser = localStorage.getItem('auth.user');
      if(checkAuthUser){
        this.$store.dispatch('customerModule/dispatchCustomerDetails')
      }

      this.$store.dispatch('settingsModule/getLiveVideo')

      this.$axios.get('https://ipinfo.io/ip')
        .then((response) => {
          this.$axios.post('/ip', {ip: response.data, url: this.$route.fullPath }).catch(() => {});
        }).catch(() => {})

      //this.scrollTop();

      setInterval(()=>{
        let loginTime = localStorage.getItem('loginTime');
        let authUser = localStorage.getItem('auth.user');
        if(authUser) {
          if (loginTime > 60*60*12) {
            this.$store.dispatch('authModule/logout').then(() => {
              this.$router.push({name: 'user'})
            })
            localStorage.setItem('loginTime', 0)
          } else {
            loginTime = Number(loginTime) + Number(1)
            localStorage.setItem('loginTime', loginTime)
          }
        }
      }, 1000)

      this.$axios.get('/get/logo')
        .then((response)=>{
          this.$store.commit('settingsModule/setDefaultSettings', response.data);
        })
      
      this.$axios.get('get/top/notification')
        .then((response)=>{
          this.$store.commit('settingsModule/setTopNotification', response.data);
        })
    }
  },
  computed: {
    ...mapGetters({
      contentLoad: 'settingsModule/getContentLoad',
      showLiveNow: 'settingsModule/getShowLiveNow',
      liveData: 'settingsModule/getLiveData',
      userLoginStatus: 'authModule/getUserLoginStatus',
      user: 'customerModule/getCustomerDetails',
      topNotification: 'settingsModule/getTopNotificationContent',
    }),
  },
  methods: {
    scrollTop() {
      if (process.client) {
        let self = this;
        self.minHeight = window.outerHeight;
        $(window).resize(function() {
          self.minHeight = window.outerHeight;
        });

        window.scrollTo(0, 0);
      }
    },
    headerCommonMargin() {//another same function has Live component because of home page header top notification
      let header_top = $('.header_top').outerHeight();
      if(!header_top)
        header_top = 0
      let common_margin = $('.header_area').outerHeight();

      if(!common_margin)
        common_margin = 52

      let totalHeight = null;
      if(this.$route.name != 'index')
        totalHeight =  common_margin
      else
        totalHeight = header_top + common_margin

      $('.show_from_left , .show_from_right ').css({
        'top': `${(totalHeight)}px`,
        'height': `calc(100% - ${totalHeight}px)`,
      });
    },
    getLiveStatus(){
      const self = this;

      const PubNub = require('pubnub');
      const uuid = PubNub.generateUUID();
      this.pubnub = new PubNub({
        publishKey: process.env.NUXT_ENV_PUBNUB_PUBLISH_KEY,
        subscribeKey: process.env.NUXT_ENV_PUBNUB_SUBSCRIBE_KEY,
        uuid: uuid
      });

      this.pubnub.addListener({
        message: function(message) {
          self.$store.commit("settingsModule/setPubnubEvents", message)
          if (message.message.title === 'live') {
            self.$store.dispatch('settingsModule/getLiveVideo')
          }
        }
      })


      this.pubnub.subscribe({
        channels: ['1'],
      });
    }
  },
}
</script>
