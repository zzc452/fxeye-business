<template>
  <div class="select-country">
    <div class="main-wrap">
      <div class="input-box">
        <input type="text" placeholder="搜索" />
      </div>
      <div class="area-code-box">
        <div class="area-code-body">
          <dl v-for="(zimu, index) in zimu" :id="zimu" :key="'z'+index">
            <dt>{{zimu}}</dt>
            <dd
              @click="$router.push('/login?areaCode='+item.code+'&countryCode='+item.twoCharCode+'&flag='+item.flag)"
              v-for="(item, index) in filterArr(zimu)"
              :key="index"
            >
              <img :src="item.flag" />
              {{ item.name }}
              <span>{{ item.countryCode }}</span>
            </dd>
            <dd class="no-data" v-if="filterArr(zimu).length==0">暂无数据</dd>
          </dl>
        </div>
        <div class="area-code-nav">
          <ul>
            <li
              class="on"
              v-goPoint="item"
              v-for="(item, index) in zimu"
              :key="'z'+index"
            >{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getdata } from "../../../public/js/countryFlagBase64_cn.js";
import _ from "lodash";
export default {
  data() {
    return {
      list: getdata(),
      zimu: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ]
    };
  },
  mounted() {

  },
  methods: {
    intfnc() {
      let list = getdata();
    },
    filterArr(py) {
      return _.filter(this.list, { py: py });
    }
  }
};
</script>
<style lang="scss">
.select-country {
  .main-wrap {
    height: 100vh;
    padding-top: 57px;
    overflow: hidden;
    width: 100vw;
    position: relative;
  }
  .area-code-box {
    width: 100vw;
    height: 100%;
    overflow-y: scroll;
    margin-top: 10px;
  }
  .area-code-body {
    display: block;
    width: 100vw;
  }
  .area-code-body dt {
    height: 27px;
    line-height: 27px;
    font-size: 14px;
    background-color: #f4f4f5;
    color: #5898e1;
    padding: 0 30px 0 15px;
  }
  .area-code-body dd {
    height: 42px;
    line-height: 42px;
    font-size: 14px;
    padding: 0 30px 0 15px;
    border-bottom: 1px solid #e5e5e5;
  }
  .area-code-body dd img {
    height: 22px;
    margin-top: -2px;
    display: inline-block;
    width: auto;
    vertical-align: middle;
    margin-right: 8px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
  .area-code-body dd span {
    float: right;
    font-size: 14px;
    color: #9c9b9b;
  }
  .area-code-nav {
    position: fixed;
    right: 0;
    top: 50%;
    margin-top: 30px;
    transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    -moz-transform: translate(0, -50%);
    -webkit-transform: translate(0, -50%);
    -o-transform: translate(0, -50%);
    width: 26px;
    text-align: center;
  }
  .area-code-nav li {
    height: 15px;
    font-size: 12px;
    cursor: pointer;
    color: #5898e1;
  }
  .main-wrap .input-box {
    position: absolute;
    padding: 10px;
    left: 0;
    right: 0;
    top: 0;
  }
  .main-wrap .input-box input {
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    height: 37px;
    line-height: 37px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    padding-left: 35px;
    font-size: 14px;
    background: url(../../assets/img/icon_search.png) 10px center no-repeat
      #f4f4f5;
    -moz-background-size: 15px auto;
    background-size: 15px auto;
  }
}
</style>
