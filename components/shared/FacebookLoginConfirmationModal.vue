<template>
  <div class="wcmodel modal" :class="{open_modal: showModal}" v-if="!user">
    <div class="modal_overlay"></div>
    <div class="welcome_modal_wrapper">
      <div class="modal_inner facebook_login_modal modal_600p mt-3">
        <div class="col-md-12">
          <p v-if="popupSettngs" v-html="popupSettngs.facebook_continue_modal"></p>
          <div class="notice_btn_gorup mb-2">
            <facebook></facebook>
            <a href="javascript:void(0)" @click.prevent="closeModal()" class="notice_button_no btn_common">Later</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Facebook from "./user/FacebookLogin";
import {mapGetters} from "vuex";
export default {
  components:{Facebook},
  name: "FacebookLoginConfirmationModal",
  data(){
    return {
      showModal: true,
      popupSettngs: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'authModule/getUser',
    }),
  },
  created() {
    this.$axios.get('/get-live-popup/settings')
      .then((response)=>{
        this.popupSettngs = response.data
      })
  },
  methods:{
    closeModal(){
      this.showModal = false
    },
  }
}
</script>

<style scoped>

</style>
