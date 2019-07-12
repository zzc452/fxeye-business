<template>
  <div class="open-record content">
    <div>
      <my-header title="开户记录" :goBack="true">
        <div class="turn-back" slot="left">
          <img class="icon-back" src="@/assets/img/back_left.png" />
        </div>
      </my-header>
    </div>
    <div class="content-box">
      <div class="neck">
        <div class="select-time" @click="isShowMenu=true">{{ showTimeText }}</div>
        <span class="surplus">
          剩余次数:
          <span class="num">{{ count }}</span>
        </span>
      </div>
      <div class="container">
        <div class="list-box">
          <ul
            v-infinite-scroll="loadBottomAjax"
            infinite-scroll-disabled="bottomLock"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check="false"
          >
            <li v-for="(item, index) in list" :key="index">
              <div class="itemDiv">
                <span class="left">序号</span>
                <span class="fight">{{ index+1 }}</span>
              </div>
              <div class="itemDiv">
                <span class="left">电话</span>
                <span class="fight">{{ item.PhoneNumber?item.PhoneNumber:"--" }}</span>
              </div>
              <div class="itemDiv">
                <span class="left">归属地</span>
                <span class="fight">{{ item.Location?item.Location:"--" }}</span>
              </div>
              <div class="itemDiv">
                <span class="left">来源</span>
                <span
                  class="fight"
                >{{ item.Source&&item.Source==2?"APP":(item.Source==1?"PC":"未知") }}</span>
              </div>
              <div class="itemDiv">
                <span class="left">开户时间</span>
                <span class="fight">{{ getShowDate(item.CreateTime,true) }}</span>
              </div>
              <div
                class="button"
                :style="{ background:(item.isview>0?'url(img/openButton.png) no-repeat center':'url(img/openButtonFail.png) no-repeat center'),    backgroundSize: '100% auto'  }"
                @click="getDetail(item.Id,item.isview,index)"
              >{{ item.isview>0?"查 看":"获取数据" }}</div>
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
      <!--详细信息-->
      <mt-popup v-model="isShowData" position="bottom">
        <div class="showData" v-if="currModel">
          <div class="title">开户信息详情</div>
          <div class="oneLine">
            <span class="left">电话</span>
            <span class="fight">
              {{ currModel.PhoneNumber?currModel.PhoneNumber:'--' }}
              <span
                class="yirenzheng"
                v-if="currModel.PhoneNumber"
              >已认证</span>
            </span>
          </div>
          <div class="oneLine">
            <span class="left">归属地</span>
            <span class="fight">{{ currModel.Location?currModel.Location:'--' }}</span>
          </div>
          <div class="oneLine">
            <span class="left">来源</span>
            <span
              class="fight"
            >{{ currModel.Source&&currModel.Source==2?"APP":(currModel.Source==1?"PC":"未知") }}</span>
          </div>
          <div class="oneLine">
            <span class="left">时间</span>
            <span class="fight">{{ getShowDate(currModel.CreateTime,true) }}</span>
          </div>
          <div class="oneLine">
            <span class="left">姓名</span>
            <span class="fight">
              {{ currModel.UserName?currModel.UserName:"--" }}
              <span
                class="yirenzheng"
                v-if="currModel.IdCard"
              >已认证</span>
            </span>
          </div>
          <div class="oneLine">
            <span class="left">性别</span>
            <span class="fight">{{ currModel.Sex==2?"女":"男" }}</span>
          </div>
          <div class="oneLine">
            <span class="left">身份证号</span>
            <span class="fight">{{ currModel.IdCard?currModel.IdCard:"--" }}</span>
          </div>
          <div class="oneLine">
            <span class="left">邮箱</span>
            <span class="fight">{{ currModel.Email?currModel.Email:"--" }}</span>
          </div>
          <div class="oneLine">
            <span class="left" style="float: left;">地址</span>
            <span class="fight" style="float:right;">{{ currModel.Address?currModel.Address:"--" }}</span>
          </div>
        </div>
        <div class="showButton" @click="isShowData=false">确定</div>
      </mt-popup>
      <!-- 选择时间 -->
      <mt-actionsheet :actions="actions" v-model="isShowMenu"></mt-actionsheet>
    </div>
    <!-- 请求提示 -->
    <my-loading :visible="loading" :reload="getList"></my-loading>
  </div>
