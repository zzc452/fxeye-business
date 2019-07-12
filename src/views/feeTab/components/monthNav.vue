<template>
    <div class="month-nav-box">
        <ul class="month-nav">
            <li v-for="(val,index) in monthNav" :key="index" :class="{'on':selectMonth == val}" @click="chooseMonth(val)">{{val | formatMonth}}</li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
.month-nav{
    font-size: 0;
    text-align: center;
    padding:25px 0 10px;
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
        &:first-child{
                border-top-left-radius: 0.08rem;
                border-bottom-left-radius: 0.08rem;
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
</style>
<script>
    export default{
        data(){
            return{
                selectMonth:''
            }
        },
        methods:{
            chooseMonth(val){
                this.selectMonth = val;
            }
        },
        watch:{
            selectMonth(newval,oldval){
                let year = new Date().getFullYear();
                let month = newval+1;
                let dt = year+'-'+month+'-1';
                let arr = [newval,dt];
                this.$emit('monthTab',arr);
            }
        },
        computed:{
            monthNav:function(){
                let currentDate = new Date()
                let currentMonth = currentDate.getMonth();
                let monthArr = [];
                for(let i=0;i<3;i++){
                    currentDate.setMonth(currentMonth-i);
                    monthArr[i] = currentDate.getMonth();
                }
                return monthArr;
            }
        },
        created(){
            this.selectMonth = this.monthNav[0];
        }
    }
</script>