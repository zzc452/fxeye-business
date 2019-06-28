<template>
  <div>
    <svg :width="100" :height="10/75+'rem'" xmlns="http://www.w3.org/2000/svg">
      <rect
        ref="$bar"
        rx="4"
        ry="4"
        :width="progress/FenMu*100"
        :height="10/75+'rem'"
        style="stroke-width:0.13rem;"
        v-bind:style="{ fill:barColor}"
      ></rect>
    </svg>
    <span>{{progress+'人'}}</span>
  </div>
</template>

<script>
export default {
  props: {
    width: [Number, String], // 圆的大小
    progress: [Number, String], // 进度条百分比
    barColor: String, // 进度条颜色
    FenMu: [Number, String], 
    isAnimation: {
      // 是否是动画效果
      type: Boolean,
      default: true
    },
    isRound: {
      // 是否是圆形画笔
      type: Boolean,
      default: true
    },
    id: {
      // 组件的id，多组件共存时使用
      type: [String, Number],
      default: 1
    },
    duration: {
      // 整个动画时长
      type: [String, Number],
      default: 1000
    },
    delay: {
      // 延迟多久执行
      type: [String, Number],
      default: 200
    },
    timeFunction: {
      // 动画缓动函数
      type: String,
      default: "cubic-bezier(0.99, 0.01, 0.22, 0.94)"
    }
  },
  data() {
    return {
      idStr: `circle_progress_keyframes_${this.id}`
    };
  },
  beforeDestroy() {
    // 清除旧组件的样式标签
    document.getElementById(this.idStr) &&
      document.getElementById(this.idStr).remove();
  },
  mounted() {
    if (this.isAnimation) {
      // 重复定义判断
      if (document.getElementById(this.idStr)) {
        document.getElementById(this.idStr).remove();
      }
      // 生成动画样式文件
      let style = document.createElement("style");
      style.id = this.idStr;
      style.type = "text/css";
      style.innerHTML = `
      @keyframes circle_progress_keyframes_name_${this.id} {
      from {stroke-dashoffset: ${0}rem;}
      to {stroke-dashoffset: ${this.width}rem;}}
      .circle_progress_bar${
        this.id
      } {animation: circle_progress_keyframes_name_${this.id} ${
        this.duration
      }ms ${this.delay}ms ${this.timeFunction} forwards;}`;
      // 添加新样式文件
      document.getElementsByTagName("head")[0].appendChild(style);
      // 往svg元素中添加动画class
      this.$refs.$bar.classList.add(`circle_progress_bar${this.id}`);
    }
  }
};
</script>
