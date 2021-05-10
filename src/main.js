import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from '@/plugins/element-ui/config.js'
import '@/plugins/element-ui/variables.scss'
Vue.use(ElementUI)

Vue.config.productionTip = false

// 引入默认图片
import avatar from './assets/imgs/avator_img_default.png'
import defaultImg from './assets/imgs/default_img.png'
// 默认头像
Vue.prototype.$avatar = `this.src="${avatar}"`
// 默认占位图
Vue.prototype.$errorImg = `this.src="${defaultImg}"`
// 资源地址
Vue.prototype.$res = {
  prefix: process.env.VUE_APP_QI_NIU_PRE, // 七牛云下载前缀
  upload: process.env.VUE_APP_QI_NIU_UP   // 七牛云上传地址
}
// 本地储存key
Vue.prototype.$localKey = process.env.VUE_APP_PROJECT + '-' + process.env.VUE_APP_ENV

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
