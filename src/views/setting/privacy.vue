<template>
    <div v-swiper:swiperRight='true' class="aboutus-page content">
        <my-header title="隐私政策" :goBack="true"><div class="turn-back" slot="left"><img class="icon-back" src="../../assets/img/back_left.png" alt=""></div></my-header>
        <div class="container">
            <p>访问者在接受本网站服务之前，请务必仔细阅读本声明。访问者访问本网站的行为以及通过各类方式利用本网站的行为，都将被视作是对本声明全部内容的无异议的认可。</p>
            <p>第一条访问者在从事与本网站相关的所有行为（包括但不限于访问浏览、利用、转载、宣传介绍）时，必须以善意且谨慎的态度行事；访问者不得故意或者过失的损害本网站的各类合法权益，不得利用本网站以任何方式直接或者间接的从事违反中华人民共和国法律、国际公约以及社会公德的行为。</p>
            <p>第二条本网站充分尊重数据原创作者的著作权和知识产权。本网站合理信赖客户上传原创数据到外汇天眼，您就是原创作者或是已经征得著作权人的同意并与著作权人就相关问题作出了妥善处理。本网站对于有关原创数据的买卖以及使用属于合理行为，因此与之有关的知识产权纠纷本网站不承担任何责任。本网站郑重提醒访问者：请在转载有关数据或者使用时一定要遵守相关的知识产权，否则与之有关的知识产权纠纷本网站免责。同时，对本网站原创数据以及本网站标识，本网站享有自主知识产权。侵犯本网站之知识产权的，本网站有权追究其法律责任。</p>
            <p>第三条本网站发布的各类数据，访问者在本网站发表的观点以及以链接形式推荐的其他网站内容，仅为提供更多信息以参考使用或者学习交流，并不代表本网站观点，也不构成任何销售建议。</p>
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
