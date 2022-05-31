<template>
  <div class="my_acc_container">
    <div class="card my_acc_order">
      <div class="card_header"><h2>Style Export History</h2></div>
      <div class="card-body" v-if="exportHistories && exportHistories.length">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <tr>
              <th>Date</th>
              <th>Number of Items</th>
              <th>Export to</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(order, i) in exportHistories" :key="'order_' + i">
                <td>{{ order.created_at }}</td>
                <td>{{ order.number_of_items }}</td>
                <td>{{ order.export_to == 'shopify' ? 'Shopify' : 'Comment Sold' }}</td>
                <td>
                  <router-link :to="{ name: 'export-id',  params: { id: order.id }}">View Details</router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <pagination v-if="exportHistoriesPaginations" :paginateData="exportHistoriesPaginations" @changePage="changePage"></pagination>
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
      exportHistories:[],
      orderPage: 1,
      exportHistoriesPaginations:[],
    }
  },
  name: "ExportList",
  created() {
    this.getExportHistories();
  },
  methods:{
    getExportHistories(){
      this.$axios.get('/export-histories?page='+this.orderPage)
        .then((response)=>{
          this.exportHistoriesPaginations = response.data.meta
          this.exportHistories = response.data.data
        })
    },
    changePage(page){
      this.orderPage = page;
      this.getExportHistories()
    }
  }
}
</script>
