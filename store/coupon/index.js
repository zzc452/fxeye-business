import cache from '../../utils/cache'
import {request} from '../../utils/request'
export default{
    namespaced: true,
    state:{
        historyCouponData:[],
        couponLocation:''
    },
    mutations:{
        set_historyCouponData(state,{key,val}){
            state.historyCouponData.key = val;
        },
        set_couponLocation(state,val){
            state.couponLocation = val;
            cache.setSession('coupon_Location', val)
        }
    },
    actions:{
        async get_couponData({commit,state},params){
            let res;
            await request('get','couponList',params)
            .then(json => {
                res = json.result;
            })
            return res;
        },
        async get_couponUser({commit,state},params){
            let res;
            await request('get','couponUser',params)
            .then(json => {
                res = json.result;
            })
            return res;
        },
        get_couponLocation_cache({ commit }) {
            let data = cache.getSession('coupon_Location')
            if (data) {
                commit('set_couponLocation', data)
            } else {
                commit('set_couponLocation', 0)
            }
        },
    }
}