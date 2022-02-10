<template>
  <div>
    <section class="ly_broadcasting_area broadcasting_list">
      <div class="ly_broadcasting_container">
        <div class="full_content">
          <div class="ly_broadcasting_row">
            <div class="left_content">
              <!--    Player start      -->
              <div class="inner live_video">
                <div class="inner_content">
                  <div id="video_wrap">
                    <div class="js_chat_wrap chat_wrap_mobile" id="chat_wrap"> <!-- ---------------------- chat wrap for mobile ------------------------------------------- -->
                      <div class="js_chat_head chat_head" id="cmsoldChatHead">
                        <div class="chat_head_inner" ref="smallScreenChatScroll">
                          <ul class="js_cmsold_wrap" id="cmsoldWrap" v-if="currentComments.length">
                            <div class="comments">
                              <li v-for="(comment, i) in currentComments" :key="'comment_'+i">
                                <div class="append_inner">
                                  <div class="author">
                                    <img :src="comment.user_profile_pic">
                                  </div>
                                  <div class="text">
                                    <h2 v-if="comment">{{ comment.name }}</h2>
                                    <p class="time">{{ comment.time }}</p>
                                    <p>{{ comment.comment }}</p>
                                    <p v-if="comment.sent_reply" class="private_msg">Privately Message</p>
                                    <p class="reply"><i class="fas fa-reply"></i></p>
                                  </div>
                                </div>
                                <div class="reply_comment" v-if="comment.replies && comment.replies.length">
                                  <div class="reply_comment_list" v-for="reply in comment.replies" :key="'reply_'+reply.id">
                                    <div class="author">
                                      <img :src="reply.user_profile_pic">
                                    </div>
                                    <div class="text">
                                      <h2>{{ reply.name }}</h2>
                                      <p class="time">{{ reply.time }}</p>
                                      <p>{{ reply.comment }}</p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </div>
                          </ul>
                        </div>
                      </div>
                      <div id="hearts-alpaca" class="hearts"></div>
                    </div>
                    <video id="videoplayer" class="video-js vjs-default-skin vjs-fluid" controls muted playsinline > </video>
                  </div>
                </div>
              </div>

              <!--    Player End      -->
              <!--     Streaming Product list start     -->
              <div class="inner others_product mobile_view">
                <div class="others_product_inner_wrap">
                  <div class="title">
                    <h2>Items</h2>
                  </div>
                  <div class="others_content">
                    <div class="others_product_wrap">
                      <div class="cmsold_others_slider">
                        <div class="slide_inner" v-for="(item, i) in products" @click.prevent="loadItem(item.slug)" :key="'mob_'+i">
                          <div :class="[{'streaming_current_item':currentItem && currentItem.id === item.id}]">
                            <a href="javascript:void(0)"><img  :src="item.images[0].compressed_image" alt="Wholesale women's clothing Davi & Dani"><span>{{ itemIdentifire(item.id) }}</span></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--     Streaming Product list end     -->
              <!--     Streaming Selected Item Slider start     -->
              <div class="inner view_product" v-if="currentItem">
                <div class="inner_content">
                  <div class="cms_sold_top_slider" v-if="currentItemImages">
                    <div class="" v-for="(image, i) in currentItemImages" :key="'image_'+i">
                      <div :class="{active:currentItem.id === image.item_id}">
                        <a href="#"><img :src="image.compressed_image" alt="Wholesale women's clothing Davi & Dani" class="img-fluid"></a>
                      </div>
                    </div>
                  </div>
                  <div class="cmsold_product_text" >
                    <span class="cmsold_product_sku">{{ currentItem.style_no }}</span>
                    <h2 class="cmsold_product_title">{{ currentItem.name }}</h2>
                    <p class="cmsold_price"><span>${{ currentItem.price }}</span>  <span>{{ itemIdentifire(currentItem.id) }}</span></p>
                    <span v-if="vendorCurrentItem === currentItem.slug" class="cmsold_now">Now Showing</span>
                  </div>
                  <div v-if="currentItem.inventories" :class="['pack_ratio', {scroll:currentItem.inventories.length > 3}]">
                    <div class="row" v-for="inv in currentItem.inventories" :class="{active:activeColor === inv.color_id}">
                      <div class="cms_col col-5 col-lg-4 pr_5">
                        <div class="pack_ratio_inner_wrap color">
                          <div class="pack_ratio_inner ratio_color" @click.prevent="selectColorImage(inv.color_id)">
                            <img :src="getColorImage(inv.color_id, currentItem.images)" class="img-fluid"  >
                            <span>{{ inv.color_name }} <br> <b>{{ inv.available_on }}</b> </span>
                          </div>
                        </div>
                      </div>

                      <div class="cms_col col-3  col-lg-4 pr_5 pl_5">
                        <div class="pack_ratio_inner_wrap">
                          <div class="pack_ratio_inner d_flex_center"><span class="d_flex_center width_full">{{ currentItem.pack.pack_text }}</span></div>
                        </div>
                      </div>

                      <div class="cms_col col-4  col-lg-4 pl_5">
                        <div class="pack_ratio_inner_wrap">
                          <div class="pack_ratio_inner d_flex_center">
                            <div class="num_count_wrapper">
                              <template v-if="$auth.loggedIn">
                                <div class="num_count" v-if="inv.availability !== '2'">
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
                  </div>
                  <div class="pack_ratio_total_wrap">
                    <div class="row">
                      <div class="cms_col pr_5">
                        <div class="pack_ratio_total d_flex_btwn"><span>Total Pack</span> <span>{{ totalPack }}</span></div>
                      </div>
                      <div class="cms_col pr_5 pl_5">
                        <div class="pack_ratio_total d_flex_btwn"><span>Total Qty</span> <span>{{ totalQty }}</span></div>
                      </div>
                      <div class="cms_col pl_5">
                        <div class="pack_ratio_total d_flex_btwn"><span>Total Price</span> <span>${{ totalPrice.toFixed(2) }}</span></div>
                      </div>
                    </div>
                  </div>
                  <button v-if="$auth.loggedIn" class="cms_sold_cart" @click.prevent="addToCart"> Add To Cart </button>
                </div>
              </div>
              <!--     Streaming Selected Item Slider end     -->
            </div>
            <div class="right_content" id="cmsold_desktop"> <!-- ---------------------- chat wrap for Desktop ------------------------------------------- -->
              <div class="js_chat_wrap" id="chat_wrap">
                <div class="js_chat_head chat_head largeScreenChatScroll" id="cmsoldChatHead" >
                  <div class="chat_head_inner" ref="largeScreenChatScroll">
                    <ul class="js_cmsold_wrap" id="cmsoldWrap">
                      <div class="comments">
                        <li v-for="(comment, i) in currentComments" :key="'comment_'+i">
                          <div class="append_inner">
                            <div class="author">
                              <img :src="comment.user_profile_pic">
                            </div>
                            <div class="text">
                              <h2>{{ comment.name }}</h2>
                              <p class="time">{{ comment.time }}</p>
                              <p>{{ comment.comment }}</p>
                              <p v-if="comment.sent_reply" class="private_msg">Privately Message</p>
                              <p class="reply"><i class="fas fa-reply"></i></p>
                            </div>
                          </div>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
                <div id="hearts-alpaca" class="hearts" >
                </div>
              </div>
            </div>
          </div>
          <div class="inner others_product desktop_view" v-if="products.length">
            <div class="others_product_inner_wrap">
              <div class="title">
                <h2>Items</h2>
              </div>
              <div class="others_content">
                <div class="others_product_wrap">
                  <div class="cmsold_others_slider">
                    <div class="slide_inner" v-for="(item, i) in products" @click.prevent="loadItem(item.slug)" :key="'desk_'+i">
                      <div :class="[{'streaming_current_item':currentItem && currentItem.id === item.id}]">
                        <a href="javascript:void(0)"><img  :src="item.images[0].compressed_image" alt="Wholesale women's clothing Davi & Dani"><span>{{ itemIdentifire(item.id) }}</span></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="inner details_view" v-show="recentVideoList.length">
            <div class="details_title">
              <h2>Recent Video</h2>
            </div>
            <div class="others_content">
              <div class="others_product_wrap">
                <div class="broadcast_details_slider">
                  <div v-for="(video, i) in recentVideoList">
                    <div class="slide_inner">
                      <div class="inner_wrap">
                        <nuxt-link :to="{name:'davi-tv-id', params:{id:video.id}}">
                          <div class="slide_img">
                            <img :src="thumb ? thumb : '/images/play.png'" class="width_full" alt="">
                            <img v-if="video.preview_gif" :src="video.preview_gif" class="width_full on_hover" alt="">
                          </div>
                          <div class="play">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="213.7px" height="213.7px" viewBox="0 0 213.7 213.7" enable-background="new 0 0 213.7 213.7" xml:space="preserve">

                                                        <polygon class="triangle" id="XMLID_18_" fill="none" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
                                                        73.5,62.5 148.5,105.8 73.5,149.1 "></polygon>

                              <circle class="circle" id="XMLID_17_" fill="none" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" cx="106.8" cy="106.8" r="103.3"></circle>
                                                    </svg>
                          </div>
                          <div class="text">
                            <h3>{{ video.name }}</h3>
                            <ul>
                              <li>{{ video.broadcaster }}</li>
                              <li>{{ video.start_at }}</li>
                            </ul>
                          </div>
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import "@/assets/scss/live_chat.scss";
import {mapGetters} from "vuex";

