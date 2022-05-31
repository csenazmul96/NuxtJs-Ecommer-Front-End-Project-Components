<template>
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

    <filter-component @filterProduct="filterProduct"></filter-component>

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
</template>

<script>
import ProductComponent from "@/components/shared/ProductComponent";
import FilterComponent from "@/components/shared/FilterComponent";
import Pagination from "@/components/shared/Pagination";
import {mapGetters} from "vuex";
import ProductLoadPreloader from "../../../components/shared/ProductLoadPreloader";
export default {
  components: {ProductLoadPreloader, ProductComponent, FilterComponent, Pagination},
  data() {
    return {
      breadcrumbsWidth: null,
      breadcrumbsShow: false,
      products: [],
      productLoaded: true,
      paginations: [],
      queryParams: {
        page: 1,
        sort: 1,
      },
      height: null,
      categoryOgContent: null,
    }
  },
  head() {
    return {
      title: this.category && this.category.meta && this.category.meta.title ? this.category.meta.title : process.env.NUXT_ENV_TITLE,
      meta: [
        {
          name: 'title',
          content: this.category && this.category.meta && this.category.meta.title ? this.category.meta.title : process.env.NUXT_ENV_TITLE
        },
        {
          name: 'description',
          content: this.category && this.category.meta && this.category.meta.description ? this.category.meta.description : process.env.NUXT_ENV_DESCRIPTION
        },
        {
          property: 'og:locale',
          content: 'en_US'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:title',
          content: this.category && this.category.meta && this.category.meta.title ? this.category.meta.title : process.env.NUXT_ENV_TITLE
        },
        {
          property: 'og:description',
          content: this.category && this.category.meta && this.category.meta.description ? this.category.meta.description : process.env.NUXT_ENV_DESCRIPTION
        },
        {
          property: 'og:url',
          content: 'https://davidani.com' + this.$route.fullPath
        },
        {
          property: 'og:site_name',
          content: 'Davi & Dani'
        },
        {
          property: 'og:image',
          content: this.categoryOgContent ? this.categoryOgContent.images[0].compressed_image : 'https://davidani.com/images/static-product.jpg'
        },
        {
          property: 'twitter:card',
          content: 'summary'
        },
        {
          property: 'twitter:title',
          content: this.category && this.category.meta && this.category.meta.title ? this.category.meta.title : process.env.NUXT_ENV_TITLE
        },
        {
          property: 'twitter:description',
          content: this.category && this.category.meta && this.category.meta.description ? this.category.meta.description : process.env.NUXT_ENV_DESCRIPTION
        },
        {
          property: 'twitter:url',
          content: 'https://davidani.com' + this.$route.fullPath
        },
        {
          property: 'twitter:image',
          content: this.categoryOgContent ? this.categoryOgContent.images[0].compressed_image : 'https://davidani.com/images/static-product.jpg'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://davidani.com' + this.$route.fullPath,
        }
      ],
    }
  },
  watch: {
    'productsByCategory': function () {
        this.productFilter()
    },
    "$route.params.slug": {
      handler: function(value) {
          this.productFilter()
      },
      deep: true,
      immediate: true,
    },
    "$route.query.page": {
      handler: function(value) {
        if(this.$route.query.page) {
          this.queryParams.page = this.$route.query.page
          this.sendServerRequest()
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapGetters({
      user: 'authModule/getUser',
      productsByCategory: 'Products/getProductsByCategory',
      getPagination: 'Products/getPaginations',
      category: 'Products/getProductCategory',
    }),
  },
  created() {
    if(!this.products.length) {
      this.loadProducts();
    }
  },
  async fetch() {
    if(!this.category) {
      await this.categoryDetails()
    };
    await this.categoryOgContentDetails();
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
    productFilter(){
      if (this.productsByCategory && this.$route.params.slug in this.productsByCategory) {
        this.products = this.productsByCategory[this.$route.params.slug]
      } else
        this.products = [];

      if (this.getPagination && this.$route.params.slug in this.getPagination) {
        this.paginations = this.getPagination[this.$route.params.slug]
      } else
        this.paginations = [];
    },
    loadProducts() {
      this.$store.dispatch('Products/LoadProduct', {slug: this.$route.params.slug, params: {...this.$route.query}}).finally(()=>{
        this.productFilter()
        this.$store.commit('preLoaderModule/setPreloader', false);
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
      this.$store.commit('Products/setSortOrPaginateClick', true)
      this.queryParams.page = page
      this.filterAndPaginatePage()
    },
    filterProduct(id){
      this.$store.commit('Products/setSortOrPaginateClick', true)
      this.queryParams.sort = id
      this.filterAndPaginatePage()
    },
    filterAndPaginatePage(){
        this.$router.push({name: this.$route.name, params: {...this.$route.params, ...{page: this.queryParams.page}}, query: {...this.$route.query, ...{sort: this.queryParams.sort}, ...{page: this.queryParams.page}}})
    },
    sendServerRequest(){
      this.$store.commit('preLoaderModule/setPreloader', true);
      this.$store.dispatch('Products/LoadProduct', {slug:this.$route.params.slug, params: this.queryParams}).finally(()=>{
        this.$store.commit('preLoaderModule/setPreloader', false);
      })
    },
    capitalize(text){
      return text.toLowerCase()
    },

    categoryDetails(){
      this.$store.dispatch('Products/LoadCategory', this.$route.params.slug).then(()=>{
        this.$store.commit('preLoaderModule/setPreloader', false);
      })
    },

    async categoryOgContentDetails(){
      await this.$axios.get('/og-category-products/' + this.$route.params.slug)
        .then((res) => {
          this.categoryOgContent = res.data.data;
          this.$store.commit('preLoaderModule/setPreloader', false);
        })
        .catch(() => {
        });
    }
  }
}
</script>

