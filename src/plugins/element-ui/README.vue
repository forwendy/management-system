# Element-UI

## 引入
main.js
import ElementUI from '@/plugins/element-ui/config.js'
import '@/plugins/element-ui/variables.scss'
Vue.use(ElementUI)

## 按需加载 - config.js
npm install babel-plugin-component -D
babel.config.js
module.exports = {
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}


## 主题定制 - variables.scss