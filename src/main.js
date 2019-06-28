import Vue from 'vue'
import App from './App.vue'
import router from '../router/router'
import store from '../store'

// css
import '@/assets/css/reset.css'
import '@/assets/css/global.css'
import '@/assets/css/transition.css'

// 第三方库
import MintUI,{MessageBox,Toast,Indicator} from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

// 自定义组件
import myHeader from '@/components/myHeader'
import myTitle from '@/components/myTitle'
import myLoading from '@/components/myLoading'
import myTab from '@/components/myTab'

//自定义全局指令
import '@/directives' 

// 自定义全局过滤器
import * as filters from '@/filters/index.js'
Object.keys(filters).forEach(key =>{
  Vue.filter(key,filters[key])
})

Vue.config.productionTip = false

Vue.use(MintUI)
Vue.prototype.$toast = Toast
Vue.prototype.$msgBox = MessageBox
Vue.prototype.$indicator = Indicator
Vue.use(VueAwesomeSwiper)

// 注册全局组件
Vue.component('my-header',myHeader)
Vue.component('my-title',myTitle)
Vue.component('my-loading',myLoading)
Vue.component('my-tab',myTab)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
