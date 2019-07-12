<template>
  <div id="page-sentiment" class="page-sentiment content">
    <my-header :title="headerTitle"></my-header>
    <div class="container-box">
      <div class="tit-box">
        <my-tab v-model="selected" :tabInfo="tabNav"></my-tab>
      </div>
      <div class="container">
        <mt-tab-container :swipeable="true" v-model="selected">
          <mt-tab-container-item id="yvqing">
            <div>
              <div class="yuqing">
                <div class="selectBox">
                  <div class="sItem" @click="isShowAllArticle=true" v-text="artText"></div>
                  <div class="sItem" @click="isShowAllSource=true" v-text="sourceText"></div>
                  <div class="sItem" @click="isShowAllMsg=true" v-text="msgText"></div>
                  <div class="sItem" @click="isShowTimeSelect=true" v-text="timeText"></div>
                </div>
                <div>
                  <my-item
                    v-infinite-scroll="loadBottomAjax"
                    infinite-scroll-disabled="bottomLock"
                    infinite-scroll-distance="10"
                    infinite-scroll-immediate-check="false"
                    :list="list"
                    :isNodata="isNodata"
                    :noright="noright"
                  ></my-item>
                </div>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="gengxin">
            <div class="container">
              <div class="jiankong">
                <div class="selectBox">
                  <div class="sItem" @click="isShowAllArticle=true" v-text="artText"></div>
                  <div class="sItem" @click="isShowAllSource=true" v-text="sourceText"></div>
                  <div class="sItem" @click="isShowTimeSelect=true" v-text="timeText"></div>
                </div>
                <div class="tubiao">
                  <v-chart class="tubiao" :options="polar" :auto-resize="true"></v-chart>
                </div>
                <div class="listData">
                  <ul>
                    <li>
                      <div class="head">
                        <span>时间</span>
                        <span>新闻</span>
                        <span>社交媒体</span>
                        <span>汇总</span>
                      </div>
                    </li>
                    <li v-for="(item, index) in infoList" :key="'info'+index">
                      <div class="item">
                        <span>{{getShowDate(item.date) }}</span>
                        <span>{{ item.newsNum }}</span>
                        <span>{{ item.scNum }}</span>
                        <span>{{ item.scNum+item.newsNum }}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>

    <!-- 弹出内容开始 -->
    <div>
      <!-- 文章类型选择 -->
      <mt-actionsheet :actions="allArticle" v-model="isShowAllArticle"></mt-actionsheet>
      <!-- 所有来源选择 -->
      <mt-actionsheet :actions="allSource" v-model="isShowAllSource"></mt-actionsheet>
      <!-- 消息类型选择 -->
      <mt-actionsheet :actions="allMsg" v-model="isShowAllMsg"></mt-actionsheet>
      <!-- 过去14天选择 -->
      <mt-actionsheet :actions="timeSelect" v-model="isShowTimeSelect"></mt-actionsheet>
      <!-- 请求提示 -->
      <!-- <my-loading :visible="loading" :reload="getData"></my-loading> -->
    </div>
  </div>
</template>

