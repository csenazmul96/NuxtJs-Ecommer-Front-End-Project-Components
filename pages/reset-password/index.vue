<template>
  <div>
    <section class="login_page">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="login_inner bg-transparent border-0 pt_20">
              <h2>Reset Email</h2>
              <div class="header_account_inner">
                <div class="inner_form">
                  <div class="form_inline">
                    <label class="required">Email</label>
                    <input type="text" class="form-control" placeholder="Email Address" v-model="resetForm.email">
                    <v-errors :errors="errorFor('email')"></v-errors>
                  </div>
                </div>
                <button class="btn_common" @click.prevent="submitResetForm"  ref="newPasswordButton">Reset Password <span v-show="loading"> <i class="fas fa-circle-notch fa-spin"></i></span></button>
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
      resetForm:{
        email: ''
      },
    }
  },
  created() {
  },
  methods:{
    submitResetForm(){
      this.allErrors = null;
      this.loading = true;
      this.$axios.post('/reset/password', this.resetForm)
        .then(()=>{
          this.showSuccessMsg('success')
          this.$router.push({name: 'login'})
        })
        .catch((err) => {
          this.allErrors = err.response.data.errors
        })
        .finally(() => this.loading = false)
    }
  }

}
</script>


