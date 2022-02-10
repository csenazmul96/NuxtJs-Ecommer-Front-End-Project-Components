<template>
  <div class="inner billing_img">
    <label class="d-block">
        Credit Card
          <img data-src="/images/hl-c-left.png" alt="Wholesale women's clothing Davi & Dani" class="img-fluid float-right" width="150" v-lazy-load>
    </label>
    <div id="">
      <div class="credit_card_info c_t_info" id="Credit" style="display:block">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Full Name" v-model="form.name">
          <v-errors :errors="errorFor('card_info.name')"></v-errors>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Card number" v-model="form.number">
          <v-errors :errors="errorFor('card_info.number')"></v-errors>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <input type="text" class="form-control" placeholder="MM/YY" v-model="form.expire" @keyup="cardExpire">
            <v-errors :errors="errorFor('card_info.expire')"></v-errors>
          </div>
          <div class="form-group col-6">
            <input type="text" class="form-control" placeholder="CVC" v-model="form.cvc" @keyup="cardCvc">
            <v-errors :errors="errorFor('card_info.cvc')"></v-errors>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  middleware: 'auth',
  name: "CardInfo",
  data(){
    return {
      form:{
        name: '',
        number: '',
        expire: '',
        cvc: '',
      },
    }
  },
  props:{
    errors:{}
  },
  computed: {
    ...mapGetters({
      cardInfo: 'checkoutModule/getCardInfo',
    }),
  },
  watch: {
    form: {
      deep: true,
      handler(val) {
        this.$store.commit('checkoutModule/setCardInfo', _.cloneDeep(val));
      }
    },
    errors: {
      deep: true,
      handler() {
        this.allErrors = this.errors
      }
    },
  },
  methods:{
    cardExpire(event) {
      event = (event) ? event : window.event;
      let inputValue = event.target.value;
      let outputValue = inputValue.replace(/\D/g, "");
      outputValue = outputValue.substring(0,2) + '/' + outputValue.substring(2,4)
      this.form.expire = outputValue
    },
    cardCvc(event) {
      event = (event) ? event : window.event;
      let inputValue = event.target.value;
      let outputValue = inputValue.replace(/\D/g, "");
      outputValue = outputValue.substring(0,4)
      this.$set(this.form, 'cvc', outputValue);
    },
  },
}
</script>

<style scoped>

</style>
