<template>
  <section class="product_area search_page_product">
    <div class="hl_bredcrumbs">
      <ul class="breadcrumb">
        <li><a href="/" class="router-link-active"> Home</a></li>
        <li v-if="$route.query">{{ $route.query.q }}</li>
      </ul>
    </div>

    <filter-component></filter-component>

    <div class="product_content">
      <div class="product_wrap">
        <div class="product_content_wrap" v-if="products.length">
          <product-component v-for="(product, productKey) in products" :key="'product_' + productKey" :product="product" :height="height" :imageBlock="$auth.loggedIn ? false : true" :priceBlock="$auth.loggedIn ? false : true"></product-component>
        </div>
        <div class="no_result"></div>
      </div>
    </div>
  </section>
</template>

<script>
import ProductComponent from "@/components/shared/ProductComponent";
import FilterComponent from "@/components/shared/FilterComponent";
import {mapGetters} from "vuex";
import ProductLoadPreloader from "../../components/shared/ProductLoadPreloader";
export default {
  components: {ProductLoadPreloader, ProductComponent, FilterComponent},
  data() {
    return {
      products: [],
      height: null,
    }
  },
  watch: {
    $route() {
      this.loadProducts();
    }
  },
  computed: {
    ...mapGetters({
      user: 'authModule/getUser',
    }),
  },
  async created() {
    this.$store.commit('preLoaderModule/setPreloader', true);
    this.$store.commit('settingsModule/setContentLoad', false);
    await this.loadProducts();
  },
  updated() {

    if (process.client) {
      this.mobCloseMenu();
    }
  },
  mounted() {
    if (process.client) {
      $(document).mouseup();
    }
  },
  methods: {
    async loadProducts() {
      this.products = [];
      await this.$axios.get('/search', {
        params: this.$route.query
      })
        .then((response) => {
          this.products = response.data.data
          if(!this.products.length)
            $(".no_result").html('<div class="noresult_msg"><p class="text-center full_width d-block">No Result Found</p></div>');
        })
        .catch(() => {})
        .finally(()=>{
          if(process.client)
            this.height = $(".product_img_wrap").outerHeight()

          if(process.client){
            setTimeout(function (){
              $(".product_img_wrap").css({'height':'auto'})
            }, 1000);
          }
          this.$store.commit('preLoaderModule/setPreloader', false);
          this.$store.commit('settingsModule/setContentLoad', true);
        })

    },
  }
}
</script>
