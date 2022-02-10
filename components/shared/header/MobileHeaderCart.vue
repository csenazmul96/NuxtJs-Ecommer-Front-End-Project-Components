<template>
  <div class="show_from_right" id="mcart">
    <div class="header_menu_inner">
      <div class="header_cart" v-if="cartItems.length">
        <div class="header_cart_inner">
          <ul :class="{scroll:cartItems.length > 2}">
            <li v-for="(cartItem, cartIndex) in cartItems" :key="'mob_cartItem_' + cartIndex">
              <div class="cross_ic"  @click.prevent="$store.dispatch('cartModule/removeFromCart', cartItem.id)"></div>
              <div class="h_c_inner_left">
                <nuxt-link :to="{ name: 'product-slug', params: { slug: cartItem.item.slug }}">
                  <img :src="getColorImage(cartItem.color.id, cartItem.item)" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
                </nuxt-link>
              </div>
              <div class="h_c_inner_right">
                <h3>
                  <nuxt-link :to="{ name: 'product-slug', params: { slug: cartItem.item.slug }}">
                    {{ cartItem.item.name }}
                  </nuxt-link>
                </h3>
                <div class="h_c_inner_info">
                  <ul>
                    <li v-if="cartItem.color"><span>Color</span> {{ cartItem.color.name }}</li>
                    <li><span>Price</span> USD$ {{ cartItem.item.price }}</li>
                    <li><span>Quantity</span> {{ cartItem.quantity ? cartItem.quantity : 0 }}</li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
          <p class="subototal">
            <span>CART SUBTOTAL:</span>
            <span>USD$ {{ Number(cartTotal).toFixed(2) }}</span>
          </p>
          <div class="h_c_button">
            <nuxt-link :to="{ name: 'checkout'}" class=" btn btn_common mb_10">
              <i class="fas fa-shopping-cart"></i> <span class="ml_5">Checkout</span>
            </nuxt-link>
            <nuxt-link :to="{ name: 'cart'}" class=" btn btn_common">
              View cart
            </nuxt-link>
          </div>
        </div>
      </div>

      <div class="header_cart empty_cart" id="cart" v-else>
        <div class="header_cart_inner">
          <h2>You have no items in your shopping cart.</h2>
        </div>
      </div>
    </div>
    <div class="close_h_menu" @click.prevent="mobCloseMenu">
      <span>Close</span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      cartItems: 'cartModule/getCartItems',
      cartTotal: 'cartModule/getCartTotal',
      user: 'authModule/getUser'
    }),
  },
  methods: {
    mobCloseMenu() {
      $('.h_m_left ul li , .h_m_cart ul li').removeClass('active');

      $('.show_from_left , .show_from_right').removeClass('open_h_menu');
      $('.mobile_overlay').removeClass('open');
      $('.menu').removeClass('open');
      $('.h_m_left ul li , .h_m_cart ul li').removeClass('active');
      $('body').removeClass('overflow_hidden');
    },
  }
}
</script>
