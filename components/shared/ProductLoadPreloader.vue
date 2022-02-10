<template>
<div class="product_content_wrap">
  <div class="product_content_inner">
    <div class="product_inner_wrap">
      <div class="product_img_wrap mb_15">
        <img :src="defaultImg" class="img-fluid p_img" alt="Wholesale women's clothing Davi & Dani">
      </div>
    </div>
  </div>
  <div class="product_content_inner">
    <div class="product_inner_wrap">
      <div class="product_img_wrap mb_15">
        <img :src="defaultImg" class="img-fluid p_img" alt="Wholesale women's clothing Davi & Dani">
      </div>
    </div>
  </div>
  <div class="product_content_inner">
    <div class="product_inner_wrap">
      <div class="product_img_wrap mb_15">
        <img :src="defaultImg" class="img-fluid p_img" alt="Wholesale women's clothing Davi & Dani">
      </div>
    </div>
  </div>
  <div class="product_content_inner">
    <div class="product_inner_wrap">
      <div class="product_img_wrap mb_15">
        <img :src="defaultImg" class="img-fluid p_img" alt="Wholesale women's clothing Davi & Dani">
      </div>
    </div>
  </div>
  <div class="product_content_inner">
    <div class="product_inner_wrap">
      <div class="product_img_wrap mb_15">
        <img :src="defaultImg" class="img-fluid p_img" alt="Wholesale women's clothing Davi & Dani">
      </div>
    </div>
  </div>
  <div class="product_content_inner">
    <div class="product_inner_wrap">
      <div class="product_img_wrap mb_15">
        <img :src="defaultImg" class="img-fluid p_img" alt="Wholesale women's clothing Davi & Dani">
      </div>
    </div>
  </div>
  <div class="product_content_inner">
    <div class="product_inner_wrap">
      <div class="product_img_wrap mb_15">
        <img :src="defaultImg" class="img-fluid p_img" alt="Wholesale women's clothing Davi & Dani">
      </div>
    </div>
  </div>
  <div class="product_content_inner">
    <div class="product_inner_wrap">
      <div class="product_img_wrap mb_15">
        <img :src="defaultImg" class="img-fluid p_img" alt="Wholesale women's clothing Davi & Dani">
      </div>
    </div>
  </div>
  <div class="product_content_inner">
    <div class="product_inner_wrap">
      <div class="product_img_wrap mb_15">
        <img :src="defaultImg" class="img-fluid p_img" alt="Wholesale women's clothing Davi & Dani">
      </div>
    </div>
  </div>
  <div class="product_content_inner">
    <div class="product_inner_wrap">
      <div class="product_img_wrap mb_15">
        <img :src="defaultImg" class="img-fluid p_img" alt="Wholesale women's clothing Davi & Dani">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ProductLoadPreloader",
  computed: {
    ...mapGetters({
      defaultImg: 'settingsModule/getDefaultImage',
    }),
  },
}
</script>

