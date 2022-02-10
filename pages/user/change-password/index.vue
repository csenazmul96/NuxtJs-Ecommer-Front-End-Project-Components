<template>
  <div class="my_account_dashboard">
    <Header></Header>
    <div class="my_acc_container">
      <div class="account_info">
        <div class="account_info_left">
          <h2 class="my_acc_subtitle">CHANGE PASSWORD</h2>
          <template v-if="form">
            <div class="form_inline_border form_inline">
              <label class="required">Current Password</label>
              <input type="password" class="form-control" placeholder="*******" v-model="form.current_password">
              <v-errors :errors="errorFor('current_password')"></v-errors>
            </div>
            <div class="form_inline_border form_inline">
              <label class="required">New Password</label>
              <input type="password" class="form-control" placeholder="New Password" v-model="form.password">
              <v-errors :errors="errorFor('password')"></v-errors>
            </div>
            <div class="form_inline_border form_inline">
              <label class="required">Confirm New Password</label>
              <input type="password" class="form-control" placeholder="Confirm New Password" v-model="form.password_confirmation">
              <v-errors :errors="errorFor('password_confirmation')"></v-errors>
            </div>
          </template>
        </div>
        <div class="account_info_right">
        </div>
        <button class="btn_grey width_200p" @click.prevent="changePassword" ref="changePasswordButton">save</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../../components/shared/user/Header";
export default {
  middleware: 'auth',
  name: "index",
  components: {Header},
  data(){
    return {
      form:{
        current_password: '',
        password: '',
        password_confirmation: '',
      }
    }
  },
  methods:{
    changePassword(){
        this.errors = null;
        this.$axios.patch('/customer/password/Update', this.form)
          .then(() => {
                this.showSuccessMsg("Update Successfully!");
            })
            .catch((err) => {
              this.errors = err.errors
                this.showFailMsg("Update Not Successfully!");
            });
      },
  }
}
</script>

<style scoped>

</style>
