import Vue from "vue"
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import JsonExcel from 'vue-json-excel'

Vue.use(VueSweetalert2);
Vue.component('shopifyExcel', JsonExcel)
Vue.component('commentExcel', JsonExcel)
