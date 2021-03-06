import $axios from '../index.js'

// 用户登录
const login = ({ name, password }) => {
  return $axios.post('/', {
    type,
    login_name,
    password
  }).then((res) => {
    if(res.code === 200){
      return res.data
    }else{
      return Promise.reject(res.message)
    }
  })
}

export default {
  login
}
