<template>
  <div class="my_acc_container my_acc_back">
    <nuxt-link :to="{name:'index'}" class="btn btn_transparent width_240p router-link-active">
      <i class="fas fa-shopping-cart"></i>
      <span class="ml_5">Continue Shopping</span>
    </nuxt-link>
    <button class="btn_transparent width_240p" @click.prevent="logout">Log Out</button>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  name: "Logout",
  methods:{
    logout() {
      this.$store.dispatch('authModule/logout');
    },
  }
}
</script>
