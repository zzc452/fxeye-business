<template>
    <div v-swiper:swiperRight='true' class="coupon-info-page content">
        <my-header :title="headerTitle" :goBack="true"><div class="turn-back" slot="left"><img class="icon-back" src="../../assets/img/back_left.png" alt=""></div> <img class="icon-logo" slot="mid" :src="headerLogo" alt=""></my-header>
        <div class="container-box">
            <my-title title="优惠券详情"></my-title>
            <div class="container">
                <template v-if="resultData.length>0">
                    <div class="info-list">
                        <div class="table-box" v-for="(val,index) in resultData" :key="index">
                            <table>
                                <tr><td class="td1">序号</td><td>{{index+1}}</td></tr>
                                <tr><td class="td1">姓名</td><td>{{val.name | formatNull()}}</td></tr>
                                <tr><td class="td1">手机号</td><td>{{val.phone | formatNull()}}</td></tr>
                                <tr><td class="td1">邮箱</td><td>{{val.email | formatNull()}}</td></tr>
                                <tr><td class="td1">领取时间</td><td>{{val.receivedAt | formatTime('yyyy年MM月dd日hh-mm-ss')}}</td></tr>
                            </table>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <my-nodata type="absolute"></my-nodata>
                </template>
                <my-loading :visible="loading" :reload="init" type="absolute"></my-loading>
            </div>
        </div>
    </div>
</template>
<script>
    import {request} from '../../../utils/request.js' 
    export default{
        data(){
            return{
                defaultLogo:'/img/default_smallLogo.png',
                resultData:[],
                loading:false
            }
        },
        methods:{
            init(){
                this.loading = 'loading';
                let cid = this.$route.query.cid;
                if (!cid) return;
                let params = {cid:cid}
                request('get','couponInfo',params)
                .then(json => {
                    this.resultData = json.result;
                    this.loading = false;
                })
                .catch(err => {
                    this.loading = 'error';
                })
            }
        },
        computed: {
            headerTitle(){
                return '嘉盛集团';
            },
            headerLogo(){
                return this.$route.query.icon == '' || this.$route.query.icon == undefined ? this.defaultLogo :this.$route.query.icon;
            }
        },
        created(){
            this.init()
        },
    }
</script>
<style lang="scss" scoped>
    .coupon-info-page{
        .icon-logo{
            width: 20px;
            height: 20px;
            vertical-align: top;
            margin-top:13px;
            margin-right: 5px;
            display: inline-block;
        }
        .container-box{
            padding-top:50px;
            position: relative;
            width: 100%;
            height:100%;
            .my-title{
                position: absolute;
                top:0;
                width: 100%;
            }
            .info-list{
                padding:0 15px;
                .table-box{
                    padding: 13px 0;
                    border-bottom:1px solid #e1e6eb;
                    margin-bottom: 4px;
                    table{
                        font-size: 16px;
                        width:100%;
                        tr{
                            height:36px;
                            .td1{
                                color:#587995;
                                width:30%;
                            }
                            td{
                                color: #314453;
                                vertical-align: middle;
                                .media-logo{
                                    width:20px;
                                    height: 20px;
                                    margin-right: 8px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
