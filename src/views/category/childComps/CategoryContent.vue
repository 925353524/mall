<template>
  <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategory.list">
    <div class="cat-item" v-for="(item, index) in subcategory.list" :key="index">
      <a :href="item.link">
        <img class="cat-item-img" :src="item.image" alt="">
        <div class="cat-item-text">{{item.title}}</div>
      </a>
    </div>
  </grid-view>
</template>

<script>
import GridView from 'components/content/gridview/GridView'

export default {
  components: {
    GridView
  },
  props: {
    subcategory: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style>
  .panel img {
    width: 100%;
  }
  .cat-item{
    text-align: center;
    font-size: 12px;
  }
  .cat-item-img {
    width: 80%;
  }
  .cat-item-text {
    margin-top: 15px;
  }
</style>