import cache from '../..//utils/cache'
import { request } from '../../utils/request'
export default {
    namespaced: true,
    state: {
        user: cache.getLocal("user")?JSON.parse(cache.getLocal("user")):null
    },
    mutations: {
        upUser(state, user) {
            state.user = user;
            cache.setLocal("user", user);
        },
        logOut(state,val){
            state.user = val;
            cache.removeLocal('user')
        }
    },
}