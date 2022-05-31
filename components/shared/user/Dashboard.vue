<template>
  <div class="my_account_dashboard ">
    <div class="m_a_dashboard_title my_acc_container">
      <h2>My Account Dashboard</h2>
      <p>From your My Account Dashboard you have the ability to view a snapshot of your recent account activity and update your account information. <br> Select a link below to view or edit information.</p>
      <button @click.prevent="openExportItemModal()" class="btn btn_grey">Export</button>
    </div>
    <item-modal @closeModal="closeModal" :showItemModal="showItemModal"></item-modal>
  </div>
</template>

<script>
import ItemModal from "../../../components/shared/user/ItemModal";
export default {
  components:{ItemModal},
  middleware: 'auth',
  name: "Dashboard",
  data(){
    return{
      showItemModal: false,
    }
  },
  methods:{
    openExportItemModal(){
      this.showItemModal = true
    },
    closeModal(){
      this.showItemModal = false;
    }
  }
}
</script>

<style scoped lang="scss">
  .my_acc_container {
    position: relative;
      button.btn_grey {
          position: absolute;
          right: 135px;
          top: 50%;
          transform: translateY(-50%);
      } 
  }
  @media (max-width: 991px) {
    .my_acc_container {
      position: relative;
      button.btn_grey {
        margin-top: 20px;
            position: relative;
            transform: none;
            top: auto;
            right: auto;
      } 
      
    }
  }
</style>
