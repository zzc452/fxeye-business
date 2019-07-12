<template>
  <div v-swiper:swiperRight="false" class="tongfangjianche content">
    <my-header title="投放检测">
      <div class="turn-back" @click="$router.go(-1)" slot="left">
        <img class="icon-back" src="../../assets/img/back_left.png">
      </div>
    </my-header>
    <div class="head">
      <my-tab v-model="active" :value="active" :tabInfo="tabNav"></my-tab>
    </div>
    <mt-tab-container swipeable v-model="active">
      <mt-tab-container-item id="top30">
        <div class="container zhong">
          <div>
            <div class="timebox">
              <span class="rilixuzhe" @click="selectCalendar">
                {{ getRiQi() }}
                <img class="icon" v-if="selectDown" src="@/assets/img/xiasanjiao.png">
                <img class="icon" v-else src="@/assets/img/xiasanjiao.png">
              </span>
              <span class="showtime">{{ getCurrDate() }}</span>
            </div>
          </div>
          <div>
            <div class="list">
              <ul>
                <li v-for="(item,index) in list" :key="index">
                  <div class="imgbox">
                    <span
                      class="huizhang"
                      v-bind:style="{ backgroundImage:'url(img/icon/top'+(index+1)+'.png)'}"
                    ></span>
                  </div>
                  <div class="title">
                    <img class="icon" :src="item&&item.Ico?item.Ico:'img/default_smallLogo.png'">
                    {{ item&&item.ChineseShortName?item.ChineseShortName:(item&&item.EnglishShortName?item.EnglishShortName:"未知") }}
                  </div>
                  <div class="quan">
                    <clicle-progres
                      :id="index"
                      :width="100"
                      :radius="8"
                      :progress="item&&item.Effect?item.Effect:0"
                      :delay="200"
                      :duration="1000"
                      barColor="#f16816"
                      backgroundColor="#e5e5e5"
                      :isAnimation="true"
                      :ShowText="item&&item.Effect?item.Effect:0"
                    ></clicle-progres>
                  </div>
                  <div class="buttonbox">
                    <router-link
                      :to="'/onlineinfo?tradercode='+(item&&item.TraderCode?item.TraderCode:'')+'&dt='+get_Date()+'&tradername='+(item&&item.ChineseShortName?item.ChineseShortName:(item&&item.EnglishShortName?item.EnglishShortName:'未知')+'&icon='+(item&&item.Ico?item.Ico:''))"
                    >
                      <span class="button">详情</span>
                    </router-link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="top20">
        <div class="offline zhong container">
          <div class="timebox">
            <span class="rilixuzhe" @click="selectCalendar">
              {{ getRiQi() }}
              <img class="icon" v-if="selectDown" src="@/assets/img/xiasanjiao.png">
              <img class="icon" v-else src="@/assets/img/xiasanjiao.png">
            </span>
            <span class="showtime">{{ getCurrDate() }}</span>
          </div>
          <div class="top20ulbox">
            <ul>
              <li v-for="(item,index) in list20" :key="'20'+index">
                <div class="item">
                  <img class="icon" :src="'img/icon/top'+(index+1)+'.png'">
                  <img class="logo" :src="item&&item.Ico?item.Ico:'img/default_smallLogo.png'">
                  <div class="traderName">
                    {{ item&&item.ChineseShortName?item.ChineseShortName:(item&&item.EnglishShortName?item.EnglishShortName:"未知") }}
                    <line-progres
                      :id="'top20'+index"
                      :width="100"
                      :progress="item&&item.people?item.people:0"
                      :delay="200"
                      
                      barColor="#f16816"
                      backgroundColor="#e5e5e5"
                      :isAnimation="false"
                      :FenMu="list20&&list20.length>0&&list20[0].people?list20[0].people:10000"
                    ></line-progres>
                  </div>
                  <router-link
                    :to="'/offlineinfo?tradercode='+item.TraderCode+'&dt='+get_Date()+'&tradername='+(item&&item.ChineseShortName?item.ChineseShortName:(item&&item.EnglishShortName?item.EnglishShortName:'未知'))+'&icon='+(item&&item.Ico?item.Ico:'')"
                  >
                    <span class="xiangqing">详情</span>
                  </router-link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

    <!-- 这是弹出部分内容 -->
    <div>
      <mt-datetime-picker
        ref="picker"
        year-format="{value}年"
        month-format="{value}月"
        type="date"
        v-model="pickerValue"
        @confirm="selectDate"
      ></mt-datetime-picker>
    </div>
    <!-- 请求提示 -->
    <my-loading :visible="loading" :reload="getData"></my-loading>
  </div>
</template>
<script>
import ClicleProgres from "./circel";
import LineProgres from "./line";
import moment from "moment";
import { request } from "../../../utils/request";
    import myTab from '@/components/myTab' 
