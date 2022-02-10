<template>
  <div class="my_acc_container">
    <div class="card my_acc_order">
      <div class="card_header"><h2>Order History</h2></div>
      <div class="card-body" v-if="orders && orders.length">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <tr>
              <th>Date</th>
              <th>Order #</th>
              <th>Order Tracking No.</th>
              <th>Amount</th>
              <th class="text-right">Status</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(order, i) in orders" :key="'order_' + i">
                <td>{{ order.created_at }}</td>
                <td><nuxt-link :to="{name: 'user-order-details-id', params: {id: order.id}}">{{ order.order_number }}</nuxt-link></td>
                <td>{{ order.tracking_number }}</td>
                <td>{{ order.total }}</td>
                <td class="text-right">{{ orderStatus(order.status) }}</td>
              </tr>
            </tbody>
          </table>
          <pagination v-if="ordersPaginations" :paginateData="ordersPaginations" @changePage="changePage"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/shared/Pagination";
export default {
  middleware: 'auth',
  components:{pagination},
  data(){
    return {
      orders:[],
      orderPage: 1,
      ordersPaginations:[],
      orderEnumeration: {
        1: 'Init',
        2: 'New',
        3: 'Confirm',
        4: 'Partially Shipped',
        5: 'Fully Shipped',
        6: 'Back',
        7: 'Cancel by Buyer',
        8: 'Cancel by vendor',
        9: 'Cancel by Agreement',
        10: 'Returned',
        11: 'Declined',
      }
    }
  },
  name: "OrderList",
  created() {
    this.getOrders();
  },
  methods:{
    getOrders(){
      this.$axios.get('/customer/orders?page='+this.orderPage)
        .then((response)=>{
          this.ordersPaginations = response.data.meta
          this.orders = response.data.data
        })
    },
    changePage(page){
      this.orderPage = page;
      this.getOrders()
    },
    orderStatus(type){
       return this.orderEnumeration[type];
    }
  }
}
</script>
