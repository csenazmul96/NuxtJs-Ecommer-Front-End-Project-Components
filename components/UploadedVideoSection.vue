<template>
  <section class="ly_broadcasting_area upload_video_wrapper">
    <div class="ly_broadcasting_container">
      <div class="ly_broadcasting_row">
        <div class="custom_video_area">
          <div class="left_video">
            <div class="left_video_inner">
              <iframe scrolling="no" :src="bigIframeSrc" id="iframe" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>
          <div class="description">
            <h2 class="mt_20" v-if="liveData">{{ liveData.name }}</h2>
            <p v-if="liveData">{{ liveData.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "UploadedVideoSection",
  props:{
    liveData: {
      type: Object,
      default: ()=> {}
    },
    play:{
      type:Boolean
    }
  },
  watch:{
    'play':function(){
      if(!this.play){
        this.bigIframeSrc = null
      }else{
        this.videoPlay()
      }
    }
  },
  created() {
    this.videoPlay()
  },
  data() {
    return {
      bigIframeSrc: null,
    }
  },
  methods:{
    videoPlay(){
      this.bigIframeSrc = this.liveData ? this.liveData.video_url + '&front=1' : ''
    },
  }
}
</script>

<style scoped>
.custom_video_area{
  width: 100% !important;
}
</style>
