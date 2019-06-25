import Vue from 'vue'
import Vuex from 'vuex'
import index_module from './index/index'
import investdetail_module from './investdetail/investdetail'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    index: index_module,
    detail:investdetail_module
  }
})
