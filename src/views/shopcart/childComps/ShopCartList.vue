<template>
  <div class="cart-list">
    <scroll class="list-content" ref="scroll"> 
      <shop-cart-list-item v-for="(item, index) in cartList" 
          :key="index"
          :product="item"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import ShopCartListItem from './ShopCartListItem'

import { mapGetters } from 'vuex'

export default {
  components: {
    Scroll,
    ShopCartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>
<style>
  .cart-list {
    height: calc(100% - 44px - 49px - 35px);
  }

  .list-content {
    /* height: 100%;
    overflow: hidden; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 84px;
    left: 0;
    right: 0;
  }
</style>