<template>
  <div>
    <section class="login_page">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="login_inner bg-transparent border-0 pt_20">
              <h2>New Password</h2>
              <div class="header_account_inner">
                <div class="form_inline">
                  <label>Email</label>
                  <input type="email" class="form-control" placeholder="Email" v-model="form.email">
                  <v-errors :errors="errorFor('email')"></v-errors>
                </div>
                <div class="form_inline">
                  <label>New Password</label>
                  <input type="password" class="form-control" placeholder="New Password" v-model="form.password">
                  <v-errors :errors="errorFor('password')"></v-errors>
                </div>
                <div class="form_inline">
                  <label>Confirm Password</label>
                  <input type="password" class="form-control" placeholder="Confirm Password" v-model="form.password_confirmation">
                  <v-errors :errors="errorFor('password_confirmation')"></v-errors>
                </div>
                <button class="btn_common" @click.prevent="submitResetForm"  ref="newPasswordButton">Reset Password</button>
                <div class="create_acc_btn">
                  <router-link :to="{ name: 'login'}" class="btn btn_transparent">
                    Back to Login
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <instagram-section></instagram-section>
  </div>
</template>

<script>
import InstagramSection from "../../components/shared/InstagramSection";
export default {
  name:'customerPasswordReset',
  components: {InstagramSection},
  data() {
    return {
      form: {
        token: this.$route.params.token,
        email: '',
        password: '',
        password_confirmation: '',
      },
    }
  },
  created() {
  },
  methods:{
    submitResetForm(){
      this.allErrors = null;
      this.$axios.post('new-password', this.form)
      .then(()=>{
        this.showSuccessMsg('Your password has been successfully reset.')
        this.$router.push({name: 'login'})
      })
      .catch((err) => {
        this.allErrors = err.response.data.errors
      })
    }
  }

}
</script>

