<template>
    <div id="main">
        <router-view></router-view>
        <main-nav :fixed="true"></main-nav>
    </div>
</template>
<style lang="scss" scoped>
    #main{
        position: relative;
        height: 100%;
        width: 100%;
        padding-bottom: 49px;
    }
</style>
<script>
    import mainNav from '@/components/mainNav'
    export default{
        name:'mainPage',
        components:{
            mainNav
        }
    }
</script>