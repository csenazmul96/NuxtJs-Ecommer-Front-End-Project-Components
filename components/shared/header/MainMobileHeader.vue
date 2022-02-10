<template>
  <div>
    <div class="main_header_mobile  cm_header show_mobile">
      <div class="main_header_mobile_wrap">
        <div class="main_header_mobile_inner">
          <div class="h_m_left">
            <ul>
              <li data-toggle="collapse_l_r" data-target="#menu">
                <div class="menu btn1">
                  <div class="icon-left"></div>
                  <div class="icon-right"></div>
                </div>
              </li>
              <li data-toggle="collapse_l_r" data-target="#msearch" @click="searchCursorPointer">
                <div class="h_m_search">
                  <span><i class="lni lni-search-alt"></i></span>
                </div>
              </li>
            </ul>
          </div>
          <div class="h_m_logo">
            <nuxt-link v-if="$route.name != 'index'" :to="{name: 'index'}"> <img v-if="whiteLogo" :src="whiteLogo" alt="Wholesale women's clothing Davi & Dani"></nuxt-link>
            <a v-else href="/"> <img v-if="whiteLogo" :src="whiteLogo" alt="Wholesale women's clothing Davi & Dani"></a>
          </div>
          <div class="h_m_cart">
            <ul>
              <li data-toggle="collapse_l_r" data-target="#muser"><span><img src="/images/user-white.png" alt="Wholesale women's clothing Davi & Dani"></span></li>
              <li data-toggle="collapse_l_r" data-target="#mcart" class="m_h_cart"><span><img src="/images/cart-white.png" alt="Wholesale women's clothing Davi & Dani"> <b>{{ cartItems.length }}</b></span></li>
            </ul>
          </div>
        </div>
      </div>

    </div>
    <mobile-header-menu @closeModal="removeOverlay"></mobile-header-menu>
    <mobile-header-search @closeModal="removeOverlay" ref="headerComponent"></mobile-header-search>
    <mobile-header-user @closeModal="removeOverlay"></mobile-header-user>
    <mobile-header-cart @closeModal="removeOverlay"></mobile-header-cart>
    <div class="mobile_overlay" @click="removeOverlay"></div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import MobileHeaderMenu from './MobileHeaderMenu'
import MobileHeaderSearch from './MobileHeaderSearch'
import MobileHeaderUser from './MobileHeaderUser'
import MobileHeaderCart from './MobileHeaderCart'

export default {
  name:'MainMobileHeader',
  components: {MobileHeaderMenu, MobileHeaderSearch, MobileHeaderUser, MobileHeaderCart},
  computed: {
    ...mapGetters({
      cartItems: 'cartModule/getCartItems',
      user: 'authModule/getUser',
      whiteLogo: 'settingsModule/getWhiteLogo',
    }),
  },
  watch:{
    $route(to, form) {
      if (process.client) {
        this.removeOverlay()
      }
    }
  },
  methods: {
    searchCursorPointer() {
      setTimeout(() => {
        this.$refs.headerComponent.$refs.searchinput.focus();
      }, 50);
    },
    removeOverlay(){
      if(process.client) {
        $('body').removeClass('overflow_hidden');
        $('.mobile_overlay').removeClass('open');
        $('.show_from_left , .show_from_right').removeClass('open_h_menu');
        $('.menu.btn1').removeClass('open')
        $('.h_m_left ul li , .h_m_cart ul li').removeClass('active');
      }
    }

  },
}
</script>
