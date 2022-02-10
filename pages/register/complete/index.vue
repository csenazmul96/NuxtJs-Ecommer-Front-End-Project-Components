<template>
  <div>
    <section class="static_page_section mt_20 common_top_padding">
      <div class="static_page_wrapper container">
        <h1 class="border-bottom pb-2">Registration Successful</h1>
        <p>Your account has been registered as a customer successfully </p>
        <p><b>Best Regards,</b></p>
        <p>Davi&dani</p>
      </div>
    </section>
    <keep-alive>
      <instagram-section></instagram-section>
    </keep-alive>
  </div>
</template>
<script>
import InstagramSection from "../../../components/shared/InstagramSection";
export default {
  name: "index",
  components: {InstagramSection},
}
</script>

