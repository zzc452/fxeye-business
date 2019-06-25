<template>
    <div class="myheader" :class="{'fixed':fixed}">
        <div class="top-bar">
            <div class="abs-l"><slot name="left"></slot></div>
            <div class="abs-m"><slot name="mid"></slot><span class="label-txt">{{title}}</span></div>
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
    $font-family: 'PingFang-SC-Bold';
    $tit-size:16px;
    .myheader{
        height: $header-height;
        position: relative;
        width: 100%;
        background-color: #fff;
        overflow: hidden;
        color: #314453;
        font-size: $tit-size;
        border-bottom:1px solid #eaeff3;
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
        .abs-l{
            .icon-back{
                width:8px;
                height: 13px;
                vertical-align: top;
                margin-top:15px;
            }
        }
        .abs-m{
            height: $header-height;
            line-height: $header-height;
            flex: 1;
            font-family: $font-family;
            text-align: center;
            padding: 0 5px;
            overflow: hidden;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 600;
            font-size: 0;
            .label-txt{
                font-size: $tit-size;
            }
        }
    }
</style>
