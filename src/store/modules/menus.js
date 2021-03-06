import { jsonToJsonTree } from '@/assets/js/utils'
import router from '@/router'

const state = {
  // 所有菜单原始数据
  arr: [
    {
      id: 'demo',
      name: 'Demo',
      path: '/demo'
    },
    {
      id: 'demo-detail',
      name: 'DemoDetail',
      path: '/demo/detail'
    },
    {
      id: 'demo-uploader',
      name: 'DemoUploader',
      path: '/demo/uploader'
    },
    {
      id: 'demo-rich-text',
      name: 'DemoRichText',
      path: '/demo/rich-text'
    },
    {
      id: 'demo-map',
      name: 'DemoMap',
      path: '/demo/map'
    },
    {
      id: 'demo-tree',
      name: 'DemoTree',
      path: '/demo/tree'
    },
    {
      id: 'demo-sort',
      name: 'DemoSort',
      path: '/demo/sort'
    }
  ],
  // tab菜单对象
  tabs: [],
  // 选中的菜单 & 当前显示的tab
  activeId: '',
  leftMenuShow: true,

  quickEnter: {
    id: 'quickEnter',
    name: '快捷入口',
    path: '/quick-enter'
  }
}

const getters = {
  // 所有菜单数据树型结构化
  tree(state) {
    let data = JSON.parse(JSON.stringify(state.arr))
    return jsonToJsonTree(data, 'id', 'pid')
  },
  // 当前选中tab
  activeTab(state) {
    return state.tabs.find((el) => el.id === state.activeId)
  }
}

const mutations = {
  SET_MENUS_DATA(state, payload) {
    state.arr = payload
  },
  // 添加Tab
  ADD_TAB(state, payload) {
    const obj = state.tabs.find((el) => el.id === payload.id)
    if (!obj) {
      state.tabs.push(payload)
    }
    state.activeId = payload.id
  },
  // 显示Tab
  SHOW_TAB(state, payload) {
    state.activeId = payload
  },
  // 移除当前tab
  REMOVE_TAB(state, id) {
    state.tabs = state.tabs.filter((obj) => obj.id !== id)
  },
  // 移除其他tab
  REMOVE_OTHER_TAB(state, id) {
    state.tabs = state.tabs.filter((obj) => obj.id == id)
  },
  // 移除全部tab
  REMOVE_ALL_TAB(state) {
    state.tabs = []
    state.activeId = ''
  },
  // 控制左侧菜单的显示隐藏
  CHANGE_LEFT_MENU(state) {
    state.leftMenuShow = !state.leftMenuShow
  }
}

const actions = {
  // 根据路由path判断tab显示
  setActiveTab({ commit, state }, path) {
    const obj = state.arr.find((el) => el.path == path)
    if (obj) commit('ADD_TAB', obj)
  },
  // 关闭tab
  closeTab({ commit, state }, id) {
    const index = state.tabs.findIndex((obj) => obj.id == id)
    const prevTab = state.tabs[index - 1]
    commit('REMOVE_TAB', id)
    if (prevTab) {
      router.replace(prevTab.view)
    } else {
      state.activeId = ''
      router.replace('/welcome')
    }
  }
}

export default { namespaced: true, state, getters, mutations, actions }
