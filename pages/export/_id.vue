<template>

  <div>
    <div class="sweet_alert">
      <div><p>Please Add Qty</p></div>
    </div>
    <div class="update_alert">
      <div><p>Updated successfully</p></div>
    </div>
    <section class="cart_area" v-if="items.length">
      <div class="cart_title">
        <h2>Exported Items</h2>
        <template v-if="items[0].export && items[0].export.export_to == 'shopify'">
            <shopify-excel
              class="btn btn_grey"
              :fetch="fetchShopifyData"
              :fields="shopify_json_fields"
              type="xls"
              name="shopify-styles.xls"
              >
              Shopify Export
            </shopify-excel>
        </template>
        <template v-else>
            <comment-excel
            class="btn btn_grey"
            :fetch="fetchCommentSoldData"
            :fields="comment_sold_json_fields"
            type="xls"
            name="comment-sold-styles.xls"
            >
            Cpmment Sold Export
            </comment-excel>
        </template>
      </div>
      <div class="cart_content">
        <div class="cart_left">
          <div class="cart_table" >
            <table class="table">
              <colgroup>
                <col width="12%">
                <col width="50%">
                <col width="15%">
                <col width="15%">
                <col width="5%">
              </colgroup>
              <thead>
              <tr>
                <th>Product</th>
                <th></th>
                <th>Quantity</th>
                <th>SUBTOTAL</th>
              </tr>
              </thead>
            </table>
            <div :class="{scroll: items.length > 5}">
              <table class="table" >
                <colgroup>
                  <col width="12%">
                  <col width="50%">
                  <col width="15%">
                  <col width="15%">
                  <col width="5%">
                </colgroup>
                <tbody >
                <tr v-for="(cartItem, cartItemKey) in items" :key="'cartItem_' + cartItemKey">
                  <td>
                    <div class="cart_product">
                      <router-link :to="{ name: 'product-slug', params: { slug: cartItem.item.slug }}">
                        <img :src="getColorImage(cartItem.color.id, cartItem.item)" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
                      </router-link>
                    </div>
                  </td>
                  <td>
                    <div class="cart_product_name">
                      <h2>
                        <router-link :to="{ name: 'product-slug', params: { slug: cartItem.item.slug }}">
                          {{ cartItem.item.name ? cartItem.item.name : 'No Specific Name' }}
                        </router-link>
                      </h2>
                      <p>
                        <span>USD ${{ cartItem.item.price_formatted }}</span>
                      </p>
                      <ul>
                        <li>Color : <span>{{ cartItem.color.name }}</span> </li>
                        <li>Pack : <span>{{ cartItem.item.pack.pack_text }}</span> </li>
                      </ul>
                    </div>
                  </td>
                  <td>
                    <div class="num_count">
                      <input type="text" class="qty" v-model="cartItem.quantity">
                    </div>
                  </td>
                  <td>USD ${{ items[cartItemKey].quantity ? Number(cartItem.item.price_formatted * items[cartItemKey].quantity * cartItem.item.pack.total_item).toFixed(2) : 0 }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="checkout_table_summery cart_table_mobile"  :class="{scroll: items.length > 4}">
            <table class="table mb_0">
              <colgroup>
                <col style="width: 92px;">
                <col>
              </colgroup>
              <tbody>
                <tr v-for="(cartItem, cartItemKey) in items" :key="'mob_cartItem_' + cartItemKey">
                  <td>
                    <div class="c_t_img">
                      <router-link :to="{ name: 'product-slug', params: { parent: cartItem.item.slug }}">
                        <img :src="getColorImage(cartItem.color.id, cartItem.item)" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
                      </router-link>
                    </div>
                  </td>
                  <td>
                    <div class="c_t_text">
                      <h2><router-link :to="{ name: 'product-slug', params: { parent: cartItem.item.slug }}"> {{cartItem.item && cartItem.item.name ? cartItem.item.name : 'No Specific Name'}} </router-link></h2>
                      <p>
                        <span>USD:</span>
                        <span class="float-right">${{cartItem.item.price }}</span>
                      </p>
                      <ul>
                        <li v-if="cartItem.color">Color : <span>{{cartItem.color ? cartItem.color.name : 'Not set'}}</span> </li>
                        <li v-if="cartItem.pack">Pack : <span> {{ cartItem.item.pack.pack_text }}</span> </li>
                        <li>Qty: <span><input type="text" class="qty text-right" v-model="cartItem.quantity"></span></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="cart_right">
          <div class="cart_right_table">
            <table class="table">
              <tbody>
              <tr>
                <td>SUBTOTAL</td>
                <td>USD ${{ totalAmount.toFixed(2) }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="row" v-if="errorMsg.length">
            <div class="col-12">
              <ul class="text-center mb_5">
                <li v-for="(err, errIndex) in errorMsg" :key="'err_' + errIndex"><span class="text-danger">{{ err.message }}</span></li>
              </ul>
            </div>
          </div>
          <div class="proceed_btn text-center">
            <button class="btn btn_common mb_5" @click.prevent="updateExportCart()">Update</button>
            <button class="btn btn_common" @click.prevent="addToCart()">Add To Cart</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  middleware: 'auth',
  data() {
    return {
      items: [],
      cartForm:{
        colors:[]
      },
      errorMsg: [],
      shopify_json_fields: {
        'Handle': 'handle',
        'Title': 'title',
        'Body (HTML)': 'body',
        'Vendor': 'vendor',
        'Standard': 'standard',
        'Product Type': 'product_type',
        'Custom Product Type': 'custom_product_type',
        'Tags': 'tags',
        'Published': 'published',
        'Option1 Name': 'option1_name',
        'Option1 Value': 'option1_value',
        'Option2 Name': 'option2_name',
        'Option2 Value': 'option2_value',
        'Option3 Name': 'option3_name',
        'Option3 Value': 'option3_value',
        'Variant SKU': 'variant_sku',
        'Variant Grams': 'variant_grams',
        'Variant Inventory Tracker': 'variant_inventory_tracker',
        'Variant Inventory Qty': 'variant_inventory_qty',
        'Variant Inventory Policy': 'variant_inventory_policy',
        'Variant Fulfillment Service': 'variant_fulfillment_service',
        'Variant Price': 'variant_price',
        'Quantity': 'quantity',
        'Variant Compare At Price': 'variant_compare_at_price',
        'Variant Requires Shipping': 'variant_requires_shipping',
        'Variant Taxable': 'variant_taxable',
        'Variant Barcode': 'variant_barcode',
        'Image Src': 'image_src',
        'Image Position': 'image_position',
        'Image Alt Text': 'image_alt_text',
        'Gift Card': 'gift_card',
        'SEO Description': 'seo_description',
        'Google Shopping / Google Product Category': 'google_shopping_category',
        'Google Shopping / Gender': 'google_shopping_gender',
        'Google Shopping / Age Group': 'google_shopping_age',
        'Google Shopping / MPN': 'google_shopping_mpn',
        'Google Shopping / AdWords Grouping': 'google_shopping_grouping',
        'Google Shopping / AdWords Labels': 'google_shopping_labels',
        'Google Shopping / Condition': 'google_shopping_condition',
        'Google Shopping / Custom Product': 'google_shopping_product',
        'Google Shopping / Custom Label 0': 'google_shopping_label0',
        'Google Shopping / Custom Label 1': 'google_shopping_label1',
        'Google Shopping / Custom Label 2': 'google_shopping_label2',
        'Google Shopping / Custom Label 3': 'google_shopping_label3',
        'Google Shopping / Custom Label 4': 'google_shopping_label4',
        'Variant Image': 'variant_image',
        'Variant Weight Unit': 'variant_weight_unit',
        'Variant Tax Code': 'variant_tax_code',
        'Cost per item': 'cost_per_item',
        'Status': 'status',

      },
      comment_sold_json_fields: {
        'Product Name': 'name',
        'Product SKU / Style #': 'style_no',
        'Product Description': 'description',
        'Product App Description': 'product_app_description',
        'Product Store Description': 'product_store_description',
        'Product Brand': 'product_brand',
        'Product Brand Style #': 'product_brand_style_no',
        'Product Charge Taxes': 'product_charge_taxes',
        'Product Tax Code': 'Product_tax_code',
        'Product Type': 'product_type',
        'Product Received': 'product_received',
        'Product Shipping Price': 'product_shipping_price',
        'Product Low Stock Limit': 'product_low_stock_limit',
        'Product Split By Type': 'product_split_by_type',
        'Product Options': 'product_options',
        'Product Addons': 'product_addons',
        'Product Hide On Waitlist': 'product_hide_on_waitlist',
        'Product Best Selling': 'product_best_selling',
        'Product Notes': 'product_notes',
        'Product Images': 'product_images',
        'Inventory Quantity': 'inventory_quantity',
        'Inventory Color': 'inventory_color',
        'Quantity': 'quantity',
        'Inventory Size': 'inventory_size',
        'Inventory Weight': 'inventory_weight',
        'Inventory Retail Price': 'inventory_retail_price',
        'Inventory Sale Price': 'inventory_sale_price',
        'Inventory Cost': 'inventory_cost',
        'Inventory Barcode': 'inventory_barcode',
        'Inventory SKU': 'inventory_sku',
        'Inventory Length': 'inventory_length',
        'Inventory Width': 'inventory_width',
        'Inventory Height': 'inventory_height',
        'Inventory Position': 'inventory_position',
        'Inventory Notes': 'inventory_notes',
        'Inventory Images': 'inventory_images',
      },
    }
  },
  computed: {
    ...mapGetters({
      user: 'authModule/getUser',
    }),
    totalAmount(){
      let subTotal = 0
      this.items.forEach(function (item) {
          subTotal += (Number(item.item.price_formatted) * Number(item.quantity) * Number(item.item.pack.total_item));
      })
      return subTotal
    }
  },
  beforeCreate() {
    
  },
  created() {
    this.$axios.get('/export-items/'+this.$route.params.id)
    .then((response) => {
        this.items = response.data.data
    })
  },
  methods: {
    updateExportCart(){
      let colors = []
      this.items.forEach(function (item) {
        if( item.quantity <= 0 ){
          colors.push(item.id)
        }
      })
      
      if(colors.length){
        let formData = {
          'item_ids': colors
        }
        this.$axios.post('/remove-export-items',formData)
        .then((response) => {
            if(response.data.success){
              let that = this
              that.items = that.items.filter(element => element.quantity > 0);
              that.colors = []
              $('.update_alert').slideDown();
              setTimeout(()=>{
                $('.update_alert').slideUp();
              }, 3000);
            }
        })
      }
    },
    addToCart(){
        let colors = []
        this.items.forEach(function (item) {
          if(item.quantity > 0){
            let newItem = {
              'color_id': item.color_id,
              'customer_id': user.id,
              'indicator': 'web',
              'item_id': item.item_id,
              'quantity': item.quantity,
            }
            colors.push(newItem)
          }
        })
        this.cartForm.colors = colors

        if(this.cartForm.colors <= 0){
          $('.sweet_alert').slideDown();
          setTimeout(()=>{
            $('.sweet_alert').slideUp();
          }, 3000);
        }else{
          this.$store.dispatch('cartModule/exportAddToCart', this.cartForm)
          .then(()=>{
            for(let i = 0; i < this.cartForm.colors.length ; i++)
              this.cartForm.colors[i].quantity = 0

            this.errorMsg = []
          }).catch((eee)=>{
            this.errorMsg = eee.error;
          })
          .finally(()=>{
            if(process.client){
              if(window.outerWidth > 1024){
                $('.h_cart').click();
              }else{
                $('.m_h_cart').click();
              }
            }
          })
        }
    },
    async fetchShopifyData() {
        if(this.items.length <= 0 ){
            this.showFailMsg('Please select item!')
            return;
        }
        const response = await this.$axios.post('/export-cart-styles-for-shopify', {
            items: this.items,
            export_to:'shopify'
        }) 
        return response.data
    },
    async fetchCommentSoldData() {
        if(this.items.length <= 0 ){
            this.showFailMsg('Please select item!')
            return;
        }
        const response = await this.$axios.post('/export-cart-styles-for-comment-sold', {
            items: this.items,
            export_to:'comment-sold'
        })
        return response.data
    },
  }
}
</script>
<style scoped lang="scss">
  .cart_area {
    position: relative;
      div.btn_grey {
        position: absolute;
        right: 62px;
        top: 60px;
        transform: translateY(-50%);
        cursor: pointer;
      } 
  }
  .cart_table .scroll{
    max-height: 600px;
  }
  .update_alert {
    background: green;
    padding: 6px 0px;
    z-index: 1051;
    position: fixed;
    width: 100%;
    display: none;
    p {
      color: #fff;
      margin-bottom: 0;
      text-align: center;
    }

  }
  @media (max-width: 991px) {
    .cart_area {
      position: relative;
      div.btn_grey {
        position: absolute;
        right: 5px;
        top: 36px;
        transform: translateY(-50%);
        cursor: pointer;
      } 
      .cart_title h2{
        text-align: left;
      }
      
    }
  }
</style>
