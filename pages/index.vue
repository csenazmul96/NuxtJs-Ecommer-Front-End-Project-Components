<template>
  <div>
    <client-only>
      <!-- live chat start -->
      <livechat-component v-if="liveData && $auth.loggedIn" :liveData="liveData"></livechat-component>
      <!-- live chat end -->
    </client-only>

    <client-only>
      <!-- slider section start -->
      <section class="show_mobile banner_wrap" v-if="mobileSliders && mobileSliders.length" >
        <template>
          <client-only >
            <carousel :autoplay="mobileSliders.length > 1" :loop="true" :autoplayTimeout="10000" :dots="false" :nav="false" :margin="5" :items="1">
              <div class="banner_inner full_width" v-for="(value, i) in mobileSliders" :key="'mobile'+i">
                <a :href="value.link">
                  <img class="img-fluid" :src="value.image" alt="Wholesale women's clothing Davi & Dani">
                </a>
              </div>
            </carousel>
          </client-only>
          <div class="ocean_wrap">
            <div class="ocean">
              <div class="wave"></div>
              <div class="wave"></div>
            </div>
          </div>
        </template>
      </section>

      <section class="show_desktop banner_wrap" v-if="desktopSliders.length">
        <carousel :autoplay="desktopSliders.length > 1"
                  :loop="true" :autoplayTimeout="10000" :dots="false"
                  :nav="false" :margin="5" :items="1">
          <div class="banner_inner full_width" v-for="(value, i) in desktopSliders" :key="'des'+i">
            <a :href="value.link">
              <img class="img-fluid" :src="value.image" loading="lazy" width="1580" height="575" alt="Wholesale women's clothing Davi & Dani">
            </a>
          </div>
        </carousel>
        <div class="ocean_wrap">
          <div class="ocean">
            <div class="wave"></div>
            <div class="wave"></div>
          </div>
        </div>
      </section>
      <!-- slider section end -->
    </client-only>
    <!-- top widgets start -->
    <section class="home_polish" v-if="desktopSliders.length && mobileSliders.length">
      <div class="inner">
        <h1 v-if="sectionHeadings.length">{{ sectionName('home_page_top_feature_wedget') }}  </h1>
        <template v-if="featureWidgets && featureWidgets.length">
          <div v-if="sectionHeadings.length" class="home_polish_wrap show_desktop">
            <div class="home_polish_row">
              <div class="home_polish_inner" v-for="(banner, i) in featureWidgets" :key="'banner_'+i">
                <a :href="banner.link">
                  <picture v-if="banner.desktop">
                    <source media="(max-width:1450px)" :srcset="banner.mobile">
                    <source media="(min-width:1451px)" :srcset="banner.desktop">
                    <img :data-src="banner.desktop" v-lazy-load alt="Wholesale women's clothing Davi & Dani" class="img-fluid">
                  </picture>
                </a>
                <h2>{{ banner.title }}</h2>
                <p>{{ banner.description }}</p>
              </div>
            </div>
          </div>
          <div class="home_polish_mobile show_mobile">
            <carousel :autoplay="false" :loop="true" :stagePadding="80" :dots="false" :margin="10" v-if="featureWidgets.length > 0" :responsive="{0:{items:1,nav:false},768:{items:2,nav:false}}">
              <div class="inner_mobile" v-for="(banner, i) in featureWidgets" :key="'banner_'+i">
                <a :href="banner.link">
                  <picture v-if="banner.mobile">
                    <source media="(max-width:1024px)" :srcset="banner.mobile">
                    <source media="(max-width:768px)" :srcset="banner.mobile">
                    <img :data-src="banner.mobile" v-lazy-load alt="Wholesale women's clothing Davi & Dani" class="img-fluid">
                  </picture>
                </a>
                <h2>{{ banner.title }}</h2>
                <p>{{ banner.description }}</p>
              </div>
            </carousel>
          </div>
        </template>
      </div>
    </section>
    <!-- top widgets end -->
    <!-- latest items start -->
    <section class="home_our_picks home_product_wrap" v-if="selectedItems && selectedItems.length">
      <h1 v-if="sectionHeadings.length">{{ sectionName('home_page_selected_item') }}</h1>
      <div class="h_our_picks_wrap" v-if="sectionHeadings.length">
        <div class="h_our_picks_row">
          <productComponent v-for="(product, productKey) in selectedItems" :key="'product_' + productKey"  :product="product" :imageBlock="false" :priceBlock="true"></productComponent>
        </div>
      </div>
    </section>

    <section class="home_polish fabulous_five" v-if="customSection">
      <div class="inner" v-html="customSection.content"></div>
    </section>

    <!-- bottom widgets start -->
    <section class="home_polish fabulous_five" v-if="WidgetsBottoms && WidgetsBottoms.length">
      <div class="inner">
        <h1 v-if="sectionHeadings.length">{{ sectionName('home_page_bottom_feature_wedget') }}</h1>
        <div v-if="sectionHeadings.length" class="home_polish_wrap show_desktop">
          <div class="home_polish_row">
            <div class="home_polish_inner" v-for="(banner, i) in WidgetsBottoms" :key="'bottombBanner_'+i">
              <a :href="banner.link">
                <picture v-if="banner.desktop">
                  <source media="(max-width:1450px)" :srcset="banner.mobile">
                  <source media="(min-width:1451px)" :srcset="banner.desktop">
                  <img :data-src="banner.desktop" v-lazy-load alt="Wholesale women's clothing Davi & Dani" class="img-fluid">
                </picture>
              </a>
              <h2>{{ banner.title }}</h2>
              <p>{{ banner.description }}</p>
            </div>
          </div>
        </div>
        <div class="home_polish_mobile show_mobile">
          <carousel :autoplay="false" :loop="true" :stagePadding="80" :dots="false"  :margin="10"  v-if="WidgetsBottoms.length > 0" :responsive="{0:{items:1,nav:false},768:{items:2,nav:false}}">
            <div class="inner_mobile" v-for="(banner, i) in WidgetsBottoms" :key="'bottombBanner_'+i">
              <a :href="banner.link">
                <picture v-if="banner.mobile">
                  <source media="(max-width:1024px)" :srcset="banner.mobile">
                  <source media="(max-width:768px)" :srcset="banner.mobile">
                  <img :data-src="banner.mobile" v-lazy-load alt="Wholesale women's clothing Davi & Dani" class="img-fluid">
                </picture>
              </a>
              <h2>{{ banner.title }}</h2>
              <p>{{ banner.description }}</p>
            </div>
          </carousel>
        </div>
      </div>
    </section>
    <!-- bottom widgets end -->
    <!-- Our Story Start -->
    <section class="our_values_area home_polish fabulous_five" v-if="ourStory">
      <div class="inner" >
        <h1>Our Story</h1>
        <div class="h_our_picks_wrap" v-html="ourStory.content"></div>
      </div>
    </section>
    <!-- Our Story end -->

    <client-only>
      <instagram-section v-if="featureWidgets.length"></instagram-section>
    </client-only>

    <!-- latest items end -->
    <section class="news_letter_top" v-if="service" v-html="service.content"></section>
    <!-- Instagram section end -->
    <client-only>
      <div class="wcmodel modal" :class="{open_modal: showWlNModal}"  data-modal="wcm">
        <div class="modal_overlay" data-modal-close="wcm"></div>
        <div class="welcome_modal_wrapper">
          <div class="modal_inner modal_600p mt-3">
            <span class="close_modal" data-modal-close="wcm" @click="showWlNModal = false"></span>
            <div class="col-md-12" v-html="welcomeNotification"></div>
          </div>
        </div>
      </div>
    </client-only>

  </div>
