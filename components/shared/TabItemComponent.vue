<template>
  <div class="tab-pane fade " v-bind:class="activeClass" :id="tabId" role="tabpanel" :aria-labelledby="tabId+'-tab'">
    <slot v-show="isActive"></slot>
  </div>
</template>
<script>
export default {
  name:'tabComponent',
  props: {
    active: {
      type: Boolean,
      required: true
    },
    tabId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
  },
  data(){
    return {
      isActive: false,
    }
  },
  mounted() {
    this.isActive = this.active
  },
  computed: {
    activeClass() {
      return this.isActive === true ? ' show active' : '';
    },
    href() {
      return '#' + this.tabId;
    }
  }
}
</script>
