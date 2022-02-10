<template>
  <div class="my_acc_container">
    <div class="card my_acc_order">
      <div class="card_header"><h2>Point History</h2></div>
      <div class="card-body" v-if="points && points.length">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
                <tr>
                    <th>Order#</th>
                    <th>Sub Total</th>
                    <th>Total</th>
                    <th>Earned Points</th>
                    <th>Used Points</th>
                    <th class="text-right">Status</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="(point, i) in points" :key="'point_' + i">
                <td>{{ point.order_number }}</td>
                <td>${{ point.subtotal.toFixed(2) }}</td>
                <td>${{ point.total_amount.toFixed(2) }}</td>
                <td>{{ Math.floor(point.points) }}</td>
                <td>{{ point.used_point }}</td>
                <td class="text-right">{{ orderEnumeration[point.status] }}</td>
              </tr>
            </tbody>
          </table>
          <pagination v-if="pointPaginations" :paginateData="pointPaginations" @changePage="changePage"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/shared/Pagination";
export default {
name: "PointHistory",
middleware: 'auth',
components:{pagination},
  data(){
    return {
      points:[],
      pointPage: 1,
      pointPaginations:[],
      orderEnumeration: {
            1: 'init',
            2: 'new',
            3: 'confirm',
            4: 'partially shipped',
            5: 'fully shipped',
            6: 'back',
            7: 'cancel by buyer',
            8: 'cancel by vendor',
            9: 'cancel by agrement',
            10: 'returned',
            11: 'declined',
        }
    }
  },
  created() {
    this.getPointHistory();
  },
  methods:{
    getPointHistory(){
      this.$axios.get('/customer/points?page='+this.pointPage)
        .then((response)=>{
          this.pointPaginations = response.data.meta
          this.points = response.data.data
        })
    },
    changePage(page){
      this.pointPage = page;
      this.getPointHistory()
    }
  }
}
</script>
