<template>
    <div v-swiper:swiperRight='true' class="account-info-page content" >
        <my-header title="账号信息" :goBack="true"><div class="turn-back" slot="left"><img class="icon-back" src="../../assets/img/back_left.png" alt=""></div></my-header>
        <div class="container">
            <div class="info-box">
                <mt-cell title="账号">
                    <p class="info-text" slot="right">111222</p>
                </mt-cell>
                <mt-cell title="昵称">
                    <p class="info-text" slot="right">FX15848</p>
                </mt-cell>
                <mt-cell title="性别">
                    <p class="info-text" slot="right">男</p>
                </mt-cell>
                <mt-cell title="电话">
                    <p class="info-text" slot="right">（CN+0086）158****1548</p>
                </mt-cell>
            </div>
        </div>
        
    </div>
</template>
<style lang="scss">
.account-info-page .container{
    background: #f5f7fa;
    .info-box{
        padding-left: 15px;
        margin-top:10px;
        background: #fff;
        border-top:1px solid #e1e6eb;
        border-bottom:1px solid #e1e6eb;
    }
    .mint-cell{
        font-family: $pingmedium;
        height: 55px;
        font-size: 16px;
        border-bottom: 1px solid #e1e6eb;
        &:last-child{
            border-bottom: 0;
        }
        .mint-cell-wrapper{
            padding:0 0;
            color: #324354;            
        }
        .mint-cell-right{
            transform: translate3d(0, 0, 0);
        }
        .info-text{
            line-height: 55px;
            color: #b8c2cc;
            padding-right: 15px;
        }
    }
    
}
</style>