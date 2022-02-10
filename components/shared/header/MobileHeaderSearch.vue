<template>
  <div class="show_from_left" id="msearch" ref="msearch">
    <div class="header_menu_inner">
      <div class="header_search">
        <div class="header_search_form">
          <div class="header_search_form_inner">
            <input type="text" ref="searchinput" class="form-control" v-model="searchString">
            <button class="btn"><i class="lni lni-search-alt"></i></button>
            <span @click.prevent="hideSearchBar">close</span>
          </div>
        </div>
        <p class="search_text" v-if="loading" >Loading... <i class="fa fa-spinner fa-spin"></i></p>
        <p class="search_text" v-if="!showSearchResult && !searchString.length" >PLEASE TYPE AT LEAST 3  CHARACTERS FOR SEARCH SUGGESTIONS.</p>
        <p class="search_text" v-if="!showSearchResult && searchString.length > 0 && searchString.length < 3">PLEASE TYPE AT LEAST {{3 - searchString.length}} MORE CHARACTERS FOR SEARCH SUGGESTIONS.</p>
        <p class="search_text" v-if="!loading && showSearchResult && !searchedItems.length">
          Nothing to show in search result
        </p>

        <div class="h_s_details_inner_full_width" v-if="showSearchResult && searchedItems.length">
          <p>Product Search</p>
          <ul v-bind:style="{'height': (searchedItems.length > 2) ? '300px': 'auto'}">
            <template v-for="(searchedItem, searchedItemIndex) in searchedItems">
              <li :key="'deskSearchedItemIndex_'+searchedItemIndex" v-if="searchedItemIndex < 4">
                <nuxt-link :to="{ name: 'product-slug', params: { slug: searchedItem.slug }}">
                  <template v-if="$auth.loggedIn">
                    <img v-if="searchedItem.images.length" :src="searchedItem.images[0].thumbs_image" class="img-fluid">
                    <img v-else src="/images/no-image.png" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
                  </template>
                  <img v-else :src="defaultImage" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
                </nuxt-link>
                <div class="a_r_text">
                  <h3>
                    <router-link :to="{ name: 'product-slug', params: { slug: searchedItem.slug }}">
                      {{ searchedItem.name ? searchedItem.name : 'No Specific Name' }}
                    </router-link>
                  </h3>
                  <p>
                    <span v-if="$auth.loggedIn">USD ${{ searchedItem.price }}</span>
                    <span v-else><router-link :to="{name:'login'}">Login</router-link></span>
                  </p>
                </div>
              </li>
            </template>
          </ul>
          <a class="btn_common" @click.prevent="showSearchPage" href="javascript:void(0)">View All Product</a>
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
  name:'headerMobileSearchComponent',
  data() {
    return {
      searchString: '',
      showSearchResult: false,
      searchedItems: []
    }
  },
  watch: {
    searchString(val) {
      this.$refs.msearch.classList.value ='show_from_left open_h_menu'
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
    searchInSite(event){
      if (event.keyCode === 13) {
        this.$router.push('/search?s=' + this.searchString);
      }
      event = (event) ? event : window.event;
      this.searchString = event.target.value;
      let formdata = {
        search_text: this.searchString,
      }
      if(this.searchString.length >= 3) {
        this.showSearchResult = true;
        this.$store.dispatch('defaultStore/searchInSite', formdata);
        return;
      }
      this.showSearchResult = false
    },
    mobCloseMenu() {
      this.$emit('closeModal')
    },
    hideSearchBar(){
      $('.header_search').hide();
    },
    showSearchPage(){
      this.$router.push({ name: 'search', query: { q: this.searchString } })
      this.mobCloseMenu();
    },
  },
}
</script>
