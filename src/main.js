import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from '@/plugins/element-ui/config.js'
// 引入UI组件
import '@/plugins/element-ui/variables.scss'
Vue.use(ElementUI)
// 引入上传组件
import Uploader from '@/plugins/uploader/index.js'
Vue.use(Uploader)
// 引入UEditor
import '@/plugins/UEditor/config.js'

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
Vue.prototype.$prefix = process.env.VUE_APP_QI_NIU_PREFIX

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
