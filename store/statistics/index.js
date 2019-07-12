import cache from '../../utils/cache'
import {request} from '../../utils/request'
export default{
    namespaced: true,
    state:{
        historyRateData:{}
    },
    mutations: {
        set_rateData(state,obj){
            state.historyRateData = obj;
        }
    },
    actions: {
        async get_rateData({commit,state},params){
            let res;
            let historyRateData;
            let key = params.tradercode +'&'+params.days; //组合唯一键值
            if(state.historyRateData[key]){
                res = state.historyRateData[key]
            }else{
                await request('get','statisticsRate',params)
                .then(json=>{
                    res = json.result;
                    state.historyRateData[key] = res
                    historyRateData = state.historyRateData
                })
                commit('set_rateData', historyRateData)
            }
            return res;
        },
        async get_contrastData({commit,state},params){
            let res;
            await request('get','contrast',params)
            .then(json=>{
                res = json.result;
            })
            return res;
        }
    }
}