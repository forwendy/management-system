let route = [
  {
    path: '/welcome',
    name: '欢迎使用',
    component: (resolve) => require(['@/views/common/Welcome.vue'], resolve)
  },
  {
    path: '/401',
    name: '无权访问',
    component: (resolve) => require(['@/views/common/401.vue'], resolve)
  },
  {
    path: '/404',
    name: '找不到页面',
    component: (resolve) => require(['@/views/common/404.vue'], resolve)
  }
]

export default route
