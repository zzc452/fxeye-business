<template>
  <div class="home-tab">
    <div
      v-for="(val,index) in tabInfo"
      :key="index"
      :id="val.id"
      @click="tabClick(val.id)"
      :class="{'item':true,'selected' :value === val.id}"
    >
      <span>
        <img
          class="ico"
          onerror="this.src='img/default_smallLogo.png';this.onerror=null"
          :src="val.logo"
          v-if="val.logo"
        />
        {{val.title}}
      </span>
      <em class="label"></em>
    </div>
    <img src="@/assets/img/more.png" class="moreico" />
  </div>
</template>
<script>
export default {
  props: {
    tabInfo: Array,
    value: String
  },
  methods: {
    tabClick: function(val) {
      this.$emit("input", val);
    }
  }
};
</script>
<style lang="scss" scoped>
$pingfang1: "PingFang-SC-Bold";
/* $pingfang2: "PingFang-SC-Bold"; */
.home-tab {
  height: 50px;
  line-height: 50px;
  height: 50px;
  white-space: nowrap;
  font-size: 0;
  box-sizing: border-box;
  overflow-x: scroll;
  margin: 0 15px;
  &::-webkit-scrollbar {
    display: none;
  }
  .item {
    cursor: pointer;
    display: inline-block;
    position: relative;
    color: $homeText;
    margin-right: 0.53rem;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    outline: none;
    .ico {
      width: 0.43rem;
      margin-right: 0.07rem;
    }
    span {
      padding: 0.27rem 0;
      display: inline-block;
      font-size: 16px;
      font-family: $pingfang1;
      color: $homeText;
      line-height: 0.37rem;

      vertical-align: top;
      text-align: center;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      display: inline-block;
      height: 0.7rem;
      &:first-child {
        padding-left: 0;
      }
    }
    .label {
      position: absolute;
      height: 3px;
      width: 16px;
      border-radius: 2px;
      background: $homeEmColor;
      bottom: 0;
      left: 50%;
      margin-left: -10px;
      display: none;
    }

    &.selected {
      span {
        color: $homeTextSelect;
        /* font-family: $pingfang2; */
      }
      .label {
        display: block;
      }
    }
  }
  .moreico {
    position: fixed;
    right: 15px;
    margin-top: 0.26rem;
    height: 0.4rem;
  }
}
</style>
