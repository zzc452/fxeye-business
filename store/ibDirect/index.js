import cache from '../../utils/cache'
import {request} from '../../utils/request'
export default{
    namespaced: true,
    state:{
        historyIbData:{} // ib直通车数据
    },
    mutations:{
        set_ibData(state,val){
            state.historyIbData = val
            cache.setSession('historyIbData',val)
        }
    },
    actions:{
        async get_ibDirect_Data({commit,state},traderCode){
            let res;
            let historyIbData;
            historyIbData = JSON.parse(cache.getSession('historyIbData'));
            if(historyIbData && historyIbData[traderCode]){
                res = historyIbData[traderCode]
            }else{
                let params = {'traderCode':traderCode}
                await request('get','ibDirect',params)
                .then(json => {
                    res = json.result;
                    state.historyIbData[traderCode] = res;
                    historyIbData = state.historyIbData;
                })
            }
            commit('set_ibData',historyIbData);
            return res;
        }
    }
}