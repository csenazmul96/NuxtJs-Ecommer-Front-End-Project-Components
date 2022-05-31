<template>
  <div>
    <div class="right_fixed_wrap" >
      <div class="live_now" @click="openMinimizeModal" :class="{open:minimizeModal}"> <span>Live</span> </div>
      <div class="right_fixed_video" :class="{'right_fixed_video_open':minimizeModal}">
        <div id="minimize_video" v-if="liveData"  class="player-area"><iframe scrolling="no" :src="iframeSrc" frameborder="0" allowfullscreen></iframe></div>
        <div class="arrow_toggler" @click="openMinimizeModal">
          <i class="lni lni-chevron-down"></i>
        </div>
        <div class="live">Live</div>
        <div @click.prevent="showLiveNowNotification()" class="continue_watch" data-modal-open="smodal">Continue Watching</div>
      </div>
    </div>
    <div class="wcmodel modal we_are_live_now_notice" :class="{open_modal: weAreLiveNowNotice}">
      <div class="modal_overlay" @click.prevent="closeModal()"></div>
      <div class="welcome_modal_wrapper">
        <div class="modal_inner modal_600p mt-3">
          <div class="col-md-12 live_popup_img">
            <p v-if="popupSettngs && popupSettngs.heading" v-html="popupSettngs.heading"></p>
            <p v-if="popupSettngs && popupSettngs.description" v-html="popupSettngs.description"></p>
            <div class="notice_btn_gorup">
            <a href="javascript:void(0)" @click.prevent="openBigModal()" class="notice_button_yes btn_common bg-success">yes</a>
            <a href="javascript:void(0)" @click.prevent="closeModal()" class="notice_button_no btn_common">No</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wcmodel modal has_facebook_profile" :class="{open_modal: hasFacebookProfile}">
      <div class="modal_overlay" @click.prevent="closeFacebookModal()"></div>
      <div class="welcome_modal_wrapper">
        <div class="modal_inner modal_600p mt-3">
          <div class="col-md-12 live_popup_img">
            <p v-if="popupSettngs && popupSettngs.facebook_connect" v-html="popupSettngs.facebook_connect"></p>
            <div class="notice_btn_gorup">
              <a href="javascript:void(0)" class="notice_button_yes btn_common btn_facebook" @click.prevent="fbLogin">Connect With Facebook</a>
              <a href="javascript:void(0)" @click.prevent="openBigModal()" class="notice_button_no btn_common">Not Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div class="stage61_modal stage61_model" data-modal="smodal">
      <div class="stage61_modal_overlay" @click.prevent="closeModal()" data-modal-close="smodal"></div>
      <div class="stage61_modal_inner">
        <div class="stage61_modal_wrapper">
          <div class="stage61_modal_content modal_1720p">
            <section class="ly_broadcasting_area">
              <div class="ly_broadcasting_container">
                <div class="ly_broadcasting_row">
                  <div class="full_content">
                    <div class="inner chat_box" id="cmsold_desktop"> <!-- ---------------------- chat wrap for Desktop ------------------------------------------- -->
                      <div class="js_chat_wrap" id="chat_wrap">
                        <h1 class="product_list_title">Chat</h1>
                        <div class="js_chat_head chat_head largeScreenChatScroll" id="cmsoldChatHead">
                          <div class="pinned_post_wrap" v-if="pinComments.length">
                            <div class="pinned_post">
                              <li v-for="(comment, i) in pinComments" :key="'comment_pin_'+i">
                                <div class="text">
                                  <h2>{{ comment.name }}</h2>
                                  <p>{{ comment.comment }}</p>
                                </div>
                                <div class="right_text">
                                  <div class="pinned_icons">
                                    <i class="lni lni-cross-circle"></i>
                                  </div>
                                </div>
                              </li>
                            </div>
                          </div>
                          <div class="chat_head_inner" ref="largeScreenChatScroll">
                            <ul class="js_cmsold_wrap" id="cmsoldWrap" v-if="comments.length">
                              <div class="comments">
                                <li v-for="(comment, i) in comments" :key="'comment_'+i" :class="checkCommentClass(comment)">
                                  <div class="append_inner">
                                    <div class="text">
                                      <h2>{{ !comment.welcome_msg ? (comment.type === 'reply' ? comment.parent.name : comment.name) + ':' : null}} <span>{{ comment.type === 'reply' ? comment.parent.comment : comment.comment }}</span></h2>
                                    </div>
                                  </div>
                                  <div class="reply_comment" v-if="comment.type === 'reply'">
                                    <div class="reply_comment_list">
                                      <div class="text">
                                        <h2>{{ comment.name }}: <span>{{ comment.comment }}</span></h2>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </div>
                            </ul>
                          </div>
                        </div>
                        <div id="hearts-alpaca" class="hearts"></div>
                        <div class="reply_chat">
                          <input type="text" ref="commentInput" class="form_global" placeholder="Type here" @keyup.enter="sendComment" v-model="newComment" @click.prevent="showImoji = false">
                          <div class="imojies">
                            <span class="imogi_like emoji_open_btn" :class="{active:showImoji}" @click.prevent="imojiOpenTriger('desktop')"><img src="/images/laugh.png" alt=""></span>
                            <span @click.prevent="directImojiReact('LOVE')"><img src="/images/love.png" alt=""></span>
                            <span @click.prevent="directImojiReact('LIKE')"><img src="/images/like.png" alt=""></span>
                          </div>
                          <div class="imoji_list" v-show="showImoji"><emoji-picker></emoji-picker></div>
                        </div>
                      </div>
                    </div>
                    <div class="inner live_video">
                      <div class="inner_content">
                        <!--===============================Video Player==========================================================================-->
                        <div id="video_wrap">
                          <span @click.prevent="closeModal(0)" data-modal-close="smodal" class="mobile_close_icon"> <i class="lni lni-cross-circle"></i></span>
                          <div id="player-area" class="player-area">

                            <iframe scrolling="no" :src="bigIframeSrc" id="iframe" frameborder="0" allowfullscreen></iframe>
                          </div>
                          <div class="showing_item" v-if="liveCurrentItem">
                            <div class="showing_item_inner">
