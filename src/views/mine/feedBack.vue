<template>
  <div v-swiper:swiperRight="true" class="feedback-page content">
    <my-header title="意见反馈" :goBack="true">
      <div class="turn-back" slot="left">
        <img class="icon-back" src="../../assets/img/back_left.png" alt />
      </div>
    </my-header>
    <div class="container">
      <div class="input-box">
        <textarea v-model="desc" placeholder="您的反馈内容..."></textarea>
        <input type="text" v-model="name" placeholder="请输入姓名" />
        <input type="text" v-model="mobile" placeholder="请输入准确的联系方式" />
      </div>
      <mt-button class="submit-btn" @click="submitData" type="primary">确定</mt-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.feedback-page {
  .container {
    background: #f5f7fa;
    padding: 0 15px;
    text-align: center;
    .input-box {
      text-align: left;
      padding: 20px 0;
      textarea {
        background: #ffffff;
        width: 100%;
        padding: 15px;
        outline: none;
        border: 1px solid #e1e6eb;
        border-radius: 4px;
        height: 5.333333rem;
        margin-bottom: 10px;
        resize: none;
        font-family: $pingmedium;
        color: #314453;
        font-size: 14px;
      }
      input {
        width: 100%;
        outline: none;
        border: 1px solid #e1e6eb;
        border-radius: 4px;
        padding: 0.546667rem 15px;
        margin-bottom: 10px;
        font-family: $pingmedium;
        color: #314453;
        font-size: 14px;
      }
    }
    .submit-btn {
      width: 3.973333rem;
      height: 1.093333rem;
      line-height: 1.093333rem;
      font-size: 16px;
      color: #fff;
    }
  }
}
</style>

<script>
import { request } from "../../../utils/request";
export default {
  data() {
    return {
      desc: "",
      name: "",
      mobile: ""
    };
  },
  methods: {
    submitData() {
      if (this.name.length < 2 || this.name.length > 4) {
        this.$toast("请输入正确的姓名");
        return false;
      } else if (this.mobile.length != 11) {
        this.$toast("请输入正确的联系方式");
        return false;
      } else if (this.desc.length < 1) {
        this.$toast("请输入您的返回");
        return false;
      }




    }
  }
};
</script>