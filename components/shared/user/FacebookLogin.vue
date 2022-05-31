<template>
  <div class="d_flex_start">
    <client-only>
      <button v-if="customer && !customer.fb_user_id" @click.prevent="fbLogin" class="btn facebook_default_btn">
        <img width="24px" src="/images/fb.png" alt="">
        <span>Log in With Facebook</span>
      </button>
      <button v-if="customer && customer.fb_user_id" class="btn facebook_default_btn fb_loged_in">
        <img src="/images/fb.png" class="fb_img" alt="">
        <span>{{ customer.fb_name }}</span>
        <img class="fb_profile" v-if="customer.fb_image" :src="customer.fb_image" alt="">
      </button>
      <button v-if="customer && customer.fb_user_id" @click.prevent="fbLogout" class="btn facebook_default_btn logout">
        <span><i class="fas fa-sign-out-alt"></i></span>
      </button>
    </client-only>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  middleware: 'auth',
  name: "Facebook",
  computed: {
    ...mapGetters({
      customer: 'customerModule/getCustomerDetails',
    }),
  },
  methods: {
    fbLogin() {
      let self = this;
      window.FB.login(function(response) {
        if (response.authResponse) {
          self.fbLoginResponse(response.authResponse)
        }
      }, {
        scope: 'public_profile,email'
      });
    },
    fbLoginResponse(response) {
      this.$axios.post('/save-facebook-credentials', {
        fb_user_id: response.userID,
        access_token: response.accessToken,
      })
        .then((response)=>{
          this.$store.dispatch('customerModule/dispatchCustomerDetails')
        })
        .catch((err) => {
          this.showFailMsg("Something went wrong!");
        })
    },
    fbLogout(){
      this.$axios.get('/remove-facebook-credentials').then(()=>{
        this.$store.dispatch('customerModule/dispatchCustomerDetails')
      })
    }
  }
}
</script>
