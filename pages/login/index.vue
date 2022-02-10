<template>
  <div>
  <section class="login_page">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="login_inner bg-transparent border-0 pt_20">
            <h2 class="border-0">Login Here</h2>
            <div class="header_account_inner">
              <div class="form_inline">
                <label class="required">Email</label>
                <input type="text" class="form-control" placeholder="Email Address" @keyup.enter="buyerLogin" v-model="form.email">
                <v-errors :errors="errorFor('email')"></v-errors>
              </div>
              <div class="form_inline">
                <label>Password</label>
                <input type="password" class="form-control" placeholder="Password" @keyup.enter="buyerLogin" v-model="form.password">
                <v-errors :errors="errorFor('password')"></v-errors>
              </div>
              <button class="btn_common" @click.prevent="buyerLogin" ref="loginButton">login <span v-show="loading"> <i class="fas fa-circle-notch fa-spin"></i></span></button>
              <div class="d_flex_center mt_10 mb_10">
                <router-link :to="{ name: 'reset-password'}" class="text-center td_underline tt_u"> Forgot Password </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
<!--    <div class="cart_title text-center m-0 p-0">-->
<!--      <h1>Follow us on instagram</h1>-->
<!--    </div>-->
    <keep-alive>
    <instagram-section></instagram-section>
    </keep-alive>
  </div>

</template>

<script>
import InstagramSection from "../../components/shared/InstagramSection";
export default {
  name:'index',
  components: {InstagramSection},
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  created() {
  },
  methods:{
    buyerLogin(){
      this.allErrors = null;
      this.loading = true;

      this.$store.dispatch('authModule/login', this.form)
        .then((response) => {
          this.$store.dispatch('cartModule/loadCart')
        })
        .catch((err) => this.allErrors = err.errors)
        .finally(() => this.loading = false)
    }
  }

}
</script>
