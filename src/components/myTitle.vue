<template>
    <div class="my-title">
      <div class="abs-l">
        <slot name="left"></slot>  
      </div>
      <div class="abs-m">
        {{title}}
      </div>
      <div class="abs-r">
        <slot name="right"></slot>  
      </div>
    </div>
</template>
<style lang="scss">
  $font-family: 'PingFang-SC-Bold';
  .my-title{
    display: flex;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    background: #f5f7fa;
    .abs-m{
      flex: 1;
      font-family: $font-family;
      font-size: 16px;
      color: #324354;
      text-align: left;
    }
  }
</style>
<script>
  export default{
    props:{
      title:String
    }
  }
</script>