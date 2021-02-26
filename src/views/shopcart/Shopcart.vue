<template>
  <div id="shop-cart">
    <nav-bar class="nav">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <shop-cart-list/>
    <shop-cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import ShopCartList from './childComps/ShopCartList'
import ShopCartBottomBar from './childComps/ShopCartBottomBar'

import { mapGetters } from 'vuex'

export default {
  name: 'ShopCart',
  components: {
    NavBar,
    ShopCartList,
    ShopCartBottomBar
  },
  computed: {
    // 两种写法
    // ...mapGetters(['cartLength', 'cartList'])
    ...mapGetters({
      length: 'cartLength'
    })
  }
}
</script>

<style scoped>
  #shop-cart {
    height: 100vh;
    position: relative;
  }

  .nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>