</template>
<script>
import { request } from "../../../utils/request";
import cache from "../../../utils/cache";
import moment from "moment";
import qs from "qs";
import _ from "lodash";
export default {
  data() {
    return {
      isShowData: false,
      isShowMenu: false,
      isNodata: false,
      actions: [
        {
          name: "最近一个月",
          method: this.yigeyue
        },
        {
          name: "最近半个月",
          method: this.bangeyue
        },
        {
          name: "最近一周",
          method: this.yizou
        },
        {
          name: "最近一天",
          method: this.yitian
        }
      ],
      showTimeText: "最近一个月",
      timeDay: 30, //要减去的天数
      size: 10, //每页数量
      index: 1, //当前页面
      list: [],
      currModel: null,
      count: 0, //剩余次数,
      traderCode: "",
      loading: "loading",
      userId: "",
      bottomLock: false,
      bottomLoading: true,
      bottomNoData: false
    };
  },
  mounted() {
    var user = (this.traderCode = this.$store.state.index.user
      ? this.$store.state.index.user
      : JSON.parse(cache.getLocal("user")));
    if (!user) {
      this.$router.push("/login");
      return false;
    } else {
      this.traderCode = user.traderCode;
    }
    this.getCount();
    this.getList();
    var user = JSON.parse(cache.getLocal("user"));
    if (user.id) {
      this.userId = user.id;
    }
  },
  methods: {
    yigeyue() {
      this.showTimeText = "最近一个月";
      this.timeDay = 30;
      this.index = 1;
      this.getList(true);
    },
    bangeyue() {
      this.showTimeText = "最近半个月";
      this.timeDay = 15;
      this.index = 1;
      this.getList(true);
    },
    yizou() {
      this.showTimeText = "最近一周";
      this.timeDay = 7;
      this.index = 1;
      this.getList(true);
    },
    yitian() {
      this.showTimeText = "最近一天";
      this.timeDay = 1;
      this.index = 1;
      this.getList(true);
    },
    loadBottomAjax() {
      //上滑加载
      this.bottomLock = true; // 上滑开关
      this.getList();
    },
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
    /**
     * 查看开户详情
     * id:标识
     * isView为后台返回的是否已为查看
     */
    getDetail(id, isView, index) {
      var _this = this;
      //已查看
      if (isView == 1) {
        request("get", "getopendetail", {
          id: id
        })
          .then(ret => {
            if (ret.succeed) {
              _this.currModel = ret.result[0];
              _this.isShowData = true;
              _this.list[index].isview = _this.list[index].isview + 1;
            }
          })
          .catch(err => {
            _this.$toast(err.message);
          });
      } else {
        //获取数据
        if (_this.count <= 0) {
          _this.$msgBox.alert("无剩余次数", "提示");
          return false;
        }
        request("get", "openclickview", {
          openId: id,
          traderCode: _this.traderCode,
          whiteListId: _this.userId //用户标识
        })
          .then(ret => {
            if (ret.succeed) {
              _this.count = ret.result;
              _this.getDetail(id, true, index);
            }
          })
          .catch(err => {
            _this.$toast("发送失败请重新获取");
          });
      }
    },
    /**
    获取列表数据
    isNow  是否需要拼接list
    */
    getList(isNow = false) {
      var _this = this;
      var dtime = moment()
        .subtract(_this.timeDay, "day")
        .format("YYYY-MM-DD");
      request("get", "getopenlist", {
        pageSize: _this.size,
        pageNo: _this.index,
        traderCode: _this.traderCode,
        dt: dtime
      })
        .then(ret => {
          if (ret.succeed) {
            //选择时间时为新请求
            if (isNow) {
              if (!ret.result || ret.result.length == 0) {
                _this.list = [];
                _this.isNodata = true;
              } else {
                _this.list = ret.result;
                _this.isNodata = false;
              }
            } else {
              if (!ret.result || ret.result.length == 0) {
                if (_this.list.length == 0) {
                  _this.list = [];
                  _this.isNodata = true;
                } else {
                  _this.bottomLoading = false;
                  _this.bottomNoData = true;
                }
              } else {
                _this.list = _.concat(_this.list, ret.result);
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
    },
    getCount() {
      var _this = this;
      request("get", "getopencount", {
        traderCode: _this.traderCode
      })
        .then(ret => {
          if (ret.succeed) {
            _this.count = ret.result;
          }
        })
        .catch(err => {
          _this.$toast("发送失败请重新获取");
        });
    }
  }
};
</script>
<style lang="scss">
.open-record {
  .content-box {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 50px;
    .neck {
      background-color: $openNeckBackgroundColor;
      color: $openTextColor;
      position: absolute;
      top: 0;
      width: 100%;
      padding: 10px 15px;
      font-size: 13px;
      z-index: 2;

      .select-time {
        background: url("../../assets/img/openRecord.png") no-repeat center;
        background-size: 100% auto;
        line-height: 0.82rem;
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
  .showData {
    width: 100vw;
    padding: 25px 15px 0;
    .title {
      font-size: 16px;
      text-align: center;
      color: $openText;
      margin-bottom: 10px;
    }
    .oneLine {
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
        width: 78%;
        display: inline-block;
        .yirenzheng {
          color: $openButtonText;
          margin-left: 0.27rem;
          padding: 0 2px;
          border: 1px solid $openButtonText;
          border-radius: 3px;
        }
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
  }
  .showButton {
    font-size: 18px;
    color: #fff;
    text-align: center;
    width: 100%;
    padding: 0.43rem 0;
    background-color: $openButtonColor;
    margin-top: 0.5rem;
  }
  .nodata {
    .no-data {
      position: absolute;
      padding-top: 30%;
    }
  }
}
</style>
