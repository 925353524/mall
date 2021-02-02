<template>
  <tab-bar>
      <tab-bar-item link='/home' activeColor="blue">
        <i slot="item-icon" class="iconfont icon-home-filling"></i>
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item link= '/category' activeColor="blue">
        <i slot="item-icon" class="iconfont icon-modular"></i>
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item link= '/shopcart' activeColor="blue">
        <i slot="item-icon" class="iconfont icon-gouwuche"></i>
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item link= '/profile' activeColor="blue">
        <i slot="item-icon" class="iconfont icon-user-filling"></i>
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from 'components/tabbar/TabBar'
import TabBarItem from 'components/tabbar/TabBarItem'
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>