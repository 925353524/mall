<template>
  <div class="bottom-bar">
    <div class="bar-item item-left">
      <div>
        <i class="icon serve"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon coll"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item item-right">
      <div class="cart" @click="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addCart() {
      this.$emit('addCart')
    }
  }
}
</script>

<style>
  .bottom-bar {
    height: 49px;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    
    display: flex;
    text-align: center;
  }
  .bar-item{
    flex: 1;
    display: flex;
  }

  .bar-item>div {
    flex: 1;
  }

  .item-left .text {
    font-size: 13px;
  }

  .item-left .icon {
    display: block;
    height: 22px;
    width: 22px;
    margin: 1px auto 1px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .item-left .serve {
    background-position: 0 -53px;
  }

  .item-left .shop {
    background-position: 0 -98px;
  }

  .item-right {
    font-size: 15px;
    color: #fff;
    line-height: 49px;
  }

  .item-right .cart{
    background-color: #ffe817;
    color: #333;
  }

  .item-right .buy {
    background-color: #f69;
  }
</style>