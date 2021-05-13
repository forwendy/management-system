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
