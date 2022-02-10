<template>
    <div id='preloader' v-if="preloader">
        <div id='preloader_inner'>
          <h1><img src="/images/logo-black.png" alt="Wholesale women's clothing Davi & Dani"></h1>
          <div id='inscription'>
            <i>Loading</i>
            <span>...</span>
          </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  name:'pre-loader',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      preloader: 'preLoaderModule/preloader',
    }),
  },
}
</script>
