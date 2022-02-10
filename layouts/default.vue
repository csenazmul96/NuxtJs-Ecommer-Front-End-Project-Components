<template>
  <div :class="[{home_page:$route.name === 'index'}, {'live_notification_on': showLiveNow}]">
    <header-component></header-component>
    <client-only>
      <pre-loader></pre-loader>
    </client-only>
    <div class="fixed_schedule">
      <div class="inner">
        <nuxt-link :to="{ name: 'schedule'}">Show Schedule</nuxt-link>
      </div>
    </div>
    <Nuxt :class="['common_top_padding', {'has_live_notice': showLiveNow}]"></Nuxt>
    <newsletter v-show="!noSubscription.includes($route.name)"></newsletter>
    <footer-component v-show="!noFooter.includes($route.name)"></footer-component>
  </div>
</template>

<script>
import HeaderComponent from '../components/shared/header/HeaderComponent';
import FooterComponent from "../components/shared/footer/FooterComponent";
import Newsletter from "../components/shared/NewsLetter";
import PreLoader from '../components/shared/PreLoader.vue';
import {mapGetters} from "vuex";

export default {
  components: {Newsletter, FooterComponent, HeaderComponent, PreLoader},
  async mounted() {
    if (process.client) {
      let self = this;
      self.minHeight = window.outerHeight;
      $(window).resize(function() {
        self.minHeight = window.outerHeight;
      });
    }
    await this.$store.dispatch('authModule/loadStore');
  },
  watch: {
    $route(){
      if (process.client) {
        this.headerCommonMargin();
        //this.scrollTop();
        $(".show_from_right").removeClass('open_h_menu'); //if route change then close all modal
        $("body").removeClass('overflow_hidden'); //if route change then close all modal
      }
    }
  },
  data(){
    return{
      noFooter: ['checkout'],
      noSubscription: ['checkout'],
      minHeight: 0,
    }
  },
  updated() {
    this.headerCommonMargin();
  },
  created() {
    this.$store.dispatch('settingsModule/getLiveVideo')
    if (process.client) {

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
    }
  },
  computed: {
    ...mapGetters({
      contentLoad: 'settingsModule/getContentLoad',
      showLiveNow: 'settingsModule/getShowLiveNow',
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

  }
}
</script>

<style scoped>


</style>
