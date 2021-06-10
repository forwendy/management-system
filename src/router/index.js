import Vue from 'vue'
import VueRouter from 'vue-router'
import children from '@/router/path'
if (!window.VueRouter) Vue.use(VueRouter)

let baseRoute = [
  {
    path: '/login',
    name: '登录',
    component: (resolve) => require(['@/views/common/Login.vue'], resolve)
  },
  {
    path: '/',
    name: '首页',
    component: (resolve) => require(['@/views/common/Home.vue'], resolve),
    redirect: '/welcome',
    // 业务路由
    children
  }
]

let router = new VueRouter({
  // mode: 'history',
  routes: baseRoute
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    // 匹配前往的路由不存在
    // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
    from.name ? next({ name: from.name }) : next('/404')
  } else {
    // 如果匹配到正确跳转
    next()
  }
})

// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => {
    return
  })
}
// replace
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch((err) => err)
}
export default router
