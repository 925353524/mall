import Vue from 'vue'
import App from './App.vue'
import 'assets/css/font_hbi6h4h92h/iconfont.css'
import router from './router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
