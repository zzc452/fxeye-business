import cache from '../../utils/cache'
import { request } from '../../utils/request'
export default{
    namespaced: true,
    state:{
        historyDetail:{}, //历史数据
        location:{} //页面滚动条位置
    },
    getter:{
    },
    mutations: {
        set_historyDetail(state,val){
            state.historyDetail = val;
        },
        set_location(state, val) {
            state.location = val
        }
    },
    actions:{
        async get_onlineData({commit,state},query){
            let res
            let params = query
            await request('get','investDetail',params)
            .then(json =>{
                res = json.result;
            })
            return res;
        },
        async get_offlineData({commit,state},query){
            let res
            let params = query
            await request('get','investOfflineInfo',params)
            .then(json =>{
                res = json.result;
            })
            return res;
        }
    }
}