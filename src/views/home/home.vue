<template>
  <div class="home content" style="padding-top:94px;">
    <div class="head">
      <img class="logo" src="@/assets/img/logo.png" />
    </div>
    <div class="language">
      <img src="@/assets/img/cn.png" class="flag" />
      <span>简体中文</span>
      <img src="@/assets/img/back_right.png" class="toRight" />
    </div>
    <div class="menu">
      <home-tab v-model="active" :tabInfo="tabNav"></home-tab>
    </div>
    <mt-tab-container style="height:100%;" :swipeable="true" v-model="active">
      <mt-tab-container-item id="jys" style="height:100%;">
        <div class="list container">
          <home-item
            :list="jys.list"
            v-infinite-scroll="loadBottomAjax"
            infinite-scroll-disabled="bottomLock"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check="false"
            :isNodata="jys.isNodata"
            :noright="jys.noright"
            :bottomNoData="jys.bottomNoData"
          ></home-item>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="hyzx">
        <div class="list container">
          <home-item
            v-infinite-scroll="loadHyzxAjax"
            infinite-scroll-disabled="hybottomLock"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check="false"
            :list="hyzx.list"
            :isNodata="hyzx.isNodata"
            :noright="hyzx.noright"
            :bottomNoData="hyzx.bottomNoData"
          ></home-item>
        </div>
      </mt-tab-container-item>

      <mt-tab-container-item id="jgzx">
        <div class="list container">
          <home-item
            v-infinite-scroll="loadJgzxAjax"
            infinite-scroll-disabled="jgbottomLock"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check="false"
            :list="jgzx.list"
            :isNodata="jgzx.isNodata"
            :bottomNoData="jgzx.bottomNoData"
            :noright="jgzx.noright"
          ></home-item>
        </div>
      </mt-tab-container-item>

      <mt-tab-container-item id="gazx">
        <div class="list container">
          <home-item
            v-infinite-scroll="loadGazxAjax"
            infinite-scroll-disabled="bottomLock"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check="false"
            :list="gazx.list"
            :isNodata="gazx.isNodata"
            :noright="gazx.noright"
            :bottomNoData="gazx.bottomNoData"
          ></home-item>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import HomeTab from "./com/tab";
