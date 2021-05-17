import axios from 'axios'
import Uploader from './Uploader.vue'

export default {
  install(Vue, options) {
    // 默认配置
    let defaultOptions = {
      type: 1, // 0服务器 1七牛云
      prefix: process.env.VUE_APP_PREFIX, // 资源前缀
      upload: process.env.VUE_APP_UPLOAD, // 上传地址
      prefixQN: process.env.VUE_APP_QI_NIU_PREFIX, // 七牛资源前缀
      uploadQN: process.env.VUE_APP_QI_NIU_UP, // 七牛上传地址
      getTokenURL: '/portal/qiniu/getToken'
    }
    // 输入默认配置
    Vue.prototype.$uploader = defaultOptions = Object.assign({}, defaultOptions, options)
    // 获取七牛云token
    Vue.prototype.$getQNToken = () => {
      axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      axios.defaults.timeout = 10000
      return axios.get(process.env.VUE_APP_API_ROOT + defaultOptions.getTokenURL).then((res) => {
        return res.uptoken
      })
    }
    Vue.component(Uploader.name, Uploader)
  }
}
