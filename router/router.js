import Vue from 'vue'
import Router from 'vue-router'

import Main from '../src/views/main/main.vue'
import Home from '../src/views/home/home.vue'
import Find from '../src/views/find/find.vue'
import Sentiment from '../src/views/sentiment/sentiment.vue' //舆情列表页
import Mine from '../src/views/mine/mine.vue'
import Invest from '../src/views/invest/invest.vue'  //投放监测列表页
import investInfo from '../src/views/investInfo/investInfo.vue'  //投放监测线上详情

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect: '/home',
      name:'main',
      component: Main,
      children:[
        {
          name:'home',
          path:'/home',
          component:Home
        },{
          name:'find',
          path:'/find',
          component:Find
        },{
          name:'sentiment',
          path:'/sentiment',
          component:Sentiment
        },{
          name:'mine',
          path:'/mine',
          component:Mine
        }
      ]
    },{
      name:'invest',
      path:'/invest',
      component:Invest
    },{
      name:'investdetail',
      path:'/investdetail',
      component:investInfo
    }
  ]
})
