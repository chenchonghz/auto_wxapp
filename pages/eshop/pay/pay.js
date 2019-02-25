var util = require('../../../utils/util.js');
var api = require('../../../api/api.js');
var pay = require('../../../api/pay.js');
var app = getApp();

Page({
  data: {
    orderId: 0,
    actualPrice: 0.00
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.orderId,
      actualPrice: options.actualPrice
    })
  },
  //向服务请求支付参数
  requestPayParam: function() {
    let that = this;
    let orderId = that.data.orderId
    pay.payOrder(parseInt(orderId)).then(res => {
        wx.redirectTo({
            url: '/pages/eshop/payResult/payResult?status=1&orderId=' + orderId
        })
    }).catch(res => {
        wx.redirectTo({
            url: '/pages/eshop/payResult/payResult?status=0&orderId=' + orderId
        })
    });
  },
  startPay: function() {
    this.requestPayParam();
  }
})