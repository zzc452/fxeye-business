<template>
    <div class="pop-con-info">
        <div class="header-tit">详情</div>
        <div class="table-box">
            <table>
                <tr>
                    <td class="tit">用户IP</td>
                    <td>{{showData.ip}}</td>
                </tr>
                <tr>
                    <td class="tit">区号</td>
                    <td>{{userInfo.areaCode | formatNull()}}</td>
                </tr>
                <tr>
                    <td class="tit">手机号</td>
                    <td>{{userInfo.phone | formatNull()}}</td>
                </tr>
                <tr>
                    <td class="tit">姓氏</td>
                    <td>{{userInfo.lastName | formatNull()}}</td>
                </tr>
                <tr>
                    <td class="tit">来源</td>
                    <td>{{showData.type | formatSourse()}}</td>
                </tr>
                <tr>
                    <td class="tit">访问国家</td>
                    <td>{{showData.country | formatNull()}} <img v-if="showData.flag" :src="showData.flag" alt=""></td>
                </tr>
<tr>
                    <td class="tit">访问位置</td>
                    <td>{{showData.spots | formatPosition()}}</td>
                </tr>
                <tr>
                    <td class="tit">访问时间</td>
                    <td>{{showData.time | formatTime('yyyy-MM-dd hh:mm')}}</td>
                </tr>
            </table>
        </div>
        <mt-button @click="hidePopInfo" type="primary">确定</mt-button>
    </div>
</template>
<style lang="scss" scoped>
.pop-con-info{
    width:100%;
    border-radius: 0.266667rem 0.266667rem 0 0;
    overflow: hidden;
    background: #fff;
    padding-bottom: 2.4rem;
    .header-tit{
        line-height: 1;
        text-align: center;
        font-size: 16px;
        font-family: $pingbold;
        padding:0.666667rem 0 0.72rem;
    }
    .table-box{
        padding:0 15px;
        table{
            width: 100%;
            font-size: 16px;
            td{
                color: #314453;
                font-family: $pingmedium;
                padding-bottom: 0.613333rem;
                line-height: 1;
                vertical-align: top;
                width: 70%;
                word-break: break-all;
                img{
                    width: 20px;
                    height: 16px;
                    border-radius: 1px;
                    margin-left: 6px;
                }
            }
            .tit{
                width: 30%;
                color: #587995;
                padding-right: 5px;
                box-sizing: border-box;
            }
        }
    }
    .mint-button{
        position: absolute;
        left:0;
        bottom:0;
        width: 100%;
        height: 1.333333rem;
        line-height: 1.333333rem;
        text-align: center;
        font-size: 18px;
        color: #fff;
        font-family: $pingfang;
        border-radius: 0;
    }
}
</style>
<script>
    import { mapState } from 'vuex'
    export default{
        methods:{
            hidePopInfo(){
                this.$parent.$emit('input',false)
            }
        },
        props:['showData'],
        computed:{
            ...mapState('feetab', [
                'userInfo'
            ]),
        },
        filters:{
            formatPosition:function (value){
                return Array('官网','轮播广告 ','开户网址')[value];
            },
            formatSourse:function (value){
                return Array('PC','Android ','IOS')[value];
            }
        }
    }
</script>