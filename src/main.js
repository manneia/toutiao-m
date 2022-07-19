import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
// 加载图标样式
import '@/styles/icon.less'
// 全局样式文件
import '@/styles/index.less'
// 移动端适配
import 'amfe-flexible'
// 全局引入vant组件
import '@/utils/Introduce'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
