import store from '../../store' // 引入vue数据仓库

// json 转 json树
export const jsonToJsonTree = function(list, idstr, pidstr) {
  let result = [],
    temp = {}
  for (let i = 0; i < list.length; i++) {
    temp[list[i][idstr]] = list[i] //将nodes数组转成对象类型
  }
  for (let j = 0; j < list.length; j++) {
    let tempVp = temp[list[j][pidstr]] //获取每一个子对象的父对象
    if (tempVp) {
      //判断父对象是否存在，如果不存在直接将对象放到第一层
      if (!tempVp['children']) tempVp['children'] = [] //如果父元素的nodes对象不存在，则创建数组
      tempVp['children'].push(list[j]) //将本对象压入父对象的nodes数组
    } else {
      result.push(list[j]) //将不存在父对象的对象直接放入一级目录
    }
  }
  return result
}

// 冒泡排序
// @ arr:Array
// @ key:String:排序依据字段
export const bubbleSort = function(arr, key) {
  let len = arr.length
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j][key] > arr[j + 1][key]) {
        let temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}
// 对象数组排序
export const objectArraySort = function(arr, property) {
  // 排序方法
  function compare(property) {
    //property:根据什么属性排序
    return function(a, b) {
      var value1 = a[property]
      var value2 = b[property]
      /*
       * value2 - value1; ——> 降序
       * value1 - value2; ——> 升序
       */
      return value2 - value1 //升序排序
    }
  }
  arr.sort(compare(property))
  return arr
}

// 生成随机数
export const getUUID = function() {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'

  return s.join('')
}

// 数字转时间
export const formatTime = function(t) {
  const f = String(t).split('.')
  if (f[1]) {
    return f[0] + ':30'
  } else {
    return f[0] + ':00'
  }
}

// 分组
export const groupBy = function(list, fn) {
  const groups = {}
  list.forEach(function(o) {
    const group = JSON.stringify(fn(o))
    groups[group] = groups[group] || []
    groups[group].push(o)
  })
  // return Object.keys(groups).map(function (group) {
  //     return groups[group];
  // });
  return groups
}

export const hasButton = function(val) {
  const button = store.getters['user/button']
  const pass = val.split(',')
  const isPass = button.some(function(elem, index, arr) {
    return pass.find((u) => u == elem)
  })
  return isPass
}

export const timeCalculate = function(date1, date2) {
  var date3 = date2.getTime() - date1.getTime() //时间差的毫秒数
  //计算出相差天数
  var days = Math.floor(date3 / (24 * 3600 * 1000))

  //计算出小时数
  var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000))
  //计算相差秒数
  var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000)
  if (days >= 2) {
    return '<p>' + days + '天' + hours + '小时' + '</p>'
  }
  if (days < 2 && days > 0) {
    return '<p style="color: #F34545;">' + days + '天' + hours + '小时' + '</p>'
  }
  if (days == 0) {
    if (hours < 1) {
      return '<p style="color: #F34545;">' + minutes + '分钟' + '</p>'
    } else {
      return '<p style="color: #F34545;">' + hours + '小时' + '</p>'
    }
  }
  return ''
}

// 一维数组变二维数组
export const arrTrans = function(num, arr) {
  const newArr = []
  while (arr.length > 0) {
    newArr.push(arr.splice(0, num))
  }
  return newArr
}

// 去除名称中的空格
export const replaceTrim = function(val) {
  return val.replace(/\s*/g, '')
}
// 校验中文字符
// window.btoa IE10+浏览器
export const formatChinese = function(str) {
  return str.replace(/[\u4e00-\u9fa5]/g, (match) => {
    return window.btoa(encodeURIComponent(match))
  })
}
// encodeURIComponent 转义
export const encode = (data) => {
  return window.btoa(encodeURIComponent(JSON.stringify(data)))
}
// decodeURIComponent 解码
export const decode = (data) => {
  return JSON.parse(decodeURIComponent(window.atob(data)))
}
