<template>
  <div>
    <section class="ly_broadcasting_area">
      <div class="ly_broadcasting_container">
        <div class="ly_broadcasting_row">
          <div class="full_content">
            <div class="inner chat_box" id="cmsold_desktop"> <!-- ---------------------- chat wrap for Desktop ------------------------------------------- -->
              <div class="js_chat_wrap" id="chat_wrap">
                <h1 class="product_list_title">Chat</h1>
                <div class="js_chat_head chat_head largeScreenChatScroll" id="cmsoldChatHead"  >
                  <div class="chat_head_inner" ref="largeScreenChatScroll">
                    <ul class="js_cmsold_wrap" id="cmsoldWrap">
                      <div class="comments">
                        <li v-for="(comment, i) in currentComments" :key="'comment_'+i" :class="{reply:comment.user_type === 'Admin'}">
                          <div class="append_inner">
                            <div class="text">
                              <h2>{{ comment.name }} <span>{{ comment.comment }}</span></h2>
                              <p v-if="comment.sent_reply" class="private_msg">Privately Message</p>
                            </div>
                          </div>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
                <div id="hearts-alpaca" class="hearts"></div>
                <div class="reply_chat">
                  <div class="name">
                    <img src="/images/user-white.png" alt="">
                  </div>
                  <input type="text" ref="commentInput" class="form_global" disabled="disabled">
                  <div class="imojies">
                    <span><img src="/images/love.png" alt=""></span>
                    <span><img src="/images/like.png" alt=""></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="inner live_video">
              <div class="inner_content">
                <!--===============================Video Player==========================================================================-->
                <div id="video_wrap">
                  <video id="videoplayer" v-on:play="isPlay = true" class="video-js vjs-default-skin" controls muted playsinline> </video>
                  <div class="showing_item" v-if="liveCurrentItem">
                    <div class="showing_item_inner">
                      <div class="time"><i class="lni lni-timer"></i> {{ currentPlayerTime ? currentPlayerTime : '00.00' }}</div>
                      <div class="live_user"><i class="lni lni-eye"></i> {{ liveData.total_view }}</div>
                      <div class="reply_video"><i class="lni lni-spinner-arrow"></i> Replay</div>
                      <div class="item_details">
                        <div class="img" v-if="liveCurrentItem.images.length" @click.prevent="loadCurrentItemModal(liveCurrentItem.slug)">
                          <img :src="liveCurrentItem.images[0].compressed_image" class="width_full">
                        </div>
                        <div class="text">
                          <h2>COMMENT : "{{ settings ? settings.comment_prefix : null }} {{ itemIdentifire(liveCurrentItem.id) }}"</h2>
                          <p>Color :  {{liveCurrentItem.inventories.map(i => capitalizedName(i.color_name)).join(', ')}}</p>
                          <p>Pack : {{ liveCurrentItem.pack ? liveCurrentItem.pack.name : null }}</p>
                        </div>
                      </div>
                      <div class="price">${{ liveCurrentItem.price.toFixed(2) }}</div>
                    </div>
                  </div>

                  <div class="custom_play_btn" @click.prevent="playerButton">
                    <div class="playBut">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="213.7px" height="213.7px" viewBox="0 0 213.7 213.7" enable-background="new 0 0 213.7 213.7" xml:space="preserve">
                      <polygon class="triangle" id="homangle" fill="none" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="73.5,62.5 148.5,105.8 73.5,149.1 "></polygon>
                        <circle class="circle" id="XMLID_17_" fill="none" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" cx="106.8" cy="106.8" r="103.3"></circle>
                    </svg>
                    </div>
                  </div>
                  <div class="product_collapse_mobile" @click.prevent="modalOpen('#Itemsmain')">
                    <i class="lni lni-list"></i>
                  </div>
                  <div class="view_product_moblie" id="Itemsmain">
                    <div class="product_overlay" @click.prevent="modalClose('#Items1', '#Itemsmain')"></div>
                    <div class="view_product_moblie_wrap">
                      <!--===============================Mobile Product Details==========================================================================-->
                      <div class="inner_content product_details_list items1" id="Items1">
                        <button class="close_pd_mobile" @click.prevent="modalClose('#Items1')"></button>
                        <div class="cms_sold_top_slider" v-if="currentItemImages">
                          <div class="" v-for="(image, i) in currentItemImages" :key="'image_mob_'+i">
                            <div :class="{active:currentItem.id === image.item_id}">
                              <a href="Javascript:void(0)"><img :src="image.compressed_image" alt="Wholesale women's clothing Davi & Dani" class="img-fluid"></a>
                            </div>
                          </div>
                        </div>
                        <div class="cmsold_product_text" v-if="currentItem">
                          <span class="cmsold_product_sku">{{ currentItem.style_no }}</span>
                          <h2 class="cmsold_product_title">{{ currentItem.name }}</h2>
                          <p class="cmsold_price"><span>${{ currentItem.price.toFixed(2) }}</span>  <span>{{ itemIdentifire(currentItem.id) }}</span></p>
                          <span v-if="vendorCurrentItem === currentItem.slug" class="cmsold_now">Now Showing</span>
                        </div>
                        <div v-if="currentItem && currentItem.inventories" :class="['pack_ratio', {scroll:currentItem.inventories.length > 3}]">
                          <div class="row" v-for="inv in currentItem.inventories" :class="{active:activeColor === inv.color_id}">
                            <div class="cms_col col-5 col-lg-4 pr_5">
                              <div class="pack_ratio_inner_wrap color">
                                <div class="pack_ratio_inner ratio_color" @click.prevent="selectColorImage(inv.color_id)">
                                  <img :src="getColorImage(inv.color_id, currentItem.images)" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
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
                        <button class="cms_sold_cart" @click.prevent="addToCart">
                          Add To Cart
                        </button>
                      </div>
                      <!--===============================Mobile Product List==========================================================================-->
                      <div class="product_list items_main">
                        <button class="close_pd_mobile" @click.prevent="modalClose('#Itemsmain')"> </button>
                        <h1 class="product_list_title"> Shop</h1>
                        <div class="product_list_wrap">
                          <ul>
                            <li v-for="(item, i) in products" @click.prevent="loadItem(item.slug, '#Items1')" :key="'mob_'+i" :class="{active:item.slug === currentItem.slug}">
                              <div class="product_inner_list">
                                <div class="img">
                                  <img :src="item.images[0].compressed_image" alt="Wholesale women's clothing Davi & Dani">
                                </div>
                                <div class="text">
                                  <p :class="[{pre_order:item.available_on}, {Instock:!item.available_on}]">{{ settings ? settings.comment_prefix : null }} {{ itemIdentifire(item.id) }} <span v-if="item.available_on">PRE ORDER - {{item.available_on}}</span> <span v-else>Instock</span></p>
                                  <h2>{{item.name}}</h2>
                                  <P v-if="item.pack">Pack : {{item.pack.pack_text}} ({{item.pack.name}})</P>
                                  <p>Price : ${{ item.price.toFixed(2) }}</p>
                                </div>
                                <span><i class="fas fa-chevron-right"></i></span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--===============================Mobile Chat List==========================================================================-->
                  <div class="js_chat_wrap chat_wrap_mobile" id="chat_wrap" v-if="currentComments.length">
                    <div class="js_chat_head chat_head" id="cmsoldChatHead">
                      <div class="chat_head_inner" ref="smallScreenChatScroll">
                        <ul class="js_cmsold_wrap" id="cmsoldWrap">
                          <div class="comments">
                            <li v-for="(comment, i) in currentComments" :key="'comment_'+i" :class="{reply:comment.user_type === 'Admin'}">
                              <div class="append_inner">
                                <div class="text">
                                  <h2>{{ comment.name }} <span>{{ comment.comment }}</span></h2>
                                  <p v-if="comment.sent_reply" class="private_msg">Privately Message</p>
                                </div>
                              </div>
                            </li>
                          </div>
                        </ul>
                      </div>
                    </div>
                    <div id="hearts-alpaca" class="hearts"></div>
                  </div>
                  <div class="reply_chat reply_chat_mobile">
                    <input type="text" ref="commentInputMob" class="form_global"  disabled="disabled">
                    <div class="imojies">
                      <span><i class="lni lni-heart-filled"></i></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="inner view_product">
              <div class="inner_content product_details_list" id="Items">
                <button class="close_pd" @click.prevent="modalClose('#Items')">Close</button>
                <div class="cms_sold_top_slider" v-if="currentItemImages">
                  <div class="" v-for="(image, i) in currentItemImages" :key="'image_'+i">
                    <div :class="{active:currentItem.id === image.item_id}">
                      <a href="Javascript:void(0)"><img :src="image.compressed_image" alt="Wholesale women's clothing Davi & Dani" class="img-fluid"></a>
                    </div>
                  </div>
                </div>
                <div class="cmsold_product_text" v-if="currentItem">
                  <span class="cmsold_product_sku">{{ currentItem.style_no }}</span>
                  <h2 class="cmsold_product_title">{{ currentItem.name }}</h2>
                  <p class="cmsold_price"><span>${{ currentItem.price.toFixed(2) }}</span>  <span>{{ itemIdentifire(currentItem.id) }}</span></p>
                  <span v-if="vendorCurrentItem === currentItem.slug" class="cmsold_now">Now Showing</span>
                </div>
                <div v-if="currentItem && currentItem.inventories" :class="['pack_ratio', {scroll:currentItem.inventories.length > 3}]">
                  <div class="row" v-for="inv in currentItem.inventories" :class="{active:activeColor === inv.color_id}">
                    <div class="cms_col col-5 col-lg-4 pr_5">
                      <div class="pack_ratio_inner_wrap color">
                        <div class="pack_ratio_inner ratio_color" @click.prevent="selectColorImage(inv.color_id)">
                          <img :src="getColorImage(inv.color_id, currentItem.images)" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
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
              <div class="product_list">
                <h1 class="product_list_title"> Shop</h1>
                <div class="product_list_wrap">
                  <ul>
                    <li v-for="(item, i) in products" @click.prevent="loadItem(item.slug, '#Items')" :key="'desk_'+i" :class="{active:item.slug === currentItem.slug}">
                      <div class="product_inner_list">
                        <div class="img">
                          <img :src="item.images[0].compressed_image" alt="Wholesale women's clothing Davi & Dani">
                        </div>
                        <div class="text">
                          <p :class="[{pre_order:item.available_on}, {Instock:!item.available_on}]">{{ settings ? settings.comment_prefix : null }} {{ itemIdentifire(item.id) }} <span v-if="item.available_on">PRE ORDER - {{item.available_on}}</span> <span v-else>Instock</span></p>
                          <h2>{{item.name}}</h2>
                          <P v-if="item.pack">Pack : {{item.pack.pack_text}} ({{item.pack.name}})</P>
                          <p>Price : ${{ item.price.toFixed(2) }}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="ly_broadcasting_area broadcasting_list">
      <div class="ly_broadcasting_container">
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
                            <li>{{ video.start_at_format }}</li>
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
      liveCurrentItem: null,
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
      settings:null,
      currentPlayerTime: null,
      playStatus: true
    }
  },
  watch: {
    'player': function () {
      let self = this
      this.player.on('touchstart', (e) => {
        let player = e.target
        if(player.paused){
            if(self.player)
              self.player.play()
        }else{
            if(self.player)
              self.player.pause()
        }
      });
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
    this.$axios.get(process.env.NUXT_ENV_BROADCAST_API + '/settings/' + process.env.NUXT_ENV_BROADCAST_VENDOR_ID)
      .then((response)=>{
        this.settings = response.data.data
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
    capitalizedName(name){
      return name.toUpperCase();
    },
    playerButton(){
      if(this.player)
        this.player.play()
    },
    modalOpen(id){
      let target = $(id);
      target.slideDown();
    },
    modalClose(id, id2 = null){
      let target = $(id);
      target.slideUp();
      if(id2) {
        let target2 = $(id2);
        target2.slideUp();
      }
    },
    loadCurrentItemModal(slug){
      this.loadItem(slug)
      this.modalOpen("#Items")
      if(window.outerWidth <= 1024) {
        this.modalOpen("#Items1")
        setTimeout(()=>{
          this.modalOpen("#Itemsmain")
        },250)
      }
    },
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
        if (this.liveCurrentItem && this.liveCurrentItem.slug != item.item_slug){
          if(this.products.length) {
            let product = this.products.find(p => p.slug === item.item_slug)
            if (product) {
              this.liveCurrentItem = product
            }
          }
        }

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
        try {
          this.player.dispose();
        } catch (er) {

        }
        let self = this;
        this.player = window.videojs('videoplayer',{
          inactivityTimeout: 0,
          liveui: true,
          liveTracker: true,
          fluid: true,
          controlBar: {
            volumePanel: {
              inline: false,
              volumeControl: {
                vertical: true
              }
            }
          }
        });

        this.player.ready(function() {
          self.player.src([
            {src: self.liveData.video_url_fallback, type: 'application/x-mpegURL'},
            {src: self.liveData.video_url, type: 'application/dash+xml'}
          ]);
          self.player.autoplay('any');
          self.player.aspectRatio('16:9');
          self.player.play();
        });
        self.player.on('timeupdate', function () {
          let sec = Math.floor(self.player.currentTime());
          self.currentPlayerTime = Math.floor(sec/60).toString().padStart(2, '0') + ':' + (sec - (Math.floor(sec/60) * 60)).toString().padStart(2, '0')

          self.filterComments(self.player.currentTime())
          self.checkCurrentItem(self.player.currentTime())
          self.checkCurrentReact(self.player.currentTime())
        });
        this.player.on('playing', () => {
          $('.custom_play_btn').hide();
        });
        this.player.on('waiting', () => {
          $('.custom_play_btn').hide();
        });
        this.player.on('pause', () => {
          $('.custom_play_btn').show();
        });
        this.player.on('pl', () => {
          $('.custom_play_btn').show();
        });
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
              this.liveCurrentItem = item[0];
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
    loadItem(slug, id = null) {
      if(this.products.length) {
        let item = this.products.find(item => item.slug === slug)
        if(item) {
          this.currentItem = item;
          let firstColor = this.currentItem.inventories[0];
          this.selectColorImage(firstColor.color_id)
          this.cartForm.item = {...this.currentItem};
          this.currentItem.colors.forEach((c) => {
            this.cartForm.colors.push({...c, ...{quantity: 0}, ...{indicator: 'streaming'}});
          });
        }
      }
      if (id) {
        this.modalOpen(id)
      }
    },
  },

}
</script>