<script>
import myTab from "@/components/myTab";
import MyItem from "@/views/home/com/item";
import "echarts/lib/chart/line";
import "echarts/lib/component/polar";
import { request } from "../../../utils/request";
import cache from "../../../utils/cache";
import moment from "moment";
import _ from "lodash";
export default {
  data() {
    var _this = this;
    return {
      headerTitle: "舆情监控",
      bottomLoading: true,
      bottomNoData: false,
      isNodata: false,
      noright: false,
      bottomLock: false,
      traderCode: "",
      size: 10,
      page: 1,
      list: [],
      tabNav: [
        {
          title: "舆情查看",
          id: "yvqing"
        },
        {
          title: "更新统计",
          id: "gengxin"
        }
      ],
      allMsg: [
        //0-所有  1-中立消息 2-正面 3-负面 4-暂无评级
        {
          name: "消息类型",
          method: function() {
            _this.msgType = 0;
            _this.page = 1;
            _this.msgText = "消息类型";
            _this.getList(true);
          }
        },
        {
          name: "正面消息",
          method: function() {
            _this.msgType = 2;
            _this.page = 1;
            _this.msgText = "正面消息";
            _this.getList(true);
          }
        },
        {
          name: "中立消息",
          method: function() {
            _this.msgType = 1;
            _this.page = 1;
            _this.msgText = "中立消息";
            _this.getList(true);
          }
        },
        {
          name: "负面消息",
          method: function() {
            _this.msgType = 3;
            _this.page = 1;
            _this.msgText = "负面消息";
            _this.getList(true);
          }
        },
        {
          name: "暂无评级",
          method: function() {
            _this.msgType = 4;
            _this.page = 1;
            _this.msgText = "暂无评级";
            _this.getList(true);
          }
        }
      ],
      msgType: 0,
      msgText: "消息类型",
      isShowAllMsg: false,
      allSource: [
        {
          name: "所有来源",
          method: function() {
            _this.sourceType = "all";
            _this.page = 1;
            _this.sourceText = "所有来源";
            _this.getList(true);
            _this.getInfo(true);
          }
        },
        {
          name: "中国",
          method: function() {
            _this.sourceType = "'CN'";
            _this.page = 1;
            _this.sourceText = "中国";
            _this.getList(true);
            _this.getInfo(true);
          }
        }
      ],
      sourceType: "all",
      sourceText: "所有来源",
      isShowAllSource: false,
      allArticle: [
        {
          name: "文章类型",
          method: function() {
            _this.artType = 0;
            _this.page = 1;
            _this.artText = "文章类型";
            _this.getList(true);
            _this.getInfo(true);
          }
        },
        {
          name: "新闻类",
          method: function() {
            _this.artType = 1;
            _this.page = 1;
            _this.artText = "新闻类";
            _this.getList(true);
            _this.getInfo(true);
          }
        },
        {
          name: "社交类",
          method: function() {
            _this.artType = 2;
            _this.page = 1;
            _this.artText = "社交类";
            _this.getList(true);
            _this.getInfo(true);
          }
        }
      ],
      artType: 0,
      artText: "文章类型",
      isShowAllArticle: false,
      timeSelect: [
        {
          name: "今天",
          method: function() {
            _this.timeText = "今天";
            _this.timeSelectFun(0);
          }
        },
        {
          name: "本周",
          method: function() {
            _this.timeText = "本周";
            _this.timeSelectFun(7);
          }
        },
        {
          name: "过去14天",
          method: function() {
            _this.timeText = "过去14天";
            _this.timeSelectFun(14);
          }
        },
        {
          name: "近一月",
          method: function() {
            _this.timeText = "近一月";
            _this.timeSelectFun(30);
          }
        },
        {
          name: "近三月",
          method: function() {
            _this.timeText = "近三月";
            _this.timeSelectFun(90);
          }
        }
      ],
      timeText: "过去14天",
      timeSecond: 0, //所选择的时间,
      timeTian: 14,
      isShowTimeSelect: false,
      selected: "yvqing",
      polar: {
        color: ["#44af00", "#da3f00", "#35a2c0"],
        tooltip: {
          trigger: "axis"
        },
        legend: {
          top: "bottom",
          itemHeight: 7, //图例的高度
          itemWidth: 18, //图例的高度
          data: [
            { name: "新闻", icon: "roundRect" },
            { name: "社交", icon: "roundRect" },
            { name: "汇总", icon: "roundRect" }
          ],
          textStyle: {
            color: "#314453",
            fontFamily: "PingFang-SC-Medium"
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          //data: ["星期一", "星期一", "星期一", "星期一", "星期一"],
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 40,
            textStyle: {
              color: "#333333",
              fontSize: 8
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "#333333",
              fontSize: 8
            }
          }
        },
        series: [
          {
            name: "新闻",
            type: "line",
            data: [0.1, 0.4, 0.2, 0.3, 0.3],
            lineStyle: {
              normal: {
                color: "#44af00",
                width: 1
              }
            }
          },
          {
            name: "社交",
            type: "line",
            data: [0.2, 0.1, 0.1, 0.2, 0.4],
            lineStyle: {
              normal: {
                color: "#da3f00",
                width: 1
              }
            }
          },
          {
            name: "汇总",
            type: "line",
            data: [0.28, 0.12, 0.1, 0.2, 0.32],
            lineStyle: {
              normal: {
                color: "#35a2c0",
                width: 1
              }
            }
          }
        ]
      },
      infoList: []
    };
  },
  components: {
    myTab,
    MyItem
  },
  created() {
    //获取交易商code
    var user = this.$store.state.index.user
      ? this.$store.state.index.user
      : JSON.parse(cache.getLocal("user"));
    if (!user) {
      this.$router.push("/login");
      return false;
    } else {
      this.traderCode = user.traderCode;
    }
    //初始化数据
    this.timeSecond = moment()
      .subtract(14, "days")
      .unix();
  },
  mounted() {
    this.getList();
    this.getInfo();
  },
  methods: {
    getShowDate(dt, time) {
      if (dt) {
        if (time) {
          return moment(dt).format("YYYY-MM-DD HH:MM:SS");
        } else {
          const retiem = moment(dt).format("YYYY-MM-DD");
          if (retiem == moment().format("YYYY-MM-DD")) {
            return "今天";
          } else {
            return retiem;
          }
        }
      } else {
        return "";
      }
    },
    loadBottomAjax() {
      if (this.selected == "yvqing") {
        //上滑加载
        this.bottomLock = true; // 上滑开关
        this.getList();
      }
    },
    /**
     * 选择时间执行的方法
     * time:需要减去的天数
     */
    timeSelectFun(time) {
      this.timeTian = time;
      if (time == 0) {
        this.timeSecond = moment(
          moment().format("YYYY-MM-DD") + " 0:0:0"
        ).unix();
      } else {
        this.timeSecond = moment()
          .subtract(time, "days")
          .unix();
      }
      this.page = 1;
      this.getList(true);
      this.getInfo();
    },
    /**
     * 获取舆情列表
     * isNow是否为新列表
     */
    getList(isNow = false) {
      let _this = this;
      let endtime = moment().unix();
      _this.isNodata = false;
      request(
        "post",
        "yuqinggetlist",
        {
          dealerId: _this.traderCode, //交易商id
          type: _this.artType, //1-新闻  2-社交 0-全部
          page: _this.page, //page 页数,默认每页20条
          pageSize: _this.size,
          affect: _this.msgType, //0-所有  1-中立消息 2-正面 3-负面 4-暂无评级
          countryCode: _this.sourceType, //注意国家代码用单引号包裹,查询所有的使用"all"
          startTime: _this.timeSecond, //起始时间
          endTime: endtime, //终止时间
          deviceType: "app"
        },
        "http://192.168.1.157:7654",
        false
      ).then(val => {
        if (val.ErrorCode == 200) {
          if (isNow) {
            if (val.Data && val.Data.articles.length > 0) {
              _this.list = val.Data.articles;
              _this.page++;
              _this.bottomLock = false;
            } else {
              _this.list = [];
              _this.isNodata = true;
            }
          } else {
            //分页的情况下需要追加
            if (val.Data && val.Data.articles.length > 0) {
              _this.list = _.concat(_this.list, val.Data.articles);
              _this.page++;
              _this.bottomLock = false;
            } else {
              if (_this.list.lenght == 0) {
                //如果进来就没有数据显示没有数据的图片
                _this.isNodata = true;
              } else {
                //如果分页导致的没有数据关闭加载显示没有数据
                _this.bottomLoading = false;
                _this.bottomNoData = true;
              }
            }
          }
        } else if (val.ErrorCode == 120) {
          _this.noright = true;
        }
      });
    },

    /**
     * 获取更新
     */
    getInfo() {
      let _this = this;
      let currtime = moment().unix();
      _this.isNodata = false;
      request(
        "post",
        "yuqingtraderinfo",
        {
          dealerId: _this.traderCode, //交易商id
          affect: _this.msgType, //0-所有  1-中立消息 2-正面 3-负面 4-暂无评级
          countryCode: _this.sourceType, //注意国家代码用单引号包裹,查询所有的使用"all"
          curTime: currtime, //终止时间
          days: _this.timeTian,
          deviceType: "app"
        },
        "http://192.168.1.157:7654",
        false
      ).then(val => {
        if (val.ErrorCode == 200) {
          _this.infoList = val.Data;
          //翻转数组
          const daoList = _.sortBy(_this.infoList, "date");
          //拿到今天的日期进行对比
          const today = moment().format("YYYY-MM-DD");
          //x轴需要显示的内容
          let axais = [];
          //新闻类需要显示的数据
          let newsList = [];
          //社交类需要显示的数据
          let shejiaoList = [];
          //汇总需要显示的数据
          let huizhongList = [];
          for (let index = 0; index < daoList.length; index++) {
            const element = daoList[index];
            if (daoList.length < 15) {
              if (element.date == today) {
                axais.push("今天");
              } else {
                axais.push(element.date.substring(5));
              }
            } else {
              const setp = daoList.length / 15;
              if (index == 0 || index == daoList.length - 1) {
                if (element.date == today) {
                  axais.push("今天");
                } else {
                  axais.push(element.date.substring(5));
                }
              } else {
                if (index % setp == 0) {
                  axais.push(element.date.substring(5));
                }
              }
            }
            newsList.push(element.newsNum);
            shejiaoList.push(element.scNum);
            huizhongList.push(element.newsNum + element.scNum);
          }
          //设置图表数据
          _this.polar.xAxis.data = axais;
          _this.polar.series[0].data = newsList;
          _this.polar.series[1].data = shejiaoList;
          _this.polar.series[2].data = huizhongList;
        } else if (val.ErrorCode == 120) {
          _this.noright = true;
        }
      });
    }
  }
};
</script>

