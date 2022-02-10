<template>
  <div :class="{home_ct_margin: $route.name === 'index'}">
    <header :class="['header_area fixed-top', {home_header: $route.name === 'index'}]">
    <live-component v-if="showLiveNow"></live-component>
      <div class="main_header cm_header show_desktop">
        <div class="main_header_inner">
          <div class="logo">
            <nuxt-link v-if="$route.name != 'index'" :to="{name: 'index'}"> <img v-if="whiteLogo" :src="whiteLogo" alt="Wholesale women's clothing Davi & Dani"></nuxt-link>
            <a v-else href="/"> <img v-if="whiteLogo" :src="whiteLogo" alt="Wholesale women's clothing Davi & Dani"></a>
          </div>
          <header-menu></header-menu>
          <div class="header_others">
            <ul>
              <li data-toggle="collapse_noslide" data-target="#search" @click.prevent="searchInputTriger">
                <img class="default" src="/images/search-white.png" alt="Wholesale women's clothing Davi & Dani">
                <img class="on_scoll" src="/images/search-white.png" alt="Wholesale women's clothing Davi & Dani">
              </li>
              <header-search ref="searchComponent"></header-search>
              <li data-toggle="collapse_noslide" data-target="#user">
                <img class="default" src="/images/user-white.png" alt="Wholesale women's clothing Davi & Dani">
                <img class="on_scoll" src="/images/user-white.png" alt="Wholesale women's clothing Davi & Dani">
              </li>
              <header-user></header-user>
              <li data-toggle="collapse_noslide" data-target="#cart" class="h_cart" v-if="$auth.loggedIn">
                  <span>
                      <img class="default" src="/images/cart-white.png" alt="Wholesale women's clothing Davi & Dani">
                      <img class="on_scoll" src="/images/cart-white.png" alt="Wholesale women's clothing Davi & Dani">
                      <b>{{ cartItems.length }}</b>
                  </span>
              </li>
              <header-cart v-if="$auth.loggedIn"></header-cart>
            </ul>
          </div>
        </div>
      </div>
      <main-mobile-header></main-mobile-header>
    </header>
    <!-- <div  class="ct_margin"></div> -->
  </div>
</template>
<script>
import HeaderMenu from "@/components/shared/header/HeaderMenu";
import HeaderUser from "@/components/shared/header/HeaderUser";
import HeaderSearch from "@/components/shared/header/HeaderSearch";
import HeaderUserComponent from "~/components/shared/header/HeaderUser";
import MainMobileHeader from "~/components/shared/header/MainMobileHeader";
import HeaderCart from "~/components/shared/header/HeaderCart";
import {mapGetters} from "vuex";
import LiveComponent from "./LiveComponent";

export default {
  components: {LiveComponent, HeaderUserComponent, HeaderMenu, HeaderUser, HeaderCart, HeaderSearch, MainMobileHeader},
  data(){
    return {
      liveNoticeShow:['index', 'category-slug', 'category-slug-sub_slug']
    }
  },
  computed: {
    ...mapGetters({
      cartItems: 'cartModule/getCartItems',
      user: 'authModule/getUser',
      whiteLogo: 'settingsModule/getWhiteLogo',
      liveContent: 'settingsModule/getLiveContent',
      showLiveNow: 'settingsModule/getShowLiveNow',
    }),
  },
  watch: {
    $route(to, form) {
      if (process.client) {
        this.headerCommonMargin();
      }
      this.daviLiveTVStyle()
    }
  },
  created() {
    this.daviLiveTVStyle()
    this.headerCommonMargin();

    if (process.client) {
      this.$axios.get('/settings/top-notification')
        .then((response) => {
          this.$store.commit('settingsModule/setLiveContent', response.data.data);
        })
    }
  },
  mounted() {
    if (process.client) {
      this.headerCommonMargin();
      window.addEventListener('resize', this.headerCommonMargin);
    }
  },
  methods: {
    searchInputTriger(){
      setTimeout(() => {
        this.$refs.searchComponent.$refs.searchInput.focus();
      }, 50);
    },
    headerCommonMargin() {
      if(process.client) {
        let common_margin = $('.cm_header').outerHeight();
        if (common_margin === 0)
          common_margin = $('.header_area').outerHeight();

        if (this.$route.name !== 'index')
          $('.ct_margin').css({'height': `${common_margin}px`});
        else
          $('.ct_margin').css({'height': `0px`});

        $('.p_filter_content').css({
          top: `${common_margin}px`,
          'height': `calc(100% - ${common_margin}px)`
        });
      }
    },
    daviLiveTVStyle(){
      if(process.client) {
        if(this.$route.name === 'davi-tv')
          $("body").addClass('bg_black')
        else
          $("body").removeClass('bg_black')
      }
    }
  }
}
</script>
