import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import brand from './modules/brand'
import user from './modules/user'
import menus from './modules/menus'

if (!window.Vuex) Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 项目版本
    version: process.env.VUE_APP_VERSION,
    localKey: process.env.VUE_APP_PROJECT + '-' + process.env.VUE_APP_ENV,
    tableLoading: false
  },
  getters,
  actions,
  mutations,
  modules: {
    brand,
    user,
    menus
  }
})

export default store
