import Vue from 'vue'
import Vuex from 'vuex'
import index_module from './index/index'
import investdetail_module from './investdetail/index'
import feetab_module from './feeTab/index'
import ibdirect_module from './ibDirect/index'
import coupon_module from './coupon/index'
import statistics_module from './statistics/index'

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
    detail:investdetail_module,
    feetab:feetab_module,
    ibdirect:ibdirect_module,
    coupon:coupon_module,
    statistics:statistics_module,
  }
})
