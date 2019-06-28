<template>
  <div>
    <svg
      style="transform: rotate(90deg)"
      :width="ceil(width/75)+'rem'"
      :height="ceil(width/75)+'rem'"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        :r="ceil((width-radius)/2/75)+'rem'"
        :cy="ceil(width/2/75)+'rem'"
        :cx="ceil(width/2/75)+'rem'"
        :stroke-width="ceil(radius/75)+'rem'"
        :stroke="backgroundColor"
        fill="none"
      ></circle>
      <circle
        ref="$bar"
        :r="ceil((width-radius)/2/75)+'rem'"
        :cy="ceil(width/2/75)+'rem'"
        :cx="ceil(width/2/75)+'rem'"
        :stroke="barColor"
        :stroke-width="ceil(radius/75)+'rem'"
        :stroke-linecap="isRound ? 'round' : 'square'"
        :stroke-dasharray="ceil((width-radius)*3.14/75)+'rem'"
        :stroke-dashoffset="isAnimation ?ceil((width-radius) * 3.14/75) +'rem' :ceil(((width - radius) * 3.14 * (100 - progress) / 100)) "
        fill="none"
      ></circle>
      <text
        :x="-ceil(width/2.2/75)+'rem'"
        style="transform: rotate(-90deg); font-size: 10px;color:#314453;"
        :y="ceil(width/1.8/75)+'rem'"
        text-anchor="middle"
      >{{ShowText+'%'}}</text>
    </svg>
  </div>
</template>

<script>
import lodash from "lodash";
export default {
  props: {
    width: [Number, String], // 圆的大小
    radius: [Number, String], // 进度条厚度
    progress: [Number, String], // 进度条百分比
    barColor: String, // 进度条颜色
    backgroundColor: String, // 背景颜色
    ShowText: [Number, String], // 要显示的值
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
        console.warn("vue-circle-progress should not have same id style");
        document.getElementById(this.idStr).remove();
      };
      // 生成动画样式文件
      let style = document.createElement("style");
      style.id = this.idStr;
      style.type = "text/css";
      style.innerHTML = `
      @keyframes circle_progress_keyframes_name_${this.id} {
      from {stroke-dashoffset: ${this.ceil(
        ((this.width - this.radius) * 3.14) / 75
      )}rem;}
      to {stroke-dashoffset: ${this.ceil(
        ((this.width - this.radius) * 3.14 * (100 - this.progress)) / 100 / 75
      )}rem;}}
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
  },
  methods: {
    ceil(fen) {
      return lodash.ceil(fen, 2);
    }
  }
};
</script>