export default {
  name:'invest',
  data() {
    return {
      color: "#f16816",
      someValue: 30,
      list: [Object],
      list20: [Object],
      pickerValue: new Date(),
      selectDown: true,
      loading: "loading",
      isSwiperRight: false,
      active: "top30",
      tabNav:[{
                    title:'线上TOP30',
                    id:'top30'
                },{
                    title:'线下TOP20',
                    id:'top20'
                }],
    };
  },
  components: {
    ClicleProgres,
    LineProgres,
    myTab
  },
  mounted() {
    //this.pickerValue=new Date();
    this.getData();
  },
  methods: {
    getCurrDate() {
      return moment().format("YYYY-MM-DD");
    },
    selectMenu(active) {
      this.active = active;
    },
    get_Date() {
      return moment(this.pickerValue).format("YYYY-MM");
    },
    getData() {
      var _this = this;
      var datastr = moment(this.pickerValue).format("YYYY-MM");
      request("get", "inversList", {
        top: 30,
        dt: datastr
      })
        .then(val => {
          if (val.succeed) {
            _this.list = val.result;
          }
          _this.loading = false;
        })
        .catch(err => {
          _this.loading = "error";
        });
      request("get", "inversList20", {
        top: 20,
        dt: datastr
      }).then(val => {
        if (val.succeed) {
          console.log(val.result);
          _this.list20 = val.result;
        }
      });
    },
    /*     loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        this.loading = false;
      }, 2500);
    }, */
    getRiQi() {
      var date = moment(this.pickerValue);
      return date.format("YYYY年MM月");
    },
    selectCalendar() {
      this.selectDown = true;
      this.$refs.picker.open();
    },
    selectDate(result) {
      this.getData();
      /* alert(JSON.stringify(result));
      alert(JSON.stringify(this.pickerValue)); */
    }
  }
};
</script>
<style lang="scss">
.tongfangjianche {
  .mint-tab-container {
    height: 100%;
    .mint-tab-container-wrap {
      height: 100%;
    }
  }
  .head {
    height: 50px;
    background-color: $backgroundColorGray;
    .text {
      font-size: 20px;
      line-height: 50px;
      text-align: center;
      span {
        &:first-child {
          margin-right: 5%;
        }
      }
    }

    .line {
      border-bottom: 2px red solid;
      position: relative;
      width: 10%;
      margin-top: -2px;
    }
    .action {
      font-weight: 600;
    }
  }
  .zhong {
    background-color: $backgroundColorWhite;
    padding: 25px 26px 75px;
    .timebox {
      zoom: 1;
      margin-bottom: 25px;
      line-height: 12px;
      &::after {
        clear: both;
        content: "";
        display: block;
        width: 0;
        height: 0;
        visibility: hidden;
      }
      $timeHeight: 14.5px;
      .showtime {
        float: right;
        font-size: 13px;
        color: $colorGray;
        margin-right: 0.07rem;
        margin-top: $timeHeight;
      }
      .rilixuzhe {
        display: inline-block;
        font-size: 13px;
        padding: $timeHeight 13px;
        border: $borderColor 1px solid;
        border-radius: 5px;
        .icon {
          width: 10px;
          margin-left: 10px;
          margin-top: 4px;
        }
      }
    }

    .list {
      $borderWidth: 1px;
      ul {
        &::after {
          clear: both;
          content: "";
          display: block;
          width: 0;
          height: 0;
          visibility: hidden;
        }
      }
      li {
        width: 33.34%;
        border: $borderWidth solid $borderColor;
        height: auto;
        margin-top: 0;
        margin-right: 0;
        margin-left: -$borderWidth;
        margin-bottom: -$borderWidth;
        padding-bottom: 0.24rem;
        float: left;
      }
      .imgbox {
        .huizhang {
          width: 0.52rem;
          height: 0.4rem;
          text-align: center;
          font-size: 12px;
          float: right;
          margin-right: 0.13rem;
          background-size: 0.52rem 0.4rem;
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
      .title {
        font-size: 10px;
        color: $colorGray1;
        text-align: center;
        .icon {
          width: 0.4rem;
          height: 0.387rem;
          margin-right: 0.16rem;
        } /* 
        .name {
          font-size: 20px;
          color: $colorGray1;
        } */
      }
      .quan {
        width: 1.33rem;
        height: 1.33rem;
        margin: 0.29rem auto 0;
        .baifenbi {
          font-size: 10px;
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
      .buttonbox {
        font-size: 10px;
        text-align: center;
        padding: 0.2rem 0;
        margin-top: 0.29rem;
        margin-bottom: 2px;
        .button {
          padding: 0.2rem 0.53rem;
          color: $colorGray;
          border: $borderColor 1px solid;
          box-shadow: 0 2px 1px $borderColor;
        }
      }
    }
    .top20ulbox {
      .item {
        font-size: 10px;
        border-bottom: 1px solid $borderColor;
        padding: 25px 0;
        .icon {
          margin-right: 0.27rem;
          width: 0.52rem;
          height: 0.4rem;
          margin-top: 0.2rem;
        }
        .logo {
          margin-right: 0.27rem;
          width: 0.8rem;
          height: 0.8rem;
        }
        .xiangqing {
          float: right;
          padding: 0.27rem 0.67rem;
          color: $colorGray;
          border: $borderColor 1px solid;
          box-shadow: 0 2px 1px $borderColor;
        }
        .traderName {
          display: inline-block;
          color: $colorGray1;
          max-width: 50%;
        }
      }
    }
  }
  .picker-slot-center:nth-child(3) {
    display: none;
  }
}
</style>
