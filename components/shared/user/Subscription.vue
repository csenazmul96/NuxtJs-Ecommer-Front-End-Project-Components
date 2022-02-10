<template>
  <div class="my_acc_container">
    <h2 class="my_acc_subtitle">SUBSCRIPTION</h2>
    <div class="custom_checkbox">
      <input type="checkbox" id="buyerNewsletter" :checked="customer && customer.mailing_list == 1" @change="newsletterUpdate()" v-model="newsLetter">
      <label for="buyerNewsletter">Subscribed to the davidani subscription.</label>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  middleware: 'auth',
  name: "Subscription",
  data(){
    return{
      newsLetter: null,
    }
  },
  computed: {
    ...mapGetters({
      customer: 'customerModule/getCustomerDetails',
    }),
  },
  methods: {
    newsletterUpdate() {
      if(this.newsLetter == true){
          let formData = {
              email : this.customer.email
          }

          this.$axios.post('/add-to-mailchimp/', formData)
          .then(() => {
            this.showSuccessMsg("Added Successfully!");
          })
          .catch((err) => {
            this.showFailMsg("Not Added Successfully!");
          });
      }

      if(this.newsLetter == false){
          let formData = {
              email : this.customer.email
          }
          this.$axios.post('/update-mailchimp/', formData)
          .then((response) => {
            console.log(response)
            this.showSuccessMsg("Updated Successfully!");
          })
          .catch((err) => {
            this.showFailMsg("Not Added Successfully!");
          });
      }
    },
  }
}
</script>
