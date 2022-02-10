<template>
  <section class="review_area">
    <div class="related_product_title" v-if="reviews.length">
      <h2>Customer Reviews</h2>
    </div>
    <div v-if="reviews.length">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12"  >
            <div class="review_head" v-if="reviews.length">
              <div class="review_head_list r_rating">
                <div class="rating_star">
                  <span><i class="lni" :class="rate_0"></i></span>
                  <span><i class="lni" :class="rate_1"></i></span>
                  <span><i class="lni" :class="rate_2"></i></span>
                  <span><i class="lni" :class="rate_3"></i></span>
                  <span><i class="lni" :class="rate_4"></i></span>
                </div>
                <h2>{{ reviewCount }} reviews</h2>
              </div>
              <div class="r_h_main_rating">
                <ul>
                  <li :class="{has_review: rateCount5 }">
                    <div class="rating_list">
                      <span><i class="lni lni-star-filled"></i></span>
                      <span><i class="lni lni-star-filled"></i></span>
                      <span><i class="lni lni-star-filled"></i></span>
                      <span><i class="lni lni-star-filled"></i></span>
                      <span><i class="lni lni-star-filled"></i></span>
                    </div>
                    <span class="count_review">({{ rateCount5 }})</span>
                    <div class="progressbar">
                      <div class="progress_cont">
                        <div class="progress">
                          <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="2" aria-valuemin="0" aria-valuemax="100" :style="{width: (rateCount5 * 100) / totalRateCount +'%'}"> <span class="sr-only">100%</span> </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li :class="{has_review: rateCount4 }">
                    <div class="rating_list">
                      <span><i class="lni lni-star-filled"></i></span>
                      <span><i class="lni lni-star-filled"></i></span>
                      <span><i class="lni lni-star-filled"></i></span>
                      <span><i class="lni lni-star-filled"></i></span>
                      <span><i class="lni lni-star"></i></span>
                    </div>
                    <span class="count_review">({{ rateCount4 }})</span>
                    <div class="progressbar">
                      <div class="progress_cont">
                        <div class="progress">
                          <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="2" aria-valuemin="0" aria-valuemax="100" :style="{width: (rateCount4 * 100) / totalRateCount +'%'}"> <span class="sr-only">100%</span> </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li :class="{has_review: rateCount3 }">
                    <div class="rating_list">
                      <span><i class="lni lni-star-filled"></i></span>
                      <span><i class="lni lni-star-filled"></i></span>
                      <span><i class="lni lni-star-filled"></i></span>
                      <span><i class="lni lni-star"></i></span>
                      <span><i class="lni lni-star"></i></span>
                    </div>
                    <span class="count_review">({{ rateCount3 }})</span>
                    <div class="progressbar">
                      <div class="progress_cont">
                        <div class="progress">
                          <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="2" aria-valuemin="0" aria-valuemax="100" :style="{width: (rateCount3 * 100) / totalRateCount +'%'}"> <span class="sr-only">100%</span> </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li :class="{has_review: rateCount2 }">
                    <div class="rating_list">
                      <span><i class="lni lni-star-filled"></i></span>
                      <span><i class="lni lni-star-filled"></i></span>
                      <span><i class="lni lni-star"></i></span>
                      <span><i class="lni lni-star"></i></span>
                      <span><i class="lni lni-star"></i></span>
                    </div>
                    <span class="count_review">({{ rateCount2 }})</span>
                    <div class="progressbar">
                      <div class="progress_cont">
                        <div class="progress">
                          <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="2" aria-valuemin="0" aria-valuemax="100" :style="{width: (rateCount2 * 100) / totalRateCount +'%'}"> <span class="sr-only">100%</span> </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li :class="{has_review: rateCount1 }">
                    <div class="rating_list">
                      <span><i class="lni lni-star-filled"></i></span>
                      <span><i class="lni lni-star"></i></span>
                      <span><i class="lni lni-star"></i></span>
                      <span><i class="lni lni-star"></i></span>
                      <span><i class="lni lni-star"></i></span>
                    </div>
                    <span class="count_review">({{ rateCount1 }})</span>
                    <div class="progressbar">
                      <div class="progress_cont">
                        <div class="progress">
                          <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="2" aria-valuemin="0" aria-valuemax="100" :style="{width: (rateCount1 * 100) / totalRateCount +'%'}"> <span class="sr-only">100%</span> </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="review_content">
              <div class="review_content_title">
                <h2 v-if="reviewCount">Review ({{ reviewCount }})</h2>
                <div class="write_review">
                  <button class="btn_common" v-if="$auth.loggedIn && product.can_review " @click="showReviewModal=true">Write A Review</button>
                  <button class="btn_common" v-if="!$auth.loggedIn"> <router-link :to="{name:'login'}">Please login to Write Review</router-link> </button>
                </div>
              </div>

              <div class="review_content_inner border-top-0" v-for="(review, reviewKey) in reviews" :key="'reviewKey' + reviewKey">
                <div class="review_author">
                  <p><span>{{ review.customer }}</span></p>
                  <div class="review_author_rating">
                    <div class="rating_star">
                      <span v-if="review.rating > 0"><i class="lni lni-star-filled"></i></span>
                      <span v-if="review.rating > 1"><i class="lni lni-star-filled"></i></span>
                      <span v-if="review.rating > 2"><i class="lni lni-star-filled"></i></span>
                      <span v-if="review.rating > 3"><i class="lni lni-star-filled"></i></span>
                      <span v-if="review.rating > 4"><i class="lni lni-star-filled"></i></span>
                    </div>
                  </div>
                </div>
                <div class="review_text">
                  <h3>{{ review.title }}</h3>
                  <p>{{ review.review }}</p>
                  <div class="review_img" v-if="review.images.length">
                    <a href="#" v-for="(image, imageKey) in review.images" :key="'ReviewImage' + imageKey">
                      <img :src="image.image" alt="Wholesale women's clothing Davi & Dani">
                    </a>
                  </div>
                </div>
                <div class="review_bottom">
                  <div class="review_share">

                  </div>

                  <!--                    <review-feedback :review="review"></review-feedback>-->
                </div>
                <div class="review_date">
                  <span>{{ review.updated_at }}</span>
                </div>
              </div>
            </div>
            <div class="review_pagination" v-if="reviews.length && pagination && pagination.last_page > 1">
              <product-review-pagination v-if="pagination"
                                         :paginateData="pagination"
                                         @paginate="changePage" ></product-review-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="review_without_login" v-else >
      <div class="related_product_title">
        <h2>There is no Review right now</h2>
      </div>
      <ul>
        <li><i class="lni lni-star-filled"></i></li>
        <li><i class="lni lni-star-filled"></i></li>
        <li><i class="lni lni-star-filled"></i></li>
        <li><i class="lni lni-star-filled"></i></li>
        <li><i class="lni lni-star-filled"></i></li>
      </ul>
      <button class="btn_common" v-if="$auth.loggedIn && product.can_review" @click="showReviewModal=true" >Write A Review</button>
    </div>

    <product-review-write-component v-if="product && showReviewModal"
                                    @closeModal="closeReviewModal"
                                    @loadData="loadData"
                                    :product="product"></product-review-write-component>
  </section>
