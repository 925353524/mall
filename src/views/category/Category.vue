<template>
  <div class="categroy">
    <nav-bar class="cat-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="cat-detail">
      <category-menu :catMenu="catMenu" @indexChange="indexChange"/>
      <scroll class="cat-right">
        <div>
          <category-content :subcategory="showSubcategory"/>
          <!-- <tab-control :titles="['流行','新款','热门']" @tabclick="tabclick"/>
          <category-goods :category-goods="showCategoryGoods"/> -->
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import CategoryMenu from './childComps/CategoryMenu'
import CategoryContent from './childComps/CategoryContent'
import CategoryGoods from './childComps/CategoryGoods'

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'

import { getCategoryMenu, getCategoryDetail, getCategoryGoods } from 'network/category'


export default {
  name: 'Category',
  components: {
    Scroll,
    NavBar,
    CategoryMenu,
    CategoryContent,
    TabControl,
    CategoryGoods
  },
  data() {
    return {
      catMenu: [],
      catDetail: {},
      currentIndex: -1,
      currentType: 'pop'
    }
  },
  created() {
    this._getCategoryMenu()
    
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.catDetail[this.currentIndex].subcategories
    },
    showCategoryGoods() {
      if (this.currentIndex === -1) return []
      return this.catDetail[this.currentIndex].categoryGoods[this.currentType]
    }
  },
  methods: {
    // 网络请求相关方法
    // 分类列表数据请求
    _getCategoryMenu() {
      getCategoryMenu().then(res => {
        this.catMenu = res.data.category.list
        // 初始化每个类别的数据
        for (let i = 0; i < this.catMenu.length; i++) {
          this.catDetail[i] = {
            subcategories: {},
            categoryGoods: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        this._getCategoryDetail(0)
      })
      
    },
    // 列表内内容数据请求
    _getCategoryDetail(index) {
      this.currentIndex = index
      const maitKey = this.catMenu[index].maitKey
      getCategoryDetail(maitKey).then(res => {
        this.catDetail[index].subcategories = res.data
        this.catDetail = {...this.catDetail}
        this._getCategoryGoods('pop')
        this._getCategoryGoods('sell')
        this._getCategoryGoods('new')
      })
    },
    _getCategoryGoods(type) {
      const miniWallkey = this.catMenu[this.currentIndex].miniWallkey;
      // 发送请求,传入miniWallkey和type
      getCategoryGoods(miniWallkey, type).then(res => {
        // 将获取的数据保存下来
        this.catDetail[this.currentIndex].categoryGoods[type] = res
        this.catDetail = {...this.catDetail}
      })
    },
    // 分类列表点击
    indexChange(index) {
      this._getCategoryDetail(index)
    },
    tabclick(index) {
      switch (index) {
        case 0 :
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
    }
  },
  
}
</script>

<style scoped>
  .categroy {
    /* position: relative;
    height: 100vh; */
  }
  .cat-nav {
    background-color: var(--color-tint);
    color: white;
    box-sizing: border-box;
  }
  .cat-detail {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }
  .cat-right {
    flex: 1;
    height: 800px;
    overflow: hidden;
  }
</style>