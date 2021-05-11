import Vue from 'vue'
import store from '../../store' // 引入vue数据仓库
// 功能按钮权限判断
Vue.directive('button', {
  inserted: function (el, binding, vnode) {
    // user 当前账号按钮数组
    // pass 允许显示角色数组
    const user = store.getters['user/button']
    const pass = binding.value.split(',')
    // 任意一个身份通过，即为通过
    const isPass = user.some((el) => {
      return pass.find((u) => u == el)
    })
    if (!isPass) el.parentNode.removeChild(el)
  }
})

// 滚动整体放大
Vue.directive('zoom', {
  inserted: function (el, bind, vnode) {
    const vm = vnode.context
    el.onmousewheel = zoom
    el.addEventListener('DOMMouseScroll', zoom, false) // Firefox

    function zoom(ev) {
      let scale = el.getAttribute('scale') || 1
      const deltaY = ev.wheelDelta
      const detail = ev.detail
      if (detail && detail != 0) {
        if (detail < 0) {
          scale = Number(scale) - 0.01
        } else {
          scale = Number(scale) + 0.01
        }
      }
      if (deltaY && deltaY != 0) {
        if (deltaY < 0) {
          // 缩放倍率
          scale = Number(scale) - 0.01
        } else {
          scale = Number(scale) + 0.01
        }
      }
      vm.map.scale = scale
      el.setAttribute('scale', scale)
      el.style.transform = 'scale(' + scale + ')'
      ev.preventDefault()
    }
  }
})

// 移动元素
Vue.directive('move', {
  // 指令的定义
  inserted: function(el, bind, vnode) {
    const vm = vnode.context
    el.onmousedown = function(e) {
      const disx = e.pageX - el.offsetLeft
      const disy = e.pageY - el.offsetTop
      document.onmousemove = function(e) {
        const X = e.pageX - disx
        const Y = e.pageY - disy
        // 当大缩小影响px值
        el.style.left = X + 'px'
        el.style.top = Y + 'px'
        e.preventDefault()
        e.stopPropagation()
      }
      document.onmouseup = function(e) {
        document.onmousemove = document.onmouseup = null
        e.preventDefault()
        e.stopPropagation()
      }

      e.preventDefault()
      e.stopPropagation()
    }
  },
})