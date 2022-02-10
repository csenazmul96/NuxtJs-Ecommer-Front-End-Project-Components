<template>
  <section class="">
    <div class="product_banner mt_0" >
      <div class="inner_text">
        <h1>Show Schedule</h1>
      </div>
    </div>
    <div class="lookbook_area mt_20" v-html="pageData && pageData.content"></div>
  </section>
</template>

<script>
export default {
  name: "Index",
  data(){
    return {
      pageData: null,
    }
  },
  beforeCreate() {
    this.$store.commit('settingsModule/setContentLoad', false);
  },
  created() {
    this.$store.commit('preLoaderModule/setPreloader', true);
    this.getData();
  },
  methods:{
    getData(){
      this.$axios.get('/get/static-page/'+16+'/'+this.$route.name)
        .then((response)=>{
          this.pageData = response.data.data
        })
        .finally(()=> {
          this.$store.commit('settingsModule/setContentLoad', true);
          this.$store.commit('preLoaderModule/setPreloader', false);
        })
    }
  }
}
</script>
