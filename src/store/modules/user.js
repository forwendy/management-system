import api from '@/api/modules/user.js'
const state = {
  // 用户信息
  accountId: '', // 用户id
  name: '冯雯', // 用户名
  avatar: '/1607931791141/08f7f9e6be4d10a2409240e64d987d2278a542d418d6-VlQ7qM_fw658.jpg', // 头像
  token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZWZjNWI4Ny1iMDFhLTRmMGYtOThmZC02ZmY5MWNiZjk4ZGUiLCJjcmVhdGVkIjoxNjIwNzE3NjY0OTMwLCJleHAiOjE2MjEzMjI0NjR9.Agfc4badumZ2FI5Y9FrHXkm9_idWFM6kBlepd18S7x9FNcA3cp7dUw_ECrfZgBLuShw_QTCIDpMFnH8MEC-Gtg',
  // 权限信息
  menus: [], // 菜单权限
  buttons: [{perms:'add'}], // 按钮权限
  // 员工信息
  employee: {
    employeeId: '', // 员工id
    employeeName: '', // 员工姓名
    companyId: '', // 运营公司id
    deptId: '' // 部门id
  }
}

const getters = {
  button(state) {
    return state.buttons.map((el) => {
      return el.perms
    })
  }
}

const mutations = {
  // 用户信息
  SET_USER_INFO(state, payload) {
    state.accountId = payload.accountId
    state.name = payload.name
    state.avatar = payload.avatar
    state.token = payload.token
  },
  // 权限信息
  SET_RIGHT_INFO(state, payload) {
    state.menus = payload.menus || []
    state.buttons = payload.buttons || []
  },
  // 员工信息
  SET_EMPLOYEE_INFO(state, payload) {
    state.employee = payload
  }
}

const actions = {
  login({ commit }, params) {
    return api
      .login(params)
      .then((user) => {
        // 用户信息
        commit('SET_USER_INFO', user)
        // 权限信息
        commit('SET_RIGHT_INFO', user)
        // 员工信息
        commit('SET_EMPLOYEE_INFO', user.employee)
        // 设置菜单数据
        commit('menus/SET_MENUS_DATA', user.menus, { root: true })
        return true
      })
      .catch((error) => {
        console.error('登录失败: ' + error)
        return false
      })
  }
}

export default { namespaced: true, state, getters, mutations, actions }
