<template>
  <grid-view v-if="categoryGoods">
    <goods-list-item  v-for="(item,index) in categoryGoods" :goodsitem="item" :key="index"></goods-list-item>
  </grid-view>
</template>

<script>
import GridView from 'components/content/gridview/GridView'
import GoodsListItem from 'components/content/goods/GoodsListItem'

export default {
  props: {
    categoryGoods: {
      type: Array
    }
  },
  components: {
    GridView,
    GoodsListItem
  }
}
</script>

<style>

</style>