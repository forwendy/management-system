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
  },
  {
    path: '/demo',
    name: '模板-列表页',
    component: (resolve) => require(['@/views/demo/ModuleIndex.vue'], resolve)
  },
  {
    path: '/demo-detail',
    name: '模板-详情页',
    component: (resolve) => require(['@/views/demo/ModuleDetail.vue'], resolve)
  },
  {
    path: '/demo-uploader',
    name: '模板-文件上传',
    component: (resolve) => require(['@/views/demo/FormUploader.vue'], resolve)
  }
]

export default route
