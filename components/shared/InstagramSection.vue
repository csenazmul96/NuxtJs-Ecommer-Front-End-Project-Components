<template>
  <section class="instagram_area" v-if=" instagramFeeds && instagramFeeds.length">
    <h2>Follow us on instagram</h2>
    <div v-if="sectionHeadings.length" class="insta_slider" style="width: 100%;">
      <carousel :autoplay="false" :loop="true" :dots="false" :responsive="{0:{items:2,nav:false , margin : 10},768:{items:3,nav:false, margin : 10}, 1025:{items:5,nav:false, margin : 20}}">
        <div class="instagram_inner" v-for="(insta, i) in instagramFeeds" :key="'insta_'+i">
          <a :href="insta.permalink" target="_blank">
            <template v-if="!insta.children">
              <img v-if="insta.media_type === 'IMAGE' || insta.media_type === 'CAROUSEL_ALBUM'" :src="insta.media_url" :alt="insta.caption" class="img-fluid" v-lazy-load>
              <video v-else id='video' loop muted preload="metadata" width="100%" height="100%" class="embed-responsive-item" autoplay playsinline>
                <source :src="insta.media_url">
              </video>
            </template>
            <template v-else>
              <img v-if="insta.children && insta.children.data.length && (insta.children.data[0].media_type === 'IMAGE' || insta.children.data[0].media_type === 'CAROUSEL_ALBUM') " v-lazy-load :src="insta.children.data[0].media_url"  class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
              <video v-else id='video' loop muted preload="metadata" width="100%" height="100%" class="embed-responsive-item" autoplay playsinline>
                <source :src="insta.children.data[0].media_url">
              </video>
            </template>
            <div class="inner">
              <span><i class="lni lni-instagram"></i></span>
            </div>
          </a>
        </div>
      </carousel>
    </div>
  </section>

</template>

<script>
export default {
  name: "InstagramSection",
  data() {
    return {
      sectionHeadings:[],
      instagramFeeds: [],
    }
  },
  created() {
    this.$axios.get('/home/section/headings')
      .then((response) => {
        this.sectionHeadings = response.data
      })
      .catch(() => {});

    if (process.client) {
      this.$axios.get('/instagram/feeds')
        .then((response) => {
          this.instagramFeeds = response.data.data
          if (this.instagramFeeds.length)
            this.instagramFeeds = this.instagramFeeds.slice(0, 10)
        })
        .catch(() => {
        })
        .finally(() => {
          // this.$store.commit('settingsModule/setContentLoad', true);
        })
    }
  },
  methods:{
    sectionName(section_name){
      let sections = this.sectionHeadings ? this.sectionHeadings : [];
      let section =  sections.find( (data) => data.section_name === `${section_name}`) ;

      if (section)
        return section.heading;
      else
        return '';
    },
  }
}
</script>

<style scoped>

</style>
