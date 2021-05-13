import axios from 'axios'
import router from '../router'
import store from '../store'
import { Message } from 'element-ui'

axios.defaults.baseURL = process.env.VUE_APP_API_ROOT
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
      config.headers.common['token'] = store.state.user.token
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
    if (response.status === 200) {
      if (response.data.code === 500) {
        Message.error({ message: '服务器异常' })
      }
      if (response.data.code === 408) {
        Message.error({ message: '登录超时，请重新登录。' })
        // token 不存在/失效
        router.replace({ path: '/login' })
      }
      return response.data
    } else {
      Message.error({ message: '服务器异常' })
    }
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
