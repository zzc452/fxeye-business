<template>
    <div class="statistic-wrap content">
        <my-header title="数据统计" :goBack="true">:goBack="true"><div class="turn-back" slot="left"><img class="icon-back" src="../../assets/img/back_left.png" alt=""></div></my-header>
        <div class="container-box">
            <div class="tit-box">
                <my-tab v-model="selected" :tabInfo="tabNav"></my-tab>
            </div>
            <mt-tab-container :swipeable='true' v-model="selected">
                <mt-tab-container-item v-for="(val,index) in tabNav" :id="val.id" :key="index">
                    <div v-if="val.id == 'coverage'" class="container coverage-box">
                        <div class="table-box">
                            <table>
                                <tr>
                                    <th>时间</th>
                                    <th>APP</th>
                                    <th>PC</th>
                                    <th>汇总</th>
                                </tr>
                                <tr v-for="(val,index) in tableData" :key="index">
                                    <td>{{val.codeDate}}</td><td>{{val.serieslistAPP}}</td><td>{{val.serieslistPC}}</td><td>{{val.serieslistSum}}</td>
                                </tr>
                            </table>
                        </div>
                        <ul class="time-nav">
                            <li v-for="(val,index) in monthNav" :key="index" :class="{'on':selectTime == val.time}" @click="chooseTime(val)">{{ val.title }}</li>
                        </ul>
                        <div class="chart-box">
                            <v-chart :options="polar" :auto-resize="true"></v-chart>
                        </div>
                        <my-loading :visible="loading" :reload="init" type="absolute"></my-loading>
                    </div>
                    <div v-else class="container contrast-box">
                        <contrast-echart @monthTab="monthSelect" :code="tradercode" :jsonData="contrastData.fgl" :type="contrastTypes[0]"><h3 slot="title">总覆盖率%</h3></contrast-echart>
                        <contrast-echart @monthTab="monthSelect" :code="tradercode" :jsonData="contrastData.yxfw" :type='contrastTypes[1]'><h3 slot="title">影响范围%</h3></contrast-echart>
                        <contrast-echart @monthTab="monthSelect" :code="tradercode" :jsonData="contrastData.yxrs" :type='contrastTypes[2]'><h3 slot="title">影响人数%</h3></contrast-echart>
                        <my-loading :visible="loading2" :reload="get_Ajaxcontrast" type="absolute"></my-loading>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>    
