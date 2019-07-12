<template>
    <div v-swiper:swiperRight='true' class="id-direct content">
        <my-header title="IB直通车" :goBack="true"><div class="turn-back" slot="left"><img class="icon-back" src="../../assets/img/back_left.png" alt=""></div></my-header>
        <div class="container" >
            <my-title class="my-title">
                <div class="con-tit" slot="left">IB相关信息</div>
                <div class="change-time" slot="right"><p>更新时间</p><p>{{ibData.UpdateTime | formatTime('yyyy-MM-dd hh:mm')}}</p></div>
            </my-title>
            <div class="info-box">
                <table>
                    <tr>
                        <td class="name">是否支持EA</td>
                        <td>{{ibData.IsEA ? '是' :'否'}}</td>
                    </tr>
                    <tr>
                        <td class="name">是否支持外佣</td>
                        <td>{{ibData.IsCommission ? '是' :'否'}}</td>
                    </tr>
                    <tr>
                        <td class="name">主要外汇点差</td>
                        <td>{{ibData.DollarSpreadLow}}-{{ibData.DollarSpreadHigh}}点  返佣{{ibData.DollarSpreadRebate}}美金 </td>
                    </tr>
                    <tr>
                        <td class="name">主要黄金点差</td>
                        <td>{{ibData.GoldSpreadLow}}-{{ibData.GoldSpreadHigh}}点  返佣{{ibData.GoldSpreadRebate}}美金</td>
                    </tr>
                    <tr>
                        <td class="name">返佣周期</td>
                        <td>{{ibData.RebateCycle | formatBackCycle()}}</td>
                    </tr>
                    <tr>
                        <td class="name">出金速度</td>
                        <td>{{ibData.WithdrawalSpeed | formatSpeed()}}</td>
                    </tr>
                    <tr>
                        <td class="name">平台特色</td>
                        <td>{{ibData.Features}}</td>
                    </tr>
                    <tr>
                        <td class="name">是否支持B通道</td>
                        <td>{{ibData.IsBChannel ? '是' :'否'}}</td>
                    </tr>
                </table>
            </div>
            <my-title class="my-title">
                <div class="con-tit" slot="left">IB联系方式</div>
            </my-title>
            <div class="contact-info">
                <dl v-for="(val,index) in ibData.IBContact" :key="index">
                    <dt>联系人{{index+1}}</dt>
                    <dd>
                        <div class="item">
                            <span>{{val.UserName | formatNull()}}</span>
                        </div>
                        <div class="item">
                            <p>性别</p>
                            <span>{{val.SexEnum | formatNull()}}</span>
                        </div>
                        <div class="item line">
                            <p>职位</p>
                            <span>{{val.Position | formatNull()}}</span>
                        </div>
                        <div class="item">
                            <p>手机号（{{val.TwoCharCode}}+{{val.AreaCode}}）</p>
                            <span>{{val.PhoneNumber | formatNull()}}</span>
                        </div>
                        <div class="item line">
                            <p>邮箱</p>
                            <span>{{val.Email | formatNull()}}</span>
                        </div>
                        <div class="item">
                            <p>微信</p>
                            <span>{{val.WeChat | formatNull()}}</span>
                        </div>
                        <div class="item line">
                            <p>QQ</p>
                            <span>{{val.QQ | formatNull()}}</span>
                        </div>
                        <div class="item">
                            <p>备注</p>
                            <span>{{val.Remark | formatNull()}}</span>
                        </div>
                    </dd>
                </dl>
            </div>
            <!-- 加载提示 -->
            <my-loading :visible="loading" :reload="init" type="absolute"></my-loading>
        </div>
    </div>
</template>
<script>
    import { mapState,mapActions } from 'vuex' 
    export default{
        data(){
            return{
                loading:false,
                // tradercode:'0361564256',
                ibData:{},
            }
        },
        computed:{
            tradercode:function(){
                return this.$store.state.index.user.traderCode;
            }
        },
        methods:{
            ...mapActions('ibdirect',[
                'get_ibDirect_Data'
            ]),
            init(){
                this.loading = 'loading'
                this.get_ibDirect_Data(this.tradercode)
                .then(res=>{
                    if(res){
                        this.ibData = res;
                    }
                    this.loading = false
                })
                .catch(err=>{
                    this.loading = 'error'
                })
            }
        },
        created(){
            this.init();
        },
        filters:{
            formatBackCycle(val){
                return Array('日返','周返','月返','平仓')[val-1];
            },
            formatSpeed(val){
                return Array('实时','当日','次日','其他')[val-1];
            }
        }
        
    }
</script>
<style lang="scss" scoped>
    .id-direct {
        .con-tit{
            font-family: $pingfang;
            font-size: 16px;
        }
        .change-time{
            font-size: 13px;
            color: #587995;
            line-height: 1.2em;
            padding-top: 10px;
        }
        .info-box{
            padding:13px 15px;
            table{
                font-family: $pingfang;
                width: 100%;
                td{
                    padding: 12px 0;
                    font-size: 13px;
                    color: #314453;
                    vertical-align: top;
                }
                .name{
                    color: #587995;
                    width: 40%;
                }
            }
        }
        .contact-info{
            padding:25px 15px 0;
            font-size: 14px;
            font-family: $pingfang;
            dl{
                border-bottom: 1px solid #e1e6eb;
                &:last-child{
                    border-bottom: 0;
                }
                dt{
                    margin-bottom: 17px;
                    color: #587995;
                }
                dd{
                    font-size: 0;
                    .item{
                        display: inline-block;
                        width: 50%;
                        box-sizing: border-box;
                        margin-bottom: 24px;
                        font-size: 14px;
                        line-height: 1;
                        &:first-child{
                            width: 100%;
                        }
                        &.line{
                            padding-left: 15px;
                            border-left: 1px solid #e1e6eb;
                        }
                        p{
                            color: #587995;
                            margin-bottom: 16px;
                        }
                        span{
                            color: #314453;
                        }
                    }

                }
            }
        }
    }
</style>
