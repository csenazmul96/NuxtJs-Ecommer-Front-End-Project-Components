<template>
  <div class="inner" v-if="video">
    <div class="inner_wrap" @click="playVideo(video.id)">
      <a href="javascript:void(0)">
        <div class="slide_img">
          <img :src="video.preview_thumbs ? video.preview_thumbs : (thumb ? thumb : '/images/play.png')" class="width_full" alt="">
          <img v-if="video.preview_gif" :src="video.preview_gif" class="width_full on_hover" alt="">
        </div>
        <div class="play">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="213.7px" height="213.7px" viewBox="0 0 213.7 213.7" enable-background="new 0 0 213.7 213.7" xml:space="preserve">
            <polygon class="triangle" id="XMLID_18_" fill="none" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="73.5,62.5 148.5,105.8 73.5,149.1 "></polygon>
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
      </a>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "VideoComponent",
  props:{
    video:{}
  },
  computed:{
    ...mapGetters({
      thumb: 'settingsModule/getDaviTvVideoThumb',
    }),
  },
  methods:{
    playVideo(id){
      this.$emit('playVideo', id)
    }
  }
}
</script>
