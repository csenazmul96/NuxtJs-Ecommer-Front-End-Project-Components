<template>
  <div></div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error',
  created() {
    this.$store.commit('preLoaderModule/setPreloader', false);
    this.$router.push('/');
  }
}
</script>
