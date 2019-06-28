<template>
    <div v-swiper:swiperRight='true' class="invest-offline-info content">
        <my-header :title="headerTitle" :goBack="true"><div class="turn-back" slot="left"><img class="icon-back" src="../../assets/img/back_left.png" alt=""></div> <img class="icon-logo" slot="mid" :src="headerLogo" alt=""></my-header>
        <div class="container">
            <div class="info-list">
                <div class="table-box" v-for="(val,index) in dataJson" :key="index">
                    <table>
                        <tr><td class="td1">主办媒体</td><td><img class="media-logo" :src="val.Logo" alt="">{{val.MediaName}}</td></tr>
                        <tr><td class="td1">类型</td><td>{{val.TypeName}}</td></tr>
                        <tr><td class="td1">时间</td><td>{{val.HoldTime | formatTime('yyyy年MM月')}}</td></tr>
                        <tr><td class="td1">地区</td><td>{{`${val.Country}-${val.City}`}}</td></tr>
                    </table>
                </div>
            </div>
            <my-loading :visible="loading" :reload='init'></my-loading>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    export default{
        data(){
            return{
                defaultLogo:'/img/default_smallLogo.png',
                tradercode:'',
                dt:'',
                dataJson:'',
                loading:false
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
            ...mapActions('detail', [
                'get_offlineData'
            ]),
            init(){
                this.tradercode = this.$route.query.tradercode;
                this.dt = this.$route.query.dt;
                this.loading = 'loading'
                let params = {
                    'tradercode': this.tradercode,
                    'dt': this.dt
                }
                this.get_offlineData(params)
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
        },
        created(){
            if (this.$route.query.tradercode && this.$route.query.dt) {
                this.init();
            }
        }
    }
</script>
<style lang="scss" scoped>
    .invest-offline-info{
        .icon-logo{
            width: 20px;
            height: 20px;
            vertical-align: top;
            margin-top:13px;
            margin-right: 5px;
            display: inline-block;
        }
        .container .info-list{
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
</style>
