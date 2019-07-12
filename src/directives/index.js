import Vue from 'vue'
import swiper from './swiper'
import goTop from './goTop'

// 右滑返回上一页
Vue.directive('swiper', {
    inserted: function (el, binding, vnode) {
        if (binding.value) {
            swiper(el, binding.arg, binding.value, vnode.context)
        } else {
            return ''
        }
    }
})
// 点击头部返回页面顶部
Vue.directive('goTop', {
    inserted: function (el, binding, vnode) {
        if (binding.value) {
            goTop(el, binding.arg, vnode.context)
        } else {
            return ''
        }
    }
})
// 跳转到毛点
Vue.directive('goPoint', {
    inserted: function (el, binding, vnode) {

        /*   el.onclick = goPoint(el, binding.value, vnode.context); */
        el.onclick = function () {
            console.log(document.getElementById(binding.value).offsetTop );
            document.getElementsByClassName("area-code-box")[0].scrollTop = document.getElementById(binding.value).offsetTop-75;
        }

    }
})