<template>
  <div class="tab-bar-item" @click="itemClick">
    <div :style="activeStyle"><slot name="item-icon"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    
    <!-- <i class="iconfont icon-home-filling"></i>
    <div>首页</div> -->
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    link: String,
    activeColor: {
      type: String,
      default: 'plum'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.link) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.link)
    }
  }
}
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .iconfont {
    margin-top: 2px;
    font-size: 27px;
    display: block;
    margin-bottom: -4px;
  }
  /* .active {
    color: plum;
  } */
</style>