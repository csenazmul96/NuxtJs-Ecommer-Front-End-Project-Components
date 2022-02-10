<template>
  <div>
    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item" v-for="(tab, tabIndex) in tabs" :key="'tabIndex_' + tabIndex">
        <a class="nav-link " v-bind:class="{'active' : tab.isActive}" data-toggle="tab" :href="tab.href" role="tab" aria-controls="home" aria-selected="true" @click.prevent="selectTab(tab)">{{tab.title}}</a>
      </li>
    </ul>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name:'TabComponent',
  data(){
    return {
      tabs: [],
    }
  },
  created() {
    if(process.client)
      this.tabs = this.$children
  },
  methods:{
    selectTab(selectedTab){
      this.tabs.forEach(tab => {
        tab.isActive = (tab.tabId === selectedTab.tabId);
      });
    }
  }

}
</script>
