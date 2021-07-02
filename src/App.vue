<template>
  <router-view />
</template>

<script>
export default {
  provide: function () {
    return {
      localStorage: this.localStorage
    }
  },
  methods: {
    // 本地数据库缓存处理
    localStorage() {
      const stateInit = JSON.parse(localStorage.getItem(this.$localKey + 'StateInit'))
      const store = JSON.parse(localStorage.getItem(this.$localKey + 'Store'))
      // console.log(stateInit.version, store.version)
      // 比对基础数据库和本地数据库版本
      // 通过则获取本地数据库
      // 不通过则更新本地数据库
      if (store && stateInit && stateInit.version == store.version) {
        // 在页面加载时读取localStorage里的状态信息
        localStorage.getItem(this.$localKey + 'Store') && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(localStorage.getItem(this.$localKey + 'Store'))))
      }
      // 在页面刷新时将vuex里的信息保存到localStorage里
      window.addEventListener('beforeunload', () => {
        localStorage.setItem(this.$localKey + 'Store', JSON.stringify(this.$store.state))
      })
      // 移动端页面刷新
      window.addEventListener('pagehide', () => {
        localStorage.setItem(this.$localKey + 'Store', JSON.stringify(this.$store.state))
      })
    }
  }
}
</script>

<style lang="scss">
@import './assets/css/base.css';
@import './assets/css/layout.scss';
@import './plugins/iconfont/iconfont.css';
</style>
