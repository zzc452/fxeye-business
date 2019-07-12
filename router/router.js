import Vue from 'vue'
import Router from 'vue-router'

import Main from '../src/views/main/main.vue'
import Home from '../src/views/home/home.vue'
import Find from '../src/views/find/find.vue'
import Sentiment from '../src/views/sentiment/sentiment.vue' //舆情列表页
import Mine from '../src/views/mine/mine.vue'
import Invest from '../src/views/invest/invest.vue'  //投放监测列表页
import onlineInfo from '../src/views/investInfo/onlineInfo.vue'  //投放监测线上详情
import offlineInfo from '../src/views/investInfo/offlineInfo.vue'  //投放监测线下详情

import view from '../src/components/view.vue'  //视图
import login from '../src/views/login/login.vue'  //登录页面
import selectCountry from "../src/views/login/selectCountry.vue";//选择国旗页面
import record from '../src/views/openRecord/record.vue'  //开户记录
import sponsor from '../src/views/sponsor/sponsor.vue' //赞助记录
import setting from '../src/views/setting/setting.vue' //设置
import agreement from '../src/views/setting/agreement.vue' //服务协议
import privacy from '../src/views/setting/privacy.vue' //隐私政策

import ibDirect from '../src/views/ibDirect/ibDirect.vue'  //ib直通车详情
import feeTab from '../src/views/feeTab/feeTab.vue'  //付费点击
import statistics from '../src/views/statistics/statistics.vue'  //数据统计
import coupon from '../src/views/coupon/coupon.vue'  //优惠券
import couponInfo from '../src/views/coupon/couponInfo.vue'  //优惠券详情
import accountInfo from '../src/views/mine/accountInfo.vue'  //账号信息
import aboutUs from '../src/views/mine/aboutUs.vue'  //关于我们
import feedBack from '../src/views/mine/feedBack.vue'  //意见反馈


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'main',
      component: Main,
      children: [
        {
          name: 'home',
          path: '/home',
          component: Home
        }, {
          name: 'find',
          path: '/find',
          component: Find
        }, {
          name: 'sentiment',
          path: '/sentiment',
          component: Sentiment
        }, {
          name: 'mine',
          path: '/mine',
          component: Mine
        }
      ]
    }, {
      name: 'invest',
      path: '/invest',
      component: Invest,
      meta:{
        requireLogin:true
      }
    }, {
      name: 'onlineinfo',
      path: '/onlineinfo',
      component: onlineInfo
    }, {
      name: 'offlineInfo',
      path: '/offlineinfo',
      component: offlineInfo
    }, {
      name: 'login',
      path: '/login',
      component: view,
      children: [
        {
          name: 'login',//选择国家页面
          path: '/',
          component: login
        },
        {
          name: 'select',//选择国家页面
          path: 'select',
          component: selectCountry
        }

      ]
    }, {
      name: 'record',
      path: '/record',
      component: record,
      meta:{
        requireLogin:true
      }
    }, {
      name: 'sponsor',
      path: '/sponsor',
      component: sponsor,
      meta:{
        requireLogin:true
      }
    }, {
      path: '/ibdirect',
      name: 'ibdirect',
      component: ibDirect,
      meta:{
        requireLogin:true
      }
    }, {
      path: '/feetab',
      name: 'feetab',
      component: feeTab,
      meta:{
        requireLogin:true
      }
    }, {
      path: '/statistics',
      name: 'statistics',
      component: statistics,
      meta:{
        requireLogin:true
      }
    }, {
      path: '/coupon',
      name: 'coupon',
      component: coupon,
      meta:{
        requireLogin:true
      }
    }, {
      path: '/couponinfo',
      name: 'couponinfo',
      component: couponInfo
    }, {
      path: '/accountinfo',
      name: 'accountinfo',
      component: accountInfo
    }, {
      path: '/aboutus',
      name: 'aboutus',
      component: aboutUs
    }, {
      path: '/feedback',
      name: 'feedback',
      component: feedBack
    }
    , {
      path: '/setting',
      name: 'setting',
      component: setting
    }, {
      path: '/agreement',
      name: 'agreement',
      component: agreement
    }, {
      path: '/privicy',
      name: 'privacy',
      component: privacy
    }
  ]
  
})
