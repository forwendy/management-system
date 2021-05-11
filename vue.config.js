const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const WebpackCdnPlugin = require('webpack-cdn-plugin')
module.exports = {
  // 访问根路径
  publicPath: `/${process.env.VUE_APP_PROJECT}/`,
  // 输出文件目录
  outputDir: `${process.env.VUE_APP_PROJECT}`,
  css: {
    // 全局样式变量
    loaderOptions: {
      sass: {
        data: `@import "@/assets/css/theme.scss";`
      }
    }
  },
  chainWebpack: (config) => {
    // 使用webpack-bundle-analyzer 生成报表
    if (process.env.use_analyzer) {
      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new WebpackCdnPlugin({
          prodUrl: 'https://cdn.staticfile.org/:name/:version/:path',
          modules: [
            {
              name: 'axios',
              var: 'axios',
              path: 'axios.min.js'
            },
            {
              name: 'date-fns',
              var: 'dateFns',
              path: 'date_fns.min.js'
            },
            {
              name: 'vue',
              var: 'Vue',
              path: 'vue.runtime.min.js'
            },
            {
              name: 'vue-router',
              var: 'VueRouter',
              path: 'vue-router.min.js'
            },
            {
              name: 'vuex',
              var: 'Vuex',
              path: 'vuex.min.js'
            },
            {
              name: 'echarts',
              var: 'echarts',
              path: 'echarts.min.js'
            }
          ],
          publicPath: '/node_modules'
        })
      )
    }
  },
  lintOnSave: false
}
