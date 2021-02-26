import Vue from 'vue'
import App from './App.vue'
import 'assets/css/font_hbi6h4h92h/iconfont.css'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(toast)

// 解决移动端300ms延迟问题
FastClick.attach(document.body)

// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/bcl.jpg')
})


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
