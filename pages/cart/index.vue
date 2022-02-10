<template>
  <div>
    <section class="cart_area" v-if="items.length">
      <div class="cart_title">
        <h2>Shopping Cart</h2>
      </div>
      <div class="cart_content">
        <div class="cart_left">
          <div class="cart_table" >
            <table class="table">
              <colgroup>
                <col width="12%">
                <col width="50%">
                <col width="15%">
                <col width="15%">
                <col width="5%">
              </colgroup>
              <thead>
              <tr>
                <th>Product</th>
                <th></th>
                <th>SUBTOTAL</th>
                <th>Quantity</th>
                <th></th>
              </tr>
              </thead>
            </table>
            <div :class="{scroll: items.length > 4}">
              <table class="table" >
                <colgroup>
                  <col width="12%">
                  <col width="50%">
                  <col width="15%">
                  <col width="15%">
                  <col width="5%">
                </colgroup>
                <tbody >
                <tr v-for="(cartItem, cartItemKey) in items" :key="'cartItem_' + cartItemKey">
                  <td>
                    <div class="cart_product">
                      <router-link :to="{ name: 'product-slug', params: { slug: cartItem.item.slug }}">
                        <img :src="getColorImage(cartItem.color.id, cartItem.item)" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
                      </router-link>
                    </div>
                  </td>
                  <td>
                    <div class="cart_product_name">
                      <h2>
                        <router-link :to="{ name: 'product-slug', params: { slug: cartItem.item.slug }}">
                          {{ cartItem.item.name ? cartItem.item.name : 'No Specific Name' }}
                        </router-link>
                      </h2>
                      <p>
                        <span>USD ${{ cartItem.item.price_formatted }}</span>
                      </p>
                      <ul>
                        <li>Color : <span>{{ cartItem.color.name }}</span> </li>
                        <li>Pack : <span>{{ cartItem.item.pack.pack_text }}</span> </li>
                      </ul>
                    </div>
                  </td>
                  <td>USD ${{ Number(cartItem.item.price_formatted * cartItems[cartItemKey].quantity * cartItem.item.pack.total_item).toFixed(2) }}</td>
                  <td>
                    <div class="num_count">
                      <input type="text" class="qty" v-model="cartItem.quantity">
                      <button @click.prevent="updateCart(cartItem)">update</button>
                    </div>
                  </td>
                  <td><span class="close" @click.prevent="$store.dispatch('cartModule/removeFromCart', cartItem.id)"><i class="fas fa-times"></i></span></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="checkout_table_summery cart_table_mobile"  :class="{scroll: items.length > 4}">
            <table class="table mb_0">
              <colgroup>
                <col style="width: 92px;">
                <col>
              </colgroup>
              <tbody>
                <tr v-for="(cartItem, cartItemKey) in items" :key="'mob_cartItem_' + cartItemKey">
                  <td>
                    <div class="c_t_img">
                      <router-link :to="{ name: 'product-slug', params: { parent: cartItem.item.slug }}">
                        <img :src="getColorImage(cartItem.color.id, cartItem.item)" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
                      </router-link>
                    </div>
                  </td>
                  <td>
                    <div class="c_t_text">
                      <h2><router-link :to="{ name: 'product-slug', params: { parent: cartItem.item.slug }}"> {{cartItem.item && cartItem.item.name ? cartItem.item.name : 'No Specific Name'}} </router-link></h2>
                      <p>
                        <span>USD:</span>
                        <span class="float-right">${{cartItem.item.price }}</span>
                      </p>
                      <ul>
                        <li v-if="cartItem.color">Color : <span>{{cartItem.color ? cartItem.color.name : 'Not set'}}</span> </li>
                        <li v-if="cartItem.pack">Pack : <span> {{ cartItem.item.pack.pack_text }}</span> </li>
                        <li>Qty: <span><input type="text" class="qty text-right" v-model="cartItem.quantity"></span></li>
                        <li class="text-right width_full" @click.prevent="updateCart(cartItem)"><span></span> <span>Update</span> </li>
                        <li class="text-right width_full" @click.prevent="$store.dispatch('cartModule/removeFromCart', cartItem.id)"> <span></span>  <span><i class="fas fa-times"></i></span> </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="update_cart xx" >
              <span @click.prevent="updateCart">Update Cart</span>
            </div>
          </div>
        </div>
        <div class="cart_right">
          <div class="cart_right_table">
            <table class="table">
              <tbody>
              <tr>
                <td>SUBTOTAL</td>
                <td>USD ${{ Number(cartTotal - useCredit).toFixed(2) }}</td>
              </tr>
              <tr v-if="useCredit && useCredit > 0">
                <td>Store Credit</td>
                <td>USD ${{ Number(useCredit).toFixed(2) }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="checkout_reword mt_15 mb_15" v-if="storeCredit && storeCredit.amount > 0">
            <input type="number" placeholder="Store Credit" class="form-control" @input="useStoreCredit" v-model="useCredit">
            <span>Available Store Credit ( <span> {{ storeCredit.amount }} </span> )</span>
            <div v-if="creditError"><small><span class="text-danger">{{ creditError }}</span></small></div>
          </div>
          <div class="proceed_btn text-center">
            <router-link :to="{name:'checkout'}" class="btn btn_common" v-if="items.length">
              <i class="lni lni-lock"></i> <span class="ml_5">Pay Securely Now</span>
            </router-link>
            <router-link :to="{ name: 'index'}" class="btn btn_transparent" v-else>
              <i class="fas fa-shopping-cart"></i> <span class="ml_5">Continue Shopping</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="cart_area mt_20 pt_20" v-if="relatedItems.length">
        <div class="related_product_content p-0">
          <div class="title">You Might Like</div>
          <div class="product_content_wrap">
            <product-component v-for="(product, productKey) in relatedItems" :key="'product_' + productKey" :product="product" :imageBlock="$auth.loggedIn ? false : true" :priceBlock="$auth.loggedIn ? false : true"></product-component>
          </div>
        </div>
        <div class="r_p_c_mobile">
          <client-only>
            <carousel :responsive="{0:{items:2},400:{items:2},768:{items:3},1200:{items:4}}" :dots="false" :nav="true">
              <div class="home_slider_inner" v-for="(product, productKey) in relatedItems" :key="'product_' + productKey">
                <div class="home_slider_inner_content">
                  <nuxt-link :to="{ name: 'product-slug', params: { slug: product.slug }}">
                    <img v-if="$auth.loggedIn && product.images.length" :src="product.images[0].compressed_image" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
                    <img v-else src="/images/no-image.png" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">

                    <h2>{{ product.name ? product.name : 'No Specific Name' }}</h2>
                    <p class="text-dark">{{ product.style_no }} |
                      <span class="text-dark d-inline" v-if="$auth.loggedIn">USD ${{ product.price_formatted }}</span> <nuxt-link class="d-inline" v-else :to="{name:'login'}">Login</nuxt-link>
                    </p>
                  </nuxt-link>
                </div>
              </div>
            </carousel>
          </client-only>
        </div>
    </section>

  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ProductComponent from "../../components/shared/ProductComponent";

export default {
  components: {ProductComponent},
  middleware: 'auth',
  data() {
    return {
      items: [],
      relatedItems: [],
      storeCredit: null,
      creditError: false,
      useCredit: 0,
    }
  },
  computed: {
    ...mapGetters({
      cartItems: 'cartModule/getCartItems',
      user: 'authModule/getUser',
      cartTotal: 'cartModule/getCartTotal',
    }),
  },
  beforeCreate() {
    this.$store.commit('settingsModule/setContentLoad', false);
  },
  created() {
    this.items = _.cloneDeep(this.cartItems);
    this.$axios.get('/customer/store-credit')
      .then((response)=>{
        this.storeCredit = response.data.data
      })
      this.$axios.get('/recent-view')
        .then((res) => this.relatedItems = res.data.data)
        .catch(() => {})
        .finally(()=>{
          this.$store.commit('settingsModule/setContentLoad', true);
        })
  },
  watch: {
    cartItems: {
      deep: true,
      handler(newVal) {
        this.items = _.cloneDeep(newVal);
      }
    }
  },
  mounted() {
    if (process.client) {
      $(document).mouseup();
    }
  },
  methods: {
    updateCart(item) {
      this.$axios.post('/carts/'+item.id, {...item, ...{'_method': 'patch'}})
        .then((response) => {
          this.showSuccessMsg('Cart Updated.')
          this.$store.commit('cartModule/setCartItems', response.data.data);
        })
        .catch((err) => {
          if (err.response.data.errors.quantity) {
            this.showFailMsg(err.response.data.errors.quantity[0]);
          }
        })
    },
    useStoreCredit(){
      if(this.useCredit > this.storeCredit.amount) {
        this.creditError = 'Store credit can\'t be more than '+this.storeCredit.amount;
        this.useCredit = 0;
      }else if(this.useCredit > this.cartTotal){
        this.useCredit = 0;
        this.creditError = 'Store credit can\'t be more than subtotal.';
      } else{
        this.$store.commit('checkoutModule/setStoreCredit', parseInt(this.useCredit));
      }
    },
  }
}
</script>
