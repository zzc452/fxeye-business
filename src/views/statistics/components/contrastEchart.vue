<template>
    <div class="contrast-area-item">
        <div class="title-bpx">
            <slot name='title'></slot>
            
            <div class="selectMonth-box" @click="showSelect">{{paramsTime}}</div>
        </div>
        <div class="compare-logo-box">
            <div class="home-box">
                <img v-if="vsLogos[0].Logo" :src="vsLogos[0].Logo" alt="">
                <img v-else src="../../../assets/img/logo.png" alt="">
            </div>
            <span class="icon-vs"></span>
            <ul class="logo-list">
                <li v-for="(val,index) in logos" :key="index" @click="logonavTab(index)" :class="{'on':logoSelect[index]}"><img v-if="val.Ico" :src="val.Ico" alt=""><img v-else src="../../../assets/img/default_smallLogo.png" alt="">{{val.TradeName}}</li>
            </ul>
        </div>
        <div class="chart-box">
            <v-chart ref="chart" :options="polar" :auto-resize="true"></v-chart>
        </div>
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
<script>
    import 'echarts/lib/chart/bar' 
    import 'echarts/lib/component/legend' 
    import 'echarts/lib/component/polar' 
    export default{
        data(){
            return{
                popupVisible:false,
                paramsTime:'',
                logoSelect:[true,true,true],
            }
        },
        props:['jsonData','type','jsonData','code'],
        methods:{
            openPicker(){
                if (this.pickerVisible) {
                    this.dateVal = this.pickerVisible
                } else {
                    this.dateVal = new Date()
                }
                this.$refs.picker.open();
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
            logonavTab(index){
                let arr;
                arr = this.logoSelect;
                arr[index] = !arr[index];
                this.logoSelect = [];
                this.logoSelect = arr;
            }
        },
        computed:{
            slots:function(){//下拉框
                let currentMonth = new Date().getMonth();
                let monthArr = [];
                for(let i=0;i<6;i++){
                    let month = new Date().setMonth(currentMonth-i);
                    monthArr[i] = new Date(month).getFullYear()+'年'+((new Date(month).getMonth()+1))+'月';
                }
                return [{ 
                            flex: 1,
                            values: monthArr,
                            className: 'slot1',
                            textAlign: 'center'
                        }]
            },
            vsLogos:function(){
                if(!this.jsonData) return [''];
                let dataArr = this.jsonData[this.type];
                dataArr = dataArr.slice();
                let para = dataArr[0];
                for(let i =0;i<dataArr.length;i++){
                    if(dataArr[i].TradeCode == this.code){
                        dataArr[0] = dataArr[i];
                        dataArr[i] = para;
                        break;
                    }
                }
                return dataArr;
            },
            logos:function(){
                let arr = this.vsLogos.slice(1);
                return arr;
            },
            polar:function(){
                let legendData = [''];
                let seresData = [];
                for(let i =0;i<this.vsLogos.length;i++){
                    legendData[i] = this.vsLogos[i].TradeName
                    seresData[i] = this.vsLogos[i].Num
                }
                legendData[0] = '交易商自己';
                return{
                    legend: {
                        data: legendData,
                        y:'165px',
                        textStyle:{
                            fontSize:10
                        }
                    },
                    grid : {
                        top : 10, 
                        bottom: 70 ,
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    yAxis: {
                        type: 'category',
                        inverse: true,
                        data: [this.paramsTime.slice(5)],
                        
                    },
                    series: [
                        {
                            name: legendData[0],
                            type: 'bar',
                            data: seresData[0],
                            barWidth:'18px',
                            itemStyle: {  
                                color:'#b6e0e1'
                            }
                        },
                        {
                            name: legendData[1],
                            type: 'bar',
                            data: seresData[1],
                            barWidth:'18px',
                            itemStyle: {  
                                color:'#ee9773'
                            }
                        },
                        {
                            name: legendData[2],
                            type: 'bar',
                            data: seresData[2],
                            barWidth:'18px',
                            itemStyle: {  
                                color:'#f9c013'
                            }
                        },
                        {
                            name: legendData[3],
                            type: 'bar',
                            data: seresData[3],
                            barWidth:'18px',
                            itemStyle: {  
                                color:'#c7a3e3'
                            }
                        }
                    ]
                }
            }
        },
        created(){
            this.paramsTime = this.slots[0].values[0];
        },
        watch:{
            paramsTime(newval){
                let timer = newval.replace(/[年,月]/g,'-');
                timer = timer+'1';
                let data = {time:timer,type:this.type};
                this.$emit('monthTab',data);
            }
        }
    }
</script>
<style lang="scss" scoped>
.contrast-area-item{
    border-bottom: 1px solid #b8c2cc;
    .title-bpx{
        overflow: hidden;
        line-height: 0.826667rem;
        padding: 0.666667rem 15px 0.4rem;
        h3{
            float: left;
            font-size: 14px;
            color: #587995;
            font-family: $pingbold;
        }
        .selectMonth-box{
            float: right;
            color: #587995;
            font-family: $pingmedium;
            height: 0.826667rem;
            font-size: 14px;
            padding:0 0.88rem 0 5px;
            background: url(../../../assets/img/xiasanjiao.png) right 0.186667rem center no-repeat;
            background-size: 0.186667rem auto;
            border:1px solid #cdd9e4;
            border-radius: 4px;
        }
    }
    .compare-logo-box{
        font-size: 0;
        margin:0 -15px;
        text-align: center;
        height:1.12rem;
        line-height:1.12rem;
        overflow: hidden;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        .home-box{
            vertical-align: middle;
            width: 1.973333rem;
            height:1.12rem;
            display: inline-block;
            line-height:1.12rem;
            text-align: center;
            margin-right: 5px;
            img{
                vertical-align: middle;
                max-width: 100%;
                max-height: 100%;
            }
        }
        .icon-vs{
            vertical-align: middle;
            width: 0.413333rem;
            height:0.4rem;
            display: inline-block;
            margin-right:10px;
            background: url(../../../assets/img/icon_vs.png) center no-repeat;
            background-size: 100% auto;
        }
        .logo-list{
            vertical-align: middle;
            display: inline-block;
            height: 0.666667rem;
            overflow: hidden;
            li{
                float: left;
                height: 0.666667rem;
                line-height: 0.645667rem;
                padding: 0 0.133333rem;
                border:1px solid #b8c2cc;
                font-size: 10px;
                color: #b8c2cc;
                font-family: $pingmedium;
                border-radius: 3px;
                margin-right: 8px;
                cursor: pointer;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                -webkit-tap-highlight-color: transparent;
                img{
                    width: 0.4rem;
                    height: 0.4rem;
                    border-radius: 2px;
                    vertical-align: middle;
                    margin-right: 2px;
                }
                &.on{
                    border-color: #3ac24b;
                    color: #314453;
                }
            }
        }
    }
    .chart-box{
        width: 100%;
        .echarts{
            width: 100vw;
            height: 195px;
            margin-left: -15px;
        }
    }
    .pop-select-box{
        width: 100%;
        .picker-toolbar{
            border-bottom: 1px solid #eaeaea;
        }
    }
}
</style>
