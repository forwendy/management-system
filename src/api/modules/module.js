import $axios from '../index.js'

// 用户登录
const getPage = (query) => {
  return $axios.post('/', query).then((res) => {
    if(res.code === 200){
      return res.data
    }else{
      return Promise.reject(res.message)
    }
  })
}

export default {
  getPage
}
