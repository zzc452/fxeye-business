<template>
    <div class="fee-tab content" >
        <my-header v-swiper:swiperRight='true' title="付费点击" :goBack="true"><div class="turn-back" slot="left"><img class="icon-back" src="../../assets/img/back_left.png" alt=""></div></my-header>
        <div class="container-box">
            <div v-swiper:swiperRight='true' class="tit-box">
                <my-tab v-model="selected" :tabInfo="tabNav"></my-tab>
            </div>
            <mt-tab-container :swipeable='true' v-model="selected">
                <mt-tab-container-item v-for="(val,index) in tabNav" :id="val.id" :key="index">
                    <div v-if="val.id == 'statistic'" class="container static-box">
                        <div class="rights-box">
                            <div v-for="(val,index) in reversCount" :key="index" :class="['item',{'forbid':val.type == 2 && val.count == 0}]">
                                <template v-if="val.type == 2">
                                    <p>剩余天数</p>
                                    <strong v-if="val.count>0">{{val.count}}<span>天(包月用户)</span></strong>
                                    <strong v-else><span>仅限包月用户</span></strong>
                                </template>
                                <template v-else>
                                    <p>剩余次数</p>
                                    <strong>{{val.count}}<span>次</span></strong>
                                </template>
                            </div>
                        </div>
                        <div class="con-wrap">
                            <div class="month-select-box">
                                <div class="select-box" @click="showSelect">{{paramsTime | formatTime('yyyy年MM月')}}</div>
                            </div>
                            <table>
                                <tr>
                                    <th>PC</th>
                                    <th>APP</th>
                                    <th>汇总</th>
                                </tr>
                                <tr>
                                    <td>{{dataStatic.pcvisit}}次</td>
                                    <td>{{dataStatic.mvisit}}次</td>
                                    <td>{{dataStatic.tvisit}}次</td>
                                </tr>
                            </table>
                            <div class="chart-box">
                                <v-chart :options="polar" :auto-resize="true"></v-chart>
                            </div>
                        </div>
                        <!-- 加载提示 -->
                        <my-loading :visible="loading1" :reload="init" type="absolute"></my-loading>
                    </div>
                    <div v-else class="container message-box" v-infinite-scroll="loadBottomAjax" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
                        <template v-if="dataMessage.length>0">
                            <div class="table-item" v-for='(val,index) in dataMessage' :key='index'>
                                <table>
                                    <tr>
                                        <td class="tit">用户IP</td>
                                        <td> {{val.ip | formatNull()}} </td>
                                    </tr>
                                    <tr>
                                        <td class="tit">IP所属</td>
                                        <td>{{val.country | formatNull()}} </td>
                                    </tr>
                                    <tr>
                                        <td class="tit">访问位置</td>
                                        <td>{{val.spots | formatPosition()}}</td>
                                    </tr>
                                    <tr>
                                        <td class="tit">来源</td>
                                        <td>{{val.type | formatSourse()}}</td>
                                    </tr>
                                    <tr>
                                        <td class="tit">访问时间</td>
                                        <td> {{val.time | formatTime('yyyy-MM-dd hh:mm')}} </td>
                                    </tr>
                                </table>
                                <div class="btn-box">
                                    <mt-button @click="showPopInfo(index)" type="primary">查看详情</mt-button>
                                </div>
                            </div>
                            <div class="bottomLoad" v-if="dataMessage.length > 0">
                                <div class="loading" v-show='bottomLoading'>加载中...</div>
                                <div class="noData" v-if='bottomNoData'>没有更多的内容了</div>
                            </div>
                        </template>
                        <template v-else>
                            <my-nodata type="absolute"></my-nodata>
                        </template>
                        <!-- 加载提示 -->
                        <my-loading :visible="loading2" :reload="getMessageData" type="absolute"></my-loading>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <mt-popup v-model="showPop" position="bottom" popup-transition="popup-fade" class="pop-message-box">
            <message-info :showData="showData"></message-info>
        </mt-popup>
        <!-- 下拉选择内容 -->
        <mt-popup v-model="popupVisible" position="bottom" class="pop-select-box">
            <mt-picker :slots="slots" ref='monthPicker' :showToolbar="true">
                <div class="picker-toolbar">
                    <span @click="hidePop" class="mint-datetime-action mint-datetime-cancel">取消</span> 
                    <span @click="confirmSelect" class="mint-datetime-action mint-datetime-confirm">确定</span>
                </div>
            </mt-picker>
        </mt-popup>
    </div>
