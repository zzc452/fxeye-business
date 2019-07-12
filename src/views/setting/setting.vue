<template>
  <div class="setting">
    <div class="head">
      <my-header title="设置" :goBack="true"><div class="turn-back" slot="left"><img class="icon-back" src="../../assets/img/back_left.png" alt=""></div></my-header>
    </div>
    <div class="item-box xuyaochuli">
      <mt-cell title="清理缓存" is-link  @click.native="clearData"></mt-cell>
      <mt-cell title="服务协议" is-link to="/agreement"></mt-cell>
      <mt-cell title="隐私政策" is-link to="/privicy"></mt-cell>
    </div>
    <div class="item-box">
      <mt-cell title="退出登录" is-link @click.native="logout"></mt-cell>
    </div>
  </div>
</template>
<style lang="scss">
.setting {
  .head {
    height: 45px;
  }
  .xuyaochuli {
    .mint-cell {
      &:not(:first-child) {
        margin: 0 0 0 15px;
        .mint-cell-wrapper {
          padding: 0 15px 0 0;
        }
      }
      &:first-child {
        .mint-cell-wrapper {
          padding: 0 15px;
        }
      }
      &:last-child {
        border-bottom: none;
      }
    }
    border-bottom: 1px solid #e1e6eb;
  }
}
</style>
<script>
import { MessageBox } from 'mint-ui';
export default{
  methods:{
    clearData(){
      this.$toast('清除成功！')
    },
    logout(){
      MessageBox.confirm("确定执行此操作?").then(action => {
         if (action == 'confirm') {     //确认的回调
            this.$store.commit('index/logOut',null);
            this.$router.push('/mine');
          }
        }).catch(err => { 
          if (err == 'cancel') {     //取消的回调
          console.log('取消注销登陆');
        } 
      });
    }
  }
}
</script>
