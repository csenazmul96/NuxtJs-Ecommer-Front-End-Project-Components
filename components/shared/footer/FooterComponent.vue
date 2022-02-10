<template>
  <!-- ============================
      START FOOTER SECTION
  ============================== -->
  <footer :class="['footer_area', {'category_page_footer':footerPadding.includes($route.name)}]">
    <div class="footer_wave">
      <img src="/images/wave-footer4.png" alt="Wholesale women's clothing Davi & Dani" class="above_mobile">
    </div>
    <div class="footer_inner">
      <div class="container footer_container">
        <div class="row">
          <div class="col-md-6">
            <div class="footer_top_inner">
              <img src="/images/hl-c-left.png" alt="Wholesale women's clothing Davi & Dani" class="img-fluid">
              <p>All major cards are accepted | Fast checkout with Paypal</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="footer_top_inner right">
              <img src="/images/hl-c-right.png" alt="Wholesale women's clothing Davi & Dani" class="img-fluid">
              <p>100% Satisfaction Guaranteed | We provide easy returns</p>
            </div>
          </div>
        </div>
        <div class="row above_mobile">
          <div class="col-md-4">
            <div class="footer_inner_col">
              <h2>ACCOUNT</h2>
              <ul>
                <li><router-link :to="{name: 'user'}">My Account</router-link></li>
<!--                <li><router-link :to="{name: 'user'}">Wishlist</router-link></li>-->
              </ul>
            </div>
          </div>
          <div class="col-md-4">
            <div class="footer_inner_col">
              <h2>COMPANY</h2>
              <ul>
                <li><nuxt-link :to="{name:'page-slug', params:{slug:'return-policy'}}">Return Policy</nuxt-link></li>
                <li><nuxt-link :to="{name:'page-slug', params:{slug:'size-guide'}}">Size Guide</nuxt-link></li>
                <li><nuxt-link :to="{name:'page-slug', params:{slug:'cookies-policy'}}">Cookies Policy</nuxt-link></li>
                <li><nuxt-link :to="{name:'page-slug', params:{slug:'privacy-policy'}}">Privacy Policy</nuxt-link></li>
                <li><nuxt-link :to="{name:'page-slug', params:{slug:'terms-conditions'}}">Terms & Condition</nuxt-link></li>
              </ul>
            </div>
          </div>
          <div class="col-md-4">
            <div class="footer_inner_col">
              <h2>Contact</h2>
              <ul>
                <li><nuxt-link :to="{name:'page-slug', params:{slug:'contact-us'}}">Contact us</nuxt-link></li>
                <li><nuxt-link :to="{name:'page-slug', params:{slug:'about-us'}}">About us</nuxt-link></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row below_mobile">
          <div class="col-12">
            <div class="footer_mobile_menu">
              <ul>
                <li data-toggle="collapse_noslide" data-target="#ACCOUNT"  @click.prevent="currentOpenMenu = currentOpenMenu === 'account' ? '' : 'account'">Account</li>
                <div class="footer_mobile_menu_inner" id="ACCOUNT" :class="{'d-block':currentOpenMenu === 'account'}">
                  <ul>
                    <li><router-link :to="{name: 'user'}">My Account</router-link></li>
<!--                    <li><router-link :to="{name: 'user'}">Wishlist</router-link></li>-->
                  </ul>
                </div>
                <li data-toggle="collapse_noslide" data-target="#COMPANY" @click.prevent="currentOpenMenu = currentOpenMenu === 'company' ? '' : 'company'">Company</li>
                <div class="footer_mobile_menu_inner" id="COMPANY" :class="{'d-block':currentOpenMenu === 'company'}">
                  <ul>
                    <li><nuxt-link :to="{name:'page-slug', params:{slug:'return-policy'}}">Return Policy</nuxt-link></li>
                    <li><nuxt-link :to="{name:'page-slug', params:{slug:'size-guide'}}">Size Guide</nuxt-link></li>
                    <li><nuxt-link :to="{name:'page-slug', params:{slug:'cookies-policy'}}">Cookies Policy</nuxt-link></li>
                    <li><nuxt-link :to="{name:'page-slug', params:{slug:'terms-of-use'}}">Terms of use</nuxt-link></li>
                    <li><nuxt-link :to="{name:'page-slug', params:{slug:'privacy-policy'}}">Privacy Policy</nuxt-link></li>
                    <li><nuxt-link :to="{name:'page-slug', params:{slug:'temrs-condition'}}">Terms & Condition</nuxt-link></li>
                  </ul>
                </div>
                <li data-toggle="collapse_noslide" data-target="#Contact" @click.prevent="currentOpenMenu = currentOpenMenu === 'contact' ? '' : 'contact'">Contact</li>
                <div class="footer_mobile_menu_inner" id="Contact" :class="{'d-block':currentOpenMenu === 'contact'}">
                  <ul>
                    <li><nuxt-link :to="{name:'page-slug', params:{slug:'contact-us'}}">Contact us</nuxt-link></li>
                    <li><nuxt-link :to="{name:'page-slug', params:{slug:'about-us'}}">About us</nuxt-link></li>
                  </ul>
                </div>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="footer_bottom">
      <p>#Davidani</p>
      <ul>
        <template v-for="(socialLink , i) in socialLinks" >
          <li v-if="socialLink.type == 'facebook'" :key="'social_links' + i"><a target="_blank" :href="socialLink.url" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a></li>
          <li v-if="socialLink.type == 'instagram'" :key="'social_links' + i"><a target="_blank" :href="socialLink.url" aria-label="Instagram"><i class="fab fa-instagram"></i></a></li>
        </template>
      </ul>
      <router-link :to="'/'"><img src="/images/logo.png" alt="Wholesale women's clothing Davi & Dani"></router-link>
      <span>davidani.com © ALL RIGHTS RESERVED</span>
    </div>
  </footer>
  <!-- ============================
      END FOOTER SECTION
  ============================== -->
</template>
<script>
import {mapGetters} from "vuex";
export default {
  name: "ProductLoadPreloader",
  data(){
    return {
      currentOpenMenu: '',
      socialLinks: [],
      footerPadding: ['category-slug', 'category-slug-sub_slug'],
    }
  },
  created() {
    this.$axios.get('/social-links')
      .then((response) =>  this.socialLinks = response.data.data)
      .catch(() => {})
      .finally(()=>{
        // this.$store.commit('settingsModule/setContentLoad', false);
      })
  },
  computed: {
    ...mapGetters({
      contentLoad: 'settingsModule/getContentLoad',
    }),
  },
}
</script>
