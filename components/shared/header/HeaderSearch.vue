<template>
  <div class="header_search h_o_dropdown" id="search">
    <div class="header_search_form">
      <div class="header_search_form_inner">
        <input type="text" class="form-control" ref="searchInput" v-model="searchString">

        <button class="btn"><i class="lni lni-search-alt"></i></button>
        <span @click.prevent="hideSearchBar">Close</span>
      </div>
    </div>
    <p class="search_text" v-if="loading" >Loading... <i class="fa fa-spinner fa-spin"></i></p>
    <p class="search_text" v-if="!showSearchResult && !searchString.length" >PLEASE TYPE AT LEAST 3  CHARACTERS FOR SEARCH SUGGESTIONS.</p>
    <p class="search_text" v-if="!showSearchResult && searchString.length > 0 && searchString.length < 3">PLEASE TYPE AT LEAST {{3 - searchString.length}} MORE CHARACTERS FOR SEARCH SUGGESTIONS.</p>
    <p class="search_text" v-if="!loading && showSearchResult && !searchedItems.length">
      Nothing to show in search result
    </p>

    <div class="header_search_details" v-if="showSearchResult && searchedItems.length">
      <div class="h_s_details_inner_full_width">
        <p>Product Search</p>
        <div class="header_search_scroll">
          <ul>
            <li v-for="(searchedItem, searchedItemIndex) in searchedItems" :key="'deskSearchedItemIndex_'+searchedItemIndex">
              <nuxt-link :to="{ name: 'product-slug', params: { slug: searchedItem.slug }}">
                <template v-if="$auth.loggedIn">
                  <img v-if="searchedItem.images.length" :src="searchedItem.images[0].thumbs_image" class="img-fluid">
                  <img v-else src="/images/no-image.png" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
                </template>
                <img v-else :src="defaultImage" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
              </nuxt-link>
              <div class="a_r_text">
                <h3>
                  <nuxt-link :to="{ name: 'product-slug', params: { slug: searchedItem.slug }}">
                    {{ searchedItem.name ? searchedItem.name : 'No Specific Name' }}
                  </nuxt-link>
                </h3>
                <p>
                  <span v-if="$auth.loggedIn">USD ${{ searchedItem.price }}</span>
                  <span v-else><router-link :to="{name:'login'}">Login</router-link></span>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <nuxt-link class="btn_common" :to="{ name: 'search', query: { q: searchString } }">
          View All Product
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  name:'headerSearchComponent',
  data() {
    return {
      searchString: '',
      showSearchResult: false,
      searchedItems: []
    }
  },
  watch: {
    searchString(val) {
      this.showSearchResult = false;
      this.searchedItems = [];

      if (val.length >= 3) {
        this.loading = true;
        this.$axios.get('/search?q=' + val)
          .then((response) => {
            this.searchedItems = response.data.data;
            this.showSearchResult = true;
            this.loading = false;
          })
      }
    }
  },
  computed: {
    ...mapGetters({
      defaultImage: 'settingsModule/getDefaultImage',
    }),
  },
  methods: {
    hideSearchBar() {
      $('*[data-target="#search"]').click();
    }
  }
}
</script>

<style scoped>
  .header_search_scroll{
    max-height: 550px;
    overflow: auto;
    margin-bottom: 20px;
  }
</style>
