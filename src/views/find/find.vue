<template>
  <div id="page_find" class="content">
    <my-header :title="title"></my-header>
    <div class="container">
      <div class="item-box">
        <mt-cell title="开户记录" to="/record" is-link></mt-cell>
        <mt-cell title="赞助记录" to="/sponsor" is-link></mt-cell>
      </div>
      <div class="item-box">
        <mt-cell title="数据统计" :to="links['statistics']" is-link></mt-cell>
        <mt-cell title="投放监测" :to="links['invest']" is-link></mt-cell>
        <mt-cell title="IB直通车" :to="links['ibdirect']" is-link></mt-cell>
      </div>
      <div class="item-box">
        <mt-cell title="优惠券" :to="links['coupon']" is-link></mt-cell>
        <mt-cell title="付费点击" :to="links['feetab']" is-link></mt-cell>
      </div>
    </div>
  </div>
</template>
<script>

export default {
};
</script>
<style lang="scss">
$cell-height: 55px;
$font-family: "PingFang-SC-Bold";
.item-box {
  border-top: 10px solid #f5f7fa;
  .mint-cell {
    height: $cell-height;
    line-height: $cell-height;
    border-top: 1px solid #e1e6eb;
    &:last-child {
      border-bottom: 1px solid #e1e6eb;
      background: none;
    }
    .mint-cell-wrapper {
      padding: 0 15px;
      font-size: 16px;
      color: #324354;
      font-family: $font-family;
      background: none;
      .mint-cell-allow-right::after {
        right: 15px;
        width: 7px;
        height: 7px;
        border-color: #b8c2cc;
      }
    }
  }
}
</style>
<script>
export default {
  name: "pageFind",
  data() {
    return {
      title: "发现",
      links: {
        invest: {
          //投放监测
          name: "invest"
        },
        ibdirect: {
          //ib直通车
          name: "ibdirect"
        },
        feetab: {
          //付费点击
          name: "feetab"
        },
        statistics: {
          //数据统计
          name: "statistics"
        },
        coupon: {
          //优惠券
          name: "coupon"
        }
      }
    };
  }
};
</script>