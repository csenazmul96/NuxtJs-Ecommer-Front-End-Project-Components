<template>
  <section id="live_notice_section" >
    <div class="live_notification">
      <div class="live_notification_inner">
        <div class="live_text" id="reload_streaming_check">
           <nuxt-link v-if="!$auth.loggedIn" :to="{name: 'login'}">We are Live Now</nuxt-link>
           <a class="live_play_notice" v-else href="javascript:void(0)">We are Live Now</a>
        </div>
        <div class="live_now">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  name: "LiveNow",
  computed: {
    ...mapGetters({
      settings: 'settingsModule/getLiveContent',
    }),
  },
}
</script>