<!--                              <div class="time"><img src="/images/clock.png" alt="">{{ currentPlayerTime }}</div>-->
                              <div class="live_user"> <img src="/images/eye.png" alt=""> {{ visitors }}</div>
                              <div class="item_details">
                                <div class="img" v-if="liveCurrentItem.images.length" @click.prevent="loadCurrentItemModal(liveCurrentItem.slug)">
                                  <img :src="liveCurrentItem.images[0].compressed_image" class="width_full">
                                </div>
                                <div class="text">
                                  <h2><span>Live</span> {{ liveData ? liveData.name : null}}</h2>
                                  <p>Type: {{ settings ? settings.comment_prefix : null }} {{ liveCurrentItem ? itemIdentifire(liveCurrentItem.id) : null}}</p>
                                  <P>Color: {{liveCurrentItem.inventories.map(i => capitalizedName(i.color_name)).join(', ')}}</P>
                                  <P>Pack: {{ liveCurrentItem.pack ? liveCurrentItem.pack.name : null }}</P>
                                </div>
                              </div>
                              <div class="price">${{ liveCurrentItem.price.toFixed(2) }}</div>
                            </div>
                          </div>
                          <div class="logo_stage61">
                            <img src="/images/logo-stage61.png" alt="">
                          </div>

                          <div class="product_collapse_mobile" @click.prevent="modalOpen('#Itemsmain')">
                            <svg width="18px" height="20px" viewBox="0 0 23 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                              <g id="Sold-Out" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="V1---Homepage-[Sold-Out]" transform="translate(-1388.000000, -64.000000)" fill="#1F1D1A">
                                  <g id="Main-Nav" transform="translate(20.000000, 40.000000)">
                                    <g id="Group-7" transform="translate(1368.000000, 15.000000)">
                                      <g id="bag-icon" transform="translate(0.800004, 9.600000)">
                                        <path d="M10.8001359,0 C8.56695354,0 6.75011352,1.85720415 6.75011352,4.14000033 L6.75011352,5.52000044 L2.02508746,5.52000044 C1.67246551,5.52000044 1.37897389,5.79765646 1.35197374,6.15700849 L0.00196629864,24.0970099 C-0.0123437803,24.2885539 0.0519165742,24.4776139 0.179627279,24.618926 C0.307607984,24.759686 0.487158975,24.840002 0.675080011,24.840002 L20.9251917,24.840002 C21.1131127,24.840002 21.2926637,24.759686 21.4203744,24.618926 C21.5480851,24.4778899 21.6123455,24.2888299 21.5980354,24.0970099 L20.248028,6.15700849 C20.2212978,5.79765646 19.9278062,5.52000044 19.5751843,5.52000044 L14.8501582,5.52000044 L14.8501582,4.14000033 C14.8501582,1.85720415 13.0333182,0 10.8001359,0 Z M8.10012097,4.14000033 C8.10012097,2.61813621 9.31134765,1.38000011 10.8001359,1.38000011 C12.2889241,1.38000011 13.5001508,2.61813621 13.5001508,4.14000033 L13.5001508,5.52000044 L8.10012097,5.52000044 L8.10012097,4.14000033 Z M18.9501308,6.90000055 L20.1961877,23.4600019 L1.40408403,23.4600019 L2.65014091,6.90000055 L6.75011352,6.90000055 L6.75011352,8.97000071 C6.75011352,9.35115674 7.05224519,9.66000077 7.42511724,9.66000077 C7.7979893,9.66000077 8.10012097,9.35115674 8.10012097,8.97000071 L8.10012097,6.90000055 L13.5001508,6.90000055 L13.5001508,8.97000071 C13.5001508,9.35115674 13.8022824,9.66000077 14.1751545,9.66000077 C14.5480265,9.66000077 14.8501582,9.35115674 14.8501582,8.97000071 L14.8501582,6.90000055 L18.9501308,6.90000055 Z" id="Shape"></path>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </div>
                          <div class="mobile_fullscreen_btn" @click.prevent="fullScrin()"></div>
                          <div class="view_product_moblie" id="Itemsmain">
                            <div class="product_overlay" @click.prevent="modalClose('#Items1', '#Itemsmain')"></div>
                            <div class="view_product_moblie_wrap">
                              <!--===============================Mobile Product Details==========================================================================-->
                              <div class="inner_content product_details_list items1" id="Items1">
                                <button class="close_pd_mobile" @click.prevent="modalClose('#Items1')"></button>
                                <div class="cms_sold_top_slider" v-if="currentItemImages">
                                  <div class="" v-for="(image, i) in currentItemImages" :key="'image_mob_'+i">
                                    <div :class="{active:currentItem.id === image.item_id}">
                                      <a href="Javascript:void(0)"><img :src="image.compressed_image" alt="Wholesale women's clothing Davi & Dani" class="img-fluid"></a>
                                    </div>
                                  </div>
                                </div>
                                <div class="cmsold_product_text" v-if="currentItem">
                                  <span class="cmsold_product_sku">{{ currentItem.style_no }}</span>
                                  <h2 class="cmsold_product_title">{{ currentItem.name }}</h2>
                                  <p class="cmsold_price"><span>${{ currentItem.price.toFixed(2) }}</span>  <span>{{ itemIdentifire(currentItem.id) }}</span></p>
                                  <span v-if="vendorCurrentItem === currentItem.slug" class="cmsold_now">Now Showing</span>
                                </div>
                                <div v-if="currentItem && currentItem.inventories" :class="['pack_ratio', {scroll:currentItem.inventories.length > 3}]">
                                  <div class="row" v-for="inv in currentItem.inventories" :class="{active:activeColor === inv.color_id}">
                                    <div class="cms_col col-5 col-lg-4 pr_5">
                                      <div class="pack_ratio_inner_wrap color">
                                        <div class="pack_ratio_inner ratio_color" @click.prevent="selectColorImage(inv.color_id)">
                                          <img :src="getColorImage(inv.color_id, currentItem.images)" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
                                          <span>{{ inv.color_name }} <br> <b>{{ inv.available_on }}</b> </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="cms_col col-3  col-lg-4 pr_5 pl_5">
                                      <div class="pack_ratio_inner_wrap">
                                        <div class="pack_ratio_inner d_flex_center"><span class="d_flex_center width_full">{{ currentItem.pack.pack_text }}</span></div>
                                      </div>
                                    </div>
                                    <div class="cms_col col-4  col-lg-4 pl_5">
                                      <div class="pack_ratio_inner_wrap">
                                        <div class="pack_ratio_inner d_flex_center">
                                          <div class="num_count_wrapper">
                                            <template v-if="$auth.loggedIn">
                                              <div class="num_count" v-if="inv.availability !== '2'">
                                                <div class="minus">
                                                  <button class="btn btn-default" @click.prevent="changeQty(cartForm.colors.find((c) => c.id === parseInt(inv.color_id)))">
                                                    <i class="lni lni-minus"></i>
                                                  </button>
                                                </div>
                                                <input type="text" min="0" class="qty" v-model="cartForm.colors.find((c) => c.id === inv.color_id).quantity" readonly>
                                                <div id="add" class="add">
                                                  <button class="btn btn-default" @click.prevent="()=>{cartForm.colors.find((c) => c.id === inv.color_id).quantity++,activeColor = inv.color_id }">
                                                    <i class="lni lni-plus"></i>
                                                  </button>
                                                </div>
                                              </div>
                                              <span v-else>Out Of Stock</span>
                                            </template>
                                            <template v-else><router-link :to="{name:'login'}">Login</router-link></template>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="pack_ratio_total_wrap">
                                  <div class="row">
                                    <div class="cms_col pr_5">
                                      <div class="pack_ratio_total d_flex_btwn"><span>Total Pack</span> <span>{{ totalPack }}</span></div>
                                    </div>
                                    <div class="cms_col pr_5 pl_5">
                                      <div class="pack_ratio_total d_flex_btwn"><span>Total Qty</span> <span>{{ totalQty }}</span></div>
                                    </div>
                                    <div class="cms_col pl_5">
                                      <div class="pack_ratio_total d_flex_btwn"><span>Total Price</span> <span>${{ totalPrice.toFixed(2) }}</span></div>
                                    </div>
                                  </div>
                                </div>
                                <button class="cms_sold_cart" @click.prevent="addToCart">
                                  Add To Cart
                                </button>
                              </div>
                              <!--===============================Mobile Product List==========================================================================-->
                              <div class="product_list items_main">
                                <button class="close_pd_mobile" @click.prevent="modalClose('#Itemsmain')"> </button>
                                <h1 class="product_list_title"> Shop</h1>
                                <div class="product_list_wrap">
                                  <ul class="string_item_list_mob" :class="{has_active:liveCurrentItem}">
                                    <li v-for="(item, i) in products" @click.prevent="loadItem(item.slug, '#Items1')" :key="'mob_'+i" :class="{ active:liveCurrentItem && liveCurrentItem.id === item.id}">
                                      <div class="product_inner_list">
                                        <div class="img">
                                          <img :src="item.images[0].compressed_image" alt="Wholesale women's clothing Davi & Dani">
                                        </div>
                                        <div class="text">
                                          <p :class="[{pre_order:item.available_on}, {Instock:!item.available_on}]">{{ settings ? settings.comment_prefix : null }} {{ itemIdentifire(item.id) }} <span v-if="item.available_on">PRE ORDER - {{item.available_on}}</span> <span v-else>Instock</span> <span class="item_price position-absolute">${{ item.price.toFixed(2) }}</span></p>
                                          <P v-if="item.pack">Pack : {{item.pack.pack_text}} ({{item.pack.name}})</P>
                                          <p>Colors: {{item.colors.map(i => capitalizedName(i.name)).join(', ')}}</p>
                                        </div>
                                        <span><i class="fas fa-chevron-right"></i></span>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!--===============================Mobile Chat List==========================================================================-->
                          <div class="js_chat_wrap chat_wrap_mobile" id="chat_wrap">
                            <div class="pinned_post_wrap" v-if="pinComments.length">
                              <div class="pinned_post">
                                <li v-for="(comment, i) in pinComments" :key="'comment_pin_'+i">
                                  <div class="text">
                                    <h2>{{ comment.name }}</h2>
                                    <p>{{ comment.comment }}</p>
                                  </div>
                                  <div class="right_text">
                                    <div class="pinned_icons">
                                      <i class="lni lni-cross-circle"></i>
                                    </div>
                                  </div>
                                </li>
                              </div>
                            </div>
                            <div class="js_chat_head chat_head" id="cmsoldChatHead" v-if="comments.length">
                              <div class="chat_head_inner" ref="smallScreenChatScroll">
                                <ul class="js_cmsold_wrap" id="cmsoldWrap">
                                  <div class="comments">
                                    <li v-for="(comment, i) in comments" :key="'comment_'+i" :class="checkCommentClass(comment)">
                                      <div class="append_inner">
                                        <div class="text">
                                          <h2>{{ !comment.welcome_msg ? (comment.type === 'reply' ? comment.parent.name : comment.name) + ':' : null}} <span>{{ comment.type === 'reply' ? comment.parent.comment : comment.comment }}</span></h2>
                                        </div>
                                      </div>
                                      <div class="reply_comment" v-if="comment.type === 'reply'">
                                        <div class="reply_comment_list">
                                          <div class="text">
                                            <h2>{{ comment.name }}: <span>{{ comment.comment }}</span></h2>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </div>
                                </ul>
                              </div>
                            </div>
                            <div id="hearts-alpaca" class="hearts"></div>
                          </div>
                          <!--===============================Mobile comment form==========================================================================-->
                          <div class="reply_chat reply_chat_mobile">
                            <input type="text" ref="commentInputMob" class="form_global" placeholder="Type here" @keyup.enter="sendComment" v-model="newComment" @click.prevent="showImoji = false">
                            <div class="imojies">
                              <span @click.prevent="directImojiReact('LOVE')"><i class="lni lni-heart-filled"></i></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="inner view_product">
                      <div class="inner_content product_details_list" id="Items">
                        <button class="close_pd" @click.prevent="modalClose('#Items')">Close</button>
                        <div class="cms_sold_top_slider" v-if="currentItemImages">
                          <div class="" v-for="(image, i) in currentItemImages" :key="'image_'+i">
                            <div :class="{active:currentItem.id === image.item_id}">
                              <a href="Javascript:void(0)"><img :src="image.compressed_image" alt="Wholesale women's clothing Davi & Dani" class="img-fluid"></a>
                            </div>
                          </div>
                        </div>
                        <div class="cmsold_product_text" v-if="currentItem">
                          <span class="cmsold_product_sku">{{ currentItem.style_no }}</span>
                          <h2 class="cmsold_product_title">{{ currentItem.name }}</h2>
                          <p class="cmsold_price"><span>${{ currentItem.price.toFixed(2) }}</span>  <span>{{ itemIdentifire(currentItem.id) }}</span></p>
                          <span v-if="vendorCurrentItem === currentItem.slug" class="cmsold_now">Now Showing</span>
                        </div>
                        <div v-if="currentItem && currentItem.inventories" :class="['pack_ratio', {scroll:currentItem.inventories.length > 3}]">
                          <div class="row" v-for="inv in currentItem.inventories" :class="{active:activeColor === inv.color_id}">
                            <div class="cms_col col-5 col-lg-4 pr_5">
                              <div class="pack_ratio_inner_wrap color">
                                <div class="pack_ratio_inner ratio_color" @click.prevent="selectColorImage(inv.color_id)">
                                  <img :src="getColorImage(inv.color_id, currentItem.images)" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
                                  <span>{{ inv.color_name }} <br> <b>{{ inv.available_on }}</b> </span>
                                </div>
                              </div>
                            </div>

                            <div class="cms_col col-3  col-lg-4 pr_5 pl_5">
                              <div class="pack_ratio_inner_wrap">
                                <div class="pack_ratio_inner d_flex_center"><span class="d_flex_center width_full">{{ currentItem.pack.pack_text }}</span></div>
                              </div>
                            </div>

                            <div class="cms_col col-4  col-lg-4 pl_5">
                              <div class="pack_ratio_inner_wrap">
                                <div class="pack_ratio_inner d_flex_center">
                                  <div class="num_count_wrapper">
                                    <template v-if="$auth.loggedIn">
                                      <div class="num_count" v-if="inv.availability !== '2'">
                                        <div class="minus">
                                          <button class="btn btn-default" @click.prevent="changeQty(cartForm.colors.find((c) => c.id === parseInt(inv.color_id)))">
                                            <i class="lni lni-minus"></i>
                                          </button>
                                        </div>
                                        <input type="text" min="0" class="qty" v-model="cartForm.colors.find((c) => c.id === inv.color_id).quantity" readonly>
                                        <div id="add" class="add">
                                          <button class="btn btn-default" @click.prevent="()=>{cartForm.colors.find((c) => c.id === inv.color_id).quantity++,activeColor = inv.color_id }">
                                            <i class="lni lni-plus"></i>
                                          </button>
                                        </div>
                                      </div>
                                      <span v-else>Out Of Stock</span>
                                    </template>
                                    <template v-else><router-link :to="{name:'login'}">Login</router-link></template>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                        <div class="pack_ratio_total_wrap">
                          <div class="row">
                            <div class="cms_col pr_5">
                              <div class="pack_ratio_total d_flex_btwn"><span>Total Pack</span> <span>{{ totalPack }}</span></div>
                            </div>
                            <div class="cms_col pr_5 pl_5">
                              <div class="pack_ratio_total d_flex_btwn"><span>Total Qty</span> <span>{{ totalQty }}</span></div>
                            </div>
                            <div class="cms_col pl_5">
                              <div class="pack_ratio_total d_flex_btwn"><span>Total Price</span> <span>${{ totalPrice.toFixed(2) }}</span></div>
                            </div>
                          </div>
                        </div>
                        <button v-if="$auth.loggedIn" class="cms_sold_cart" @click.prevent="addToCart"> Add To Cart </button>
                      </div>
                      <div class="product_list">
                        <h1 class="product_list_title"> Shop</h1>
                        <div class="product_list_wrap">
                          <ul class="string_item_list_desk" :class="{has_active:liveCurrentItem}">
                            <li v-for="(item, i) in products" @click.prevent="loadItem(item.slug, '#Items')" :key="'desk_'+i"  :class="{ active:liveCurrentItem && liveCurrentItem.id === item.id}">
                              <div class="product_inner_list">
                                <div class="img">
                                  <img :src="item.images[0].compressed_image" alt="Wholesale women's clothing Davi & Dani">
                                </div>
                                <div class="text">
                                  <p :class="[{pre_order:item.available_on}, {Instock:!item.available_on}]">{{ settings ? settings.comment_prefix : null }} {{ itemIdentifire(item.id) }} <span v-if="item.available_on">PRE ORDER - {{item.available_on}}</span> <span v-else>Instock</span> <span class="item_price position-absolute">${{ item.price.toFixed(2) }}</span></p>
                                  <P v-if="item.pack">Pack : {{item.pack.pack_text}} ({{item.pack.name}})</P>
                                  <p>Colors: {{item.colors.map(i => capitalizedName(i.name)).join(', ')}}</p>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/scss/live_chat.scss";
