<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl1"
                   class="tab-control"
                   v-show="isFixed"/>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="conScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <good-list :goods="showGoods"></good-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodList'
import Scroll from 'components/common/scroll/Scroll'

import { getHomeMultidata, getHomeGoods} from 'network/home'
import { itemListener, backTopMinin } from 'common/mixin'


export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list:[]},
        'new': {page: 0, list:[]},
        'sell': {page: 0, list:[]}
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isFixed: false,
      saveY: 0,
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$bus.$on('itemImgLoad', this.itemImgLinstener)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
    this.$bus.$off('itemImgLoad', this.itemImgLinstener)
  },
  mixins: [itemListener, backTopMinin],
  methods: {
    /* 
      事件监听相关方法
    */
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    /* 
      网络请求相关方法
    */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // 将数组加入到数据中
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 完成下拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    },
    
    conScroll(position) {
      // 1.判断backtop是否显示
      this.isShowBackTop = position.y < -1000

      // 2.决定tabControl是否吸顶
      this.isFixed = position.y < (-this.tabOffsetTop)
    },
    //加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    // 2.获取tabControl的offsetTop
    // 所有的组件中都有一个属性$el: 用于获取组件中的元素
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }
    
  }
}
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>