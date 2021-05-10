const state = {
  info: {
    id: '',
    name: '', // 品牌名称
    key: '', // 品牌key
    loginBg: '' // 品牌登录背景图
  }
}

const getters = {}

const mutations = {
  SET_DATA(state, payload) {
    state.info = payload
  },
  SET_KEY(state, payload) {
    state.info.key = payload
  }
}

const actions = {}

export default { namespaced: true, state, getters, mutations, actions }
