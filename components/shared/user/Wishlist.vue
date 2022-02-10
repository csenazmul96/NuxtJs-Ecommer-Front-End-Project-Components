<template>
  <div class="wishlist_area my_acc_container">
    <h2 class="my_acc_subtitle">MY WISHLIST <span></span></h2>
    <div class="wishlist_item">
      <div class="product_content_inner">
        <div class="product_inner_wrap">
          <div class="product_img_wrap">
            <a href="#" class="">
              <img alt="Wholesale women's clothing Davi & Dani" class="img-fluid p_img" data-src="http://api.new.davidani.com/storage/items/2021-11-13/compressed/f2f0c569-854a-45bc-a0e6-f5c8fc1a458f.webp" src="http://api.new.davidani.com/storage/items/2021-11-13/compressed/f2f0c569-854a-45bc-a0e6-f5c8fc1a458f.webp"></a>
          </div>
          <div class="product_details_text">
            <h2 class="product_title">
              <a href="#" class="">Pomegranate</a></h2>
            <p class="product_price"><span>C32 </span> | <span>USD$4.50</span></p>
          </div>
        </div>
      </div>
    </div>
    <a href="#" class="btn btn_grey"> View All Wishlist Items</a>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  name: "Wishlist",
  data(){
    return {
      items: [],
    }
  },
  created() {
    this.getWishlistItems();
  },
  methods:{
    getWishlistItems(){
      //   this.$axios.get('user/wishlist')
      // .then((response)=>{
      //   this.items = response.data.data
      // })
    }
  }
}
</script>

