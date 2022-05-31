<template>
  <div>
  <div class="product_filter">
    <ul class="p_f_first_child">
    </ul>
    <ul class="p_f_last_child">
      <li>Sort</li>
      <li data-toggle="collapse_slide" data-target="#sort">{{ currentSortText }}
        <span class="down"><i class="lni lni-chevron-down"></i></span>
        <span class="up"><i class="lni lni-chevron-up"></i></span>
      </li>
      <div class="f_bottom" id="sort">
        <ul>
          <li :class="{'active': !$route.query.sort || $route.query.sort == '1'}">
            <a role="button" class="cursor_pointer" @click="filterProduct(1)">Newest</a>
          </li>
          <li :class="{'active': $route.query.sort == '2'}">
            <a role="button" class="cursor_pointer" @click="filterProduct(2)">Highest Price</a>
          </li>
          <li :class="{'active': $route.query.sort == '3'}">
            <a role="button" class="cursor_pointer" @click="filterProduct(3)">Lowest Price</a>
          </li>
          <li :class="{'active': $route.query.sort == '4'}">
            <a role="button" class="cursor_pointer" @click="filterProduct(4)">Available On Desc</a>
          </li>
          <li :class="{'active': $route.query.sort == '5'}">
            <a role="button" class="cursor_pointer" @click="filterProduct(5)">Available On Asc</a>
          </li>
        </ul>
      </div>
    </ul>
  </div>
    <div class="product_filter_mobile">
      <div data-toggle="collapse_slide" data-target="#mfilter" class="m_f_button">{{ currentSortText }} Filter</div>
      <div class="p_filter_content" id="mfilter">
        <div class="header_menu_inner mobile_nav">
          <ul>
            <li :class="{'active': !$route.query.sort || $route.query.sort == '1'}">
              <a role="button" class="cursor_pointer" @click="filterProduct(1)">Newest</a>
            </li>
            <li :class="{'active': $route.query.sort == '2'}">
              <a role="button" class="cursor_pointer" @click="filterProduct(2)">Highest Price</a>
            </li>
            <li :class="{'active': $route.query.sort == '3'}">
              <a role="button" class="cursor_pointer" @click="filterProduct(3)">Lowest Price</a>
            </li>
            <li :class="{'active': $route.query.sort == '4'}">
              <a role="button" class="cursor_pointer" @click="filterProduct(4)">Available On Desc</a>
            </li>
            <li :class="{'active': $route.query.sort == '5'}">
              <a role="button" class="cursor_pointer" @click="filterProduct(5)">Available On Asc</a>
            </li>
          </ul>
        </div>
        <span class="close_h_menu p_filter_close"  @click.prevent="closeFilter">close</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentSortText() {
      switch (parseInt(this.$route.query.sort)) {
        case 1:
          return 'Newest'
        case 2:
          return 'Highest Price'
        case 3:
          return 'Lowest Price'
        case 4:
          return 'Available On Desc'
        case 5:
          return 'Available On Asc'
        default:
          return 'Newest'
      }
    }
  },
  methods:{
    closeFilter(){
      $('.collapse_slide').removeClass('active');
      $('.show_from_left , .show_from_right').removeClass('open_h_menu');
      $('.m_f_button').removeClass('active');
      $('.menu').removeClass('open');
      $('.p_filter_content').slideUp();
    },
    filterProduct(id){
      this.$emit('filterProduct', id)
      this.closeFilter()
    }
  },
}
</script>
