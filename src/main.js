import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from '@/plugins/element-ui/config.js'
import '@/plugins/element-ui/variables.scss'
Vue.use(ElementUI)

Vue.config.productionTip = false

// Vue指令
import '@/assets/js/directive'
// 布局指令
import '@/assets/js/layout.js'
// 工具方法
import * as utils from '@/assets/js/utils.js'
Vue.prototype.$utils = utils
// 绑定请求方法
import axios from '@/api/index.js'
Vue.prototype.$axios = axios

// 资源地址
Vue.prototype.$res = {
  prefix: process.env.VUE_APP_QI_NIU_PRE, // 七牛云下载前缀
  upload: process.env.VUE_APP_QI_NIU_UP   // 七牛云上传地址
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
