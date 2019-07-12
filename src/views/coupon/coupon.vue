<template>
    <div v-swiper:swiperRight='true' class="coupon content">
        <my-header title="优惠券" :goBack="true"><div class="turn-back" slot="left"><img class="icon-back" src="../../assets/img/back_left.png" alt=""></div></my-header>
        <div class="container-box">
            <my-title>
                <div class="tit-item" slot="left">
                    <span>时间</span><div class="select-box" @click="select('time')">{{selectedTime}}</div>
                </div>
                <div class="tit-item" slot="right">
                    <span>状态</span><div class="select-box" @click="select('state')">{{selectedState}}</div>
                </div>
            </my-title>
            <div class="container" ref="container">
                <!-- 未参加 -->
                <template v-if="totalCoupon == 0">
                    <my-noright type="absolute"><p slot="title">{{selectedTime}}已有<span>{{couponUsers}}</span>人参与了优惠券活动</p></my-noright>
                </template>
                <!-- 有数据 -->
                <template v-else-if="couponData.length>0">
                    <div class="content-wrap" v-infinite-scroll="loadBottomAjax" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
                        <div class="table-item" v-for="(val,index) in couponData" :key="index">
                            <table>
                                <tr>
                                    <td class="tit">主题</td>
                                    <td>{{val.name}}</td>
                                </tr>
                                <tr>
                                    <td class="tit">有效期</td>
                                    <td>{{val.effectivedAt | formatTime('yyyy-MM-dd')}}至{{val.expiredAt | formatTime('yyyy-MM-dd')}}</td>
                                </tr>
                                <tr>
                                    <td class="tit">已领取</td>
                                    <td><span>{{val.received}}</span>/{{val.total}}</td>
                                </tr>
                            </table>
                            <mt-button v-if="val.enabled && new Date(val.expiredAt).getTime()>new Date().getTime()" class="link-btn" type="primary" @click="seeDetails(val.cid)">查看详情</mt-button>
                            <mt-button v-else class="expired-btn" type="default" @click="hasExpired">已失效</mt-button>
                        </div>
                    </div>
                    <div class="bottomLoad" v-if="couponData.length > 0">
                        <div class="loading" v-show='bottomLoading'>加载中...</div>
                        <div class="noData" v-if='bottomNoData'>没有更多的内容了</div>
                    </div>
                </template>
                <!-- 无数据 -->
                <template v-else>
                    <my-nodata type="absolute"></my-nodata>
                </template>
                <!-- 加载状态 -->
                <my-loading :visible="loading" :reload="init" type="absolute"></my-loading>
            </div>
        </div>
        <!-- 下拉选择内容 -->
        <mt-popup v-model="popupVisible" position="bottom">
            <mt-picker :slots="slots" ref='selectPicker' :showToolbar="true">
                <div class="picker-toolbar">
                    <span @click="hidePop" class="mint-datetime-action mint-datetime-cancel">取消</span> 
                    <span @click="confirmSelect" class="mint-datetime-action mint-datetime-confirm">确定</span>
                </div>
            </mt-picker>
        </mt-popup>
    </div>
</template>
<style lang="scss" scoped>
    .coupon{
        .container-box{
            padding-top: 50px;
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            .my-title{
                position: absolute;
                width: 100%;
                top: 0;
                left: 0;
                justify-content: center;
                .abs-m{
                    display: none;
                }
                .tit-item{
                    height: 31px;
                    line-height: 31px;
                    font-size: 0;
                    color: #324354;
                    font-family: $pingmedium;
                    margin:9px 15px 0;
                    span{
                        display: inline-block;
                        vertical-align: top;
                        font-size: 14px;
                        margin-right:0.266667rem;
                    }
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
                    }
                }
            }
            .content-wrap{
                padding:0 15px;
                .table-item{
                    padding:13px 0 25px;
                    border-bottom: 1px solid #e1e6eb;
                    text-align: center;
                    table{
                        font-family: $pingfang;
                        width: 100%;
                        text-align: left;
                        margin-bottom: 13px;
                        td{
                            color: #314453;
                            padding: 12px 0;
                            font-size: 13px;
                            color: #314453;
                            vertical-align: top;
                        }
                        .tit{
                            color: #587995;
                            width: 20%;
                        }
                    }
                    .link-btn{
                        width: 120px;
                        height: 36px;
                        font-size: 16px;
                        line-height: 30px;
                        font-family: $pingmedium;
                        border:1px solid #1c619c;
                        border-bottom-width:3px;
                        border-radius: 3px; 
                    }
                    .expired-btn{
                        width: 120px;
                        height: 36px;
                        line-height: 30px;
                        font-size: 16px;
                        font-family: $pingmedium;
                        background: #e6e6e6;
                        color: #b8c2cc;
                        border:1px solid #b8c2cc;
                        border-bottom-width:3px;
                        border-radius: 3px; 
                    }
                }
            }
        }
        .mint-popup-bottom{
            width: 100%;
        }
        .picker-toolbar{
            border-bottom: 1px solid #eaeaea;
        }
    }
</style>

