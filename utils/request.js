// 二次封装axios方法 by jone
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$http = axios
axios.defaults.baseURL = "http://192.168.1.246:4556/app/"
const ajaxURL = {
    investDetail:'getonlinedetail',
    inversList:"getonlinerank",//投放检测top30
    inversList20:"getofflinerank",//投放检测top20
    investOnlineInfo:'getonlinedetail', //投放监测线上详情
    investOfflineInfo:'getofflinedetail' //投放监测线下详情
}

export let request = async (type = "POST", url = "", data = {}) => {
    let result
    type = type.toUpperCase()
    url = ajaxURL[url]
    if (type === 'GET') {
        await axios.get(url, { params: data })
            .then(res => {
                result = res.data
            })
    } else if (type === "POST") {
        await axios.post(url, qs.stringify(data))
            .then(res => {
                result = res.data
            })
    }
    return result;
}