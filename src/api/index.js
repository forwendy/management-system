import axios from 'axios'
import router from '../router'
import store from '../store'
import { Notification, Message } from 'element-ui'

axios.defaults.baseURL = process.env.VUE_APP_API_ROOT + '/space-os/rest/backstage'
// 允许跨域
axios.defaults.crossDomain = true
// 让ajax携带cookie
axios.defaults.withCredentials = false
// 请求头处理
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
// 请求超时时间
axios.defaults.timeout = 30000

// request拦截器
axios.interceptors.request.use(
  (config) => {
    // 对请求参数的处理
    const data = {
      data: {}
    }

    if (store.state.user) {
      config.headers.common['token'] = 'spaceos' + store.state.user.token
    }

    if (config.method === 'get') {
      if (config.params) data.data = config.params
      config.params = data
    } else {
      if (config.data) data.data = config.data
      config.data = data
    }
    return config
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.error('Request Error:', error) // for debug
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    const data = response.config.data
    // 是否弹出错误提示
    let pass = false
    if (data) pass = JSON.parse(data).data.pass
    // console.log(data)
    // 统一处理错误数据
    if (!pass && response.data.code && response.data.code != 200) {
      if (response.data.code === 500) {
        Message.closeAll()
        Message.error({ message: '系统异常' })
        store.commit('tableLoading', false)
      } else if (response.data.code == 480) {
        Message.closeAll()
        Message.error({ message: '登录超时，请重新登录。' })
      } else {
        Notification.error({ title: '错误', message: response.data.msg })
      }
    }

    if (response.data.code == 480) {
      // token 不存在/失效
      setTimeout(() => {
        router.replace({ path: `/login/${store.state.brand.info.key}` })
      }, 1000)
    }
    return response
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.error('Response Error:', error) // for debug
    Message.closeAll()
    Message.error({ title: '错误', message: '网络异常，请刷新重试！' })
    store.commit('tableLoading', false)
    return Promise.reject(error)
  }
)

export default axios
