<template>
  <div class="login">
    <!-- head开始 -->
    <div class="head">
      <my-header title="登录">
        <div class="turn-back" @click="$router.go(-1)" slot="left">
          <img class="icon-back" src="../../assets/img/back_left.png" />
        </div>
      </my-header>
    </div>
    <!-- head结束 -->
    <div>
      <div class="quickLogin">
        <div class="wxlogin">
          <span>微信登录</span>
        </div>
        <div class="qqlogin">
          <span>QQ登录</span>
        </div>
      </div>
      <div class="smsLogin">
        <div class="title">短信验证登录</div>
        <div class="countryandtel">
          <router-link to="/login/select">
            <span class="selectCountry">
              <img class="flag" :src="flag" />
              <span class="guojia">选择国家</span>
              <img class="xiala" src="@/assets/img/xiasanjiao.png" />
            </span>
          </router-link>
          <div class="iphone">
            <mt-field label type="tel" :attr="{ maxlength: 11 }" placeholder="请输入手机号" v-model="tel"></mt-field>
          </div>
        </div>
        <div class="codeAndButton">
          <div class="inputBox">
            <mt-field label type="tel" :attr="{ maxlength: 4 }" placeholder="请输入验证码" v-model="code"></mt-field>
          </div>
          <span class="button" :class="{okbutton:isOK&canClick}" @click="countDown">{{ content }}</span>
        </div>
        <div class="loginbutton">
          <div class="loginBt" @click="vcode">
            <span>登录</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹框开始 -->
    <div></div>
    <!-- 弹框结束 -->
  </div>
