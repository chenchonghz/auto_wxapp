var util = require('../../../../utils/util.js');
var api = require('../../../../api/api.js');
var order = require('../../../../api/order.js');

Page({
  data: {
    orderId: 0,
    orderInfo: {},
    orderGoods: [],
    handleOption: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.id
    });
    this.getOrderDetail();
  },
  getOrderDetail: function() { //获取订单详情
    let that = this;
    util.request(api.eshopOrderDetail, { orderId: that.data.orderId }).then(function (res) {
      if (res.errno === 0) {
        console.log(res.data);
        that.setData({
          orderInfo: res.data.orderInfo,
          orderGoods: res.data.orderGoods,
          handleOption: res.data.handleOption
        });
        //that.payTimer();
      }
    });
  },
  // payTimer() {
  //   let that = this;
  //   let orderInfo = that.data.orderInfo;
  //
  //   setInterval(() => {
  //     console.log(orderInfo);
  //     orderInfo.add_time -= 1;
  //     that.setData({
  //       orderInfo: orderInfo,
  //     });
  //   }, 1000);
  // },
  payOrder: function() { //付款
    let that = this;
    let orderId = that.data.orderId
    order.payOrder(parseInt(orderId))
  },
  cancelOrder: function(){
    console.log('开始取消订单');
    let that = this;
    let orderInfo = that.data.orderInfo;
    order.cancelOrder(orderInfo.id, orderInfo.order_status)
  },
  confirmOrder: function() { //确认收货
    console.log('开始确认收货');
    let that = this;
    let orderInfo = that.data.orderInfo;
    order.confirmOrder(orderInfo.id, orderInfo.order_status)
  },
  commentOrder: function(e){
    let that = this;
    let orderInfo = that.data.orderInfo;
    order.commentOrder(orderInfo.id)
  }
})