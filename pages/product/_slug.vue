<template>
  <div>
    <div class="sweet_alert">
      <div><p>Please Select Qty</p></div>
    </div>
    <div class="single_page_bredcrumb" v-if="item">
      <ul class="breadcrumb mb_10">
        <li v-if="item.categories && item.categories[0].parent">
          <nuxt-link :to="{ name: 'category-slug', params: { slug: item.categories[0].parent.slug }}">{{ item.categories[0].parent.name }}</nuxt-link>
        </li>
        <li v-if="item.categories && item.categories[0].parent && item.categories[0].second">
          <nuxt-link :to="{ name: 'category-slug-sub_slug', params: { slug: item.categories[0].parent.slug, sub_slug: item.categories[0].second.slug }}">{{ item.categories[0].second.name }}</nuxt-link>
        </li>
        <li>{{ item.name ? item.name : 'No Specific Name' }} {{ screenWidth }}</li>
      </ul>
    </div>

    <section class="product_single_area" style="position:relative;" v-if="item">
      <div class="product_single_left">
        <client-only>
          <div class="single_img_thumbnail" :class="{'p-0':!$auth.loggedIn}">
            <template v-if="$auth.loggedIn && itemImages.length">
              <VueSlickCarousel ref="c2" v-bind="sliderSettings2">
                <div class="slide"
                     v-for="(image, imageIndex) in itemImages"
                     :key="'deskThumbs_' + imageIndex"
                     :style="{ backgroundImage: `url(${image.thumbs_image}), url(${image.thumbs_image})` }" @click.prevent="thumbsClick(imageIndex)">
                </div>
                <div v-if="item.video" @click.prevent="thumbsClick(999)">
                  <div class="video_thumbs" :key="'deskThumbs_video'">
                    <video v-if="item.video != null" width="100%" loop muted playsinline autoplay preload="metadata">
                      <source class="product-video" :src="item.video" type="video/mp4">
                    </video>
                  </div>
                </div>
              </VueSlickCarousel>
            </template>
            <template v-else-if="$auth.loggedIn && !itemImages.length">
              <img v-if="item.images.length" :src="item.images[0].thumbs_image" alt="Wholesale women's clothing Davi & Dani">
              <img v-else :src="defaultImage" alt="Wholesale women's clothing Davi & Dani">
            </template>
            <template v-else>
              <img :src="defaultImage" alt="Wholesale women's clothing Davi & Dani">
            </template>
          </div>
          <div class="single_img_wrap">
            <template v-if="$auth.loggedIn && itemImages.length">
              <VueSlickCarousel ref="c1"
                                id="zoom-area"
                                @reInit="initZoom"
                                v-bind="sliderSettings">
                <div :class="['slide', {zoom: !screenWidth || screenWidth > 1024}]"
                     v-for="(image, imageIndex) in itemImages"
                     :data-src="image.compressed_image"
                     :key="'deskList_' + imageIndex"
                     :ref="'zoom_'+imageIndex"
                     :style="{ backgroundImage: `url(${image.compressed_image}), url(${image.compressed_image_sf})` }">
                </div>

                <div v-if="item.video">
                  <div class="single-page-video-player">
                    <video loop muted playsinline autoplay preload="metadata">
                      <source class="product-video" :src="item.video" type="video/mp4">
                    </video>
                  </div>
                </div>
              </VueSlickCarousel>
            </template>
            <template v-else-if="$auth.loggedIn && !itemImages.length">
              <img v-if="item.images.length" :src="item.images[0].compressed_image" alt="Wholesale women's clothing Davi & Dani">
              <img v-else :src="defaultImage" alt="Wholesale women's clothing Davi & Dani">
            </template>
            <template v-else>
              <img :src="defaultImage" alt="">
            </template>
          </div>
        </client-only>
      </div>
      <div class="product_single_right">
        <div class="single_product_description ">
          <p class="product_sku">{{ item.style_no }}</p>
          <h1 class="product_title">{{ item.name ? item.name : 'No Specific Name' }}</h1>
          <div class="product_review" v-if="item.rate > 0">
            <div class="rating_star">
              <span :class="{has_review:item.rate >= 1}"><i class="lni" v-bind:class="item.rate >= 1 ? 'lni-star-filled' : 'lni-star-half'"></i></span>
              <span :class="{has_review:item.rate >= 2}"><i class="lni" v-bind:class="item.rate >= 2 ? 'lni-star-filled' : 'lni-star-half'"></i></span>
              <span :class="{has_review:item.rate >= 3}"><i class="lni" v-bind:class="item.rate >= 3 ? 'lni-star-filled' : 'lni-star-half'"></i></span>
              <span :class="{has_review:item.rate >= 4}"><i class="lni" v-bind:class="item.rate >= 4 ? 'lni-star-filled' : 'lni-star-half'"></i></span>
              <span :class="{has_review:item.rate >= 5}"><i class="lni" v-bind:class="item.rate >= 5 ? 'lni-star-filled' : 'lni-star-half'"></i></span>
            </div>
            <span> {{ item ? item.rate : 0 }} From {{ item ? item.totalReviews : 0 }} votes.</span>
          </div>

          <h3 class="product_price" v-if="$auth.loggedIn">${{ item.price_formatted }}</h3>

          <div class="pack_ratio">
            <div class="row" v-for="(inv, i) in item.inventories" :key="'inv_'+i" :class="{active:activeColor === inv.color_id}">
              <div class="col-6 col-sm-4 pr_5" @click.prevent="getColorItemImage(inv.color_id, item.images)">
                <div class="pack_ratio_inner_wrap color">
                  <div class="pack_ratio_inner ratio_color">
                    <img :src="getColorImage(inv.color_id, item.images)" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
                    <span>{{ inv.color_name }} <br> <b v-if="inv.availability == 3">{{ inv.available_on }}</b> </span>
                  </div>
                </div>
              </div>
              <div class="col-3 col-sm-4 pr_5 pl_5">
                <div class="pack_ratio_inner_wrap">
                  <div class="pack_ratio_inner d_flex_center ">
                    <span class="d_flex_center width_full">{{ item.pack.pack_text }} ({{ item.pack.name }})</span>
                  </div>
                </div>
              </div>
              <div class="col-3 col-sm-4 pl_5">
                <div class="pack_ratio_inner_wrap">
                  <div class="pack_ratio_inner d_flex_center">
                    <div class="num_count_wrapper">
                      <template v-if="$auth.loggedIn">
                        <div class="num_count" v-if="inv.availability !== '2' && inv.status">
                          <div class="minus">
                            <button class="btn btn-default" @click.prevent="changeQty(cartForm.colors.find((c) => c.id === inv.color_id))">
                              <i class="lni lni-minus"></i>
                            </button>
                          </div>
                          <input type="text" min="0" class="qty" v-model="cartForm.colors.find((c) => c.id === inv.color_id).quantity" readonly>
                          <div id="add" class="add">
                            <button class="btn btn-default" @click.prevent="()=>{cartForm.colors.find((c) => c.id === inv.color_id).quantity++,activeColor = inv.color_id }">
                              <i class="lni lni-plus"></i>
                            </button>
                          </div>
                        </div>
                        <span v-else>Out Of Stock</span>
                      </template>
                      <template v-else><router-link :to="{name:'login'}">Login</router-link></template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-if="errorMsg.length">
              <div class="col-12">
                <ul>
                  <li v-for="(err, errIndex) in errorMsg" :key="'err_' + errIndex"><span class="text-danger">{{ err.message }}</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="pack_ratio_total_wrap">
            <div class="row">
              <div class="col-4 pr_5">
                <div class="pack_ratio_total d_flex_btwn">
                  <span>Total Pack</span>
                  <span>{{ totalPack }}</span>
                </div>
              </div>
              <div class="col-4 pr_5 pl_5">
                <div class="pack_ratio_total d_flex_btwn">
                  <span>Total Qty</span>
                  <span>{{ totalQty }}</span>
                </div>
              </div>
              <div class="col-4 pl_5">
                <div class="pack_ratio_total d_flex_btwn">
                  <span>Total Price</span>
                  <span>${{ totalPrice.toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="add_to_car_btn" v-if="$auth.loggedIn">
            <button class="btn_common width_180p" @click.prevent="addToCart">Add to Cart</button>
          </div>
          <div class="product_description">
            <tab-component>
              <tab-item-component :active="true" :tabId="'description'" :title="'Description'">
                <div><p>{{ item.description }}</p></div>
              </tab-item-component>

              <tab-item-component :active="false" :tabId="'size'" :title="'Size Chart'">
                <div v-html="item.size_chart"></div>
              </tab-item-component>
            </tab-component>
          </div>
        </div>
      </div>
    </section>


    <product-review-component :product="item" v-if="item" @getItemDetails="getItemDetails"></product-review-component>

    <section class="related_product_area" v-if="item && relatedItems.length">
      <div class="related_product_title">
        <h2>You Might Like</h2>
      </div>
      <div class="related_product_content">
        <div class="title">You Might Like</div>
        <div class="product_content_wrap">
          <product-component v-for="(product, productKey) in relatedItems" :key="'product_' + productKey" :product="product" :imageBlock="$auth.loggedIn ? false : true" :priceBlock="$auth.loggedIn ? false : true"></product-component>
        </div>
      </div>

      <div class="r_p_c_mobile">
        <client-only>
          <carousel :responsive="{0:{items:2},400:{items:2},768:{items:3},1200:{items:4}}" :dots="false" :nav="true">
            <div class="home_slider_inner" v-for="(product, productKey) in relatedItems" :key="'product_' + productKey">
              <div class="home_slider_inner_content">
                <nuxt-link :to="{ name: 'product-slug', params: { slug: product.slug }}">
                  <img v-if="$auth.loggedIn && product.images.length" :src="product.images[0].compressed_image" class="img-fluid">
                  <img v-else :src="defaultImage" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">

                  <h2>{{ product.name ? product.name : 'No Specific Name' }}</h2>
                  <p>{{ product.style_no }} |
                    <i v-if="$auth.loggedIn">USD ${{ product.price_formatted }}</i>
                    <i class="d-inline-block" v-else><nuxt-link class="text-dark" :to="{name:'login'}">Login</nuxt-link></i>
                  </p>
                </nuxt-link>
              </div>
            </div>
          </carousel>
        </client-only>
      </div>
    </section>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import ProductComponent from "@/components/shared/ProductComponent";
import ProductReviewComponent from "@/components/shared/ProductReviewComponent";
import {mapGetters} from "vuex";
import TabComponent from "@/components/shared/TabComponent";
import TabItemComponent from "@/components/shared/TabItemComponent";

export default {
  components: {TabComponent, TabItemComponent, VueSlickCarousel, ProductComponent, ProductReviewComponent},
  data() {
    return {
      screenWidth: null,
      title: 'dfdf',
      item: null,
      thumbsSliderShow:false,
      itemImages: [],
      activeColor: null,
      cartForm: {
        colors: []
      },
      relatedItems: [],
      errorMsg: [],
      videoOptions: {
        autoplay: true,
        controls: false,
        loop: true,
        muted: true,
        sources: [
          {
            src: null,
            type: "video/mp4"
          }
        ]
      },
      sliderSettings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        adaptiveHeight: true,
        infinite: false,
        useTransform: true,
        speed: 400,
      },
      sliderSettings2: {
        arrows:true,
        vertical:true,
        verticalSwiping:true,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: false,
        draggable: false,
        focusOnSelect: false,
        infinite: false,
      },
    }
  },
  head() {
    return {
      title: (this.item ? this.item.name : '') + ' - Davi & Dani',
      meta: [
        {
          name: 'description',
          content: (this.item ? this.item.name : '') + ' is available at Davi &amp; Dani with the best wholesale price in the USA.'
        }
      ]
    }
  },
  created() {
    if (process.client) {
      this.screenWidth = window.innerWidth;
    }
  },
  updated() {
    if (process.client) {
      this.mobCloseMenu();
    }
  },
  async fetch() {
    await this.getItemDetails();

    this.$axios.get('/item/' + this.$route.params.slug + '/related')
      .then((res) => this.relatedItems = res.data.data)
      .catch(() => {});
  },
  mounted() {
    if (process.client) {
      $(document).mouseup();
    }
  },
  computed: {
    ...mapGetters({
      user: 'authModule/getUser',
      defaultImage: 'settingsModule/getDefaultImage',
      preloader: 'preLoaderModule/preloader',
    }),
    totalPack() {
      if (this.item)
        return this.cartForm.colors.filter((color) => this.item.inventories.find((i) => i.color_id === color.id && i.availability !== '2')).reduce((a, b) => a + b.quantity, 0);
      else
        return 0;
    },
    totalQty() {
      if (this.item) {
        return this.item.pack.total_item * this.totalPack;
      } else
        return 0;
    },
    totalPrice() {
      if (this.item)
        return this.item.price * this.totalQty;
      else
        return 0;
    }
  },
  methods: {
    thumbsClick(i){
      let self = this
      let indexNumber = 0;
      if(i === 999){
        let video = $('.single_img_thumbnail .slick-track .slick-slide').length
        indexNumber = Number(video -1)
      }else{
        indexNumber = parseInt($('.slide:eq('+i+')').closest('.slick-slide').data('index'))
      }
      if(indexNumber >= 0){
        let duration = (this.sliderSettings && this.sliderSettings.speed) ? this.sliderSettings.speed : 400
        self.$refs.c1.goTo(indexNumber)
        setTimeout(() => {
          self.$refs.c2.goTo(indexNumber)
        }, duration);
      }
    },
    async getItemDetails(){
      this.$store.commit('preLoaderModule/setPreloader', true);
      this.$store.commit('settingsModule/setContentLoad', false);

      await this.$axios.get('/item/' + this.$route.params.slug)
        .then((res) => {
          this.item = res.data.data;
          if(!this.item)
            return this.$router.push({name:'index'})
          this.activeColor = res.data.data.first_color && res.data.data.first_color.color_id ? res.data.data.first_color.color_id : null;
          this.cartForm.item = {...this.item};
          this.item.colors.forEach((c) => {
            this.cartForm.colors.push({...c, ...{quantity: 0}, ...{indicator: 'web'}});
          });

          let color = this.item.colors[0];
          this.getColorItemImage(this.activeColor ? this.activeColor : color.id, this.item.images)

          this.sliderSettings.slidesToShow = 2;
          this.sliderSettings2.slidesToShow = 2;
          this.$nextTick(() => {
            this.sliderSettings.slidesToShow = 1;
            this.sliderSettings2.slidesToShow = 5;
          })

          this.initZoom();

          this.$store.commit('preLoaderModule/setPreloader', false);
          this.$store.commit('settingsModule/setContentLoad', true);
        })
        .catch(() => {
          this.$root.error({'statusCode': 404, 'message': 'Not Found.'});
        });
    },
    getColorImage(path, item){
      let data = null;
      if(item.length) {
        let flashItem = item.find(element => element.color_id === path);
        if(flashItem)
          data = flashItem.thumbs_image
      }else{
        if(this.item.colors.length){
          data = this.item.colors.find(color=>color.id === path).thumbs_image
        }
      }
      if(!data)
        data = '/images/no-image.png'

      if(!this.$auth.loggedIn)
        data = this.defaultImage

      return data
    },
    initZoom() {
      if (process.client) {
        $('.zoom').each(function () {
          var src = $(this).data('src')
          $(this).zoom({
            target: '#zoom-area',
            on: 'mouseover',
            magnify: 1.6,
            touch: false,
            url: src,
          });
        });
      }
    },
    addToCart() {

      if (this.cartForm.colors.reduce((a, b) => a + b.quantity, 0) === 0) {
        $('.sweet_alert').slideDown();
        setTimeout(()=>{
          $('.sweet_alert').slideUp();
        }, 3000);
      } else {
        this.$store.dispatch('cartModule/addToCart', this.cartForm)
          .then(()=>{
            for(let i = 0; i < this.cartForm.colors.length ; i++)
              this.cartForm.colors[i].quantity = 0

            this.errorMsg = []
          }).catch((eee)=>{
            this.errorMsg = eee.error;
          })
          .finally(()=>{
            if(process.client){
              if(window.outerWidth > 1024){
                $('.h_cart').click();
              }else{
                $('.m_h_cart').click();
              }
            }
          })
      }

    },
    changeQty(color) {
      this.activeColor = color.id
      if (color.quantity !== 0)
        color.quantity--;
    },
    getColorItemImage(color_id, cItemimages) {
      this.activeColor = color_id
      this.itemImages = cItemimages.filter((i) => i.color_id === color_id);

      this.sliderSettings.slidesToShow = 2;
      this.sliderSettings2.slidesToShow = 2;
      this.$nextTick(() => {
        this.sliderSettings.slidesToShow = 1;
        this.sliderSettings2.slidesToShow = 5;
      })

      this.initZoom();

      this.initZoom();
    }
  }
}
</script>
