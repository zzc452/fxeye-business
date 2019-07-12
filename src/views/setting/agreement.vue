<template>
    <div v-swiper:swiperRight='true' class="aboutus-page content">
        <my-header title="服务协议" :goBack="true">:goBack="true"><div class="turn-back" slot="left"><img class="icon-back" src="../../assets/img/back_left.png" alt=""></div></my-header>
        <div class="container">
            <p>欢迎您免费/购买使用外汇天眼软件产品，我们将竭诚为您提供更全面、更优质的服务。根据中华人民共和国《合同法》、《著作权法》、《计算机软件保护条例》等法律法规的规定，我们确定了本协议内容，供双方共同恪守执行。本协议适用于公司销售的全部软件产品。在您购买之前，请先仔细阅读本协议的条款。您在购买程序过程中点击"我同意协议"按钮即表示您与公司达成协议，视为您已了解并完全接受本协议项下的全部条款。</p>
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