</template>

<script>
import {mapGetters} from "vuex";
import ProductReviewWriteComponent from "@/components/shared/ProductReviewWriteComponent";
import ProductReviewPagination from "@/components/shared/ProductReviewPagination";

export default {
  name:'ProductReview',
  components: {ProductReviewWriteComponent, ProductReviewPagination},
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data(){
    return {
      showReviewModal: false,
      reviews: [],
      pagination: null,
      currentPage: 1,
      rateCount5: 0,
      rateCount4: 0,
      rateCount3: 0,
      rateCount2: 0,
      rateCount1: 0,
      totalRate: 0,
      reviewCount: 0,
      totalRateCount: 0
    }
  },
  computed: {
    ...mapGetters({
      user: 'authModule/getUser',
    }),
    rate() {
      return this.totalRate / this.totalRateCount;
    },
    rate_0() {
      return Math.floor(this.rate) > 0 ? ' lni-star-filled' : ' lni-star'
    },
    rate_1() {
      return Math.floor(this.rate) > 1 ? ' lni-star-filled' : ' lni-star'
    },
    rate_2() {
      return Math.floor(this.rate) > 2 ? ' lni-star-filled' : ' lni-star'
    },
    rate_3() {
      return Math.floor(this.rate) > 3 ? ' lni-star-filled' : ' lni-star'
    },
    rate_4() {
      return Math.floor(this.rate) > 4 ? ' lni-star-filled' : ' lni-star'
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    closeReviewModal() {
      this.showReviewModal = false
    },
    changePage(page) {
      this.currentPage = page;
      this.loadData();
    },
    loadData() {
      this.$axios.get('/reviews/' + this.product.id + '?page=' + this.currentPage)
        .then((response) => {
          // this.$emit('getItemDetails')
          this.reviews = response.data.data;
          this.pagination = response.data.meta;
          this.rateCount5 = response.data.rate_count_5;
          this.rateCount4 = response.data.rate_count_4;
          this.rateCount3 = response.data.rate_count_3;
          this.rateCount2 = response.data.rate_count_2;
          this.rateCount1 = response.data.rate_count_1;
          this.totalRate = response.data.total_rate;
          this.reviewCount = response.data.review_count;
          this.totalRateCount = response.data.total_rate_count;
        })
        .catch(() => {})
    }
  }
}
</script>
