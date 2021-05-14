import Upload from './Upload.vue'
let uploadPlugin = {}
uploadPlugin.install = function (Vue, options) {
  // 服务器上传
  const prefix = process.env.VUE_APP_QI_NIU_PREFIX
  const uploadURL = process.env.VUE_APP_API_ROOT + '/upload'
  // 七牛云上传
  const prefixQN = process.env.VUE_APP_QI_NIU_PREFIX
  const tokenURL = process.env.VUE_APP_API_ROOT + '/qiniu/getToken'
  const uploadQNURL = process.env.VUE_APP_QI_NIU_UP
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
  Vue.component(Upload.name, Upload)
}
export default uploadPlugin