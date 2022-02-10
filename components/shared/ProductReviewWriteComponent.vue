<template>
  <div>
    <div class="full_screen_overlay overlay_open" @click="closeModal()"></div>
    <div class="review_rating_right_menu review_rating_right_menu_open">
      <h2>WRITE YOUR REVIEW</h2>
      <span class="close_ic" @click="closeModal()"><i class="lni lni-close"></i></span>
      <div class="write_review_title clearfix">
        <img v-if="product.images.length" :src="product.images[0].thumbs_image" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
        <img v-else src="/images/no-image.png" class="img-fluid" alt="Wholesale women's clothing Davi & Dani">
        <p>{{ product.name }}</p>
        <h2>${{ product.price_formatted }}</h2>
      </div>
      <div class="clearfix"></div>
      <div class="review_description clearfix">
        <h2>
          Review Rating *
          <span>
            <div class="rating_star">
                <span @click="changeRate(5)" @mouseover="temporaryRate(5)" @mouseleave="leaveMouse()"><i class="lni " :class="rate_4"></i></span>
                <span @click="changeRate(4)" @mouseover="temporaryRate(4)" @mouseleave="leaveMouse()"><i class="lni " :class="rate_3"></i></span>
                <span @click="changeRate(3)" @mouseover="temporaryRate(3)" @mouseleave="leaveMouse()"><i class="lni " :class="rate_2"></i></span>
                <span @click="changeRate(2)" @mouseover="temporaryRate(2)" @mouseleave="leaveMouse()"><i class="lni " :class="rate_1"></i></span>
                <span @click="changeRate(1)" @mouseover="temporaryRate(1)" @mouseleave="leaveMouse()"><i class="lni " :class="rate_0"></i></span>
            </div>
          </span>
        </h2>
      </div>
      <div class="form-group common_form">
        <label>REVIEW TITLE</label>
        <input type="text" class="form-control" v-model="form.title">
      </div>
      <div class="custom-file mb_10">
        <input type="file" class="custom-file-input" id="validatedCustomFile"  @change="onImageChange" multiple>
        <label class="custom-file-label" for="validatedCustomFile">Choose images...</label>
      </div>
      <div class="upload_img_thumbnail">
        <img :src="image.image" alt="Wholesale women's clothing Davi & Dani" v-for="(image, imageIndex) in form.images" :key="'reviewImage_' + imageIndex">
      </div>
      <div class="form-group common_form">
        <label>WRITE REVIEW</label>
        <textarea cols="30" rows="10" class="form-control" v-model="form.review"></textarea>
        <small>not more than 350 characters</small>
      </div>
      <p>Please avoid using any inappropriate language, personal information, HTML, references to other retailers or
        copyrighted comments.
      </p>

      <v-errors :errors="errorFor('review')" class="text-danger"></v-errors>

      <div class="form-group common_form">
        <button class="btn_common" @click="reviewSubmit">SUBMIT</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'ReviewModal',
  emits: ['loadData'],
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      old_rate: 0,
      form: {
        images: [],
        title: '',
        review: '',
        rate: 5,
      }
    }
  },
  computed: {
    rate_0() {
      return this.form.rate > 0 ? ' lni-star-filled' : ' lni-star'
    },
    rate_1() {
      return this.form.rate > 1 ? ' lni-star-filled' : ' lni-star'
    },
    rate_2() {
      return this.form.rate > 2 ? ' lni-star-filled' : ' lni-star'
    },
    rate_3() {
      return this.form.rate > 3 ? ' lni-star-filled' : ' lni-star'
    },
    rate_4() {
      return this.form.rate > 4 ? ' lni-star-filled' : ' lni-star'
    },
  },
  methods: {
    onImageChange(e) {
      let formData = new FormData();
      formData.append('file', e.target.files[0]);

      this.$axios.post('/temp/image', formData)
        .then((response) => {
          this.form.images.push(response.data);
        })
    },
    closeModal() {
      this.$emit('closeModal');
    },
    changeRate(rate) {
      this.form.rate = rate;
      this.old_rate = rate;
    },
    temporaryRate(rate) {
      this.old_rate = this.form.rate;
      this.form.rate = rate;
    },
    leaveMouse() {
      this.form.rate = this.old_rate;
    },
    reviewSubmit() {
      this.allErrors = null;
      this.form.item_id = this.product.id;
      this.$axios.post('/reviews', this.form)
        .then(() => {
          this.$emit('loadData')
          this.closeModal();
        })
        .catch((err) => {
          this.allErrors = err.response.data.errors;
        })
    }
  }
}
</script>
