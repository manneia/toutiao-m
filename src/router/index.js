import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 路由表
const routes = [
  {
    path: '/',
    redirect: '/layout' // 默认打开首页
  },
  {
    path: '/login',
    // 命名路由
    name: 'login',
    // 当页面进行加载的时候会一次性加载所有的组件,造成首页留白时间较长
    // 访问那个路径就加载对应的组件,提升页面加载速度
    component: () => import('@/views/Login')
  },
  {
    path: '/layout',
    name: 'Layout',
    redirect: '/layout/home',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'user',
        component: () => import('@/views/User')
      },
      {
        path: 'video',
        component: () => import('@/views/Video')
      },
      {
        path: 'wenda',
        component: () => import('@/views/Wenda')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
