<template>
  <div id="app">
    <transition :name='transitionName'>
      <keep-alive :include="['mainPage','invest','coupon']">
        <router-view class='child-view'></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        transitionName: 'slide-left'
      }
    },
    beforeRouteUpdate(to,from,next){
      let isBack = this.$router.isBack;
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
      next();
    }
  }
</script>

<style lang="scss"> 
@import '@/assets/css/skin.scss';
#app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .child-view{
    transition: all 0.3s ease;
  }
}
</style>
