<template>
  <div>
    <div class="header_cart h_o_dropdown" id="cart" v-if="cartItems.length">
      <div class="header_cart_inner">
        <ul :class="{scroll: cartItems.length > 2}">
          <li v-for="(cartItem, cartIndex) in cartItems" :key="'cartItem_' + cartIndex">
            <div class="cross_ic" @click.prevent="$store.dispatch('cartModule/removeFromCart', cartItem.id)"></div>
            <div class="h_c_inner_left">
              <router-link :to="{ name: 'product-slug', params: { slug: cartItem.item.slug }}">
                <img :src="getColorImage(cartItem.color.id, cartItem.item)" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
              </router-link>
            </div>
            <div class="h_c_inner_right">
              <h3>
                <router-link :to="{ name: 'product-slug', params: { slug: cartItem.item.slug }}">
                  {{ cartItem.item.style_no }}
                </router-link>
              </h3>
              <div class="h_c_inner_info">
                <ul>
                  <li v-if="cartItem.color"><span>Color</span> {{ cartItem.color.name }}</li>
                  <li><span>Price</span> USD$ {{ cartItem.item.price_formatted }}</li>
                  <li><span>Quantity</span> {{ cartItem.quantity ? cartItem.quantity : 0 }}</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
        <p class="subototal">
          <span>CART SUBTOTAL:</span>
          <span>USD$ {{Number(cartTotal).toFixed(2) }}</span>
        </p>
        <div class="h_c_button">
          <router-link :to="{ name: 'checkout'}" class=" btn btn_common mb_10">
            <img src="/images/cart-white.png" alt="Wholesale women's clothing Davi & Dani"> <span class="ml_5">Checkout</span>
          </router-link>
          <router-link :to="{ name: 'cart'}" class=" btn btn_common">
            View cart
          </router-link>
        </div>
      </div>
    </div>
    <div class="header_cart h_o_dropdown empty_cart" id="cart" v-else>
      <div class="header_cart_inner">
        <h2>You have no items in your shopping cart.</h2>
      </div>
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
  }
}
</script>
