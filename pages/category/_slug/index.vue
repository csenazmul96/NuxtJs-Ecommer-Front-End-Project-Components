<template>
  <!-- ============================
      START PRODUCT SECTION
  ============================== -->
  <section class="product_area" :style="productAreaCss">
    <div class="product_banner" >
      <img v-if="category && category.image" :src="category.image" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
      <div class="inner_text">
        <template v-if="category">
          <h1>{{ category.name }}</h1>
          <p>{{ category.description }}</p>
        </template>
        <template v-else>
          <h1></h1>
          <p></p>
        </template>
      </div>
    </div>

    <div :class="['hl_bredcrumbs']" >
      <ul class="breadcrumb">
        <li><router-link :to="{ name: 'index'}" > Home</router-link></li>
        <li><template v-if="category">{{ capitalize(category.name) }}</template></li>
      </ul>
    </div>

    <filter-component></filter-component>

    <div class="product_content">
      <div class="product_wrap">
        <div class="product_content_wrap" v-if="products.length">
          <product-component v-for="(product, productKey) in products" :key="'product_' + productKey" :product="product" :height="height" :imageBlock="$auth.loggedIn ? false : true" :priceBlock="$auth.loggedIn ? false : true"></product-component>
        </div>
        <div class="no_result"></div>
        <pagination v-if="products.length" :paginateData="paginations" @changePage="changePage"></pagination>
      </div>
    </div>
  </section>
  <!-- ============================
      END PRODUCT SECTION
  ============================== -->
</template>

<script>
import ProductComponent from "@/components/shared/ProductComponent";
import FilterComponent from "@/components/shared/FilterComponent";
import Pagination from "@/components/shared/Pagination";
import {mapGetters} from "vuex";
import ProductLoadPreloader from "../../../components/shared/ProductLoadPreloader";
export default {
  components: {ProductLoadPreloader, ProductComponent, FilterComponent, Pagination},
  head() {
    return {
      title: this.category && this.category.meta && this.category.meta.title ? this.category.meta.title : process.env.NUXT_ENV_TITLE,
      meta: [
        {
          name: 'description',
          content: this.category && this.category.meta && this.category.meta.description ? this.category.meta.description : process.env.NUXT_ENV_DESCRIPTION
        }
      ]
    }
  },
  data() {
    return {
      breadcrumbsWidth: null,
      breadcrumbsShow: false,
      category: null,
      products: [],
      paginations:[],
      queryParams: [],
      height: null,
    }
  },
  computed: {
    ...mapGetters({
      user: 'authModule/getUser',
    }),
  },
  watch: {
    $route(to) {
      if (to.name === 'category-slug') {
        const newQueryParams = this.getAllQueryParams();

        if (!_.isEqual(newQueryParams, this.queryParams)) {
          this.loadProducts();
        }

        this.queryParams = newQueryParams;
      }
    }
  },
  mounted() {
    if (process.client) {
      this.queryParams = this.getAllQueryParams();
    }
  },
  beforeCreate() {
    this.$store.commit('settingsModule/setContentLoad', false);
  },
  created() {
    this.loadProducts();
  },
  async fetch() {
    this.products = this.$store.getters["preLoaderModule/getPreProducts"];

    await this.$axios.get('/categories/'+this.$route.params.slug)
      .then((response) => this.category = response.data.data)
      .catch(() => {
        this.$root.error({'statusCode': 404, 'message': 'Not Found.'})
      })
  },
  updated() {
    if (process.client) {
      $('.submenu , .f_bottom').each(function () {
        let dropdown = $(this);
        dropdown.slideUp();
      });
      this.breadcrumbsWidth = this.$refs.productHeading ? this.$refs.productHeading.clientWidth : 0;
      this.breadcrumbsShow = true;
      this.mobCloseMenu();
    }
  },
  methods: {
    loadProducts() {
      //this.products = [];

      this.$store.commit('preLoaderModule/setPreloader', true);
      this.$axios.get('/category-products/'+this.$route.params.slug, {
          params: this.$route.query
        })
        .then((response) => {
          this.products = [];

          if(process.client)
            this.height = $(".product_img_wrap").outerHeight()

          this.paginations = response.data.meta
          this.products = response.data.data

          this.$store.commit('preLoaderModule/setPreProducts', response.data.data);

          if(!this.products.length)
            $(".no_result").html('<div class="noresult_msg"><p class="text-center full_width d-block">No Result Found</p></div>');

          this.$store.commit('settingsModule/setContentLoad', true);
          this.$store.commit('preLoaderModule/setPreloader', false);
        })
        .catch(() => {
          this.$store.commit('settingsModule/setContentLoad', true);
          this.$store.commit('preLoaderModule/setPreloader', false);
        })
        .finally(()=> {

        })
    },
    productAreaCss() {
      if (process.client) {
        if ($(window).width() >= 1024) {
          return {
            'min-height': `${this.breadcrumbsWidth + 60}px`,
          };
        } else {
          return {
            'min-height': 'auto',
          }
        }
      }
    },
    changePage(page){
      this.$router.push({name: this.$route.name, params: {...this.$route.params, ...{page: Number(page)}}, query: {...this.$route.query, ...{sort: 4}, ...{page: Number(page)}}})
    },
    capitalize(text){
      return text.toLowerCase()
    }
  }
}
</script>

