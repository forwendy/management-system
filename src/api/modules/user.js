import $axios from '../index.js'

// 用户登录
const login = ({ type, login_name, password, brand_id }) => {
  return new Promise(function(resolve, reject) {
    $axios.post('/account/login', {
      type,
      login_name,
      password,
      brand_id
    }).then((res) => {
      if (res.data.code == 200) {
        const data = res.data.data
        const user = {
          accountId: data.accountId,
          type: data.type,
          name: data.name,
          avatar: data.avatar,
          token: data.token,
          roles: data.roles,
          menus: data.menus,
          buttons: data.buttons
        }
        resolve(user)
      } else {
        reject(res.data.msg)
      }
    })
  })
}

export default {
  login
}
