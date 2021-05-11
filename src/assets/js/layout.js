import Vue from 'vue'
// 宽度自适应
Vue.directive('setWidth', {
  inserted: (el, binding, vnode) => {
    el.style.width = getWidth(el) + 'px'
    el.setAttribute('data-layout', 'width')
  }
})
// 高度自适应
Vue.directive('setHeight', {
  inserted: (el, binding, vnode) => {
    const bottom = binding.value || 0
    el.style.height = getHeight(el) - bottom + 'px'
    el.setAttribute('data-layout', 'height')
    el.setAttribute('data-layout-bottom', bottom)
  }
})
// 根据屏幕高度获取自身高度
const getHeight = (el)=>{
  const winH = window.innerHeight
  const top = el.getBoundingClientRect().top
  // 6 为滚动条宽度
  return winH - top - 6
}
// 根据屏幕宽度获取自身宽度
const getWidth = (el)=>{
  const winW = window.innerWidth
  const left = el.getBoundingClientRect().left
  // 6 为滚动条宽度
  return winW - left - 6
}
// 遍历元素 - 改变宽高
const layoutInit = ()=> {
  const array = document.querySelectorAll(`[data-layout]`)
  for (let i = 0; i < array.length; i++) {
    const el = array[i]
    const type = el.getAttribute('data-layout')
    const bottom = el.getAttribute('data-layout-bottom', bottom)
    if(type === 'width'){
      el.style.width = getWidth(el)
    }
    if(type === 'height'){
      el.style.height = getHeight(el) - bottom + 'px'
    }
  }
}
// 监听window变化
window.addEventListener('resize', layoutInit)