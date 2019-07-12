<template>
    <div v-swiper:swiperRight='true' class="invest-online-info content">
        <my-header :title='headerTitle' :goBack="true"><div class="turn-back" slot="left"><img class="icon-back" src="../../assets/img/back_left.png" alt=""></div> <img class="icon-logo" slot="mid" :src="headerLogo" alt=""></my-header>
        <div class="container">
            <div class="container-wrap">
                <my-title title="投放媒体&时间"></my-title>
                <ul class="detail-list">
                    <li v-for="(item,index) in dataJson" :key="index">
                        <div class="logopic-box">
                            <img :src="item.Logo" alt="">
                            <span>{{item.Month | formatTime('yyyy-MM')}}</span>
                        </div>
                        <p>{{item.MediaName}}</p>
                    </li>
                </ul>
            </div>
            <!-- 请求提示 -->
            <my-loading :visible='loading' :reload='init' type='absolute'></my-loading>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default{
        data(){
            return{
                defaultLogo:'/img/default_smallLogo.png',
                loading:false,
                tradercode:'',
                dt:'',
                dataJson:''
            }
        },
        created(){
            if (this.$route.query.tradercode && this.$route.query.dt) {
                this.init()
            }
        },
        computed: {
            headerTitle(){
                return this.$route.query.tradername;
            },
            headerLogo(){
                return this.$route.query.icon == '' || this.$route.query.icon == undefined ? this.defaultLogo :this.$route.query.icon;
            }
        },
        methods:{
            ...mapActions('detail',[
                'get_onlineData'
            ]),
            init(){
                this.tradercode = this.$route.query.tradercode;
                this.dt = this.$route.query.dt;
                this.loading = 'loading'
                let params = {
                    'tradercode': this.tradercode,
                    'dt': this.dt
                }
                this.get_onlineData(params)
                .then(res => {
                    if (res) {
                        this.dataJson = res
                    }
                    this.loading = false
                })
                .catch(err => {
                    console.log(err)
                    this.loading = 'error'
                })
            }
        }
    }
</script>
<style lang="scss">
    $font-family: 'PingFang-SC-Bold';
    .invest-online-info{
        padding-top: 45px;
        .icon-logo{
            width: 20px;
            height: 20px;
            vertical-align: top;
            margin-top:13px;
            margin-right: 5px;
            display: inline-block;
        }
        .detail-list{
            padding: 0.666667rem 15px;
            margin: 0 -0.16rem;
            font-family: $font-family;
            li{
                float: left;
                width:2.853333rem;
                overflow: hidden;
                margin:0 0.16rem 0.666667rem;
                text-align: center;
                .logopic-box{
                    position: relative;
                    width:100%;
                    height:1.6rem;
                    margin-bottom: 0.266667rem;
                    border:1px solid #dde6ec;
                    img{
                        display: block;
                        width:100%;
                        height:100%;
                    }
                }
                p{
                    font-size: 12px;
                    line-height: 1;
                    color: #587995;
                    overflow: hidden;
                    -ms-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                span{
                    position: absolute;
                    bottom:0;
                    right:0;
                    height: 12px;
                    line-height: 12px;
                    font-size: 10px;
                    color: #314453;
                    background: #dde6ec;
                    padding:0 3px;
                }
            }
        }
    }
</style>
