<template>
  <section class="static_page_section mt_20" style="min-height:60vh;">
    <div class="static_page_wrapper container" >
      <h1 class="border-bottom pb-2" v-if="staticPage">{{ staticPage.title }}</h1>
      <div v-if="this.$route.params.slug != 'contact-us' && staticPage" class="row" >
        <div class="col-md-12" v-html="staticPage.content"></div>
      </div>
      <div class="row mt_20" v-if="this.$route.params.slug === 'contact-us' && staticPage">

        <div class="col-md-4" v-html="staticPage.content"></div>
        <div class="col-md-8">
            <client-only>
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13228.127132278269!2d-118.2674105397736!3d34.01739511223846!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x66da15da6cc96a8e!2sDavi%20%26%20Dani!5e0!3m2!1sen!2sus!4v1589428002567!5m2!1sen!2sus" width="100%" height="450" allowfullscreen></iframe>
            </client-only>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "Page",
  head() {
    return {
      title: (this.staticPage ? this.staticPage.meta.title : '') + ' - Davi & Dani',
      meta: [
        {
          name: 'title',
          content: (this.staticPage ? this.staticPage.meta.title : '') + ' - Davi & Dani'
        },
        {
          name: 'description',
          content: this.staticPage ? this.staticPage.meta.description : ''
        },
        {
          property: 'og:locale',
          content: 'en_US'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:title',
          content: (this.staticPage ? this.staticPage.meta.title : '') + ' - Davi & Dani'
        },
        {
          property: 'og:description',
          content: this.staticPage ? this.staticPage.meta.description : ''
        },
        {
          property: 'og:url',
          content: 'https://davidani.com' + this.$route.fullPath
        },
        {
          property: 'og:site_name',
          content: 'Davi & Dani'
        },
        {
          property: 'og:image',
          content: this.defaultImage ? this.defaultImage : ''
        },
        {
          property: 'twitter:card',
          content: 'summary'
        },
        {
          property: 'twitter:title',
          content: (this.staticPage ? this.staticPage.meta.title : '') + ' - Davi & Dani'
        },
        {
          property: 'twitter:description',
          content: this.staticPage ? this.staticPage.meta.description : ''
        },
        {
          property: 'twitter:url',
          content: 'https://davidani.com' + this.$route.fullPath
        },
        {
          property: 'twitter:image',
          content: this.defaultImage ? this.defaultImage : ''
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://davidani.com' + this.$route.fullPath,
        }
      ],
    }
  },
  data(){
    return {
      staticPage: null,
    }
  },
  async fetch() {
    this.$store.commit('preLoaderModule/setPreloader', true);
    await this.GetStaticPage();
  },
  computed: {
    ...mapGetters({
      defaultImage: 'settingsModule/getDefaultImage',
    })
  },
  methods:{
    async GetStaticPage() {
      let pageId = null;
      let path = this.$route.params.slug;
      switch (path) {
        case 'about-us':
          pageId = 1;
          break;
        case 'contact-us':
          pageId = 2;
          break;
        case 'privacy-policy':
          pageId = 3;
          break;
        case 'return-policy':
          pageId = 4;
          break;
        case 'terms-conditions':
          pageId = 12;
          break;
        case 'cookies-policy':
          pageId = 13;
          break;
        case 'terms-of-use':
          pageId = 15;
          break;
        case 'size-guide':
          pageId = 14;
          break;
        default:
          pageId = null;
          break;
      }
      await this.$axios.get('/get/static-page/' + pageId + '/' + this.$route.params.slug)
        .then((response) => {
          this.staticPage = response.data.data
        }).catch(() => {
          this.$root.error({'statusCode': 404, 'message': 'Not Found.'})
        })
        .finally(()=>this.$store.commit('preLoaderModule/setPreloader', false))
    }
  }
}
</script>