import {mapGetters} from "vuex";
import Facebook from "../../components/shared/user/FacebookLogin";
export default {
  components:{Facebook},
  name: 'live-chat',
  middleware: 'auth',
  props: {
    liveData: {
      type: Object,
    },
  },
  data() {
    return {
      settings: null,
      liveCurrentItem: null,
      comments: [],
      currentItem: null,
      vendorCurrentItem: null,
      currentItemImages: [],
      products: [],
      activeColor: '',
      cartForm: {
        colors: []
      },
      newComment: '',
      showReact: false,
      reacts: [],
      pinComments:[],
      currentComment: null,
      reply: false,
      showImoji: false,
      cursorPOS: null,
      currentImoji: null,
      reactTimeOut: null,
      visitors: 0,
      currentPlayerTime: null,
      wowzaController: null,
      pubnub: null,
      minimizeModal: false,
      minimizePlayer: null,
      welcome_msg: false,
      iframeSrc: null,
      bigIframeSrc: null,
      weAreLiveNowNotice: false,
      popupSettngs: null,
      hasFacebookProfile: false,
      activeItemStyleCaltulate: true,
    }
  },
  mounted() {
    let self = this
    this.loadComments();
    this.loadProducts();
    this.pinnedPost();

    if (this.liveData.current_item_slug) {
      this.vendorCurrentItem = this.liveData.current_item_slug
      this.loadItem(this.liveData.current_item_slug);
      this.checkCurrentItem(this.liveData.current_item_slug);
    }
    document.addEventListener('emoji-click', (event) => {
      this.imojiPicker(event.detail)
    });

    window.addEventListener("resize", this.pinnedPost());
    window.$(window).resize(function() {
      self.calculateActiveItemPaddingOnList()
        if(window.frames['iframe'])
          window.frames['iframe'].contentWindow.postMessage(window.innerWidth, process.env.NUXT_ENV_WEB_RTC_IFRAME_URL);
    });
  },
  watch: {
    'liveData.current_item_slug': function () {
      this.loadItem(this.liveData.current_item_slug);
    },
    'pubnubEvents': function(){
      if(this.pubnubEvents)
        this.checkPubnubMessage(this.pubnubEvents)
    }
  },
  computed:{
    ...mapGetters({
      user: 'customerModule/getCustomerDetails',
      pubnubEvents: 'settingsModule/getPubnubEvents',
    }),
    totalPack() {
      if (this.currentItem)
        return this.cartForm.colors.filter((color) => this.currentItem.inventories.find((i) => i.color_id === color.id && i.availability !== '2')).reduce((a, b) => a + b.quantity, 0);
      else
        return 0;
    },
    totalQty() {
      if (this.currentItem) {
        return this.currentItem.pack.total_item * this.totalPack;
      } else
        return 0;
    },
    totalPrice() {
      if (this.currentItem)
        return this.currentItem.price * this.totalQty;
      else
        return 0;
    }
  },
  created() {
    this.$axios.get(process.env.NUXT_ENV_BROADCAST_API + '/settings/' + process.env.NUXT_ENV_BROADCAST_VENDOR_ID)
      .then((response)=>{
        this.settings = response.data.data
      })
    this.$axios.get('/get-live-popup/settings')
      .then((response)=>{
        this.popupSettngs = response.data
      })
    if(this.user && this.user.fb_user_id) {
      this.weAreLiveNowNotice = true
    }
  },
  methods: {
    fullScrin(){
      window.$('.mobile_fullscreen_btn').toggleClass('open');
      window.$('body').toggleClass('fullwindow');
    },
    fbLogin() {
      let self = this;
      window.FB.login(function(response) {
        if (response.authResponse) {
          self.fbLoginResponse(response.authResponse)
        }
      }, {
        scope: 'public_profile,email'
      });
    },
    showLiveNowNotification(){
      if(this.user && this.user.fb_user_id) {
        this.weAreLiveNowNotice = true
      } else {
        this.hasFacebookProfile = true
      }
    },
    fbLoginResponse(response) {
      this.$axios.post('/save-facebook-credentials', {
        fb_user_id: response.userID,
        access_token: response.accessToken,
      })
        .then(()=>{
          this.$store.dispatch('customerModule/dispatchCustomerDetails')
          this.closeFacebookModal()
        })
        .catch((err) => {
          this.showFailMsg("Something went wrong!");
        })
    },
    closeFacebookModal(){
      this.hasFacebookProfile = false;
      this.weAreLiveNowNotice = false;
      this.openBigModal()
    },
    checkCommentClass(comment){
      let newclass = 'reply';
      if(comment.welcome_msg) {
        newclass = 'welcome'
      } else if(comment['type'] === 'reply' ){
        newclass = 'reply_back_user'
      } else if (this.user && comment.user_id == this.user.id){
        newclass = ''
      }
      return newclass;
    },
    openBigModal() {
      this.activeItemStyleCaltulate = true
      this.minimizeModal = false
      this.weAreLiveNowNotice = false
      this.hasFacebookProfile = false
      window.$(".has_facebook_profile").removeClass('open_modal')
      window.$(".we_are_live_now_notice").removeClass('open_modal')
      this.iframeSrc = null;
      this.bigIframeSrc =  this.liveData ? process.env.NUXT_ENV_WEB_RTC_IFRAME_URL + '?name=' +  this.liveData.uuid + '&front=1' : ''
        window.$('body').addClass('model_open');
        window.$('.stage61_model').addClass('open_modal');
      let welcome_msg_status = window.localStorage.getItem('welcome_msg_status')
      if((!welcome_msg_status) || (welcome_msg_status != this.liveData.id)){
        this.welcome_msg = true
        this.newComment = this.user ? "Welcome " +  this.user.name : null;
        this.sendComment();
        window.localStorage.setItem('welcome_msg_status', this.liveData.id)
      }
      setTimeout(() => {
        this.calculateActiveItemPaddingOnList()
      }, 0)
      setTimeout (function () {
        window.$('.stage61_model').addClass('open_animation');
      } , 400 )
      setTimeout (function () {
        if (window.frames['iframe'] && window.frames['iframe'].contentWindow) {
          window.frames['iframe'].contentWindow.postMessage(window.innerWidth, process.env.NUXT_ENV_WEB_RTC_IFRAME_URL);
        }
      } , 1000 )
    },
    openMinimizeModal(){
      if(this.user && !this.user.fb_user_id) {
        this.weAreLiveNowNotice = false
        this.hasFacebookProfile = true
        return false;
      }
      if (this.minimizeModal) {
        this.minimizeModal = false
      } else{
        this.iframeSrc = this.liveData ? process.env.NUXT_ENV_WEB_RTC_IFRAME_URL + '?name=' +  this.liveData.uuid + '&front=1' : ''
        this.bigIframeSrc = null
        this.minimizeModal = true
      }
    },
    closeModal(){
      window.$(".has_facebook_profile").removeClass('open_modal')
      window.$(".we_are_live_now_notice").removeClass('open_modal')
      this.weAreLiveNowNotice = false;
      this.minimizeModal = false;
      this.hasFacebookProfile = false
      setTimeout (function () {
        window.$('.stage61_model').removeClass('open_animation');
        window.$('body').removeClass('model_open');
        window.$('body').removeClass('fullwindow');
      } , 300 )

      setTimeout (function () {
        window.$('.stage61_model').removeClass('open_modal');
      } , 400 )
    },

    capitalizedName(name){
      return name.toUpperCase();
    },

    directImojiReact(content){
      this.currentImoji = ''
      this.appendEmoji(content)
      this.showImoji = false
      this.showReact = true;
      this.reply = false;
      this.$axios.post(process.env.NUXT_ENV_BROADCAST_API + '/reacts', {
        'live_video_id': this.liveData.id,
        'user_id': this.user.id,
        'react': content
      })
      if(this.reactTimeOut) {
        clearTimeout(this.reactTimeOut)
      }
    },
    appendEmoji(content){
      let id = Math.floor(Math.random() * 999999999);
      window.$(".hearts").append(`<div class="imojies_inner ${content} emoji_${id}"></div>`);
      setTimeout(()=>{
        let id = Math.floor(Math.random() * 999999999);
        window.$(".hearts").append(`<div class="imojies_inner ${content} emoji_${id}"></div>`);
      }, 150)
      setTimeout(()=>{
        let id = Math.floor(Math.random() * 999999999);
        window.$(".hearts").append(`<div class="imojies_inner ${content} emoji_${id}"></div>`);
      }, 300)
      setTimeout(()=>{
        let id = Math.floor(Math.random() * 999999999);
        window.$(".hearts").append(`<div class="imojies_inner ${content} emoji_${id}"></div>`);
      }, 450)
    },
    imojiOpenTriger(deviceType){
      if(deviceType === 'desktop')
        this.cursorPOS = this.$refs.commentInput.selectionStart;
      else
        this.cursorPOS = this.$refs.commentInputMob.selectionStart;
      if(this.showImoji)
        this.showImoji = false
      else
        this.showImoji = true
    },
    imojiPicker(detail) {
      if(!this.currentImoji)
        this.currentImoji = detail.emoji.unicode
      let firstPart = this.newComment.slice(0, this.cursorPOS)
      let secondPart = this.newComment.slice(this.cursorPOS, this.newComment.length)
      this.newComment = firstPart + detail.emoji.unicode + secondPart
    },

    itemIdentifire(id){
      if(this.liveData && this.liveData.items.length){
        let item = this.liveData.items.find(x=> x.item_id === id)
        if(item)
          return item.identifier
      }
    },
    checkPubnubMessage(message) {
      const self = this;
      if(this.liveData) {
        if (message.message.title === 'comment' && message.message.id === self.liveData.id) {
          let exits = self.comments.find((c) => c.id === message.message.data.id);

          if (!exits)
            self.comments.push(message.message.data)
        } else if (message.message.title === 'active-item' && message.message.video_id === self.liveData.id) {
          self.checkCurrentItem(message.message.item_slug);
          self.vendorCurrentItem = message.message.item_slug;
        } else if (message.message.title === 'cart') {
          if (message.message.type === 'Facebook' && self.user.fb_user_id == message.message.user_id) {
            self.showCartStatus()
          } else if (message.message.type === 'Web' && self.user.id == message.message.user_id) {
            self.showCartStatus()
          }
        } else if (message.message.title === 'reaction' && message.message.id === self.liveData.id) {
          self.reacts = JSON.parse(message.message.data.reactions)
          self.reactGenerator(message.message.data.current_react)
        } else if (message.message.title === 'pin-comment' && message.message.id === self.liveData.id) {
          if (message.message.status === 1) {
            self.pinComments.push(message.message.data)
          } else {
            let index = self.pinComments.map(e => e.id).indexOf(message.message.data.id);
            self.pinComments.splice(index, 1);
          }
        } else if (message.message.title === 'reply' && message.message.id === self.liveData.id) {
          let newreplay = message.message.data
          if(newreplay.parent.user_type != "Facebook") {
            newreplay.type = 'reply'
            self.comments.push(newreplay)
          }
        } else if (message.message.title === 'react' && parseInt(message.message.data.id) === parseInt(self.liveData.id)) {
          self.showReact = true;
          if(message.message.data.user_id != this.user.id)
            self.appendEmoji(message.message.data.comment)
        } else if (message.message.title === 'live-view' && message.message.id === self.liveData.id) {
          self.visitors = message.message.count;
        } else if (message.message.title === 'live' && message.message.id === self.liveData.id && !message.message.status) {
          window.$('.stage61_model').removeClass('open_animation');
          window.$('body').removeClass('model_open');
          window.$('.stage61_model').removeClass('open_modal');
          window.$('body').removeClass('fullwindow');
        } else if(message.message.title === 'items-remove' && parseInt(message.message.video_id) === parseInt(self.liveData.id)) {
          this.liveData.item_ids = message.message.data.items_all
          self.loadProducts();
        } else if(message.message.title === 'items-add' && parseInt(message.message.video_id) === parseInt(self.liveData.id)) {
          this.liveData.item_ids = message.message.data.items_all
          self.loadProducts();
        }
      }
    },
    loadComments() {
      this.$axios.get(process.env.NUXT_ENV_BROADCAST_API + '/comments/' + this.liveData.id)
        .then((response) => {
          this.comments = response.data.data;
          this.getPinComments();
        })
    },
    getPinComments(){
      if(this.comments && this.comments.length)
        this.pinComments = this.comments.filter(word => word.pin === 1);
    },
    sendComment() {
      if (!this.reply) {
        this.$axios.post(process.env.NUXT_ENV_BROADCAST_API + '/comments', {
          vendor_id: '1',
          live_video_id: this.liveData.id,
          welcome_msg: this.welcome_msg,
          user_type: 'Web',
          name: this.$store.state.authModule.user.name,
          user_id: this.$store.state.authModule.user.id,
          comment: this.newComment,
        })
          .then((response) => {
            this.comments.push(response.data.data);
          })
          .catch(()=>{})
          .finally(() => {
            this.newComment = '';
            this.welcome_msg = false;
          })
      }else{
        this.$axios.post(process.env.NUXT_ENV_BROADCAST_API + '/comments/'+this.currentComment.id+'/reply', {
          user_type: 'Web',
          name: this.user.name,
          user_id: this.user.fb_user_id ? this.user.fb_user_id : this.user.id,
          comment: this.newComment,
        });
      }
      this.newComment = '';
      this.reply = false;
    },
    checkCurrentItem(slug) {
      if(this.products.length) {
        let product = this.products.find(p => p.slug === slug)
        if (product) {
          this.liveCurrentItem = product
          this.calculateActiveItemPaddingOnList()
        }
      }
    },
    loadItem(slug, id = null) {
      if(this.products.length) {
        let item = this.products.find(item => item.slug === slug)
        if(item) {
          this.currentItem = item;
          let firstColor = this.currentItem.inventories[0];
          this.selectColorImage(firstColor.color_id)
          this.cartForm.item = {...this.currentItem};
          this.currentItem.colors.forEach((c) => {
            this.cartForm.colors.push({...c, ...{quantity: 0}, ...{indicator: 'streaming'}});
          });
        } else {
          this.itemLoadFromDb(slug)
        }
      } else {
        this.itemLoadFromDb(slug)
      }
      if (id) {
        this.modalOpen(id)
      }
    },
    loadCurrentItemModal(slug){
      this.loadItem(slug)
      this.modalOpen("#Items")
      if(window.outerWidth <= 1024) {
        this.modalOpen("#Items1")
        setTimeout(()=>{
          this.modalOpen("#Itemsmain")
        },250)
      }
    },
    itemLoadFromDb(slug, id=null){
      this.$axios.get('/item/' + slug)
        .then((response) => {
          this.currentItem = response.data.data;
          let firstColor = this.currentItem.inventories[0];
          this.selectColorImage(firstColor.color_id)
          this.cartForm.item = {...this.currentItem};
          this.currentItem.colors.forEach((c) => {
            this.cartForm.colors.push({...c, ...{quantity: 0}, ...{indicator: 'streaming'}});
          });
          if(id){
            this.modalOpen(id)
          }
        })
    },
    modalOpen(id){
      let self = this
      let target = $(id);
      target.slideDown();
      if(this.activeItemStyleCaltulate) {
        setTimeout(() => {
          self.activeItemStyleCaltulate = false
          self.calculateActiveItemPaddingOnList()
        }, 0)
      }
    },
    modalClose(id, id2 = null){
      let target = $(id);
      target.slideUp();
      if(id2) {
        let target2 = $(id2);
        target2.slideUp();
      }
    },

    changeQty(color) {
      if (color.quantity !== 0)
        color.quantity--;
    },
    getColorImage(path, item){
      let data = null;
      if(item.length) {
        let flashItem = item.find(element => element.color_id === path);
        if(flashItem)
          data = flashItem.thumbs_image
      }else{
        if(this.currentItem.colors.length){
          data = this.currentItem.colors.find(color=>color.id === path).thumbs_image
        }
      }
      if(!data)
        data = '/images/no-image.png'

      if(!this.$auth.loggedIn)
        data = this.defaultImage

      return data
    },
    addToCart() {
      if (this.cartForm.colors.reduce((a, b) => a + b.quantity, 0) === 0) {
        this.showFailMsg('Please select an item')
      } else {
        this.$store.dispatch('cartModule/addToCart', this.cartForm)
          .then(()=>{
            for(let i = 0; i < this.cartForm.colors.length ; i++)
              this.cartForm.colors[i].quantity = 0

            this.errorMsg = []
          }).catch((eee)=>{
          this.errorMsg = eee.error;
        })
          .finally(()=>{
            this.showCartStatus()
          })
      }

    },
    loadProducts() {
      this.$axios.get('/admin/selected-items', {
        params: {
          itemId: this.liveData.item_ids
        }
      })
        .then((response) => {
          this.products = response.data.data
          if(this.liveData)
            this.checkCurrentItem(this.liveData.current_item_slug);
          setTimeout(() => {
            this.initItemSlider();
          }, 0)
        })
    },

    initItemSlider() {
      $('.cmsold_others_slider').slick({
        slidesToScroll: 12,
        slidesToShow: 12,
        dots: false,
        infinite: false,
        prevArrow: false,
        nextArrow: false,
        responsive: [
          {
            breakpoint: 1125, // tablet breakpoint
            settings: {
              slidesToShow: 7,
              slidesToScroll: 7
            }
          },
          {
            breakpoint: 980, // tablet breakpoint
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5
            }
          },
          {
            breakpoint: 480, // mobile breakpoint
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          }
        ]
      });
    },
    initTopSlider() {
      $('.cms_sold_top_slider').slick({
        slidesToScroll: 2,
        slidesToShow: 2,
        dots: false,
        infinite: false,
        prevArrow: "<button class='arrow_left'><i class='lni lni-chevron-left'></i></button>",
        nextArrow: "<button class='arrow_right'><i class='lni lni-chevron-right'></i></button>",
      });
      setTimeout(() => {
        $('.cms_sold_top_slider').css({'min-height' : 'auto'});
      }, 250)
    },
    selectColorImage(colorId){
      this.activeColor = colorId;
      this.currentItemImages = [];
      if (colorId) {
        if($(".cms_sold_top_slider").hasClass('slick-slider')) {
          let height = $(".cms_sold_top_slider ").outerHeight()
          $('.cms_sold_top_slider').slick('unslick');
          $('.cms_sold_top_slider').css({'min-height' : height+'px'});
        }
        this.currentItemImages = this.currentItem.images.filter((i) => i.color_id === colorId);
        if(!this.currentItemImages.length && this.currentItem.images.length){
          this.currentItemImages[0] = this.currentItem.images[0]
          if(this.currentItem.images.length > 1)
            this.currentItemImages[1] = this.currentItem.images[1]
        }
        setTimeout(() => {
          this.initTopSlider();
        }, 0)
      }
    },
    calculateActiveItemPaddingOnList(){
      let height = window.$(".string_item_list_desk li.active").outerHeight()
      let heightmb = window.$(".string_item_list_mob li.active").outerHeight()
      let width = window.$(".string_item_list_desk").outerWidth()
      let widthmb = window.$(".string_item_list_mob").outerWidth()
      window.$(".string_item_list_desk li").css({'margin-top': '0px'})
      window.$(".string_item_list_mob li").css({'margin-top': '0px'})
      window.$(".string_item_list_mob li.active").css({'width': 'auto'})
      window.$(".string_item_list_desk li.active").css({'width': 'auto'})
      window.$(".string_item_list_desk li .product_inner_list").css({'background':'#fff'})
      window.$(".string_item_list_mob li .product_inner_list").css({'background':'#fff'})

      if(height) {
        window.$(".string_item_list_desk").css({'padding-top': height + "px"})
        setTimeout(() => {
          window.$(".string_item_list_desk li.active").css({'margin-top': '-' + height + "px", 'width': width + 'px'})
          window.$(".string_item_list_desk li.active .product_inner_list").css({'background':'#9D1716'})
        }, 100)
      }
      if(heightmb) {
        window.$(".string_item_list_mob").css({'padding-top': heightmb + "px"})
        setTimeout(() => {
          window.$(".string_item_list_mob li.active").css({'margin-top': '-' + heightmb + "px", 'width': widthmb + 'px'})
          window.$(".string_item_list_mob li.active .product_inner_list").css({'background':'#9D1716'})
        }, 100)
      }
    },
    showCartStatus(){
      this.$store.dispatch('cartModule/loadCart')
      if(process.client){
        $('.header_area').addClass('z_index')
        if(window.outerWidth > 1024){
          $('.h_cart').click();
        }else{
          $('.m_h_cart').click();
        }

        setTimeout(()=>{
          $('.h_cart').click();
          $('.m_h_cart').click();
          $('.header_area').removeClass('z_index')
        }, 10000)
      }
    },
    pinnedPost() {
      let pinnedPostHeight = 0;
      if( window.outerWidth > 1024) {
        pinnedPostHeight = window.$('.pinned_post_wrap').outerHeight();
      } else {
        pinnedPostHeight = window.$('.chat_wrap_mobile .pinned_post_wrap').outerHeight();
      }
      $('.chat_head_inner').css({
        top : `${pinnedPostHeight}px`,
        height: `calc(100% - ${pinnedPostHeight }px)`
      })
    },
    reactGenerator(key){
      if(this.reacts.length) {
        this.showReact = true;
        this.appendEmoji(key)
      }
    },

  },
  updated() {
    let self = this
    $('.live_play_notice').click(function(){
      self.showLiveNowNotification()
    })
    this.pinnedPost();
    this.$nextTick(() => {
      if (this.$refs.largeScreenChatScroll !== undefined) {
        this.$refs.largeScreenChatScroll.scrollTop = this.$refs.largeScreenChatScroll.scrollHeight
      }
      if (this.$refs.smallScreenChatScroll !== undefined) {
        this.$refs.smallScreenChatScroll.scrollTop = this.$refs.smallScreenChatScroll.scrollHeight
      }
    });
    if (window.frames['iframe'] && window.frames['iframe'].contentWindow) {
        window.frames['iframe'].contentWindow.postMessage(window.innerWidth, process.env.NUXT_ENV_WEB_RTC_IFRAME_URL);
    }
  },
  beforeDestroy() {
  },
}
</script>