<style lang="scss">
#page-sentiment {
  @mixin selectBox {
    .selectBox {
      margin-top: 25px;
      .sItem {
        margin-right: 0.13rem;
        background: url("../../assets/img/yuqingxiala.png") no-repeat center;
        background-size: 100% auto;
        line-height: 1.03rem;
        width: 2.1rem;
        float: left;
        font-size: 13px;
        font-family: $sentimentFontBold;
        padding-left: 0.16rem;
        color: $sentimentTextColor;
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
  .container-box {
    position: relative;
    height: 100%;
    width: 100%;
    padding-top: 50px;
    .tit-box {
      width: 100%;
      position: absolute;
      top: 0;
    }
    .mint-tab-container,
    .mint-tab-container-wrap {
      width: 100%;
    }
    .yuqing {
      margin: 0 0.4rem;
      @include selectBox();
      .not-attend {
        padding-top: 30%;
      }
    }
    .jiankong {
      .tubiao {
        div {
          width: 100vw;
        }
        margin-bottom: 25px;
      }
      .selectBox {
        margin: 0 0.4rem;
      }
      @include selectBox();
      @mixin spanLayout {
        span {
          width: 25%;
          display: inline-block;
          text-align: center;
        }
      }
      .listData {
        .head {
          background-color: $sentimentHeadBackgroundColor;
          font-size: 14px;
          color: $sentimentTextColor;
          font-family: $sentimentFontBold;
          padding: 0.35rem 15px;
          @include spanLayout();
          margin-bottom: 0.1rem;
        }
        .item {
          font-size: 13px;
          font-family: $sentimentFontMedium;
          color: $sentimentText;
          padding: 0 15px;
          @include spanLayout();
          line-height: 0.72rem;
        }
      }
    }
  }
}
</style>
