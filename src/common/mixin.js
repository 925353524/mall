import {debounce} from './utils'
import BackTop from 'components/content/backtop/BackTop'

export const itemListener = {
  data() {
    return {
      itemImgLinstener: null
    }
  },
  mounted() {
    // 1.监听item图片加载完成
    const newRefresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImgLinstener = () => { 
      newRefresh() 
    }
    this.$bus.$on('itemImgLoad', this.itemImgLinstener)
  }
}

export const backTopMinin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    //返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
  }
}