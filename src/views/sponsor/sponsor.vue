<template>
  <div class="sponsor content">
    <div>
      <my-header title="赞助记录" :goBack="true">
        <div class="turn-back" slot="left">
          <img class="icon-back" src="@/assets/img/back_left.png" />
        </div>
      </my-header>
    </div>
    <div class="content-box">
      <div class="neck">
        <div class="select-time" @click="isShowMenu=true">{{ showTimeText }}</div>
      </div>
      <div class="container">
        <div class="list-box">
          <ul
            v-infinite-scroll="loadBottomAjax"
            infinite-scroll-disabled="bottomLock"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check="false"
            v-if="list"
          >
            <li v-for="(item, index) in list" :key="index">
              <div class="itemDiv">
                <span class="left">序号</span>
                <span class="fight">{{ index+1 }}</span>
              </div>
              <div class="itemDiv">
                <span class="left">联系方式</span>
                <span class="fight">{{ item.phone?item.phone:"--" }}</span>
              </div>
              <div class="itemDiv">
                <span class="left">姓氏</span>
                <span class="fight">{{ item.salutation?item.salutation:"--" }}</span>
              </div>

              <div class="itemDiv">
                <span class="left">订单时间</span>
                <span class="fight">{{ getShowDate(item.assigned_at,true) }}</span>
              </div>
              <div class="itemDiv">
                <span class="left">赞助商品</span>
                <span class="fight">{{ item.name?item.name:"--" }}</span>
              </div>
              <div class="itemDiv">
                <span class="left">赞助金额</span>
                <span class="fight">{{ item.price?item.price:"--" }}</span>
              </div>
            </li>
          </ul>
          <div class="bottomLoad" v-if="list.length > 0">
            <div class="loading" v-show="bottomLoading">加载中...</div>
            <div class="noData" v-if="bottomNoData">没有更多的内容了</div>
          </div>
          <!--无数据时-->
          <div class="nodata">
            <my-nodata v-show="isNodata"></my-nodata>
          </div>
        </div>
      </div>
    </div>
    <!--弹出部分-->
    <div>
      <!-- 选择时间 -->
      <mt-actionsheet :actions="actions" v-model="isShowMenu"></mt-actionsheet>
    </div>
    <!-- 请求提示 -->
    <my-loading :visible="loading" :reload="getList"></my-loading>
  </div>
</template>
<script>
import moment from "moment";
import _ from "lodash";
import { request } from "../../../utils/request";
import cache from "../../../utils/cache";
export default {
  data() {
    return {
      isShowData: false,
      isShowMenu: false,
      actions: [
        {
          name: "全部显示",
          method: this.allshow
        },
        {
          name: "最近一个月",
          method: this.yigeyue
        },
        {
          name: "最近二个月",
          method: this.lianggeyue
        },
        {
          name: "最近三个月",
          method: this.sangeyue
        }
      ],
      isNodata: false,
      index: 1,
      size: 10,
      list: [],
      showTimeText: "全部显示",
      timeDay: -1,
      loading: "loading",
      bottomLock: false,
      bottomLoading: true,
      bottomNoData: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    allshow() {
      this.showTimeText = "全部记录";
      this.timeDay = -1;
      this.index = 1;
      this.getList(true);
    },
    yigeyue() {
      this.showTimeText = "最近一个月";
      this.timeDay = 30;
      this.index = 1;
      this.getList(true);
    },
    lianggeyue() {
      this.showTimeText = "最近二个月";
      this.timeDay = 60;
      this.index = 1;
      this.getList(true);
    },
    sangeyue() {
      this.showTimeText = "最近三个月";
      this.timeDay = 90;
      this.index = 1;
      this.getList(true);
    },
    loadBottomAjax() {
      //上滑加载
      this.bottomLock = true; // 上滑开关
      this.getList();
    },
    /**
     * 格式化显示时间
     * dt需要格式化的时间
     * time 是否显示时分秒
     */
    getShowDate(dt, time) {
      if (dt) {
        if (time) {
          return moment(dt).format("YYYY-MM-DD HH:MM:SS");
        } else {
          return moment(dt).format("YYYY-MM-DD");
        }
      } else {
        return "";
      }
    },
    getList(isNow = false) {
      var _this = this;
      var dtime = moment()
        .subtract(_this.timeDay, "day")
        .format("YYYY-MM-DD");
      var jtime = moment().format("YYYY-MM-DD");
      let data = {
        size: _this.size,
        index: _this.index,
        end: jtime
      };
      if (_this.timeDay != -1) {
        data.start = dtime;
      }
      request("get", "getsponsorlist", data)
        .then(ret => {
          if (ret.succeed) {
            //选择时间时为新请求
            if (isNow) {
              if (!ret.result || ret.result.total == 0) {
                _this.list = [];
                _this.isNodata = true;
              } else {
                _this.list = ret.result.items;
                _this.isNodata = false;
              }
            } else {
              if (!ret.result || ret.result.items == 0) {
                if (_this.list.length == 0) {
                  _this.list = [];
                  _this.isNodata = true;
                } else {
                  _this.bottomLoading = false;
                  _this.bottomNoData = true;
                }
              } else {
                _this.list = _.concat(_this.list, ret.result.items);
                _this.index++;
                _this.bottomLock = false;
              }
            }
          }
          _this.loading = false;
        })
        .catch(err => {
          _this.loading = "error";
        });
    }
  }
};
</script>
<style lang="scss">
.sponsor {
  .content-box {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 50px;
    .neck {
      position: absolute;
      top: 0;
      width: 100%;
      padding: 10px 15px;
      font-size: 13px;
      background-color: $openNeckBackgroundColor;
      color: $openTextColor;
      z-index: 2;
      .select-time {
        background: url("../../assets/img/openRecord.png") no-repeat center;
        background-size: 100% auto;
        line-height: 34px;
        width: 2.7rem;
        float: left;
        padding-left: 0.16rem;
      }
      .surplus {
        float: right;
        line-height: 0.82rem;
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
    .list-box {
      padding: 0 15px;
      .itemDiv {
        line-height: 0.63rem;
        .left {
          width: 22%;
          font-size: 14px;
          color: $openTextColor;
          display: inline-block;
        }
        .fight {
          font-size: 14px;
          color: $openText;
        }
      }
      .button {
        background: url("../../assets/img/openButton.png") no-repeat center;
        background-size: 100% auto;
        line-height: 1rem;
        width: 3.2rem;
        font-size: 14px;
        text-align: center;
        color: #fff;
        margin: 20px auto 0;
      }
      li {
        padding: 20px 0 25px;
        border-bottom: 1px solid $openBorderColor;
      }
    }
  }

  .nodata {
    .no-data {
      position: absolute;
      padding-top: 30%;
    }
  }
}
</style>
