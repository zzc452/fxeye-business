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

import '@/directives' 

Vue.config.productionTip = false

Vue.use(MintUI)
Vue.prototype.$toast = Toast
Vue.prototype.$msgBox = MessageBox
Vue.prototype.$indicator = Indicator
Vue.use(VueAwesomeSwiper)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
