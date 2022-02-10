<template>
  <div id="messageManage">
    <div class="wcmodel modal" :class="showMessageModal?' open_modal':''" data-modal="wcm">
      <div class="modal_overlay" data-modal-close="wcm"></div>
      <div class="welcome_modal_wrapper">
          <div class="modal_inner modal_600p">
              <span class="close_modal" data-modal-close="wcm" v-on:click="closeMessageModal"></span>
              <div class="col-md-12">
                  <br>
                  <p><strong>Dear: </strong> {{messageReplay.recipient}}</p>
                  <span><strong>Message:</strong></span>
                  <p>{{messageReplay.message}}</p>
                  <span>Attachment</span> <br>
                  <div class="attatch_file">
                      <ul style="display:flex">
                          <li class="mr_15" v-if="messageReplay.attachment1"><img :src="messageReplay.attachment1" width="100" alt="Wholesale women's clothing Davi & Dani"></li>
                          <li class="mr_15" v-if="messageReplay.attachment2"><img :src="messageReplay.attachment2" width="100" alt="Wholesale women's clothing Davi & Dani"></li>
                          <li class="mr_15" v-if="messageReplay.attachment3"><img :src="messageReplay.attachment3" width="100" alt="Wholesale women's clothing Davi & Dani"></li>
                      </ul>
                  </div>
                  <br>
                  <span class="btn_grey width_200p text-center float-right mb_15" @click="replayMessage(messageReplay)">Replay</span>

              </div>
          </div>
      </div>
    </div>

    <div class="wcmodel modal " :class="showMessageReplayModal?' open_modal':''" data-modal="wcm">
      <div class="modal_overlay" data-modal-close="wcm"></div>
      <div class="welcome_modal_wrapper">
          <div class="modal_inner modal_600p">
              <span class="close_modal" data-modal-close="wcm" v-on:click="closeMessageReplayModal"></span>
              <div class="col-md-12">
                  <br>
                  <div class="form_inline_border form_inline">
                  <label class="required" for="sender">From</label>
                  <input type="text" class="form-control" placeholder="" v-model="msgReplaySend.recipient" id="sender">
                  <v-errors :errors="errorFor('sender')"></v-errors>
                  </div>
                  <div class="form_inline_border form_inline">
                      <label class="required" for="recipient">To</label>
                      <input type="text" class="form-control" placeholder="" v-model="msgReplaySend.sender" id="recipient">
                  </div>
                  <div class="form_inline_border form_inline">
                      <label class="required" for="subject">Subject</label>
                      <input type="text" class="form-control" placeholder="" v-model="msgReplaySend.subject" id="subject">
                      <v-errors :errors="errorFor('subject')"></v-errors>
                  </div>
                  <div class="form_inline_border  ">
                      <label class="required" for="subject">Message</label>
                      <textarea class="form-control" cols="30" rows="2" v-model="msgReplaySend.message" ></textarea>
                      <v-errors :errors="errorFor('message')"></v-errors>
                  </div>
                  <div class="custom-file mb_10">

                      <input type="file" class="custom-file-input" id="validatedCustomFile">
                      <label class="custom-file-label" for="validatedCustomFile">Choose images...</label>
                  </div>
                  <div class="" v-if="msgReplaySend.attachment.length > 0" >
                      <ul style="display:flex">
                          <li class="mr_15" v-for="(img, index) in msgReplaySend.attachment" :key="'attachement_'+index">
                              <img :src="img" alt="Wholesale women's clothing Davi & Dani" width="100">
                          </li>
                      </ul>
                  </div>
                  <span>(Select maximum 3 images.)</span>
                  <button class="btn_grey width_200p float-right mb_15" @click.prevent="sendMessage()"><span> Send </span></button>
              </div>
          </div>
      </div>
    </div>

    <div class=" my_acc_container" v-if="messages && messages.length > 0">
        <div class="card my_acc_order">
            <div class="card_header">
                <h2>Admin Messages</h2>
            </div>
            <div class="card-body" style="position:relative; min-height:100px;">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <tbody>
                            <tr>
                                <th>Date</th>
                                <th>Subject #</th>
                                <th>Send By</th>
                                <th>Message</th>
                            </tr>
                            <template v-if="messages && messages.length > 0">
                                <tr @click.prevent="readMessage(message)" :style="message.reading_status == '0' ? style : null" v-for="(message, messageIndex) in messages" :key="'message_index_' + messageIndex">
                                    <td>{{ message.created_at }}</td>
                                    <td><small>{{ message.subject }}</small></td>
                                    <td><small>{{ message.sender }} </small></td>
                                    <td>{{ message.message.substring(0,100)+".." }} </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <pagination v-if="messagePaginations" :paginateData="messagePaginations" @changePage="changePage"></pagination>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/shared/Pagination";
export default {
  middleware: 'auth',
  name: "Message",
  components:{pagination},
  data(){
    return {
      messages:[],
      messagePage: 1,
      messagePaginations:[],
      messageReplay:{
        id:null,
        customer_id:null,
        message:null,
        subject:null,
        recipient:null,
        sender:null,
        attachment:[],
      },
      msgReplaySend: {
        id:null,
        customer_id:null,
        message:null,
        subject:null,
        recipient:null,
        sender:null,
        attachment:[],
      },
      style: {
        background: 'rgb(228 218 196)',
      },
      showMessageModal: false,
      showMessageReplayModal: false,
    }
  },
  created() {
    this.getMessages();
  },
  methods:{
    getMessages(){
      this.$axios.get('/customer/messages?page='+this.messagePage)
        .then((response)=>{
          this.messagePaginations = response.data.meta
          this.messages = response.data.data
        })
    },
    changePage(page){
      this.messagePage = page;
      this.getMessages()
    },
    replayMessage(message){
        this.showMessageReplayModal = true;
        this.closeMessageModal();
        this.formErrors = {};

        this.msgReplaySend.customer_id = message.customer_id;
        this.msgReplaySend.message = null;
        this.msgReplaySend.subject = message.subject;
        this.msgReplaySend.recipient = message.recipient;
        this.msgReplaySend.sender = message.sender;
        this.msgReplaySend.attachment = [];
    },
    readMessage(message){
        this.showMessageModal = true;
        this.$set(this, 'messageReplay', message);
        if(message.reading_status == 0){
            this.$Progress.start();
            let formData = {
                msgId: message.id
            }

            this.$axios.patch('/change/messages/status/'+ formData)
                .then(() => {
                    this.showSuccessMsg("Update Successfully!");
                })
                .catch((err) => {
                    this.errors = err.response.data.errors
                    this.showFailMsg("Update Not Successfully!");
                });
        }
    },
    sendMessage(){
        this.$axios.post('/replay/messages/', this.msgReplaySend)
            .then(() => {
                this.showMessageReplayModal = false;
                this.showSuccessMsg("Update Successfully!");
            })
            .catch(() => {
                this.showMessageReplayModal = true;
                this.showFailMsg("Update Not Successfully!");
            });
    },
    closeMessageModal(){
        return this.showMessageModal = false;
    },
    closeMessageReplayModal(){
        return this.showMessageReplayModal = false;
    },
  }
}
</script>
