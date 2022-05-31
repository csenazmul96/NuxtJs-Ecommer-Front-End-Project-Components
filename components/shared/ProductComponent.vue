<template>
  <div class="product_content_inner">
    <div class="product_inner_wrap">
      <div class="product_img_wrap load_product" ref="item" :style="{ height: `${height}px` }">
<!--        <router-link :to="{ name: 'product-slug',  params: { slug: product.slug }}">-->
          <a role="button" class="cursor_pointer" @click="loadProducts(product.slug)">
          <img :data-src="imageUrl()"
               class="img-fluid p_img"
               @load="imageLoaded($event)"
               v-lazy-load
               :alt="'wholesale clothing ' + product.name + ' davi & dani'">
          <video v-if="!imageBlock && product.video" width="100%" loop muted playsinline autoplay preload="metadata" class="on_hover">
            <source class="product-video" :src="product.video" type="video/mp4">
          </video>
          <img v-else :src="hoverImage()"
               class="img-fluid on_hover"
               :class="{'d_none': !hoverimage}"
               :alt="'wholesale clothing ' + product.name + ' davi & dani'">
          </a>
      </div>
      <div class="product_details_text">
        <h2 class="product_title">
          <router-link :to="{ name: 'product-slug', params: { slug: product.slug }}">
            {{product && product.name ? product.name : 'No Specific Name'}}
          </router-link>
        </h2>
        <p class="product_price" >
          <span>{{ product.style_no }} </span> |
          <span v-if="$auth.loggedIn">USD ${{ product.price_formatted }}</span> <span v-else><nuxt-link :to="{name:'login'}">Login</nuxt-link>
        </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
export default {
  name:'ProductComponent',
  data(){
    return {
      hoverimage: false,
    }
  },
  props: {
    product: {
      type: Object,
      required: true
    },
    imageBlock: Boolean,
    priceBlock: Boolean,
    height: null,
  },
  computed: {
    ...mapGetters({
      defaultImage: 'settingsModule/getDefaultImage',
    }),
  },
  methods: {
    loadProducts(slug){
      this.$store.commit('preLoaderModule/setPreloader', true);
      Promise.all([
        this.$store.dispatch('Products/LoadSingleProduct', slug),
      ]).then(()=>{
          this.$router.push({ name: 'product-slug',  params: { slug: slug }})
      })
    },
    imageUrl() {
      if(!this.imageBlock) {
          return this.product.images.length ? this.product.images[0].compressed_image : this.product.no_image
      }else{
        return this.defaultImage
      }
    },
    hoverImage(){
      if(!this.imageBlock) {
        if (this.product.images.length > 1) {
          this.hoverimage = true;
          return this.product.images[1].compressed_image
        }else {
          this.hoverimage = false;
        }
      }else{
        this.hoverimage = false;
      }
    },
    imageLoaded(event){
       let div = event.target.parentElement.parentElement
        div.style.height = 'auto'
    }
  }
}
</script>
