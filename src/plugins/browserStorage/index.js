const localKey = process.env.VUE_APP_PROJECT + '-' + process.env.VUE_APP_ENV
const stateInit = JSON.parse(localStorage.getItem(localKey + 'StateInit'))
const store = JSON.parse(localStorage.getItem(localKey + 'Store'))
// 存储基础数据库
localStorage.setItem(localKey + 'StateInit', JSON.stringify(store.state))
/**
 * 比对基础数据库和本地数据库版本
 * 存在本地数据库版本
 * 且版本相同则
 */

if (store && stateInit.version == store.version) {
  // 在页面加载时读取localStorage里的状态信息
  localStorage.getItem(localKey + 'Store') && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(localStorage.getItem(localKey + 'Store'))))
}
// 在页面刷新时将vuexState信息保存到localStorage里
window.addEventListener('beforeunload', () => {
  localStorage.setItem(localKey + 'Store', JSON.stringify(this.$store.state))
})
// 移动端页面刷新
window.addEventListener('pagehide', () => {
  localStorage.setItem(localKey + 'Store', JSON.stringify(this.$store.state))
})
