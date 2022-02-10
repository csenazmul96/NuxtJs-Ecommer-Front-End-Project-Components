<template>
  <div class="my_acc_container">
    <div class="card my_acc_order">
      <div class="card_header"><h2>Store Credit</h2></div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th width="25%">Date</th>
                <th width="25%">Customer</th>
                <th width="25%">Reason</th>
                <th class="text-right" width="25%">Use Credit</th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="(store, i) in storeCredits">
              <td>{{ store.created_at }}</td>
              <td><nuxt-link :to="{name: 'user-order-details-id', params: {id: store.order_id}}">{{ store.order ? store.order.order_number : null }}</nuxt-link></td>
              <td>{{ store.reason }}</td>
              <td class="text-right">{{ store.amount }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data(){
    return {
      storeCredits:[],
    }
  },
  name: "storecredit",
  created() {
    this.getStoreCredit();
  },
  methods:{
    getStoreCredit(){
      this.$axios.get('customer/store-credit')
      .then((response)=>{
        this.storeCredits = response.data.data
      })
    }
  }
}
</script>
