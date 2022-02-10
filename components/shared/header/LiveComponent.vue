<template>
  <div class="live_notification" :style="{background:settings.content_2 ? settings.content_2 : '#fff'}" v-if="settings">
    <div class="live_notification_inner">
      <div class="live_text">
        <router-link v-if="$auth.loggedIn" :to="{name:'index'}"><span>{{ settings.content }}</span></router-link>
        <router-link v-else :to="{name:'login'}"><span>{{ settings.content }}</span></router-link>
      </div>
    </div>
  </div>
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