</template>
<style lang="scss">
.statistic-wrap{
    background: #fff;
    .container-box{
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding-top:50px;
        .tit-box{
            position: absolute;
            top: 0;
            left:0;
            width: 100%;
        }
        .mint-tab-container{
            width: 100%;
            height: 100%;
            overflow: hidden;
            .mint-tab-container-wrap{
                height: 100%;
                position: relative;
            }
        }
    }
    .coverage-box{
        .table-box{
            padding:0 15px 0.373333rem;
            table{
                width: 100%;
                text-align: center;
                th{
                    padding:0.36rem 0 0.346667rem;
                    font-size: 14px;
                    font-family: $pingbold;
                    width: 25%;
                    color: #587995;
                    border-bottom: 1px solid #e1e6eb;
                }
                td{
                    width: 25%;
                    font-size: 13px;
                    color: #314453;
                    text-align: center;
                    padding:0.293333rem 0;
                    
                }
                tr:nth-child(2) td{
                    padding-top:0.533333rem;
                }
            }
        }
        .time-nav{
            background: #f5f7fa;
            font-size: 0;
            text-align: center;
            padding: 0.266667rem 0;
            li{
                display: inline-block;
                width: 2.133333rem;
                height: 0.8rem;
                line-height: 0.8rem;
                font-size: 14px;
                color: #587995;
                border:1px solid #cdd9e4;
                margin-left: -1px;
                cursor: pointer;
                overflow: hidden;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                -webkit-tap-highlight-color: transparent;
                width: 2.4rem;
                &:first-child{
                        border-top-left-radius: 0.08rem;
                        border-bottom-left-radius: 0.08rem;
                        width:2.133333rem;
                }
                &:last-child{
                        border-top-right-radius: 0.08rem;
                        border-bottom-right-radius: 0.08rem;
                }
                &.on{
                    border:0;
                    background: #3e9ae8;
                    color: #fff;
                }
            }
        }
        .chart-box{
            margin:0 -15px;
            .echarts{
                margin-top: 20px;
            }
            div{
                width: 100%;
            }
        }
    }
    .contrast-box{
        padding:0 15px;
        .contrast-area-item:last-child{
            border-bottom:0;
        }
        
    }
    .mint-datetime-picker .picker-slot-center:nth-child(3){
        display: none!important;
    }
}
</style>
<script>
    import 'echarts/lib/chart/line' 
    import 'echarts/lib/component/legend' 
    import 'echarts/lib/component/polar' 
    import contrastEchart from './components/contrastEchart'
    import { mapActions } from 'vuex'
    export default{
        components:{
            contrastEchart
        },
        data(){
            return{
                tabNav:[
                    {
                        title:'覆盖率',
                        id:'coverage'
                    },{
                        title:'交易商对比',
                        id:'contrast'
                    }
                ],
                // tradercode:'0361564256',
                selected:'coverage',
                rateData:[],  //覆盖率数据
                contrastData:{}, //对比数据
                selectTime:'',
                loading:false,
                chartApp:[],
                chartPC:[],
                chartSum:[],
                monthNav:[{title:'近一周',time:-7},{title:'近半个月',time:-15},{title:'近一个月',time:-30}],
                contrastTypes:['fgl','yxfw','yxrs'],
                loading2:false,
                selectMonth:''
            }
        },
        computed:{
            tradercode:function(){
                return this.$store.state.index.user.traderCode;
            },
            tableData:function(){
                if(Array.isArray(this.rateData)){
                    let arr = this.rateData.slice();
                    return arr.reverse().splice(0,7);
                }
            },
            xAxisData:function(){
                let len = this.rateData.length;
                let axisArr = [];
                for(let i = 0;i<len;i++){
                    axisArr[i] = this.rateData[i].codeDate.slice(5);
                }
                if(axisArr.length>20){
                    let ellipsisArr = Array(len).fill('');
                    for(let i=0;i<len;i=i+3){
                        ellipsisArr[i] = axisArr[i]
                    }
                    return ellipsisArr;
                }
                return axisArr;
            },
            polar:function (){
                return {
                    grid : {
                        top : 10, 
                        bottom: 70 ,
                        left:50,
                        right:30
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    color:['#44af00','#da3f00','#35a2c0'],
                    legend: {
                        data:['APP','PC','汇总'],
                        y:'370px',
                        icon:'roundRect'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: this.xAxisData,
                        axisLabel: {
                            show: true,
                            interval:0,  
                            rotate:40,
                            textStyle: {
                                color: '#333333',
                                fontSize:8
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}',
                            textStyle:{
                                color:'#333333',
                                fontSize:8
                            }
                        }
                    },
                    series: [
                        {
                            name:'APP',
                            type:'line',
                            data:this.chartApp,
                            lineStyle:{
                                normal:{
                                    color:'#44af00',
                                    width:1
                                }
                            }
                        },
                        {
                            name:'PC',
                            type:'line',
                            data:this.chartPC,
                            lineStyle:{
                                normal:{
                                    color:'#da3f00',
                                    width:1
                                }
                            }
                        },
                        {
                            name:'汇总',
                            type:'line',
                            data:this.chartSum,
                            lineStyle:{
                                normal:{
                                    color:'#35a2c0',
                                    width:1
                                }
                            }
                        }
                    ]
                }
            },
            
        },
        methods:{
            ...mapActions('statistics',[
                'get_rateData',
                'get_contrastData'
            ]),
            chooseTime(val){
                this.selectTime = val.time;
            },
            init(){
                this.loading = 'loading';
                let params = {
                    tradercode:this.tradercode,
                    days:this.selectTime
                }
                this.get_rateData(params)
                .then(res => {
                    if(res){
                        this.rateData = res;
                    }
                    this.loading = false
                })
                .catch(err =>{
                    this.loading = 'error'
                })
            },
            monthSelect(val){
                this.selectMonth = val.time;
                if(this.selected!='contrast') return;
                this.get_Ajaxcontrast(val);
            },
            get_Ajaxcontrast(val){
                this.loading2 = 'loading';
                var params;
                var type;
                if(arguments.length==0){
                    params = {
                        traderCode:this.tradercode,
                        month:this.selectMonth
                    }
                    type = 'all';
                }else{
                    params = {
                        traderCode:this.tradercode,
                        month:val.time
                    }
                    type = val.type;
                }
                this.get_contrastData(params)
                .then(res =>{
                    if(type != 'all'){
                        this.contrastData[type] = res;
                    }else{
                        for(let t of this.contrastTypes){
                            this.contrastData[t] = res;
                        }
                    }
                    this.loading2 = false;
                })
                .catch(err =>{
                    this.loading2 = 'error';
                })
            },
            isEmptyObj(obj){
                for(var key in obj) {
                    return false;
                }
                return true;
            }
        },
        watch:{
            selectTime:function(newval){
                this.init();
            },
            rateData:function(newval){
                let len = newval.length;
                for(let i=0;i<len;i++){
                    this.chartApp[i] = newval[i].serieslistAPP
                    this.chartPC[i] = newval[i].serieslistPC
                    this.chartSum[i] = newval[i].serieslistSum
                }
            },
            selected:function(newval){
                if(this.selected=='contrast' && this.isEmptyObj(this.contrastData)){
                    this.get_Ajaxcontrast();
                }
            }
        },
        created(){
            this.selectTime = this.monthNav[0].time;
        }
    }
</script>