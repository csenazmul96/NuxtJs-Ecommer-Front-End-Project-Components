<template>
  <div class="header_nav">
    <ul>
      <template v-for="category in categories">
        <template v-if="category.sub_categories.length">
          <li data-toggle="collapse_slide"
              :class="{active: $route.params.slug === category.slug}"
              :data-target="'#'+category.slug">
            <a href="JavaScript:void(0);">{{ capitalize(category.name) }}</a>
          </li>
          <div class="submenu" :id="category.slug">
            <div class="container">
              <div class="row">
                <div class="col-3" v-if="category.sub_categories.length">
                  <div class="submenu_list">
                    <h2 @click.prevent="closeMegaMenu(category.slug)">
                      <nuxt-link :to="{ name: 'category-slug', params: { slug: category.slug }}">
                        {{ capitalize(category.name) }}
                      </nuxt-link>
                    </h2>
                    <ul>
                      <li v-for="(sub, j) in category.sub_categories" :key="'sub_cat'+j" @click.prevent="closeMegaMenu(category.slug)">
                        <router-link :to="{ name: 'category-slug-sub_slug', params: { slug: category.slug, sub_slug: sub.slug }}">
                          {{ capitalize(sub.name) }}
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
                <template v-if="category.top_category_banners && category.top_category_banners.length">
                    <div class="col-3" v-for="(banner, l) in category.top_category_banners" :key="'banner_'+l" v-if="l < 4">
                        <div class="submenu_list with_image" @click.prevent="closeMegaMenu(category.slug)">
                            <template v-if="banner.link">
                                <nuxt-link :to="banner.link">
                                  <img :src="banner.image" alt="Wholesale women's clothing Davi & Dani" class="img-fluid">
                                </nuxt-link>
                            </template>
                            <template v-else>
                                <router-link :to="{ name: 'category-slug', params: { slug: category.slug }}" >
                                  <img :src="banner.image" alt="Wholesale women's clothing Davi & Dani" class="img-fluid">
                                </router-link>
                            </template>

                            <template v-if="banner.link">
                                <nuxt-link :to="banner.link">
                                  <h2> {{ banner.title }}</h2>
                                </nuxt-link>
                            </template>
                            <template v-else>
                                <router-link :to="{ name: 'category-slug', params: { slug: category.slug }}" >
                                  <h2> {{ banner.title }}</h2>
                                </router-link>
                            </template>

                            <p>{{ banner.description }}</p>
                        </div>
                    </div>
                </template>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <li :class="{active:$route.params.slug === category.slug}">
            <router-link :to="{ name: 'category-slug', params: { slug: category.slug }}">{{ capitalize(category.name) }}</router-link>
          </li>
        </template>
      </template>
      <li v-if="categories.length" :class="{active:$route.name === 'look-book'}">
        <router-link :to="{ name: 'look-book'}">Look Book</router-link>
      </li>
<!--      <li v-if="categories.length" :class="{active:$route.name === 'schedule'}">-->
<!--        <router-link :to="{ name: 'schedule'}">Show Schedule</router-link>-->
<!--      </li>-->

      <li v-if="categories.length" :class="{active:$route.name === 'davi-tv'}">
        <router-link v-if="$auth.loggedIn" :to="{ name: 'davi-tv'}">Davi TV</router-link>
        <router-link v-else :to="{ name: 'login'}">Davi TV</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
    }
  },
  created() {
    this.$axios.get('/categories').then((response) => this.categories = response.data.data);
  },
  methods:{
    closeMegaMenu(e){
      $("#"+e).hide()
    },
    capitalize(text){
      return text.toLowerCase()
    }
  },
}
</script>
