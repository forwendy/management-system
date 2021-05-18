let route = [
  {
    path: '/demo',
    name: '模板-列表页',
    component: (resolve) => require(['@/views/demo/ModuleIndex.vue'], resolve)
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
  }
]

export default route
