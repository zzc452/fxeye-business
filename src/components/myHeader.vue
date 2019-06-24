<template>
    <div class="myheader" :class="{'fixed':fixed}">
        <div class="top-bar">
            <div class="abs-l"><slot name="left"></slot></div>
            <div class="abs-m"><slot name="mid"></slot>{{title}}</div>
            <div class="abs-r"><slot name="right"></slot></div>
        </div>
    </div>
</template>
<script>
    export default{
        props:{
            fixed:{
                type:Boolean,
                default:true
            },
            title:String
        }
    }
</script>
<style lang="scss" scoped>
    $header-height: 45px;
    $tit-size:16px;
    .myheader{
        height: $header-height;
        position: relative;
        width: 100%;
        background-color: #fff;
        overflow: hidden;
        color: #314453;
        &.fixed{
            position: fixed;
            top:0;
            left:0;
            z-index: 220;
        }
        .top-bar{
            height: $header-height;
            user-select: none;
            display: flex;
            align-items: center;
        }
        a{
            text-decoration: none;
            display: table-cell;
            width: $header-height;
            height: $header-height;
            color: inherit;
            vertical-align: middle;
        }
        .abs-l,.abs-r{
            width:$header-height;
            height: $header-height;
            text-align: center;
        }
        .abs-m{
            height: $header-height;
            flex: 1;
            font-family: 'PingFang-SC-Bold';
            text-align: center;
            padding: 0 5px;
            overflow: hidden;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
</style>
