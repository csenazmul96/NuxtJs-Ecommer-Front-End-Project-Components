<template>
  <!-- ============================
      START USER SECTION
  ============================== -->
  <div :class="['header_account' , 'h_o_dropdown', {header_registration_form: showModalType === 'register' }]" id="user">
    <div class="header_account_inner" v-if="!$auth.loggedIn && showModalType === 'login'">
      <div class="inner_form">
        <div class="form_inline">
          <label class="required">Email</label>
          <input type="text" class="form-control" @keyup.enter="login" placeholder="Email Address" v-model="loginForm.email">
          <v-errors :errors="errorFor('email')"></v-errors>
        </div>
        <div class="form_inline">
          <label class="required">Password</label>
          <input type="password" class="form-control" @keyup.enter="login" placeholder="Password" v-model="loginForm.password">
          <v-errors :errors="errorFor('password')"></v-errors>
        </div>

        <button class="btn_common" @click.prevent="login" ref="loginButton">login <span v-show="loading"> <i class="fas fa-circle-notch fa-spin"></i></span></button>
        <button class="btn_common mt-3" @click="changeModal('reset')">Reset Password</button>

        <div class="create_acc_btn">
          <button class="btn_transparent" @click="changeModal('register')">create an account</button>
        </div>
      </div>
    </div>
    <div class="header_account_inner" v-else-if="!$auth.loggedIn && showModalType === 'register'">
      <header-user-registration @changeModal="changeModal"></header-user-registration>
    </div>
    <div class="header_account_inner" v-else-if="!$auth.loggedIn && showModalType === 'reset'">
      <div class="inner_form">
        <div class="form_inline">
          <label class="required">Email</label>
          <input type="text" class="form-control" placeholder="Email Address" v-model="resetForm.email">
          <v-errors :errors="errorFor('email')" v-if="errorFor('email')"></v-errors>
          <small v-else>
            <span class="text-danger" v-if="resetEmail">{{ resetEmail }}</span>
          </small>
        </div>
      </div>
      <button class="btn_common" @click.prevent="resetPassword">Reset Password <span v-show="loading"> <i class="fas fa-circle-notch fa-spin"></i></span></button>
      <button class="btn_common mt-3" @click="changeModal('login')">Login</button>
    </div>
    <div class="header_account_inner" v-else>
      <router-link :to="{name: 'user'}" class="btn btn_common" >
        Dashboard
      </router-link>
      <facebook v-if="customer && !customer.fb_user_id"></facebook>
      <hr>
      <!-- <button class="btn_common mb_5 btn_facebook"><span><i class="fab fa-facebook-f"></i></span> <span>Connect To Facebook</span></button> -->
      <button class="btn_common" @click.prevent="logout">Log out</button>
    </div>
  </div>
  <!-- ============================
      END USER SECTION
  ============================== -->
</template>
<script>
import {mapGetters} from "vuex";
import HeaderUserRegistration from "@/components/shared/header/HeaderUserRegistration";
import Facebook from "../user/FacebookLogin";
export default {
  name:'headerUserComponent',
  components: {
    HeaderUserRegistration,
    Facebook
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      resetForm:{
        email: ''
      },
      showModalType: 'login',
      resetEmail: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'authModule/getUser',
      customer: 'customerModule/getCustomerDetails',
    }),
  },
  watch: {
    showModalType(newVal) {
      if (newVal === 'login') {
        $('.header_account').css({
          'height' : 'auto'
        })
      }
    }
  },
  methods: {
    login() {
      this.allErrors = null;
      this.loading = true;

      this.$store.dispatch('authModule/login', this.loginForm)
        .then(() => {
          this.$store.dispatch('cartModule/loadCart')
          $('*[data-target="#user"]').click();
        })
        .catch((err) => this.allErrors = err.errors)
        .finally(() => this.loading = false)
    },
    logout() {
      this.$store.dispatch('authModule/logout')
        .then(() => {
          $('*[data-target="#user"]').click();
        });
    },
    changeModal(modalType) {
      this.showModalType = modalType;
      this.allErrors = null;
      this.resetForm.email = '';
      this.resetEmail = null;
    },
    resetPassword(){
      this.allErrors = null;
      this.loading = true;

      this.$axios.post('/reset/password', this.resetForm)
        .then((response) => {
          this.resetEmail = 'We have been sent email. Please check!'
          // this.showSuccessMsg('Your password change details have been sent to your email.')
          // $('*[data-target="#user"]').click();
        })
        .catch((err) => this.allErrors = err.response.data.errors)
        .finally(() => this.loading = false)
    },
  }
}
</script>
<style scoped>
  .header_account_inner .btn_facebook{
    line-height: 22px !important;
  }
</style>
