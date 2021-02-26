<template>
  <div class="cart-bottom">
    <div class="cart-bottom-left" @click="checkClick">
      <check-box class="bottom-check" :is-checked="isSlectAll"></check-box>
      <span>全选</span>
    </div>
    <div class="cart-bottom-center">
      合计 ￥{{totalPrice}}
    </div>
    <div class="cart-bottom-right" @click="calcClick">
      结算({{totalCount}})
    </div>
  </div>
</template>

<script>
import CheckBox from '../../../components/content/checkbox/CheckBox'

import { mapGetters } from 'vuex'

export default {
  components: {
    CheckBox
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return this.cartList.filter(item => {
        return item.isChecked
      }).reduce((preValue, item) => {
        return preValue + item.count * item.price
      }, 0).toFixed(2)
    },
    totalCount() {
      return this.cartList.filter(item => {
        return item.isChecked
      }).reduce((preValue, item) => {
        return preValue + item.count
      }, 0)
    },
    isSlectAll() {
      if (this.cartList.length === 0) {
        return false
      } else {
        return !this.cartList.find(item => !item.isChecked)
      }
    }
  },
  methods: {
    checkClick() {
      if(this.isSlectAll) {
        this.cartList.forEach(item => item.isChecked = false);
      } else {
        this.cartList.forEach(item => item.isChecked = true)
      }
    },
    calcClick() {
      if (!this.isSlectAll) {
        this.$toast.show('请选择要购买的商品')
      }
    }
  }
}
</script>

<style>
  .cart-bottom {
    display: flex;
    position: relative;
    height: 35px;
    background-color: #dbe5ec;
    align-items: center;
    line-height: 35px;
  }
  .cart-bottom-left {
    display: flex;
    width: 60px;
    margin-left: 10px;
    font-size: 13px;
    align-items: center;
  }
  .bottom-check {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 6px;
  }

  .cart-bottom-center {
    flex: 1;
    padding-left: 50px;
    font-size: 13px;
  }

  .cart-bottom-right {
    width: 100px;
    color: #fff;
    text-align: center;
    background: rgb(255, 51, 0);
  }
</style>