</template>
<script>
import LivechatComponent from "../components/livechat/LivechatComponent";
import ProductComponent from "../components/shared/ProductComponent";
import InstagramSection from "../components/shared/InstagramSection";
import Pusher from "pusher-js"
import {mapGetters} from "vuex";

export default {
  components: {LivechatComponent, InstagramSection, ProductComponent},
  data() {
    return {
      desktopSliders: [],
      mobileSliders: [],
      featureWidgets:[],
      WidgetsBottoms:[],
      selectedItems:[],
      sectionHeadings:[],
      ourStory: null,
      customSection: null,
      service: null,
      liveNow: false,
      showWlNModal: false,
      welcomeNotification: null,
      metas: null,
    }
  },
  computed: {
    ...mapGetters({
      liveData: 'settingsModule/getLiveData',
    }),
  },
  head() {
    return {
      title: this.metas ? this.metas.title : '',
      meta: [
        {
          name: 'title',
          content: this.metas ? this.metas.title : '',
        },
        {
          name: 'description',
          content: this.metas ? this.metas.description : ''
        },
      ]
    }
  },
  beforeCreate() {
    this.$store.commit('settingsModule/setContentLoad', false);
  },
  async asyncData ({ $axios }) {
    const [mobile, desktop, metas] = await Promise.all([
      $axios.get('/sliders/mobile'),
      $axios.get('/sliders/desktop'),
      $axios.get('/home-page/metas'),
    ])

    return {
      mobileSliders: mobile.data.data,
      desktopSliders: desktop.data.data,
      metas: metas.data.data,
    }
  },
  /*async fetch() {
    await this.$axios.get('/sliders/mobile')
      .then((response) => this.mobileSliders = response.data.data)

    await this.$axios.get('/sliders/desktop')
      .then((response) => this.desktopSliders = response.data.data)

    await this.$axios.get('/home-page/metas')
      .then((response) => {
        this.metas = response.data.data
      })
  },*/
  created() {
    if (process.client) {
      this.visitorRecord();
      this.getLiveStatus();
    }

    this.getWelcomeNotification()

    this.$axios.get('/home/section/headings')
      .then((response) => {
        this.sectionHeadings = response.data
      });

    this.$axios.get('/get/feature/widget')
      .then((response) => {
        this.featureWidgets = response.data.top
        this.WidgetsBottoms = response.data.bottom
      })

    this.$axios.get('/custom-section', {params: {types: JSON.stringify([2,3,1])}})
      .then((response) => {
        let resData = response.data.data
        resData.forEach(element => {
          if(element.type == 1 && element.conten !='' ) this.customSection = element
          if(element.type == 2 && element.conten !='' ) this.ourStory = element
          if(element.type == 3 && element.conten !='' ) this.service = element
        });
      })
      .finally(()=>{
        this.$store.commit('settingsModule/setContentLoad', true);
      })

    this.$axios.get('/home/selected/items')
      .then((response) => {
        this.selectedItems = response.data
      })
  },
  mounted() {
    // this.getLiveVideo();
  },
  methods: {
    getWelcomeNotification(){
      if (process.client) {
        let welcomeNotification = localStorage.getItem('welcomeNotification')
        if (!welcomeNotification) {
          this.$axios.get('welcome-notification').then((response) => {
            if(response.data.data){
              this.showWlNModal = true
              this.welcomeNotification = response.data.data
              localStorage.setItem('welcomeNotification', this.welcomeNotification)
            }
          })
        }
      }
    },
    sectionName(section_name){
      let sections = this.sectionHeadings ? this.sectionHeadings : [];
      let section =  sections.find( (data) => data.section_name === `${section_name}`) ;

      if (section)
        return section.heading;
      else
        return '';
    },

    async visitorRecord(){
      await this.$axios.get('https://ipinfo.io/ip')
        .then((response) => {
          this.$axios.post('/home-page-visitor-record', {ip: response.data}).catch(() => {});
        }).catch(() => {});
    },

    // getLiveVideo() {
    //   this.$axios.get(process.env.NUXT_ENV_BROADCAST_API + '/current-live/' + process.env.NUXT_ENV_BROADCAST_VENDOR_ID)
    //     .then((response) => {
    //       if (response.data) {
    //         this.liveData = response.data.data;
    //         this.$store.commit('settingsModule/setShowLiveNow', true);
    //       } else {
    //         this.liveData = null;
    //         this.$store.commit('settingsModule/setShowLiveNow', false);
    //       }
    //     })
    // },
    getLiveStatus(){
      let self = this;
      const PubNub = require('pubnub');
      const uuid = PubNub.generateUUID();
      const pubnub = new PubNub({
        publishKey: process.env.NUXT_ENV_PUBNUB_PUBLISH_KEY,
        subscribeKey: process.env.NUXT_ENV_PUBNUB_SUBSCRIBE_KEY,
        uuid: uuid
      });

      pubnub.addListener({
        message: function(message) {
          if (message.message.title === 'live') {
            self.$store.dispatch('settingsModule/getLiveVideo')
          }
        }
      })

      pubnub.subscribe({
        channels: ['1'],
        withPresence: true,
      });
    }
  }

}
</script>
