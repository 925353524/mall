<template>
  <scroll id="cat-menu">
    <div class="cat-menu-cotent">
      <div class="cat-menu-item"
        :class="{'cat-menu-item-active': currentIndex === index}"
        v-for="(item, index) in catMenu" 
        :key="index"
        @click="catMenuClick(index)">{{item.title}}</div>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

export default {
  props: {
    catMenu:{
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  components: {
    Scroll
  },
  methods: {
    catMenuClick(index) {
      this.currentIndex = index
      this.$emit('indexChange', index)
    }
  }
}
</script>

<style>
  #cat-menu {
    overflow: hidden;
    width: 100px;
    height: 600px;
    background-color: #f6f6f6;
    box-sizing: border-box;
  }
  .cat-menu-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 17px;
  }
  .cat-menu-item-active {
    background-color: #fff;
    border-left: 4px solid var(--color-tint);
    color: var(--color-text);
  }
</style>