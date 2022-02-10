<template>
  <section class="product_area">
    <div class="product_banner" >
      <div class="inner_text">
          <h1>Look Book</h1>
      </div>
    </div>
    <div :class="['hl_bredcrumbs']" >
      <ul class="breadcrumb">
        <li><router-link :to="{ name: 'index'}" > Home</router-link></li>
        <li><template>Look Book</template></li>
      </ul>
    </div>

    <div class="product_filter">
      <ul class="p_f_first_child">
      </ul>
      <ul class="p_f_last_child">
        <li>Season</li>
        <li data-toggle="collapse_slide" data-target="#sort" @click.prevent="closeFilter">
          {{currentSeason? currentSeason.name : null}}
          <span class="down"><i class="lni lni-chevron-down"></i></span>
          <span class="up"><i class="lni lni-chevron-up"></i></span>
        </li>
        <div class="f_bottom" id="sort">
          <ul>
            <li v-if="lookBookSeasons.length" v-for="season in lookBookSeasons" @click.prevent="changeSeason(season)"> <a href="javascript:void(0)">{{ season.name }}</a> </li>
          </ul>
        </div>
      </ul>
    </div>
    <div class="product_filter_mobile">
      <div data-toggle="collapse_slide" data-target="#mfilter" class="m_f_button">Season {{currentSeason? currentSeason.name : null}} </div>
      <div class="p_filter_content" id="mfilter">
        <div class="header_menu_inner mobile_nav">
          <ul>
            <li v-if="lookBookSeasons.length" v-for="season in lookBookSeasons" @click.prevent="changeSeason(season)"> <a href="javascript:void(0)">{{ season.name }}</a> </li>
          </ul>
        </div>
        <span class="close_h_menu p_filter_close"  @click.prevent="closeFilter">close</span>
      </div>
    </div>
    <div class="lookbook_area">
      <div class="product_wrap">
        <div class="schedule_img" v-for="(image, imageIndex) in lookBooks" :key="'deskList_' + imageIndex">
          <img :src="image.image" class="img-fluid" alt="">
        </div>
<!--        <client-only>-->
<!--          <template v-if="lookBooks.length">-->
<!--            <VueSlickCarousel ref="c1"-->
<!--                              id="zoom-area"-->
<!--                              v-bind="sliderSettings">-->
<!--              <div :class="['slide']"-->
<!--                   v-for="(image, imageIndex) in lookBooks"-->
<!--                   :key="'deskList_' + imageIndex"-->
<!--                   :style="{ backgroundImage: `url(${image.image})` }">-->
<!--              </div>-->
<!--            </VueSlickCarousel>-->
<!--          </template>-->
<!--        </client-only>-->
      </div>
    </div>
  </section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import {mapGetters} from "vuex";
export default {
  components:{VueSlickCarousel},
  data() {
    return {
      lookBooks:[],
      lookBookSeasons:[],
      filter: null,
      currentSeason:null,
      sliderSettings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        adaptiveHeight: true,
        infinite: false,
        useTransform: true,
        speed: 400,
      },
    }
  },
  computed: {
    ...mapGetters({
      user: 'authModule/getUser',
    }),
  },
  beforeCreate() {
    this.$store.commit('settingsModule/setContentLoad', false);
  },
  created() {
      this.$axios.get('/look-book/season')
        .then((res) => {
          this.lookBookSeasons = res.data.data
          if(this.lookBookSeasons.length)
            this.currentSeason = this.lookBookSeasons[0]
        })
    .finally(()=>{
      this.loadLookBook();
    })

    this.$store.commit('preLoaderModule/setPreloader', true);

  },
  methods: {
    loadLookBook(){
      if(this.currentSeason){
        this.sliderSettings = [];
        this.$axios.get('/look-book/'+this.currentSeason.id)
          .then((res) => {
            this.lookBooks = res.data.data
            this.sliderSettings.slidesToShow = 1;
            // this.$nextTick(() => {
            //   this.sliderSettings.slidesToShow = 1;
            // })
          })
          .finally(()=> {
            this.$store.commit('settingsModule/setContentLoad', true);
            this.$store.commit('preLoaderModule/setPreloader', false);
          })
      }
    },
    changeSeason(season){
      this.currentSeason = season
      this.loadLookBook();
      this.closeFilter()
    },
    closeFilter(){
      $('.collapse_slide').removeClass('active');
      $('.show_from_left , .show_from_right').removeClass('open_h_menu');
      $('.m_f_button').removeClass('active');
      $('.menu').removeClass('open');
      $('.p_filter_content').slideUp();
    },
  }
}
</script>