</template>
<script>
import { request } from "../../../utils/request";
import cache from "../../../utils/cache";
export default {
  data() {
    return {
      tel: "",
      code: "",
      content: "验证码", // 按钮里显示的内容
      totalTime: 60, //记录具体倒计时时间
      canClick: true, //添加canClick
      isOK: false,
      areaCode: this.$route.query.areaCode
        ? this.$route.query.areaCode
        : "0086",
      flag: this.$route.query.flag ? this.$route.query.flag : "img/cn.png",
      countryCode: this.$route.query.countryCode
        ? this.$route.query.countryCode
        : "cn"
    };
  },
  watch: {
    tel: function(newVal, oldVal) {
      var phone = newVal;
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        this.isOK = false;
      } else {
        this.isOK = true;
      }
    }
  },
  mounted() {},
  methods: {
    countDown() {
      if (!this.canClick) return; //改动的是这两行代码
      var _this = this;
      var checkResult = _this.checkPhone();
      if (checkResult != "") {
        _this.$msgBox.alert(checkResult, "提示");
        return false;
      }
      if (_this.tel.length < 11) {
        _this.$msgBox.alert("输入有误,请检查!", "提示");
        return false;
      }
      this.sendCode();
      this.canClick = false;
      this.content = this.totalTime + "s";
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.content = this.totalTime + "s";
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          this.content = "验证码";
          this.totalTime = 60;
          this.canClick = true; //这里重新开启
        }
      }, 1000);
    },
    sendCode() {
      var _this = this;
      request(
        "post",
        "loginSendCode",
        {
          areaCode: _this.areaCode,
          PhoneNumber: _this.tel,
          languageCode: "zh-CN",
          msgType: "0",
          authType: "SMS_152511968",
          smsBusinessType: 1,
          applicationType: 1
        },
        "http://192.168.1.166:9100"
        //"http://192.168.1.6:8088"
      )
        .then(ret => {
          if (ret.succeed) {
            _this.$toast("发送成功");
          }
        })
        .catch(err => {
          _this.$toast("发送失败请重新获取");
        });
    },
    //验证验证码
    vcode() {
      var _this = this;
      if (_this.code.length != 4) {
        _this.$msgBox.alert("验证码错误", "提示");
        return false;
      }
      if (_this.isOK & _this.canClick) {
        return false;
      }
      request(
        "post",
        "vcode",
        {
          areaCode: _this.areaCode,
          languageCode: "zh-CN",
          PhoneNumber: _this.tel,
          msgCode: _this.code,
          applicationType: 1
        },
        "http://192.168.1.166:9100"
      )
        .then(ret => {
          if (ret.succeed) {
            /*  ret.result = {
              IDNumber: "41**************79",
              areaCode: "0086",
              areaFlag:
                "http://img.wikifx.comhttp://img.wikifx.com/flag/7d8833382673bab2/CN.png_fxeye-template-global",
              authStatus: 2,
              avatar:
                "http://img.wikifx.com/test/avatar/3952333110/3952333110_12238.png_wiki-template-global",
              balance: null,
              certificationType: 1,
              email: "a624669980@163.com",
              gender: 1,
              identity: 600,
              ip: "148.115.226.148",
              isCertified: true,
              isDefaultAvatar: false,
              isDefaultNick: false,
              isEmailConfirmed: true,
              isLifeVip: false,
              isPhoneConfirmed: true,
              lastName: "梁",
              mdp: "bc06d6b7dff1f5a0",
              mdp32: "9c2a745cbc06d6b7dff1f5a0f2b663c4",
              nick: "dsf1df12() +  *-._!~",
              password: "49ba59abbe56e057",
              phone: "13******662",
              realName: "梁建立",
              remainViews: 0,
              roleType: 6,
              shoppingAddressCount: "2",
              spentAmount: null,
              status: 1,
              type: 112,
              userId: "3952333110",
              vipExpiredAt: null
            }; */

            var head = ret.result.avatar;
            var userId = ret.result.userId;
            //查询是否有权限登录企业版
            request("get", "loginvalidate", {
              userId: ret.result.userId,
              twoCharCode: _this.countryCode,
              areaCode: ret.result.areaCode,
              mobile: _this.tel
            })
              .then(ret => {
                if (ret.succeed) {
                  //获取企业版用户信息
                  request("get", "getuser", {
                    userId: userId
                  })
                    .then(userResult => {
                      if (userResult.succeed) {
                        // 这里查看正确的数据   然后写入缓存
                        var user = {
                          userName: userResult.result.UserName,
                          traderCode: userResult.result.TraderCode,
                          userId: userResult.result.UserId,
                          head,
                          id: userResult.result.Id
                        };
                        console.log(user);
                        _this.$store.commit("index/upUser", user);
                        cache.setSession('index_nav', 'home');
                        _this.$router.push("/home");
                      } else {
                        _this.$toast(userResult.message);
                      }
                    })
                    .catch(err => {
                      _this.$toast("获取用户信息失败,请稍后重试!");
                    });
                } else {
                  _this.$toast(ret.message);
                }
              })
              .catch(err => {
                _this.$toast("发送失败请重新获取");
              });
          } else {
            _this.$toast("验证失败,请稍后重试");
          }
        })
        .catch(err => {
          _this.$toast("验证失败,请稍后重试");
        });
    },
    checkPhone() {
      var phone = this.tel;
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        return "手机号码有误，请检查";
      } else {
        return "";
      }
    }
  }
};
</script>
<style lang="scss">
$bianju: 0.4rem;
$m50px: 25px;
.login {
  .head {
    height: 45px;
  }
  .quickLogin {
    background-color: $loginbackgroundColor;
    padding: $m50px 0;
    color: #fff;
    font-size: 18px;
    text-align: center;
    .wxlogin {
      margin: 0 0.4rem 10px;
      background: url("../../assets/img/wx.png") no-repeat center;
      background-size: 100% auto;
      line-height: 1.4rem;
    }
    .qqlogin {
      margin: 0 $bianju;
      background-image: url("../../assets/img/qq.png");
      background-size: 100%;
      background-repeat: no-repeat;
      line-height: 1.4rem;
    }
  }
  .smsLogin {
    margin: 0 $bianju;
    .title {
      margin: $m50px $bianju;
      font-size: 20px;
      color: $titleColor;
    }
    @mixin borderStyle {
      border: 1px $inputBorder solid;
      border-radius: 3px;
    }
    .countryandtel {
      /*  height: 1.4rem; */
      @include borderStyle;
      .selectCountry {
        float: left;
        font-size: 13px;
        color: $selectCountryColor;
        margin-left: 0.27rem;
        .xiala {
          margin-top: 0.55rem;
        }
        .flag {
          margin-top: 0.38rem;
          height: 0.42rem;
        }
        .guojia {
          margin: 0 0.13rem 0;
          line-height: 1.2rem;
        }
        &::after {
          clear: both;
          content: "";
          display: block;
          width: 0;
          height: 0;
          visibility: hidden;
        }
      }
      input::placeholder {
        font-size: 13px;
        color: $placeholderColor;
        line-height: 1.16rem;
      }
    }
    .codeAndButton {
      margin-top: 10px;
      &::after {
        clear: both;
        content: "";
        display: block;
        width: 0;
        height: 0;
        visibility: hidden;
      }
      .inputBox {
        width: 65%;
        @include borderStyle;
        input::placeholder {
          font-size: 13px;
          color: $placeholderColor;
        }
        float: left;
        &::after {
          clear: both;
          content: "";
          display: block;
          width: 0;
          height: 0;
          visibility: hidden;
        }
      }
      .button {
        margin-left: 5%;
        background-color: $buttonBackgroundColor;
        font-size: 13px;
        color: $buttonColor;
        padding: 0.4rem 0;
        width: 30%;
        text-align: center;
        float: right;
        border-radius: 5px;
      }
      .okbutton {
        background-color: $buttonOKBackgroundColor;
        color: #fff;
      }
    }
    .loginbutton {
      text-align: center;
      font-size: 18px;
      line-height: 1.4rem;
      margin-top: 40px;
      .loginBt {
        background-image: url("../../assets/img/loginbutton.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }
  .countryList {
    img {
      float: left;
    }
    .countryName {
      font-size: 13px;
    }
  }
}
</style>

