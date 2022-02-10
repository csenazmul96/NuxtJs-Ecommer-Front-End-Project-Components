<template>
  <div class="my_account_dashboard ">
    <div class="m_a_dashboard_title my_acc_container">
      <h2>My Account Dashboard</h2>
      <p>From your My Account Dashboard you have the ability to view a snapshot of your recent account activity and update your account information. <br> Select a link below to view or edit information.</p>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  name: "Dashboard"
}
</script>

<style scoped>

</style>