import HomeItem from "./com/item";
import { request } from "../../../utils/request";
import qs from "qs";
import moment from "moment";
import cache from "../../../utils/cache";
export default {
  components: {
    HomeTab,
    HomeItem
  },
  data() {
    return {
      active: "jys",
      tabNav: [
        {
          title: "行业资讯",
          id: "hyzx",
          logo: ""
        },
        {
          title: "监管资讯",
          id: "jgzx",
          logo: ""
        },
        {
          title: "公安资讯",
          id: "gazx",
          logo: ""
        }
      ],
      jys: {
        list: [],
        bottomLoading: true,
        bottomNoData: false,
        isNodata: false,
        noright: false,
        index: 1
      },
      hyzx: {
        list: [],
        bottomLoading: true,
        bottomNoData: false,
        isNodata: false,
        noright: false,
        index: 1
      },
      jgzx: {
        list: [],
        bottomLoading: true,
        bottomNoData: false,
        isNodata: false,
        noright: false,
        index: 1
      },
      gazx: {
        list: [],
        bottomLoading: true,
        bottomNoData: false,
        isNodata: false,
        noright: false,
        index: 1
      },
      bottomLock: false,
      hybottomLock: false,
      jgbottomLock: false,
      gabottomLock: false,
      size: 10,
      traderCode: ""
    };
  },
  created() {
    //获取交易商code
    var user = this.$store.state.index.user
      ? this.$store.state.index.user
      : JSON.parse(cache.getLocal("user"));
    if (!user) {
      this.action = "hyzx";
    } else {
      this.traderCode = user.traderCode;
      this.getTraderDetail();
    }
  },
  mounted() {
    this.getList(1, this.hyzx.index);
    this.getList(2, this.jgzx.index);
    this.getList(3, this.gazx.index);
    if (this.traderCode) this.gettraderList();
    /*  alert("kszx");
    try {
      alert("ks");
      cordova.plugins.cryptoFxeye.coolMethod(
        "get",
        "/business/app/getopenlog",
        qs.stringify({
          pageSize: 30,
          pageNo: 1,
          traderCode: "0361522841",
          dt: "2019-06-01"
        }),
        function(ret) {
          alert(JSON.stringify(ret));
        },
        function(err) {
          alert(JSON.stringify(err));
        }
      );
    } catch (error) {
      alert("error");
    } */
    //this.gethyzylist();
  },
  methods: {
    loadBottomAjax() {
      if (this.active == "jys") {
        this.bottomLock = true; // 上滑开关
        this.gettraderList();
      } else {
        return false;
      }
    },
    loadHyzxAjax() {
      if (this.active == "hyzx") {
        this.hybottomLock = true; // 上滑开关
        this.getList(1, this.hyzx.index);
      } else {
        return false;
      }
    },
    loadJgzxAjax() {
      if (this.active == "jgzx") {
        this.jgbottomLock = true; // 上滑开关
        this.getList(2, this.jgzx.index);
      } else {
        return false;
      }
    },
    loadGazxAjax() {
      if (this.active == "gazx") {
        this.gabottomLock = true; // 上滑开关
        this.getList(3, this.gazx.index);
      } else {
        return false;
      }
    },
    /**
     * 如果登录获取交易商名称和ico
     */
    getTraderDetail() {
      var _this = this;
      request(
        "get",
        "gettrader",
        {
          code: _this.traderCode
        },
        "http://192.168.1.171:85"
      )
        .then(trader => {
          if (trader.succeed) {
            _this.tabNav.unshift({
              title: trader.result.chineseName
                ? trader.result.chineseName
                : trader.result.englishName,
              id: "jys",
              logo: trader.result.ico
                ? trader.result.ico
                : "img/default_smallLogo.png"
            });
          } else {
            _this.active = "hyzx";
          }
        })
        .catch(err => {
          _this.active = "hyzx";
        });
    },
    getList(type, pageIndex) {
      let _this = this;
      request(
        "post",
        "homelist",
        {
          newsType: type, //1-监管资讯 2-公安资讯 3-行业资讯
          page: pageIndex, //page 页数,默认每页20条
          pageSize: _this.size,
          deviceType: "app"
        },
        "http://192.168.1.157:7654",
        false
      ).then(val => {
        if (val.ErrorCode == 200) {
          //分页的情况下需要追加
          if (val.Data && val.Data.news.length > 0) {
            if (type == 1) {
              _this.hyzx.index++;
              _this.hyzx.list = _.concat(_this.hyzx.list, val.Data.news);
              _this.hybottomLock = false;
            } else if (type == 2) {
              _this.jgzx.index++;
              _this.jgzx.list = _.concat(_this.jgzx.list, val.Data.news);
              _this.jgbottomLock = false;
            } else if (type == 3) {
              _this.gazx.index++;
              _this.gazx.list = _.concat(_this.gazx.list, val.Data.news);
              _this.gabottomLock = false;
            }
          } else {
            if (type == 1) {
              if (_this.hyzx.list.lenght == 0) {
                _this.hyzx.isNodata = true;
              } else {
                _this.hyzx.bottomLoading = false;
                _this.hyzx.bottomNoData = true;
              }
            } else if (type == 2) {
              if (_this.jgzx.list.lenght == 0) {
                _this.jgzx.isNodata = true;
              } else {
                _this.jgzx.bottomLoading = false;
                _this.jgzx.bottomNoData = true;
                console.log("jbru");
              }
            } else if (type == 3) {
              if (_this.gazx.list.lenght == 0) {
                _this.gazx.isNodata = true;
              } else {
                _this.gazx.bottomLoading = false;
                _this.gazx.bottomNoData = true;
              }
            }

            if (_this.jys.list.lenght == 0) {
              //如果进来就没有数据显示没有数据的图片
            } else {
              //如果分页导致的没有数据关闭加载显示没有数据
              _this.jys.bottomLoading = false;
              _this.jys.bottomNoData = true;
            }
          }
        } else if (val.ErrorCode == 120) {
          _this.jys.noright = true;
        }
      });
    },
    /**
     * 获取舆情列表
     * isNow是否为新列表
     */
    gettraderList() {
      let _this = this;
      let endtime = moment().unix();
      const timeSecond = moment()
        .subtract(14, "days")
        .unix();
      request(
        "post",
        "yuqinggetlist",
        {
          dealerId: _this.traderCode, //交易商id
          type: 0, //1-新闻  2-社交 0-全部
          page: _this.jys.index, //page 页数,默认每页20条
          pageSize: _this.size,
          affect: 0, //0-所有  1-中立消息 2-正面 3-负面 4-暂无评级
          countryCode: "all", //注意国家代码用单引号包裹,查询所有的使用"all"
          startTime: timeSecond, //起始时间
          endTime: endtime, //终止时间
          deviceType: "app"
        },
        "http://192.168.1.157:7654",
        false
      ).then(val => {
        if (val.ErrorCode == 200) {
          console.log(val.Data);
          //分页的情况下需要追加
          if (val.Data && val.Data.articles.length > 0) {
            _this.jys.list = _.concat(_this.jys.list, val.Data.articles);
            _this.jys.index++;
            _this.bottomLock = false;
          } else {
            if (_this.jys.list.length == 0) {
              //如果进来就没有数据显示没有数据的图片
              _this.jys.isNodata = true;
            } else {
              //如果分页导致的没有数据关闭加载显示没有数据
              _this.jys.bottomLoading = false;
              _this.jys.bottomNoData = true;
            }
          }
        } else if (val.ErrorCode == 120) {
          _this.jys.noright = true;
        }
      });
    },
    //获取行业资讯列表
    gethyzylist() {
      let _this = this;
      request(
        "post",
        "homegetlist",
        {
          dealerId: "", //交易商id
          type: 1, //1-新闻  2-社交 0-全部
          page: 1, //page 页数,默认每页20条
          pageSize: _this.size,
          affect: 0, //0-所有  1-中立消息 2-正面 3-负面 4-暂无评级
          countryCode: "'CN','US'", //注意国家代码用单引号包裹,查询所有的使用"all"
          startTime: 1557564216, //起始时间
          endTime: 1559292217, //终止时间
          timestamp: 1562587022
        },
        "http://192.168.1.135:7654",
        false
      ).then(val => {
        console.log(val);
        if (val.succeed) {
          _this.list20 = val.result;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.home {
  $pingfang1: "PingFang-SC-Medium";
  .mint-tab-container {
    .mint-tab-container-wrap {
      height: 100%;
      position: relative;
    }
  }

  .head {
    position: absolute;
    top: 8px;
    margin: 0 0.4rem 0;
    .logo {
      height: 28px;
    }
  }

  .language {
    position: absolute;
    right: 0.4rem;
    top: 8px;
    line-height: 28px;
    float: right;
    font-size: 13px;
    color: $homeTextColor;
    font-family: $pingfang1;
    .flag {
      margin-right: 0.13rem;
      border: 1px solid $homeBorderColor;
      border-radius: 2px;
      height: 0.37rem;
      margin-top: 0.18rem;
    }
    .toRight {
      height: 0.21rem;
      margin: 0.26rem;
      margin-left: 0.13rem;
    }
  }

  .menu {
    position: absolute;
    top: 44px;
    box-shadow: 0 5px 5px rgba(85, 142, 198, 0.05);
  }
  .list {
    padding: 0 0.4rem;
  }
}
</style>

