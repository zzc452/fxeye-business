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
        async get_investDetailData({commit,state},{tradercode,dt}){
            let res
            let historyDetail
            historyDetail = state.historyDetail;
            if(historyDetail && historyDetail[tradercode]){
                res = historyDetail[tradercode]
            }else{
                let params = {
                    'tradercode':tradercode,
                    'dt':dt
                }
                await request('get','investDetail',params)
                .then(json =>{
                    res = json.result;
                    state.historyDetail[tradercode] = res;
                    historyDetail = state.historyDetail
                })
            }
            commit('set_historyDetail',historyDetail);
            return res;
        }
    }
}