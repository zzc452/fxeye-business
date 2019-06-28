<template>
    <div id="page-sentiment" class="content">
        <my-header :title="headerTitle"></my-header>
        <div class="container-box">
            <div class="tit-box">
                <my-tab v-model="selected" :tabInfo="tabNav"></my-tab>
            </div>
            <mt-tab-container :swipeable='true' v-model="selected" >
                <mt-tab-container-item  v-for="(val,index) in tabNav" :id="val.id">
                    <div class="container">
                        <mt-cell v-for="n in 10" title="tab-container 1"></mt-cell>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    #page-sentiment{
        .container-box{
            position: relative;
            height: 100%;
            width: 100%;
            padding-top: 50px;
            .tit-box{
                width: 100%;
                position: absolute;
                top: 0;
            }
            .mint-tab-container,.mint-tab-container-wrap{
                height: 100%;
                width:100%;
            }
        }
    }
</style>
<script>
    export default{
        data(){
            return {
                headerTitle:'舆情监控',
                tabNav:[{
                    title:'舆情查看',
                    id:'yvqing'
                },{
                    title:'更新统计',
                    id:'gengxin'
                }],
                selected:'yvqing'
            }
        }
    }
</script>

