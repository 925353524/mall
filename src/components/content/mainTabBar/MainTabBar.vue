<template>
  <tab-bar>
      <tab-bar-item link='/home'>
        <i slot="item-icon" class="iconfont icon-home-filling"></i>
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item link= '/category'>
        <i slot="item-icon" class="iconfont icon-modular"></i>
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item link= '/shopcart'>
        <i slot="item-icon" class="iconfont icon-gouwuche"></i>
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item link= '/profile'>
        <i slot="item-icon" class="iconfont icon-user-filling"></i>
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'
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