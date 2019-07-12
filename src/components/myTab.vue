<template>
    <div id="my-tab" >
        <div v-for="(val,index) in tabInfo" :key="index" :id="val.id" @click="tabClick(val.id)" :class="{'item':true,'selected':selected === val.id}">
            <span >{{val.title}}</span>    
            <em class="label"></em>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        tabInfo:Array,
        value:String
    },
    data(){
        return{
            selected:this.value
        }
    },
    methods:{
        tabClick:function(val){
            this.selected = val;
        }
    },
    watch:{
        value(val){
            this.selected = val;
        },
        selected(val,old){
            this.$emit('input',val)
        }
    }
}
</script>
<style lang="scss" scoped>
    $pingfang1: 'PingFang-SC-Medium';
    $pingfang2: 'PingFang-SC-Bold';
    #my-tab{
        width:100%;
        height: 50px;
        line-height: 50px;
        background: #f5f7fa;
        font-size: 0;
        box-sizing: border-box;
        text-align: center;
        .item{
            padding-top: 17px;
            cursor: pointer;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            -webkit-tap-highlight-color: transparent;
            display: inline-block;
            margin:0 15px;
            height: 50px;
            position: relative;
            span{
                display: inline-block;
                font-size: 16px;
                font-family: $pingfang1;
                color: #324354;
                line-height: 1;
                vertical-align: top;
            }
            .label{
                position: absolute;
                height: 3px;
                width: 20px;
                border-radius: 2px;
                background: #eeb822;
                bottom: 0;
                left: 50%;
                margin-left: -10px;
                display: none;
            }
            &.selected{
                span{
                    font-family: $pingfang2;
                }
                .label{
                    display: block;
                }
            }

        }
    }
</style>

