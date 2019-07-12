<template>
    <div v-swiper:swiperRight='true' class="aboutus-page content">
        <my-header title="关于我们" :goBack="true">:goBack="true"><div class="turn-back" slot="left"><img class="icon-back" src="../../assets/img/back_left.png" alt=""></div></my-header>
        <div class="container">
            <p>外汇天眼，FXEYE CO., LIMITED主办的一款外汇企业查询平台，旨在向用户提供外汇交易平台资料查询、监管查询、牌照查询、风险曝光、信用评价、平台鉴定、平台监控、投诉维权、信用报告下载以及关联平台查询等服务。</p>
            <p>外汇交易平台监管水平，由外汇天眼合规、稽核团队和天眼嗅探系统，通过监管分级标准、监管实际量值剥离模型、监管效用模型、监管异态预测模型等，对交易商监管水平作出定量级评估，依靠纯净的技术和纯净的数据，致力于帮助用户鉴别真假交易平台。</p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .aboutus-page .container{
        padding: 0 15px;
        p{
            font-size: 14px;
            line-height: 20px;
            font-family: $pingmedium;
            color: #324354;
            margin-top: 25px;
        }
    }
</style>
