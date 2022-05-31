<template>
    <div class="wcmodel modal" :class="{open_modal: showItemModal}"  data-modal="wcm">
        <div class="modal_overlay" data-modal-close="wcm"></div>
        <div class="welcome_modal_wrapper export_modal">
            <span class="close_modal" data-modal-close="wcm" @click="closeModal"></span>
            <div class="d_flex_btwn heading">
                <div class="title" v-if="customer">{{ customer.company_name }}</div>
                <div class="export_btn">
                    <shopify-excel
                    class="btn btn_grey"
                    :fetch="fetchShopifyData"
                    :fields="shopify_json_fields"
                    type="xls"
                    name="shopify-styles.xls"
                    >
                    Shopify
                    </shopify-excel>
                    <comment-excel
                    class="btn btn_grey"
                    :fetch="fetchCommentSoldData"
                    :fields="comment_sold_json_fields"
                    type="xls"
                    name="comment-sold-styles.xls"
                    >
                    Comment Sold
                    </comment-excel>
                </div>
            </div>
            <div class="modal_inner_content">
                <div class="main_product_list_wrap" v-if="checkedItems && checkedItems.length">
                    <div class="common_subtitle">
                        <div class="d_flex_btwn pt_20 pb_20 main_product_title">
                            <h3 class="mb_0">Selected Item List</h3>
                        </div>
                    </div> 
                    <div class="main_product_list" v-if="checkedItems.length">
                        <ul>
                            <li v-for="(item, index) in checkedItems" :key="'item_'+index" @click.prevent="removeExportItem(item)">
                                <div class="inner_content">
                                    <div class="item_sytle">
                                        <input type="text" placeholder="Style No" >
                                    </div>
                                    <img :src="(item.images.length) ? item.images[0].compressed_image : '/images/no-image.png'" alt="">
                                    <div class="text">
                                        <h3>{{ item.categories[0] && item.categories[0].parent ? item.categories[0].parent.name : '' }}</h3>
                                        <p>{{ item.style_no }}</p>
                                        <p>
                                            <span v-if="item.existingColors.length"> Color: 
                                                <span v-for="(color, colorIndex) in item.existingColors" :key="'color_'+colorIndex">{{color.name}} 
                                                    <span v-if="colorIndex != item.existingColors.length - 1">, </span>
                                                </span>
                                            </span>
                                        </p>
                                        <p>${{ item.price.toFixed(2) }}</p>
                                        <p><span v-if="item.available_on"> Pre-Order: {{ item.available_on }}</span></p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="main_product_list_wrap">
                    <div class="common_subtitle">
                        <div class="d_flex_btwn pt_20 pb_20 main_product_title">
                            <h3 class="mb_0">Item list</h3>
                            <div class="d_flex_start p_search">
                                <input type="text" class="form_global width_150p" placeholder="Search" v-model="queryParams.search">
                                <select class="form_global width_150p ml_10" v-model="sort">
                                    <option value="sortingDesc">Sort Number</option>
                                    <option value="activatedAtDesc">Activation Date</option>
                                    <option value="updatedAtDesc">Last Update</option>
                                    <option value="createdAtDesc">Upload Date</option>
                                    <option value="priceAsc">Price Low to High</option>
                                    <option value="priceDesc">Price High to Low</option>
                                    <option value="styleNoAsc">Style No.</option>
                                </select>
                                <select class="form_global width_80p ml_10" v-model="queryParams.per_page" @change.prevent="perpageModify($event)">
                                    <option value="24">24</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="200">200</option>
                                </select>
                            </div>
                        </div>
                    </div> 
                    <div class="main_product_list" v-if="items && items.length">
                        <ul>
                            <li v-for="(item, index) in items" :key="'item_'+index" @click.prevent="addExportItem(item)">
                                <div class="inner_content">
                                    <div class="item_sytle">
                                        <input type="text" placeholder="Style No" >
                                    </div>
                                    <img :src="(item.images.length) ? item.images[0].compressed_image : '/images/no-image.png'" alt="">
                                    <div class="text">
                                        <h3>{{ item.categories[0] && item.categories[0].parent ? item.categories[0].parent.name : '' }}</h3>
                                        <p>{{ item.style_no }}</p>
                                        <p>${{ item.price.toFixed(2) }}</p>
                                        <p><span v-if="item.available_on"> Pre-Order: {{ item.available_on }}</span></p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="d_flex_center mt_20 mb_20">
                            <button class="btn btn_common width_200p" @click.prevent="loadMoreData(parseInt(items.length) + parseInt(queryParams.per_page))">Show More <span class="ml_5" v-if="loading"><i class="fas fa-circle-notch fa-spin"></i></span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <color-modal @closeColorModal="closeColorModal" :showColorModal="showColorModal" :colors="colors"></color-modal>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import ColorModal from "../../../components/shared/user/ColorModal";
