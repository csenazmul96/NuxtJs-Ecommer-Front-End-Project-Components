<template>
  <div class="show_from_left" id="menu">
    <div class="header_menu_inner mobile_nav">
      <ul>
        <template v-if="categories.length">
          <template v-for="(category, categoryIndex) in categories">
            <template v-if="category.sub_categories && category.sub_categories.length">
              <li class="has_child" data-toggle="collapse_m_nav" :data-target="'#mobSubCategory_'+category.id" :key="'mobCategoryIndex_'+categoryIndex" @click.prevent="mobExpandNextMenu($event)">
                <a href="javascript:void(0)">{{ capitalize(category.name) }}</a>
              </li>
              <div class="show_from_left" :id="'mobSubCategory_'+category.id" :key="'mobSubCategory_'+categoryIndex">
                <ul class="mobile_submenu">
                  <li @click.prevent="mobCloseMenu">
                    <nuxt-link :to="{ name: 'category-slug', params: { slug: category.slug }}">{{ capitalize(category.name) }}</nuxt-link>
                    <span class="back" @click.prevent="mobBackToTopMenu($event)">Back</span>
                  </li>
                  <template v-for="(subCategory, subCategoryIndex) in category.sub_categories">
                    <template>
                      <li :key="'mobSubCategoryIndex_'+subCategoryIndex" @click.prevent="mobCloseMenu">
                        <nuxt-link :to="{ name: 'category-slug-sub_slug', params: { slug: category.slug, sub_slug: subCategory.slug }}">{{ capitalize(subCategory.name) }}</nuxt-link>
                      </li>
                    </template>
                  </template>
                </ul>
              </div>
            </template>
            <template v-else>
              <li @click.prevent="mobCloseMenu">
                <nuxt-link :to="{ name: 'category-slug', params: { slug: category.slug }}">{{ capitalize(category.name) }}</nuxt-link>
              </li>
            </template>
          </template>
        </template>
        <li v-if="categories.length" @click.prevent="mobCloseMenu" :class="{active:$route.name === 'look-book'}">
          <router-link :to="{ name: 'look-book'}">Look Book</router-link>
        </li>
        <li v-if="categories.length" @click.prevent="mobCloseMenu">
          <nuxt-link :to="{ name: 'schedule'}">Show Schedule</nuxt-link>
        </li>
        <li v-if="categories.length" :class="{active:$route.name === 'davi-tv'}">
          <router-link v-if="$auth.loggedIn" :to="{ name: 'davi-tv'}">Davi TV</router-link>
          <router-link v-else :to="{ name: 'login'}">Davi TV</router-link>
        </li>
      </ul>
    </div>
    <div class="close_h_menu" @click.prevent="mobCloseMenu">
      <span>Close</span>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      categories: []
    }
  },
  created() {
    this.$axios.get('/categories').then((response) => {
      this.categories = response.data.data;

      if (process.client) {
        setTimeout(() => {
          this.headerCommonMargin();
        }, 500)
      }
    })
  },
  watch: {
    $route() {
      if (process.client) {
        this.headerCommonMargin();
      }
    }
  },
  mounted() {
    if (process.client) {
      this.headerCommonMargin();
      window.addEventListener('resize', this.headerCommonMargin);
    }
  },
  methods: {
    mobExpandNextMenu(e) {
      if ($(e.target).hasClass('back') == false) {
        var mNavId = $(e.target).closest('li').data('target');
        $(mNavId).addClass('open_h_menu');
      }
    },
    mobBackToTopMenu(e) {
      $(e.target).closest('.show_from_left').removeClass('open_h_menu');
    },
    headerCommonMargin() {
      let header_top = $('.header_top').outerHeight();
      let common_margin = $('.cm_header').outerHeight();
      if(common_margin === 0)
        common_margin = $('.header_area').outerHeight();
      if(header_top === undefined)
        header_top = 0

      $('.show_from_left, .show_from_right').css({
        top : `${common_margin + header_top}px`,
        'height': `calc(100% - ${common_margin + header_top}px)`
      });
    },
    mobCloseMenu() {
      this.$emit('closeModal')
      // $('.show_from_left , .show_from_right').removeClass('open_h_menu');
      // $('.mobile_overlay').removeClass('open');
      // $('.menu').removeClass('open');
      // $('body').removeClass('overflow_hidden');
    },
    capitalize(text){
      return text.toLowerCase()
    }
  }
}
</script>

