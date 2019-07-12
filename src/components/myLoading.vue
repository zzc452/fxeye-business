<template>
    <div id="loading" v-if="visible" :class="type === 'absolute' ? 'absolute' : ''">
        <div class="loading-container" v-if="visible === 'loading'">
        </div>
        <div class="error-container" v-else-if="visible === 'error'" @click.stop='reload'>
            <div class="error-box">
                <img src="../assets/img/data_error.png" alt="">
                <h4>网络拥堵，信号挤丢了</h4>
                <p>点击屏幕刷新</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props:{
            visible:{
                type:[Boolean,String],
                default:false
            },
            type:{
                type:String,
                default:'fixed'
            },
            reload:Function
        },
        data(){
            return{
                size:36,
                color:'#00939c'
            }
        }
    }
</script>
<style lang="scss" scoped>
    #loading{
        width: 100%;
        height:100%;
        overflow: hidden;
        position: fixed;
        z-index: 622;
        top:0;
        left:0;
        background: #fff;
        background-size: 42% auto;
        &.absolute{
            position: absolute;
        }
        .loading-container{
            background: url(../assets/img/loading_logo.gif) center 38% no-repeat;
            background-size: 60% auto;
        }
        .loading-container,.error-container{
            position: relative;
            width:100%;
            height: 100%;
            text-align: center;
        }
        .error-box{
            position: absolute;
            left: 0;
            right: 0;
            top: 2.64rem;
            text-align: center;
            line-height: 30px;
            img{
                width: 4.0rem;
                margin-bottom: 0.613333rem;
            }
            h4{
                font-size: 16px;
                color: #8aa6bf;
                font-family: $pingbold;
            }
            p{
                font-size: 14px;
                color: #b8c2cc;
                font-family: $pingmedium;
            }
        }
    }
</style>
