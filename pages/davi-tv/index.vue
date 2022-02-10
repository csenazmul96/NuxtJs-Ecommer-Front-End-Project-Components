<template>
  <div>
    <div class="tv_banner" v-if="banner">
      <img :src="banner" class="img-fluid width_full" alt="" style="width: 100%;">
    </div>
    <section class="ly_broadcasting_area broadcasting_list">
      <div class="ly_broadcasting_container">
        <div class="ly_broadcasting_row">
          <div class="video_thumbnail">
            <video-component v-for="(video, key) in videos" :key="'product_' + key" :video="video"></video-component>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import VideoComponent from "@/components/shared/VideoComponent";
import {mapGetters} from "vuex";
export default {
  middleware: 'auth',
  components:{VideoComponent},
  name: "index",
  data(){
    return {
      inactiveQueryParams: {
        page: 1
      },
      videos: [],
    }
  },
  created() {
    this.loadInactiveList();
  },
  computed:{
    ...mapGetters({
      banner: 'settingsModule/getDaviTvVideoBanner',
    }),
  },
  methods:{
    loadInactiveList(){
      this.$axios.get(process.env.NUXT_ENV_BROADCAST_API + '/live-video-inactive/' + process.env.NUXT_ENV_BROADCAST_VENDOR_ID, {
        params: {...this.inactiveQueryParams}
      }).then((response) => {
        this.videos = response.data.data;
      }).catch(() => {})
    },
  }
}
</script>
