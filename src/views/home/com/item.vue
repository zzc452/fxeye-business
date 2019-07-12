<template>
  <div class="homeItem">
    <ul>
      <li v-for="(item, index) in list" :key="'ls'+index">
        <div class="listItem" @click="showimg(item.link,item.linkImage)">
          <div>
            <div class="jin">{{ item.source?item.source.slice(0,1).toUpperCase():"今" }}</div>
            <div class="title">{{ item.source?item.source:"今日头条" }}</div>
            <div class="time">
              <img
                :src="item.country?'https://img.wikifx.com/flag/'+getMd5Str(item.country)+'/'+item.country+'.png_wiki-template-global':'img/default_flag.png'"
                class="flag"
              />
              {{ getdate(item.unixTime) }}
            </div>
          </div>
          <div class="biaoti">{{ item.title }}</div>
          <div class="content-txt" v-html="item.matchText "></div>
          <div class="home-lables">
            <span class="lableYeall" v-if="item.triggerPercent">{{ item.triggerPercent }}</span>
            <span class="lable lableBlue" v-if="item.affect=='中立消息'">中立消息</span>
            <span class="lable lableGreen" v-else-if="item.affect=='正面'">正面消息</span>
            <span class="lable lableRed" v-else-if="item.affect=='负面'">负面消息</span>
            <span class="lable lableGray" v-else>暂无评级</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="bottomLoad" v-if="list.length > 0">
      <div class="loading" v-show="bottomLoading">加载中...</div>
      <div class="noData" v-if="bottomNoData">没有更多的内容了</div>
    </div>
    <!--无数据时-->
    <div class="nodata" v-show="isNodata">
      <my-nodata></my-nodata>
    </div>
    <my-noright type="absolute" v-show="noright"></my-noright>
    <!-- 弹出图片 -->
    <mt-popup v-model="isShowImg">
      <div class="imgbox">
        <img :src="imgUrl" />
        <div class="button" @click="openUrl">查看详情</div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import moment from "moment";
import md5 from "js-md5";
import _ from "lodash";
export default {
  props: {
    list: Array,
    bottomLoading: true,
    bottomNoData: false,
    isNodata: false,
    noright: false
  },
  data() {
    return {
      isShowImg: false,
      imgUrl: "",
      link: ""
    };
  },

  methods: {
    getdate(tm) {
      return moment(tm).format("MM-DD HH:mm");
    },
    getMd5Str(str) {
      return md5(str).substring(8, 24);
    },
    showimg(link, img) {
      this.imgUrl = img;
      this.link = link;
      this.isShowImg = true;
    },
    openUrl() {
      if (process.env.NODE_ENV == "production") {
        window.open = cordova.InAppBrowser.open;
      }
      window.open(this.link, "_blank");
    }
  }
};
</script>
<style lang="scss">
.homeItem {
  .listItem {
    font-family: $homeFontFamily;
    margin-top: 0.67rem;
    padding-bottom: 0.68rem;
    font-size: 0;
    border-bottom: 1px solid $homeBorderColor;
    .jin {
      color: $homeTextWhite;
      font-size: 24px;
      padding: 0.3rem 0.4rem;
      background-color: $homeIcoBackgroundColor;
      border-radius: 5px;
      float: left;
      width: 15%;
      text-align: center;
      &::after {
        clear: both;
        content: "";
        display: block;
        width: 0;
        height: 0;
        visibility: hidden;
      }
      margin-right: 0.27rem;
    }
    .title {
      font-size: 24px;
      color: $homeTextColor;
      line-height: 0.85rem;
      width: 82%;
      word-break: break-all;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .flag {
      border: 1px solid $homeBorderColor;
      border-radius: 2px;
      height: 0.37rem;
      margin-right: 0.12rem;
      line-height: 0.5rem;
      margin-top: 0.06rem;
    }
    .time {
      font-family: $homeFontFamily1;
      font-size: 13px;
      color: $homeText;
      line-height: 0.5rem;
    }
    .biaoti {
      font-size: 16px;
      margin-top: 0.4rem;
      color: $homeTextSelect;
      &::before {
        clear: both;
        content: "";
        display: block;
        width: 0;
        height: 0;
        visibility: hidden;
      }
      margin-bottom: 0.27rem;
    }
    .content-txt {
      line-height: 20px;
      font-size: 14px;
      overflow: hidden; /** 隐藏超出的内容 **/
      word-break: break-all;
      text-overflow: ellipsis; /** 多行 **/
      display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
      -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
      -webkit-line-clamp: 6; /** 显示的行数 **/
      font-family: $homeFontFamily1;
    }
    .home-lables {
      font-size: 10px;
      margin-top: 0.43rem;
      .lableYeall {
        padding: 0.09rem 0.28rem;
        background-color: $homeIcoBackgroundColor1;
        border-radius: 5px;
        color: $homeTextColor;
      }
      .lableBlue {
        background-color: $homeIcoBackgroundColor2;
      }
      .lableRed {
        background-color: $homeIcoBackgroundColorRed;
      }
      .lableGreen {
        background-color: $homeIcoBackgroundColorGreen;
      }
      .lableGray {
        background-color: $homeIcoBackgroundColorGray;
      }
      .lable {
        padding: 0.09rem 0.28rem;
        border-radius: 5px;
        color: $homeTextWhite;
        margin-left: 0.13rem;
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
  .nodata {
    height: 300px;
    .no-data {
      position: absolute;
      padding-top: 0;
      top: 30%;
    }
  }
  .imgbox {
    max-width: 90vw;
    max-height: 90vh;
    position: relative;
    display: inline-block;
    .button {
      background-color: rgba(56, 56, 56, 0.424);
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;
      color: #fff;
      text-align: center;
    }
    img {
      width: 100%;
    }
  }
}
</style>

