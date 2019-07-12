<template>
  <div class="userConter">
    <div class="head">
      <img :src="head?head:'img/default_head.png'" class="headImg" />
      <span class="loginButton" v-if="userName">{{ userName }}</span>
      <router-link to="/login" v-else>
        <span class="loginButton">点击登录</span>
        <img class="toRight" src="@/assets/img/back_right.png" />
      </router-link>
    </div>
    <div>
      <div class="item-box itemList">
        <mt-cell title="账号信息" :to="{name:'accountinfo'}" is-link></mt-cell>
        <mt-cell title="关于我们" :to="{name:'aboutus'}" is-link></mt-cell>
        <mt-cell title="意见反馈" :to="{name:'feedback'}" is-link></mt-cell>
      </div>
      <div class="item-box">
        <mt-cell title="设置" to="/setting" is-link></mt-cell>
      </div>
    </div>
  </div>
</template>
<script>
import cache from "../../../utils/cache";
export default {
  computed:{
    userName(){
      if(this.$store.state.index.user){
        return this.$store.state.index.user.userName;
      }else{
        return null
      }
    },
    head(){
      if(this.$store.state.index.user){
        return this.$store.state.index.user.head;
      }else{
        return null
      }
    }
  }
  
};
</script>
<style lang="scss">
.userConter {
  height: 100%;
  background-color: $backgroundColor;
  .itemList {
    border-bottom: 1px solid #e1e6eb;
    border-top: 1px solid #e1e6eb;
    margin-top: 10px;
    /* padding: 0 10px; */
    padding: 0 10px;
    .mint-cell {
      &:last-child {
        border-bottom: none;
      }
      &:first-child {
        border-top: none;
      }
    }
  }
  .item-box {
    background-color: #fff;
  }

  .head {
    background-color: #fff;
    padding: 25px 10px;
    .headImg {
      width: 2rem;
      border-radius: 1rem;
      border: $imgBorderColor 1px solid;
      margin-right: 0.43rem;
    }
    .loginButton {
      font-size: 25px;
      line-height: 2rem;
      color: $loginTextColor;
    }
    .toRight {
      margin-top: 0.8rem;
      width: 0.21rem;
      height: 0.35rem;
      margin-left: 0.27rem;
    }
  }
}
</style>
