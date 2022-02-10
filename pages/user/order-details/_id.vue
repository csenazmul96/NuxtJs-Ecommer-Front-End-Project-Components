<template>
  <div>
  <Header></Header>
  <div class="my_acc_container" v-if="order">
    <div class="card my_acc_order">
      <div class="card_header">
        <h2>Vendor Order Details - {{order.order_number}}</h2>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="content col-md-12 margin-bottom-1x">
            <h4>Vendor Order Details - {{order.order_number}}</h4>
            <br><br><br>
          </div>
        </div>
        <div class="row" v-if="order">
          <div class="col-md-12">
            <table class="table table-bordered">
              <tbody>
              <tr>
                <th>Order No.</th>
                <td class="text-right">{{order.order_number}}</td>
              </tr>
              <tr>
                <th>Order Date</th>
                <td class="text-right">{{order.created_at }}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td class="text-right">
                  {{orderEnumeration[order.status]}}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class=" padding-bottom-1x" v-if="order">
          <client-only>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Shipping Address</th>
                  <th>Billing Address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <template v-if="order.shipping_location">{{order.shipping_location}} <br></template>
                    <template v-if="order.shipping_address">{{order.shipping_address}} <br></template>
                    <template v-if="order.shipping_unit">{{order.shipping_unit}} <br></template>
                    <template v-if="order.shipping_city">{{order.shipping_city}} <br></template>
                    <template v-if="order.shipping_state || order.shipping_zip">{{order.shipping_state}} - {{order.shipping_zip}} <br></template>
                    <template v-if="order.shipping_country">{{order.shipping_country}} <br></template>
                    <template v-if="order.shipping_phone">Phone: {{order.shipping_phone}} , </template>
                  </td>
                  <td>
                    <template v-if="order.billing_location">{{order.billing_location}} <br></template>
                    <template v-if="order.billing_address">{{order.billing_address}} <br></template>
                    <template v-if="order.billing_unit">{{order.billing_unit}} <br></template>
                    <template v-if="order.billing_city">{{order.billing_city}} <br></template>
                    <template v-if="order.billing_state || order.billing_zip">{{order.billing_state}} - {{order.billing_zip}} <br></template>
                    <template v-if="order.billing_country">{{order.billing_country}} <br></template>
                    <template v-if="order.billing_phone">Phone: {{order.billing_phone}} , </template>
                  </td>
                </tr>
                <tr>
                  <td><b>Phone: </b></td>
                  <td><b>Phone: </b>{{order.shipping_phone}}</td>
                </tr>
              </tbody>
            </table>
          </client-only>
          <client-only>
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th>Shipping Method</th>
                  <td>{{order.shipping}}</td>
                  <th>Tracking Number</th>
                  <td>{{order.tracking_number}}</td>
                  <th>Invoice Number</th>
                  <td>{{order.invoice_number}}</td>
                </tr>
              </tbody>
            </table>
          </client-only>
        </div>

        <h4>Items</h4>
        <hr class="padding-bottom-1x">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>Image</th>
              <th class="text-center align-middle">Style No.</th>
              <th class="text-center align-middle">Size</th>
              <th class="text-center align-middle">Color</th>
              <th class="text-center align-middle">Qty</th>
              <th class="text-center align-middle">Unit Price</th>
              <th class="text-right align-middle">Amount</th>
            </tr>
            </thead>

            <tbody v-if="order && order.items">
              <tr v-for="(orderItem, itemIndex) in order.items" :key="'orderItem_i' + itemIndex">
                <td rowspan="">
                  <img :src="(orderItem.item.images && orderItem.item.images.length > 0 ? orderItem.item.images[0].thumbs_image : defaultImage)"
                       alt="Wholesale women's clothing Davi & Dani"
                       style="height:80px" >
                </td>
                <td class="text-center align-middle"> {{orderItem.style_no}}</td>
                <td class="text-center align-middle"> {{ (orderItem.size ? orderItem.size : '') }}</td>
                <td class="text-center align-middle"> {{ (orderItem.color ? orderItem.color : '')}}</td>
                <td class="text-center align-middle"> {{orderItem.qty}}</td>
                <td class="text-center align-middle"> ${{orderItem.per_unit_price | round(2)}}</td>
                <td class="text-right align-middle"> ${{orderItem.amount | round(2)}}</td>
              </tr>

            </tbody>
          </table>
        </div>
        <div class="row" v-if="order">
          <div class="col-md-9"></div>
          <div class="col-md-3">
            <table class="table table-bordered">
              <tbody>
              <tr>
                <th>Sub Total</th>
                <td class="text-right">${{order.subtotal | round(2)}}</td>
              </tr>

              <tr v-if="order.discount > 0">
                <th>Discount</th>
                <td class="text-right">${{order.discount | round(2)}}</td>
              </tr>
              <tr v-if="order.dollar_point_discount > 0">
                <th>Point Discount</th>
                <td class="text-right">-${{order.dollar_point_discount}}</td>
              </tr>

              <tr>
                <th>Shipping Cost <span class="text-danger" v-if="order.free_shipping">(Free Shipping)</span> </th>
                <td class="text-right">
                  ${{order.shipping_cost }}
                </td>
              </tr>
              <tr v-if="order.store_credit > 0">
                <th>Store Credit</th>
                <td class="text-right">-${{order.store_credit }}</td>
              </tr>
              <tr v-if="order.coupon_amount > 0">
                <th>Promotion Discount</th>
                <td class="text-right">-${{order.coupon_amount }}</td>
              </tr>
              <tr>
                <th>Total</th>
                <td class="text-right"><b>${{order.total_amount}}</b></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="row" v-if="order">
          <div class="col-md-12">
            <p>
              <b>Note: {{order.note}}</b>
            </p>
          </div>
        </div>
        <div class="row">
          <div class="content col-md-12 margin-top-1x">
            <router-link :to="{ name: 'order-detail'}" class="btn btn_common width_200p float-left">Back To
              Order List
            </router-link>
          </div>


          <div class="modal fade" id="print-modal" tabindex="-1" role="dialog" aria-labelledby="modalLabelSmall"
               aria-hidden="true">
            <div class="modal-dialog modal-sm">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" id="modalLabelSmall">Print</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>

                <div class="modal-body">
                  <a class="btn btn-primary" href="" target="_blank" id="btnPrintWithImage">Print with
                    Images</a><br><br>
                  <a class="btn btn-primary" href="" target="_blank" id="btnPrintWithoutImage">Print without
                    Images</a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import Header from "../../../components/shared/user/Header";

export default {
  components: {Header},
  middleware: 'auth',
  name: "id",
  data(){
    return {
      order: [],
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
  computed: {
    ...mapGetters({
      defaultImage: 'settingsModule/getDefaultImage',
    }),
  },
  filters: {
    round: function (value, decimals) {
      if(!value) {
        value = 0;
      }

      if(!decimals) {
        decimals = 0;
      }
      var value = Number(value);
      value = value.toFixed(decimals);

      return value;
    },
  },
  created() {
    this.$axios.get('/customer/order/details/'+this.$route.params.id)
    .then((response)=>{
      this.order = response.data.data
    })
  }
}
</script>

<style scoped>

</style>
