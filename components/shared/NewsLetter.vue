<template>
  <div>
    <section class="footer_newsletter_area">
      <div class="footer_newsletter_title" v-if="newsLetterText" v-html="newsLetterText.content"></div>
      <div class="footer_newsletter_form">
        <input type="text" class="form-control" v-model="form.email" placeholder="Please enter your email address">
        <button class="btn_common" :disabled="loading" @click.prevent="submit">SUBMIT</button>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name:'Newsletter',
  data(){
    return {
      newsLetterText: null,
      form: {
        email: '',
      }
    }
  },
  created() {
    this.$axios.get('/custom-section', {params: {types: JSON.stringify([4])}})
      .then((response) => {
        let resData = response.data.data
        resData.forEach(element => {
          if(element.type == 4 && element.conten !='' ) this.newsLetterText = element
        });
      })
      .catch(() => {})
      .finally(()=>{
        // this.$store.commit('settingsModule/setContentLoad', true);
      })
  },
  methods: {
    submit() {
      this.errors = null;
      this.loading = true;
      this.$axios.post('/add-to-mailchimp/', this.form)
        .then(() => {
          this.showSuccessMsg("Added Successfully!");
        })
        .catch((err) => {
          this.errors = err.response.data.errors
          this.showFailMsg("Not Added Successfully!");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  }

}
</script>
