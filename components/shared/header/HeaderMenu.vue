<template>
  <div class="header_nav">
    <ul>
      <template v-for="category in categories">
        <template v-if="category.sub_categories.length">
          <li data-toggle="collapse_slide"
              :class="{active: $route.params.slug === category.slug}"
              :data-target="'#'+category.slug">
            <a href="JavaScript:void(0);">{{ capitalize(category.name) }}</a>
          </li>
          <div class="submenu" :id="category.slug">
            <div class="container">
              <div class="row">
                <div class="col-3" v-if="category.sub_categories.length">
                  <div class="submenu_list">
                    <h2 @click.prevent="closeMegaMenu(category.slug)">
                      <a role="button" class="cursor_pointer" @click="loadProducts(category.slug)">{{ capitalize(category.name) }}</a>
                    </h2>
                    <ul>
                      <li v-for="(sub, j) in category.sub_categories" :key="'sub_cat'+j" @click.prevent="closeMegaMenu(category.slug)">
                        <a role="button" class="cursor_pointer" @click="loadProducts(category.slug, sub.slug)">{{ capitalize(sub.name) }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <template v-if="category.top_category_banners && category.top_category_banners.length">
                  <div class="col-3" v-for="(banner, l) in category.top_category_banners" :key="'banner_'+l" v-if="l < 4">
                    <div class="submenu_list with_image" @click.prevent="closeMegaMenu(category.slug)">
                      <template v-if="banner.link">
                        <nuxt-link :to="banner.link">
                          <img :src="banner.image" alt="Wholesale women's clothing Davi & Dani" class="img-fluid">
                        </nuxt-link>
                      </template>
                      <template v-else>
                        <router-link :to="{ name: 'category-slug', params: { slug: category.slug }}" >
                          <img :src="banner.image" alt="Wholesale women's clothing Davi & Dani" class="img-fluid">
                        </router-link>
                      </template>

                      <template v-if="banner.link">
                        <nuxt-link :to="banner.link">
                          <h2> {{ banner.title }}</h2>
                        </nuxt-link>
                      </template>
                      <template v-else>
                        <router-link :to="{ name: 'category-slug', params: { slug: category.slug }}" >
                          <h2> {{ banner.title }}</h2>
                        </router-link>
                      </template>

                      <p>{{ banner.description }}</p>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <li :class="{active:$route.params.slug === category.slug}">
            <a role="button" class="cursor_pointer" @click="loadProducts(category.slug)">{{ capitalize(category.name) }}</a>
          </li>
        </template>
      </template>
      <li v-if="categories.length" :class="{active:$route.name === 'look-book'}">
        <router-link :to="{ name: 'look-book'}">Look Book</router-link>
      </li>
      <li v-if="categories.length" :class="{active:$route.name === 'davi-tv'}">
        <router-link v-if="$auth.loggedIn" :to="{ name: 'davi-tv'}">Davi TV</router-link>
        <router-link v-else :to="{ name: 'login'}">Davi TV</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      categories: [],
      slug: null,
      sub_slug: null,
      concat_slug: null,
      queryParams: {
        page: 1,
        sort: 1,
      },
    }
  },

  computed: {
    ...mapGetters({
      productsByCategory: 'Products/getProductsByCategory',
      pagination: 'Products/getPaginations',
      paginateOrSort: 'Products/getSortOrPaginateClick',
    }),
  },
  created() {
    this.$axios.get('/categories').then((response) => this.categories = response.data.data);
  },
  methods:{
    closeMegaMenu(e){
      $("#"+e).hide()
    },
    capitalize(text){
      return text.toLowerCase()
    },
    loadProducts(cat_slug, subcat_slug = ''){
      this.slug = cat_slug
      this.concat_slug = cat_slug
      this.sub_slug = subcat_slug
      if(this.sub_slug != '')
        this.concat_slug = this.slug + '/' + this.sub_slug
      if (this.concat_slug in this.productsByCategory && this.pagination[this.concat_slug].current_page === 1) {
        this.redirect();
      } else {
        this.sendRequest();
      }
    },

    sendRequest(){
      if(this.concat_slug) {
        this.$store.commit('preLoaderModule/setPreloader', true);
        Promise.all([
          this.$store.dispatch('Products/LoadProduct', {slug: this.concat_slug, params: this.queryParams}),
          this.$store.dispatch('Products/LoadCategory', this.concat_slug),
        ]).then(() => {
          this.redirect();
        }).finally(() => {
          if (process.client) {
            setTimeout(() => {
              this.$store.commit('preLoaderModule/setPreloader', false);
            }, 1000)
          }
        })
      }
    },
    redirect() {
      if(this.sub_slug != '')
        this.$router.push({ name: 'category-slug-sub_slug', params: { slug: this.slug, sub_slug: this.sub_slug }})
      else
        this.$router.push({ name: 'category-slug', params: { slug: this.slug }})
    }
  },
}
</script>
