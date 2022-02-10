<template>
  <div>
    <ul>
      <li v-if="paginateData.current_page !== 1">
        <div>
          <a href="javascript:void(0)" @click="changePage(paginateData.current_page-1)"><i class="fas fa-angle-left"></i></a>
        </div>
      </li>
      <li v-for="page in paginateData.last_page" :key="'pagination-' + page" :class="{'active' : page === paginateData.current_page }">
        <a href="javascript:void(0)" @click="changePage(page)">{{ page }}</a>
      </li>
      <li v-if="paginateData.current_page !== paginateData.last_page">
        <div>
          <a href="javascript:void(0)" @click="changePage(paginateData.current_page+1)"><i class="fas fa-angle-right"></i></a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'reviewPagination',
  props: {
    paginateData: {
      type: Object,
      required: true
    }
  },
  methods: {
    changePage(page) {
      this.$emit('paginate', page);
    }
  }
}
</script>
