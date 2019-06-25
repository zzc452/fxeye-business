<template>
    <div class="main-nav">
        <mt-tabbar v-model="selected" :fixed="fixed">
            <mt-tab-item id="home">
                <img v-if = "selected=='home'" slot="icon" src="../assets/img/homeOn.png">
                <img v-else slot="icon" src="../assets/img/home.png">
                首页
            </mt-tab-item>
            <mt-tab-item id="find">
                <img  v-if = "selected=='find'" slot="icon" src="../assets/img/findOn.png">
                <img v-else slot="icon" src="../assets/img/find.png">
                发现
            </mt-tab-item>
            <mt-tab-item id="sentiment" v-if="isLogin === true">
                <img v-if = "selected=='sentiment'" slot="icon" src="../assets/img/sentimentOn.png">
                <img v-else slot="icon" src="../assets/img/sentiment.png">
                舆情
            </mt-tab-item>
            <mt-tab-item id="mine">
                <img v-if = "selected=='mine'" slot="icon" src="../assets/img/mineOn.png">
                <img v-else slot="icon" src="../assets/img/mine.png">
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>    
</template>
<style lang="scss">
    $nav-height:48px;
    $fz-color:#8a9199;
    .main-nav{
        color: $fz-color;
        font-family: 'PingFang-SC-Bold';
        background: #fff;
        .mint-tabbar{
            border-top:1px solid #eaeff3;
            height:$nav-height;
            z-index: 223;
            background: none;
            .mint-tab-item{
                padding: 6px 0 0;
                text-align: center;
                .mint-tab-item-icon{
                    height: 22px;
                    margin-bottom: 3px;
                }
                img{
                    width: 22px;
                    height: 22px;
                    
                    vertical-align: top;
                }
                .mint-tab-item-label{
                    font-size: 10px;
                    
                    color: $fz-color;
                }
                &.is-selected{
                    background:none;
                }
                &.is-selected .mint-tab-item-label{
                    color: #324354;
                }
            }
        }
    }
</style>

<script>
    import cache from '../../utils/cache'
    export default{
        data(){
            return{
                selected:'home',
                isLogin:true
            }
        },
        props:{
            fixed:{
                type:Boolean,
                default:true
            },
            value: {}
        },
        watch:{
            selected(val,old){
                this.$router.push(
                    {name:val}
                );
                cache.setSession('index_nav', val);
            }
        },
        methods:{
            
        },
        created(){
            let val = cache.getSession('index_nav');
            if(val){
                this.selected = val;
            }
        }
    }
</script>