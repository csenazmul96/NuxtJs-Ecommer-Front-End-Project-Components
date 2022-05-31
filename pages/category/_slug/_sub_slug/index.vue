<template>
  <!-- ============================
      START PRODUCT SECTION
  ============================== -->
  <section class="product_area" :style="productAreaCss">
    <div class="product_banner">
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

    <div :class="['hl_bredcrumbs']">
      <ul class="breadcrumb">
        <li><router-link :to="{ name: 'index'}"> Home</router-link></li>
        <li><template v-if="parentCategory"><router-link :to="{ name: 'category-slug', params: { slug: parentCategory.slug }}"> {{ capitalize(parentCategory.name) }}</router-link></template></li>
        <li><template v-if="category">{{ capitalize(category.name) }}</template></li>
      </ul>
    </div>

    <filter-component @filterProduct="filterProduct"></filter-component>

    <div class="product_content">
      <div class="product_wrap">
        <client-only>
          <template v-if="products.length">
            <div class="product_content_wrap">
              <product-component v-for="(product, productKey) in products" :key="'product_' + productKey" :product="product" :height="height"  :imageBlock="$auth.loggedIn ? false : true" :priceBlock="$auth.loggedIn ? false : true"></product-component>
            </div>
            <pagination :paginateData="paginations" @changePage="changePage"></pagination>
          </template>
        </client-only>
      </div>
    </div>
  </section>
</template>

<script>
import ProductComponent from "@/components/shared/ProductComponent";
import FilterComponent from "@/components/shared/FilterComponent";
import {mapGetters} from "vuex";
import Pagination from "@/components/shared/Pagination";
import ProductLoadPreloader from "../../../../components/shared/ProductLoadPreloader";
export default {
  components: {ProductLoadPreloader, ProductComponent, FilterComponent, Pagination},

  data() {
    return {
      breadcrumbsWidth: null,
      breadcrumbsShow: false,
      parentCategory: null,
      products: [],
      productLoaded: true,
      paginations: [],
      height: null,
      queryParams: {
        page: 1,
        sort: 1,
      },
      categoryOgContent: null,
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
  computed: {
    ...mapGetters({
      user: 'authModule/getUser',
      productsByCategory: 'Products/getProductsByCategory',
      getPagination: 'Products/getPaginations',
      category: 'Products/getProductCategory',
    }),
  },

  beforeCreate() {
    this.$store.commit('settingsModule/setContentLoad', false);
  },
  created() {
    if(!this.products.length) {
      this.loadProducts();
    }
    if(process.client){
      setTimeout(()=>{
        this.$store.commit('preLoaderModule/setPreloader', false);
      }, 500)
    }
  },

  async fetch() {
    if(!this.category)
      this.categoryDetails()

    await this.parentCategoryDetails();
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
      let slug = this.$route.params.slug+'/'+this.$route.params.sub_slug
      if (this.productsByCategory && slug in this.productsByCategory) {
        this.products = this.productsByCategory[slug]
      } else
        this.products = [];

      if (this.getPagination && slug in this.getPagination) {
        this.paginations = this.getPagination[slug]
      } else
        this.paginations = [];
    },
    loadProducts() {
      this.$store.dispatch('Products/LoadProduct', {slug:this.$route.params.slug+'/'+this.$route.params.sub_slug, params: {...this.$route.query}}).finally(()=>{
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
        this.$store.dispatch('Products/LoadProduct', {slug:this.$route.params.slug +'/'+this.$route.params.sub_slug, params: this.queryParams}).then(()=>{
          this.$store.commit('preLoaderModule/setPreloader', false);
      })
    },
    capitalize(text){
      return text.toLowerCase()
    },
    categoryDetails(){
      this.$store.dispatch('Products/LoadCategory', this.$route.params.slug+'/'+this.$route.params.sub_slug).then(()=>{
        this.$store.commit('preLoaderModule/setPreloader', false);
      })
    },

    async parentCategoryDetails(){
      await this.$axios.get('/categories/' + this.$route.params.slug)
        .then((res) => {
          this.parentCategory = res.data.data;
          if(!this.parentCategory)
            return this.$router.push({name:'index'})
        })
        .catch(() => {
          this.$router.push({name:'index'})
        });
    },

    async categoryOgContentDetails(){
      await this.$axios.get('/og-category-products/' + this.$route.params.slug+'/'+this.$route.params.sub_slug)
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