export default {
    components:{ColorModal},
    middleware: 'auth',
    name: "ItemModal",
    data(){
        return {
            items: [],
            checkedItems:[],
            sort: 'activatedAtDesc',
            filter: {
                status: '1',
                per_page: 24
            },
            queryParams: {
                page: 1,
                search: '',
                search_columns: 'name,style_no,description',
                sort: 'activated_at',
                sort_order: 'desc',
                limit: 24,
                per_page: 24
            },
            showColorModal: false,
            selectedItem:'',
            colors:[],
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
            customer: 'customerModule/getCustomerDetails',
        }),
    },
    props:{
        showItemModal:false
    },
    created() {
        this.loadData();
    },
    watch: {
        queryParams: {
            deep: true,
            handler() {
                this.loadData()
            }
        },
        filter: {
            deep: true,
            handler() {
                this.queryParams.page = 1;
                this.loadData()
            }
        },
        sort:{
            deep: true,
            handler(value) {
                switch (value) {
                case 'sortingDesc':
                    this.queryParams.sort = 'sorting';
                    this.queryParams.sort_order = 'desc';
                    break;
                case 'activatedAtDesc':
                    this.queryParams.sort = 'activated_at';
                    this.queryParams.sort_order = 'desc';
                    break;
                case 'createdAtDesc':
                    this.queryParams.sort = 'created_at';
                    this.queryParams.sort_order = 'desc';
                    break;
                case 'updatedAtDesc':
                    this.queryParams.sort = 'updated_at';
                    this.queryParams.sort_order = 'desc';
                    break;
                case 'priceDesc':
                    this.queryParams.sort = 'price';
                    this.queryParams.sort_order = 'desc';
                    break;
                case 'priceAsc':
                    this.queryParams.sort = 'price';
                    this.queryParams.sort_order = 'asc';
                    break;
                case 'styleNoAsc':
                    this.queryParams.sort = 'style_no';
                    this.queryParams.sort_order = 'asc';
                    break;
                }
            }
        }
    },
    methods:{
        closeModal(){
            this.checkedItems = []
            this.selectedItem = ''
            this.$emit('closeModal')
        },
        perpageModify(event){
            this.queryParams.limit = event.target.value
        },
        loadData(){
            this.$axios.get('/items',{
                params: {...this.queryParams, ...this.filter}
            })
            .then((response) => {
                this.items = response.data.data;
            })
        },
        loadMoreData(limit){
            this.queryParams.limit = limit
        },
        addExportItem(item){
            this.selectedItem = item
            this.colors = item.colors
            this.showColorModal = true
        },
        closeColorModal(selectedColors = []){
            this.colors = []
            this.showColorModal = false
            if(selectedColors.length > 0){
                let itemExists = this.checkedItems.filter(checkedItem => checkedItem.id == this.selectedItem.id);

                //get selected color name
                let existingColors = []
                this.selectedItem.colors.forEach(element => {
                    let color = selectedColors.includes(element.id)
                    if(color){
                        existingColors.push(element)
                    }
                });
                this.selectedItem.existingColors = existingColors


                if(itemExists.length == 0){
                    this.selectedItem.selectedColors = selectedColors
                    this.checkedItems.push(this.selectedItem)
                }else{
                    let index = this.checkedItems.findIndex(checkedItem => checkedItem.id == this.selectedItem.id);
                    if(index > -1){
                        this.checkedItems.splice(index, 1)
                    }
                    this.selectedItem.selectedColors = selectedColors
                    this.checkedItems.push(this.selectedItem)
                }
            }
        },
        removeExportItem(item){
            let index = this.checkedItems.findIndex(checkedItem => checkedItem.id == item.id);
            if(index > -1){
                this.checkedItems.splice(index, 1)
            }
        },
        async fetchShopifyData() {
            if(this.checkedItems.length <= 0 ){
                this.showFailMsg('Please select item!')
                return;
            }
            const response = await this.$axios.post('/export-styles-for-shopify', {
                items: this.checkedItems,
                export_to:'shopify'
            }) 
            return response.data
        },
        async fetchCommentSoldData() {
            if(this.checkedItems.length <= 0 ){
                this.showFailMsg('Please select item!')
                return;
            }
            const response = await this.$axios.post('/export-styles-for-comment-sold', {
                items: this.checkedItems,
                export_to:'comment-sold'
            })
            return response.data
        },
    }
}
</script>
