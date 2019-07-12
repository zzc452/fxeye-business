<template>
    <div class="no-data" :class="type === 'absolute'? 'absolute': ''">
        <img src="../assets/img/no_date.png" alt="">
        <h4>无数据</h4>
    </div>
</template>
<style lang="scss" scoped>
    .no-data{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 222;
        padding-top:18%;
        text-align: center;
        &.absolute{
            position: absolute;
        }
        img{
            width: 4.0rem;
            height:auto;
            margin-bottom: 0.453333rem;
        }
        h4{
            font-size: 16px;
            color: #8aa6bf;
            font-family: $pingbold;
        }
    }
</style>
<script>
export default{
    props:{
        type: {
            type: String,
            default: 'fixed'
        }
    }
    
}
</script>
