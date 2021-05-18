import Uploader from './Uploader.vue'

export default {
  install(Vue, options) {
    // 默认配置
    let defaultOptions = {
      type: 0, // 0服务器 1七牛云
      prefix: process.env.VUE_APP_PREFIX, // 资源前缀
      prefixQN: process.env.VUE_APP_QI_NIU_PREFIX, // 七牛资源前缀
      
      upload: process.env.VUE_APP_UPLOAD, // 上传地址
      uploadQN: process.env.VUE_APP_QI_NIU_UP, // 七牛上传地址
      getTokenURL: process.env.VUE_APP_API_ROOT + '/portal/qiniu/getToken'
    }
    // 输入默认配置
    Vue.prototype.$uploader = defaultOptions = Object.assign({}, defaultOptions, options)
    Vue.component(Uploader.name, Uploader)
  }
}
