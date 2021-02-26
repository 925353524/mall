<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="detail-content" 
            ref="scroll" 
            :probeType="3"
            @scroll="detailScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-goods-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <good-list :goods="recommends" ref="goods"/>
    </scroll>
    <detail-bottom-bar @addCart="addCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailInfo from './childComps/DetailInfo'
import DetailParamInfo from './childComps/DetailParamInfo' 
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import GoodList from 'components/content/goods/GoodList'

import Scroll from 'components/common/scroll/Scroll'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'
import { itemListener, backTopMinin } from 'common/mixin'
import { debounce } from 'common/utils'
import { mapActions } from 'vuex'

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      getTitleYs: [],
      getPosition: null,
      currentIndex: 0
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoodsInfo,
    DetailShopInfo,
    Scroll,
    DetailInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodList
  },
  mixins: [ itemListener, backTopMinin ],
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgLinstener)
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情页数据
    getDetail(this.iid).then(res => {
      const data = res.result
      // 1.获取轮播图顶部信息
      this.topImages = data.itemInfo.topImages

      // 2.创建商品信息的对象
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 4.保存商品详情
      this.detailInfo = data.detailInfo

      // 5.商品参数
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6.评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      this.getPosition = debounce(() => {
        this.getTitleYs = []

        this.getTitleYs.push(0)
        this.getTitleYs.push(this.$refs.param.$el.offsetTop - 50)
        this.getTitleYs.push(this.$refs.comment.$el.offsetTop - 50)
        this.getTitleYs.push(this.$refs.goods.$el.offsetTop - 50)
        this.getTitleYs.push(Number.MAX_VALUE)
      },100)

    })

    // 获取推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  methods: {
    ...mapActions(['addToCart']),
    imgLoad() {
      this.$refs.scroll.refresh()
      this.getPosition()
      
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.getTitleYs[index], 200)
    },
    detailScroll(position) {
      let positionY = -position.y
      let length = this.getTitleYs.length
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex != i && (positionY >= this.getTitleYs[i] && positionY < this.getTitleYs[i+1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 判断backtop是否显示
      this.isShowBackTop = position.y < -1000
    },
    addCart() {
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 将商品信息传递到vuex
      // this.$store.dispatch('addCart', product)
      this.addToCart(product).then(res => {
        this.$toast.show(res)
      })

      // 提示信息
    }
  }
}
</script>

<style>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .detail-content {
    /* height: calc(100% - 44px); */
    /* position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>