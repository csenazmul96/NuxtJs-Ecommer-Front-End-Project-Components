<template>
  <div class="account_bredcrumbs">
    <div class="a_c_bredcrumbs_left">
      <a href="javascript:void(0)" onclick="window.history.back()">← back </a>
    </div>
    <div class="a_c_bredcrumbs_right">
      <a href="javascript:void(0)"  @click.prevent="logout">Log Out</a>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  name: "Header",
  methods:{
    logout() {
      this.$store.dispatch('authModule/logout');
    },
  }
}
</script>
