let route = [
  {
    path: '/demo',
    name: '模板-列表页',
    component: (resolve) => require(['@/views/demo/list/ModuleIndex.vue'], resolve)
  },
  {
    path: '/demo/tree',
    name: '模板-树形表页',
    component: (resolve) => require(['@/views/demo/tree-list/Index.vue'], resolve)
  },
  {
    path: '/demo/detail',
    name: '模板-详情页',
    component: (resolve) => require(['@/views/demo/ModuleDetail.vue'], resolve)
  },
  {
    path: '/demo/uploader',
    name: '模板-文件上传',
    component: (resolve) => require(['@/views/demo/FormUploader.vue'], resolve)
  },
  {
    path: '/demo/rich-text',
    name: '模板-富文本',
    component: (resolve) => require(['@/views/demo/FormRichText.vue'], resolve)
  },
  {
    path: '/demo/map',
    name: '模板-地图',
    component: (resolve) => require(['@/views/demo/FormMap.vue'], resolve)
  }
]

export default route
