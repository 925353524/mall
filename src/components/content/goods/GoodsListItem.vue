<template>
  <div class="item" @click="goDetail">
    <img v-lazy="showImage" alt="" @load="imgLoad">
    <div class="item-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imgLoad() {
      this.$bus.$emit('itemImgLoad')
    },
    goDetail() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style>
  .item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .item img {
    width: 100%;
    border-radius: 5px;
  }

  .item-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .item-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .collect {
    position: relative;
  }

  .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>