</template>
<style lang="scss">
.fee-tab {
    background: #fff;
    .container-box {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding-top: 50px;

        .tit-box {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
        }

        .mint-tab-container {
            width: 100%;
            height: 100%;
            overflow: hidden;

            .mint-tab-container-wrap {
                height: 100%;
                position: relative;
            }
        }
    }
    .static-box{
        .rights-box{
            display: flex;
            border-bottom:2px solid #f5f7f9;
            .item{
                flex:1;
                height: 1.066667rem;
                margin:0.533333rem 0;
                background:url(../../assets/img/icon_residueDays.png) 0.4rem center no-repeat;
                background-size: 1.066667rem 1.066667rem;
                padding-left:1.653333rem;
                padding-top: 0.106667rem;
                line-height: 1;
                white-space: nowrap;
                border-right: 1px solid #e1e6eb;
                &:last-child{
                    background-image:url(../../assets/img/icon_residueTimes.png);
                    border-right: 0;
                }
                &.forbid{
                    filter: grayscale(100%);
                    p,span{
                        color: #e3e8ec;
                    } 
                }
                p{
                    font-size: 12px;
                    color: #8aa6bf;
                    margin-bottom: 0.24rem;
                }
                strong{
                    font-size: 14px;
                    color: #314453;
                    vertical-align: top;
                    span{
                        font-weight: normal;
                        vertical-align: top;
                    }
                }
            }
        }
        .con-wrap {
            padding: 0 15px;
            .month-select-box{
                padding:24px 15px 6px 0;
                text-align: right;
                .select-box{
                    display: inline-block;
                    height: 31px;
                    color: #587995;
                    font-size: 14px;
                    padding:0 0.88rem 0 5px;
                    background: url(../../assets/img/xiasanjiao.png) right 0.186667rem center no-repeat;
                    background-size: 0.186667rem auto;
                    border:1px solid #cdd9e4;
                    border-radius: 4px;
                    line-height:31px;
                }
            }
            table {
                text-align: center;
                width: 100%;
                margin-bottom: 10px;

                th {
                    border-bottom: 1px solid #e1e6eb;
                    color: #587995;
                    padding: 0.32rem 0;
                    font-size: 14px;
                }

                td {
                    font-size: 14px;
                    color: #314453;
                    padding: 0.4rem 0;
                }
            }
            .chart-box {
                margin: 0 -15px;
                .echarts {
                    margin-top: -40px;
                }
                div {
                    width: 100%;
                }
            }
        }
        
    }
    .message-box {
        .table-item {
            padding: 15px 15px 0;

            table {
                font-size: 16px;
                width: 100%;

                tr {
                    height: 37px;

                    td {
                        color: #314453;
                        vertical-align: middle;

                        .media-logo {
                            width: 20px;
                            height: 20px;
                            margin-right: 8px;
                        }

                        &.tit {
                            color: #587995;
                            width: 30%;
                        }
                    }
                }
            }

            .btn-box {
                text-align: center;
                border-bottom: 1px solid #e1e6eb;
                padding: 12px 0 25px;

                .mint-button {
                    height: 36px;
                    line-height: 36px;
                    width: 120px;
                    font-size: 13px;
                }

            }
        }
    }
    .pop-message-box {
        width: 100%;
        width: 100vw !important;
        background: transparent !important;
    }
    .pop-select-box{
        width: 100%;
        .picker-toolbar{
            border-bottom: 1px solid #eaeaea;
        }
    }
}
</style>
<script>
import "echarts/lib/chart/line";
import "echarts/lib/component/legend";
import "echarts/lib/component/polar";
import messageInfo from "./components/messageInfo";
import { mapState,mapActions } from 'vuex'
export default {
    components: {
        messageInfo
    },
    data() {
        return {
            tabNav: [{
                    title: "点击统计",
                    id: "statistic"
                },
                {
                    title: "点击信息",
                    id: "message"
                }
            ],
            selected: "statistic",
            showPop: false, //控制详情弹框
            selectedMonth: "",
            // traderCode:'6011120464',
            popupVisible:false, //下拉框开关
            paramsTime:'',  //获取点击统计的时间参数
            loading1:false,  //点击统计加载状态
            dataStatic:{}, //点击统计数据
            chartPc:[], //图表pc统计数据
            chartApp:[],//图表app统计数据
            chartTotal:[], //图表汇总统计数据
            dataMessage:[], //点击信息数据
            pageIndex:1,  //点击信息加载页数
            loading2:false,  //点击信息加载状态
            bottomLock: false,      // 上滑开关
            bottomLoading: false,    // 底部loading
            bottomNoData: false,    // 底部nothing
            showData:'',  //弹框数据
            showuserInfo:'', //弹框数据
            messageIndex:'', //点击的详情序号
            
        };
    },
    methods: {
        ...mapActions('feetab',[
            'get_tabStatic',
            'get_tabmessage',
            'get_UserInfo'
        ]), 
        showPopInfo(val) {
            this.showPop = true;
            this.messageIndex = val;
            
        },
        showSelect(){
            this.popupVisible = true;
        },
        hidePop(){
            this.popupVisible = false;
        },
        confirmSelect(){
            this.paramsTime = this.$refs.monthPicker.getValues()[0];
            this.popupVisible = false;
        },
        init(val){
            this.loading1 = 'loading';
            if(!val){
                val = this.paramsTime+'-1';
            }
            let params = {
                traderCode:this.traderCode,
                dt: val
            }
            this.get_tabStatic(params)
            .then(res => {
                if(res){
                    this.dataStatic = res;
                }
                this.loading1 = false
            })
            .catch(err =>{
                this.loading1 = 'error'
            })
        },
        getMessageData(page){
            if(page == 1){
                this.loading2 = 'loading';
            }
            let params = {
                'traderCode':this.traderCode,
                'pageIndex':this.pageIndex,
                'pageSize':10
            }
            this.get_tabmessage(params)
            .then(res => {
                if(res.items.length>0){
                    this.dataMessage.push(...res.items);
                    this.pageIndex++;
                    this.bottomLock = false;
                }else{
                    if(page!=1){
                        this.bottomLoading = false;
                        this.bottomNoData = true;
                    }
                }
                
                this.loading2 = false;
            })
            .catch(err =>{
                this.loading2 = 'error'
            })
        },
        loadBottomAjax(){//上滑加载
            this.bottomLock = true; // 上滑开关
            this.bottomLoading = true;
            this.getMessageData(this.pageIndex);
        }
    },
    watch:{
        paramsTime:function(newval){
            let param = newval+'-1';
            this.selectedMonth = new Date(newval.replace(/-/g,'/')).getMonth();
            this.init(param);
        },
        dataStatic:function(newval){//生成图表数据
            let pcArr,appArr,totalArr;
            let len = this.xaxisData.length;
            pcArr = Array(len).fill(0);
            appArr = Array(len).fill(0);
            totalArr = Array(len).fill(0);
            if(newval.pcData){
                for(let val of newval.pcData){
                    let index = new Date(val.Date.replace(/-/g,'/')).getDate()-1;
                    pcArr[index] = val.Count;
                };
            }
            if(newval.mData){
                for(let val of newval.mData){
                    let index = new Date(val.Date.replace(/-/g,'/')).getDate()-1;
                    appArr[index] = val.Count;
                };
            }
            if(newval.tData){
                for(let val of newval.tData){
                    let index = new Date(val.Date.replace(/-/g,'/')).getDate()-1;
                    totalArr[index] = val.Count;
                };
            }
            this.chartPc = pcArr;
            this.chartApp = appArr;
            this.chartTotal = totalArr;
        },
        selected:function(newval){ //获取点击信息列表
            if(newval == 'message' && this.dataMessage.length == 0){
                this.getMessageData(1);
            }
        },
        messageIndex:function(newval){ //获取点击信息详情
            this.showData = this.dataMessage[newval];
            let params = {'userId':this.dataMessage[newval].userid}
            this.get_UserInfo(params)
        }
    },
    computed: {
        traderCode:function(){
            return this.$store.state.index.user.traderCode;
        },
        reversCount:function(){ //反转剩余天数和次数的顺序
            if(Array.isArray(this.dataStatic.count)){
                let arr = this.dataStatic.count.slice();
                return arr.reverse();
            }
        },
        slots:function(){
            let currentMonth = new Date().getMonth();
            let monthArr = [];
            for(let i=0;i<3;i++){
                let month = new Date().setMonth(currentMonth-i);
                monthArr[i] = new Date(month).getFullYear()+'-'+(new Date(month).getMonth()+1);
            }
            return [{ //下拉框
                    flex: 1,
                    values: monthArr,
                    className: 'slot1',
                    textAlign: 'center'
                }]
        },
        xaxisData: function() {
            let Arr = ["01", "", "", "04", "", "", "07", "", "", "10", "", "", "13", "", "", "16", "", "", "19", "", "", "22", "", "", "25", "", "", "28", "", "", "31"];
            let chooseMonth =
                this.selectedMonth == "" ? new Date().getMonth() : this.selectedMonth;
            let month =
                chooseMonth.toString().length < 2 ?
                "0" + (chooseMonth + 1) :
                "" + (chooseMonth + 1);
            let d = new Date();
            d.setMonth(chooseMonth + 1);
            d.setDate(0);
            Arr.splice(d.getDate()); //截取当月天数
            Arr = Arr.map(function(value, index) {
                return value == "" ? "" : month + "-" + value;
            });
            return Arr;
        },
        polar: function() {
            return {
                tooltip: {
                    trigger: "axis"
                },
                color: ["#44af00", "#da3f00", "#35a2c0"],
                legend: {
                    data: ["APP", "PC", "汇总"],
                    y: "370px",
                    icon:'roundRect'
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: "none"
                        },
                        dataView: { readOnly: false },
                        magicType: { type: ["line", "bar"] },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: this.xaxisData,
                    axisLabel: {
                        show: true,
                        interval: 0,
                        rotate: 40,
                        textStyle: {
                            color: "#333333",
                            fontSize: 8
                        }
                    }
                },
                yAxis: {
                    type: "value",
                    axisLabel: {
                        formatter: "{value}",
                        textStyle: {
                            color: "#333333",
                            fontSize: 8
                        }
                    }
                },
                series: [{
                        name: "APP",
                        type: "line",
                        data: this.chartApp,
                        lineStyle: {
                            normal: {
                                color: "#44af00",
                                width: 1
                            }
                        }
                    },
                    {
                        name: "PC",
                        type: "line",
                        data: this.chartPc,
                        lineStyle: {
                            normal: {
                                color: "#da3f00",
                                width: 1
                            }
                        }
                    },
                    {
                        name: "汇总",
                        type: "line",
                        data: this.chartTotal,
                        lineStyle: {
                            normal: {
                                color: "#35a2c0",
                                width: 1
                            }
                        }
                    }
                ]
            };
        }
    },
    created(){
        this.paramsTime = this.slots[0].values[0];
    },
    filters:{
        formatPosition:function (value){
            return Array('官网','轮播广告 ','开户网址')[value];
        },
        formatSourse:function (value){
            return Array('PC','Android ','IOS')[value];
        }
    }
};
</script>