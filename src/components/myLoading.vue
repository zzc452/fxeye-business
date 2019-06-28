<template>
    <div id="loading" v-if="visible" :class="type === 'absolute' ? 'absolute' : ''">
        <div class="loading-container" v-if="visible === 'loading'">
            <mt-spinner :type="3" :size='size' :color="color"></mt-spinner>
        </div>
        <div class="error-container" v-else-if="visible === 'error'">
            <div class="error-box">
                <p class="error-txt">网络出现错误</p>
                <mt-button class="error-btn" type='danger' @click.stop='reload'>重试</mt-button>
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
        background: #fff;
        background-size: 42% auto;
        &.absolute{
            position: absolute;
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
            top: 30%;
            text-align: center;
            line-height: 30px;
            .error-txt {
                color: #aaa;
                margin-bottom: 10px;
                font-size: 16px;
            }
            .error-btn {
                border-radius: 5px;
            }
        }
        span {
            position: absolute;
            top: 40%;
            left: 50%;
            margin-left: -18px;
        }
    }
</style>
