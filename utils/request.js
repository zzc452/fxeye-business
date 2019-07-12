// 二次封装axios方法 by jone
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$http = axios

//axios.defaults.headers.post = "application/json;charset=UTF-8";
//axios.defaults.headers.get = "application/json;charset=UTF-8";
//axios.defaults.baseURL = "http://business.wweb012.fxeyeinterface.com/app/"
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
let ajaxURL = {};
const isAppTest = true;
if (process.env.NODE_ENV == "production" && isAppTest) {
    ajaxURL = {
        investDetail: '/business/app/getonlinedetail',
        inversList: "/business/app/getonlinerank",//投放检测top30
        inversList20: "/business/app/getofflinerank",//投放检测top20
        investOnlineInfo: '/business/app/getonlinedetail', //投放监测线上详情
        investOfflineInfo: '/business/app/getofflinedetail', //投放监测线下详情


        //登录使用
        loginSendCode: "/personcenter/usercenter/sendcode",//获取验证码
        vcode: '/personcenter/usercenter/quicklogin',//验证验证码
        loginvalidate: "/business/app/loginvalidate",//
        getuser: "/business/app/getuser",//获取用户信息

        //舆情使用
        yuqinggetlist: "/lyrical/dealerInfo/articleList",//舆情列表
        yuqingtraderinfo: "/lyrical/dealerInfo/statistics",//舆情获取更新

        //首页使用
        homelist: "/lyrical/dealerInfo/newsList",
        gettrader: "/bscoupon/trader/detail",

        /* 赞助记录使用 */
        getsponsorlist: "/orderdns/order/enterprise/assigned",

        //开户信息使用
        getopenlist: '/business/app/getopenlog',//获取交易商开户记录
        getopendetail: '/business/app/getopenlogdetail',//获取交易商开户记录
        getopencount: '/business/app/getviewcount',//获取交易商开户点击次数
        openclickview: '/business/app/clickview',//点击获取数据


        investOnlineInfo: '/business/app/getonlinedetail', //投放监测线上详情
        investOfflineInfo: '/business/app/getofflinedetail', //投放监测线下详情
        tabStatic: '/statisaticsdns/statisatics/data', //点击统计
        tabmessage: '/statisaticsdns/statisatics/history', //点击信息
        userInfo: '/personcenter/usercenter/getuser', // 个人信息
        ibDirect: '/business//app/ib', // ib直通车
        couponUser: '/bscoupon/coupon/user/count/', // 获取参加优惠券活动人数
        couponList: '/scoupon/coupon/trader/list/', // 获取优惠券信息
        couponInfo: '/bscoupon/coupon/user/list/', // 获取优惠券信息
        statisticsRate:'/business/app/getweekstatistic', //覆盖率
        contrast:'/business/app/gettradercompare'  //交易商对比
    }

} else {
    axios.defaults.baseURL = "http://192.168.1.246:4556/app/";
    ajaxURL = {
        investDetail: 'getonlinedetail',
        inversList: "getonlinerank",//投放检测top30
        inversList20: "getofflinerank",//投放检测top20
        investOnlineInfo: 'getonlinedetail', //投放监测线上详情
        investOfflineInfo: 'getofflinedetail', //投放监测线下详情


        //登录使用
        loginSendCode: "/usercenter/sendcode",//获取验证码
        vcode: '/usercenter/quicklogin',//验证验证码
        loginvalidate: "loginvalidate",//
        getuser: "getuser",//获取用户信息

        //舆情使用
        yuqinggetlist: "/dealerInfo/articleList",//舆情列表
        yuqingtraderinfo: "/dealerInfo/statistics",//舆情获取更新

        //首页使用
        homelist: "/dealerInfo/newsList",
        gettrader: "/trader/detail",

        /* 赞助记录使用 */
        getsponsorlist: "http://192.168.1.171:88/order/enterprise/assigned",

        //开户信息使用
        getopenlist: 'getopenlog',//获取交易商开户记录
        getopendetail: 'getopenlogdetail',//获取交易商开户记录
        getopencount: 'getviewcount',//获取交易商开户点击次数
        openclickview: 'clickview',//点击获取数据


        investOnlineInfo: 'http://192.168.1.246:4556/app/getonlinedetail', //投放监测线上详情
        investOfflineInfo: 'http://192.168.1.246:4556/app/getofflinedetail', //投放监测线下详情
        tabStatic: 'http://192.168.1.166:8077/statisatics/data', //点击统计
        tabmessage: 'http://192.168.1.166:8077/statisatics/history', //点击信息
        userInfo: 'http://192.168.1.166:9100/usercenter/getuser', // 个人信息
        ibDirect: 'http://192.168.1.246:4556/app/ib', // ib直通车
        couponUser: 'http://192.168.1.171:85/coupon/user/count/', // 获取参加优惠券活动人数
        couponList: 'http://192.168.1.171:85/coupon/trader/list/', // 获取优惠券信息
        couponInfo: 'http://192.168.1.171:85/coupon/user/list/', // 获取优惠券信息
        statisticsRate:'http://192.168.1.246:4556/app/getweekstatistic', //覆盖率
        contrast:'http://192.168.1.246:4556/app/gettradercompare'  //交易商对比
    }
}
export let request = async (type = "POST", url = "", data = {}, baseURL, isSerialize = true) => {
    //打包时使用的环境
    if (process.env.NODE_ENV == "production") {
        type = type.toLowerCase();
        url = ajaxURL[url];
        let tempdata = data;
        if (isSerialize) {
            tempdata = qs.stringify(data);
        }
        try {
            alert("开始执行");
            await cordova.plugins.cryptoFxeye.coolMethod(
                type,
                url,
                tempdata,
                function (ret) {
                    alert(JSON.stringify(ret));
                },
                function (err) {
                    alert(JSON.stringify(err));
                }
            );
        } catch (error) {
            alert("error");
        }
        return result;
    } else {
        let result
        type = type.toUpperCase()
        url = ajaxURL[url]
        let config = {};
        if (baseURL) {
            config.baseURL = baseURL
        }
        console.log("请求数据的参数:")
        console.log(qs.stringify(data));
        if (type === 'GET') {
            config.params = data;
            await axios.get(url, config)
                .then(res => {
                    result = res.data
                })
        } else if (type === "POST") {
            let tempdata = data;
            if (isSerialize) {
                tempdata = qs.stringify(data);
            }
            await axios.post(url, tempdata, config)
                .then(res => {
                    result = res.data
                })
        }
        return result;
    }
}