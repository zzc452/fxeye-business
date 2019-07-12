import cache from '../../utils/cache'
import { request } from '../../utils/request'
export default{
    namespaced: true,
    state:{
        historyStatic:{},
        userInfo:{}
    },
    mutations:{
        set_historyStatic(state,{order,res}){
            state.historyStatic[order] = res
        },
        set_userInfo(state,val){
            state.userInfo = val;
        }
    },
    actions:{
        async get_tabStatic({commit,state},query){
            let res;
            await request('get','tabStatic',query)
            .then(json=>{
                res = json.result;
            })
            return res;
        },
        async get_tabmessage({commit,state,dispatch},query){
            let res;
            let params = query
            await request('get','tabmessage',params)
            .then(json=>{
                res = json.result
            })
            return res;
        },
        async get_UserInfo({commit,state},query){
            let res;
            if(query.userId == 0){
                res = {'areaCode':null,'phone':null,'lastName':null}
            }else{
                await request('get','userInfo',query)
                .then(json=>{
                    res = json.result
                })
            }
            commit('set_userInfo', res)
            return res;
        }  
    }
}