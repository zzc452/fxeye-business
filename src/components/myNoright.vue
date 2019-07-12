<template>
    <div class="not-attend" :class="type === 'absolute'? 'absolute': ''">
        <slot name='title'></slot>
        <img src="../assets/img/not_open.png" alt="">
        <slot><h4>很抱歉，你暂时未开通此功能，<br/>如有需要请联系客服人员！</h4></slot>
    </div>
</template>
<style lang="scss" scoped>
.not-attend{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 222;
    padding:0 15px;
    text-align: center;
    padding-top:1.333333rem;
    &.absolute{
        position: absolute;
    }
    p{
        font-size: 14px;
        color:#314453;
        font-family: $pingmedium;
        margin-bottom: 1.6rem;
        span{
            color: #ff6600;
            padding:0 1px;
        }
    }
    img{
        width: 2.346667rem;
        height: 2.346667rem;
        margin-bottom: 0.666667rem;
    }
    h4{
        font-family: $pingbold;
        font-size: 15px;
        color: #8aa6bf;
    }
}
</style>
<script>
export default{
    props:{
        type: {
            type: String,
            default: 'fixed'
        }
    }
    
}
</script>