<script>
    import { mapState,mapMutations,mapActions } from 'vuex'
    export default{
        name:'coupon',
        data(){
            return{
                slots:[{ //下拉框
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    textAlign: 'center'
                }],
                selectType:'time',//选择的类型
                selectedTime:'', //时间选择显示
                selectedState:'状态', //状态选择显示
                popDataObj:{time:['一天内','一周内','近半月','近一月','近三月','全部'],state:['状态','投放中','已失效']},
                popupVisible:false,
                paramTime:'',
                paramState:'',
                indexPage:1,
                totalCoupon:'',//优惠券总数
                couponUsers:'',//参加优惠券人数
                couponData:[],  //优惠券数据
                loading:false,  //点击信息加载状态
                bottomLock: false,      // 上滑开关
                bottomLoading: false,    // 底部loading
                bottomNoData: false,    // 底部nothing
                // code:'0361522841'
            }
        },
        methods:{
            ...mapActions('coupon',[
                'get_couponData',
                'get_couponUser',
                'get_couponLocation_cache'
            ]), 
            ...mapMutations('coupon',[
                'set_couponLocation'
            ]),
            select(val){
                this.slots[0].values = this.popDataObj[val];
                this.popupVisible = true;
                this.selectType = val;
            },
            hidePop(){
                this.popupVisible = false;
            },
            confirmSelect(){
                if(this.selectType == 'time'){
                    this.selectedTime = this.$refs.selectPicker.getValues()[0];
                }else if(this.selectType == 'state'){
                    this.selectedState = this.$refs.selectPicker.getValues()[0];
                }
                this.popupVisible = false;
            },
            init(){
                this.loading = 'loading';
                this.indexPage = 1;
                this.bottomLoading = false;
                this.bottomNoData = false;
                if(this.totalCoupon == 0 || this.totalCoupon==''){
                    let params = {
                        code:this.code,
                        index:this.indexPage,
                        size:20,
                        time:null,
                        enabled:null
                    }
                    this.get_couponData(params) //验证是否开通优惠券
                    .then(res => {
                        this.totalCoupon = res.total;
                        if(res.total == 0){ //没开通优惠券时获取参加人数
                            this.get_ajaxUser(this.paramTime);
                            return;
                        }
                        this.getAjaxData(); //开通优惠券时获取优惠券列表
                    })
                    .catch(err => {
                        this.loading = 'error';
                    })
                }else{
                    this.getAjaxData();                
                }
            },
            loadBottomAjax(){ //加载更多
                this.bottomLock = true; // 上滑开关
                this.bottomLoading = true;
                this.getAjaxData();
            },
            getAjaxData(){ //加载列表主方法
                let params = {
                    code:this.code,
                    index:this.indexPage,
                    size:10,
                    time:this.paramTime,
                    enabled:this.paramState
                }
                this.get_couponData(params)
                .then(res => {
                    if(this.indexPage == 1){
                        this.couponData = res.items;
                    }else{
                        this.couponData.push(...res.items);
                    }
                    if(res.items.length>0){
                        this.indexPage++;
                        this.bottomLock = false;
                    }else{
                        if(this.indexPage!=1){
                            this.bottomLoading = false;
                            this.bottomNoData = true;
                        }
                    }
                    this.loading = false;
                })
                .catch(err => {
                    this.loading = 'error';
                })
            },
            handleLocation(type){
                if(type === 'get'){
                    this.get_couponLocation_cache();
                    this.$nextTick(()=>{
                        let scrollTop = this.couponLocation;
                        if(scrollTop>0){
                            this.$refs.container.scrollTop = scrollTop;
                        }
                    }) 
                }else if(type === 'set'){
                    let scrollTop = this.$refs.container.scrollTop;
                    this.set_couponLocation(scrollTop);
                }
            },
            get_ajaxUser(time){ // 加载参加人数
                let params = {time:time};
                this.get_couponUser(params)
                .then(res=>{
                    this.couponUsers = res;
                    this.loading = false;
                })
                .catch(err => {
                    this.loading = 'error';
                })
            },
            seeDetails(val){  //查看详情
                this.$router.push({path:'/couponinfo',query:{cid:val}});
            },
            hasExpired(){ // 提示已失效
                this.$toast('当前优惠券已失效！')
            }
        },
        computed:{
            ...mapState('coupon',[
                'couponLocation'
            ]),
            code:function(){
                return this.$store.state.index.user.traderCode;
            },
            optionTime:function(){//生成时间选择参数
                let arr = [];
                let date = new Date().getDate();
                let month = new Date().getMonth();
                arr[0] = new Date().setDate(date-1);
                arr[1] = new Date().setDate(date-7);
                arr[2] = new Date().setDate(date-15);
                arr[3] = new Date().setMonth(month-1);
                arr[4] = new Date().setMonth(month-3);
                arr = arr.map(val=>{
                    return new Date(val).getFullYear()+'-'+(new Date(val).getMonth()+1)+'-'+new Date(val).getDate();
                }) 
                arr.push(null);
                return arr;
            }
        },
        watch:{
            selectedTime(newval){
                let index = this.popDataObj.time.indexOf(newval);
                this.paramTime = this.optionTime[index];
                this.init();
            },
            selectedState(newval){
                let arr = [null,true,false];
                let index = this.popDataObj.state.indexOf(newval);
                this.paramState = arr[index];
                this.init();
            }
        },
        created(){
            this.selectedTime = '近一月';
            this.selectedState = '状态';
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if(from.name == 'couponinfo'){
                    vm.handleLocation('get');
                }
            })
        },
        beforeRouteLeave (to, from, next) {
            if(to.name == 'couponinfo'){
                this.handleLocation('set')
            }
            next();
        }
    }
</script>