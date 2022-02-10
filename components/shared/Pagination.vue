<template>
  <div class="pagination_global" v-if="paginateData">
    <nav>
      <span>Jump to #</span>
      <input type="text" @keyup.enter="changePage(Number($event.target.value))" :value="paginateData.current_page">
    </nav>
    <nav>
      <span>Page {{ paginateData.current_page }} of {{ paginateData.last_page }}</span>
      <ul class="pagination">
        <li v-if="paginateData.current_page != 1" @click="changePage(Number(paginateData.current_page) - 1)">
          <a href="Javascript:void(0)"><i class="lni lni-chevron-left"></i></a>
        </li>
        <li v-if="paginateData.current_page != paginateData.last_page" @click="changePage(Number(paginateData.current_page) + 1)">
          <a href="Javascript:void(0)"><i class="lni lni-chevron-right"></i></a>
        </li>
      </ul>
    </nav>
  </div>
</template>


<script>
export default {
  name: 'reviewPagination',
  props: {
    paginateData: {}
  },
  methods: {
    changePage(page) {
       this.$emit('changePage', page)
    }
  }
}
</script>