export default {
  middleware: 'auth',
  name: 'live-chat',
  props: {
  },
  data() {
    return {
      liveData: null,
      comments: [],
      currentItem: null,
      vendorCurrentItem: null,
      currentItemImages: [],
      products: [],
      activeColor: '',
      cartForm: {
        colors: []
      },
      currentComments:[],
      player: null,
      showReact: false,
      reacts: [],
      currentComment: null,
      reply: false,
      isPlay: false,
      itemHistory: [],
      recentVideoList: [],
      currentEmoji: null,
    }
  },
  created() {
    let self = this
    this.$axios.get(process.env.NUXT_ENV_BROADCAST_API + '/davi-tv/'+this.$route.params.id)
      .then((response)=>{
        this.liveData = response.data.data
        this.loadProducts()
        this.loadComments()
        this.loadReacts()
        this.initJwPlayer()
        this.loadItemHistory()
      })
    this.$axios.get(process.env.NUXT_ENV_BROADCAST_API + '/live-video-inactive/' + process.env.NUXT_ENV_BROADCAST_VENDOR_ID)
      .then((response)=>{
        this.recentVideoList = response.data.data
        setTimeout(function(){
          self.relatedVideoSlider()
        }, 500);
      })
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  },
  computed:{
    ...mapGetters({
      user: 'authModule/getUser',
      defaultImage: 'settingsModule/getDefaultImage',
      thumb: 'settingsModule/getDaviTvVideoThumb',
    }),
    totalPack() {
      if (this.currentItem)
        return this.cartForm.colors.filter((color) => this.currentItem.inventories.find((i) => i.color_id === color.id && i.availability !== '2')).reduce((a, b) => a + b.quantity, 0);
      else
        return 0;
    },
    totalQty() {
      if (this.currentItem) {
        return this.currentItem.pack.total_item * this.totalPack;
      } else
        return 0;
    },
    totalPrice() {
      if (this.currentItem)
        return this.currentItem.price * this.totalQty;
      else
        return 0;
    }
  },
  methods: {
    filterComments(time){
      if(this.comments.length){
        this.comments.map((item)=>{
          if(parseInt(item.video_time) <= Math.round(time) && !this.currentComments.find(i => i.id === item.id)){
            this.currentComments.push(item)
            this.$nextTick(() => {
              if (this.$refs.largeScreenChatScroll !== undefined) {
                this.$refs.largeScreenChatScroll.scrollTop = this.$refs.largeScreenChatScroll.scrollHeight
              }
              if (this.$refs.smallScreenChatScroll !== undefined) {
                this.$refs.smallScreenChatScroll.scrollTop = this.$refs.smallScreenChatScroll.scrollHeight
              }
            });
          }
        })
      }
    },
    checkCurrentItem(time) {
      let item = this.itemHistory.find(i => time >= i.time &&  time <= i.end_time);
      if (item) {
        if (this.currentItem && this.currentItem.slug != item.item_slug)
          this.loadItem(item.item_slug);
      }
    },
    checkCurrentReact(time){
      if(this.reacts.length){
        this.reacts.map((item)=>{
          if(parseInt(item.time) === Math.round(time)){
            if(this.currentEmoji != Math.round(time)){
              this.currentEmoji = Math.round(time)
              this.showReact = true;
              this.appendEmoji(item.react)
            }
          }
        })
      }
    },
    initJwPlayer() {
      if(process.client) {
        let self = this;
        setTimeout(() => {
          this.player = window.videojs('videoplayer', {
            inactivityTimeout: 0,
            liveui: true,
            liveTracker: true
          });
          this.player.ready(function () {
            self.player.src([
              {src: self.liveData.video_url, type: 'application/dash+xml'},
              {src: self.liveData.video_url_fallback, type: 'application/x-mpegURL'},
            ]);
            self.player.autoplay('any');
            self.player.aspectRatio('16:9');
            self.player.play();
          });
          self.player.on('timeupdate', function () {
            self.filterComments(self.player.currentTime())
            self.checkCurrentItem(self.player.currentTime())
            self.checkCurrentReact(self.player.currentTime())
          })
        }, 500);
      }
    },
    loadProducts() {
      this.$axios.get('/admin/selected-items', {
        params: {
          itemId: this.liveData.items_all
        }
      })
        .then((response) => {
          this.products = response.data.data
          if(this.products.length){
            let item = this.products.filter((item)=> item.id === this.liveData.current_item_id)
            if(item){
              this.currentItem = item[0];
              let firstColor = this.currentItem.inventories[0];
              this.selectColorImage(firstColor.color_id)
              this.cartForm.item = {...this.currentItem};
              this.currentItem.colors.forEach((c) => {
                this.cartForm.colors.push({...c, ...{quantity: 0}, ...{indicator: 'streaming'}});
              });
            }

          }
          setTimeout(() => {
            this.initItemSlider();
          }, 0)
        })
    },
    itemIdentifire(id){
      if(this.liveData && this.liveData.items.length){
        let item = this.liveData.items.find(x=> x.item_id === id)
        if(item)
          return item.identifier
      }
    },
    loadComments() {
      this.$axios.get(process.env.NUXT_ENV_BROADCAST_API + '/comments/' + this.liveData.id)
        .then((response) => {
          this.comments = response.data.data;
        })
    },
    loadReacts() {
      this.$axios.get(process.env.NUXT_ENV_BROADCAST_API + '/reacts/' + this.liveData.id)
        .then((response) => {
          this.reacts = response.data.data;
        })
    },
    appendEmoji(content){
      let id = Math.floor(Math.random() * 999999999);
      window.$(".hearts").append(`<div class="imojies_inner ${content} emoji_${id}"></div>`);
    },
    addToCart() {
      if (this.cartForm.colors.reduce((a, b) => a + b.quantity, 0) === 0) {
        this.showFailMsg('Please select an item')
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
            this.showCartStatus()
          })
      }

    },
    showCartStatus(){
      this.$store.dispatch('cartModule/loadCart')
      if(process.client){
        if(window.outerWidth > 1024){
          $('.h_cart').click();
        }else{
          $('.m_h_cart').click();
        }
      }
    },
    loadItemHistory() {
      this.$axios.get(process.env.NUXT_ENV_BROADCAST_API + '/live-video/'+this.liveData.id+'/item-history')
        .then((response) => {
          this.itemHistory = response.data.data;

          this.itemHistory.forEach((item, i, arr) => {
            if (i !== arr.length - 1) {
              item.end_time = arr[i+1].time;
            } else {
              setTimeout(() => {
                item.end_time = this.player.duration();
              }, 600)

            }
          })
        })
    },
    getColorImage(color, item){
      let data = null;
      if(item.length) {
        let flashItem = item.find(element => element.color_id === color);
        if(flashItem)
          data = flashItem.thumbs_image
      }else{
        if(this.currentItem.colors.length){
          data = this.currentItem.colors.find(color=>color.id === color).thumbs_image
        }
      }
      if(!data)
        data = item[0].thumbs_image

      if(!this.$auth.loggedIn)
        data = this.defaultImage

      return data
    },
    changeQty(color) {
      if (color.quantity !== 0)
        color.quantity--;
    },
    selectColorImage(colorId){
      this.activeColor = colorId;
      this.currentItemImages = [];
      if (colorId) {
        if($(".cms_sold_top_slider").hasClass('slick-slider')) {
          let height = $(".cms_sold_top_slider ").outerHeight()
          $('.cms_sold_top_slider').slick('unslick');
          $('.cms_sold_top_slider').css({'min-height' : height+'px'});
        }
        this.currentItemImages = this.currentItem.images.filter((i) => i.color_id === colorId);
        if(!this.currentItemImages.length && this.currentItem.images.length){
          this.currentItemImages[0] = this.currentItem.images[0]
          if(this.currentItem.images.length > 1)
            this.currentItemImages[1] = this.currentItem.images[1]
        }
        setTimeout(() => {
          this.initTopSlider();
        }, 0)
      }
    },
    initItemSlider() {
      if(process.client) {
        $('.cmsold_others_slider').slick({
          slidesToScroll: 12,
          slidesToShow: 12,
          dots: false,
          infinite: false,
          prevArrow: false,
          nextArrow: false,
          responsive: [
            {
              breakpoint: 1125, // tablet breakpoint
              settings: {
                slidesToShow: 7,
                slidesToScroll: 7
              }
            },
            {
              breakpoint: 980, // tablet breakpoint
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5
              }
            },
            {
              breakpoint: 480, // mobile breakpoint
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            }
          ]
        });
      }
    },
    relatedVideoSlider(){
      if(process.client){
        $('.broadcast_details_slider').slick({
          slidesToScroll: 6,
          slidesToShow: 6,
          dots: false,
          infinite: false,
          prevArrow: "<button class='arrow_left'><i class='lni lni-chevron-left'></i></button>",
          nextArrow: "<button class='arrow_right'><i class='lni lni-chevron-right'></i></button>",
          responsive: [
            {
              breakpoint: 1125, // tablet breakpoint
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5
              }
            },
            {
              breakpoint: 980, // tablet breakpoint
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4
              }
            },
            {
              breakpoint: 480, // mobile breakpoint
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            }
          ]
        });
      }
    },

    initTopSlider() {
      $('.cms_sold_top_slider').slick({
        slidesToScroll: 2,
        slidesToShow: 2,
        dots: false,
        infinite: false,
        prevArrow: "<button class='arrow_left'><i class='lni lni-chevron-left'></i></button>",
        nextArrow: "<button class='arrow_right'><i class='lni lni-chevron-right'></i></button>",
      });
      setTimeout(() => {
        $('.cms_sold_top_slider').css({'min-height' : 'auto'});
      }, 250)
    },
    loadItem(slug) {

      this.$axios.get('/item/' + slug)
        .then((response) => {
          this.currentItem = response.data.data;
          let firstColor = this.currentItem.inventories[0];
          this.selectColorImage(firstColor.color_id)
          this.cartForm.item = {...this.currentItem};
          this.currentItem.colors.forEach((c) => {
            this.cartForm.colors.push({...c, ...{quantity: 0}, ...{indicator: 'streaming'}});
          });
          let item = this.itemHistory.find((c) => c.item_slug === slug)
          if(item && item.time){
            this.player.currentTime(item.time)
          }
        })
    },
  },

}
</script>
<style scoped>
#videoplayer{
  opacity: 0;
}
#videoplayer.vjs-has-started{
  opacity: 1;
}
.broadcast_details_slider{
  opacity: 0;
}
.broadcast_details_slider.slick-initialized{
  opacity: 1;
}
</style>
