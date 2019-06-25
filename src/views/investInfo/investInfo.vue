<template>
    <div v-swiper:swiperRight='true' class="invest-detail content">
        <my-header :title='headerTitle'><div class="turn-back" @click="turnBack" slot="left"><img class="icon-back" src="../../assets/img/back_left.png" alt=""></div> <img class="icon-logo" slot="mid" :src="imgsrc" alt=""></my-header>
        <div class="container">
            <div class="container-wrap">
                <my-title title="投放媒体&时间"></my-title>
                <ul class="detail-list">
                    <li v-for="(item,index) in dataJson">
                        <div class="logopic-box">
                            <img :src="`http://fxeye.net/content/images/m4/${item.MediaId}.png`" alt="">
                            <span>{{item.Month}}</span>
                        </div>
                        <p>{{item.MediaName}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import myHeader from '@/components/myHeader'
    import myTitle from '@/components/myTitle'
    import {mapState,mapMutations,mapActions} from 'vuex'
    export default{
        components:{
            myHeader,
            myTitle,
        },
        data(){
            return{
                imgsrc:'/img/default_smallLogo.png',
                headerTitle:'嘉盛集团',
                loading:false,
                tradercode:'',
                dt:'',
                dataJson:''
            }
        },
        computed:{
            ...mapState('detail',[
                'location'
            ])
        },
        // watch: {
        //     $route(val) {
        //         if (val.params.tradercode && val.params.dt) {
        //             this.init() // 自己调用自己，重新初始化
        //         }
        //     }
        // },
        created(){
            this.init()
        },
        methods:{
            ...mapMutations('detail',[
                'set_location'
            ]),
            ...mapActions('detail',[
                'get_investDetailData'
            ]),
            init:function(){
                this.tradercode = this.$route.query.tradercode;
                this.dt = this.$route.query.dt;
                this.loading = 'loading'
                let params = {
                    'tradercode': this.tradercode,
                    'dt': this.dt
                }
                this.get_investDetailData(params)
                .then(res => {
                    if (res) {
                        this.dataJson = res
                        this.handleLocaltion('get')
                    }
                    this.loading = false
                })
                .catch(err => {
                    console.log(err)
                    this.loading = 'error'
                })
            },
            turnBack:function(){
                this.$router.go(-1);
            },
            handleLocaltion(type) {
                if (type === 'get') {
                    this.$nextTick(() => {
                        if (this.location) {
                            document.documentElement.scrollTop = this.location[this.tradercode];
                        }
                    })
                } else if (type === 'set') {
                    this.location[this.tradercode] = document.documentElement.scrollTop
                    this.set_location(this.location)
                }
            }
        }
    }
</script>
<style lang="scss">
    $font-family: 'PingFang-SC-Bold';
    .invest-detail{
        padding-top: 45px;
        .turn-back{
            cursor: pointer;
        }
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
