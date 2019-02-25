var util = require('../../../utils/util.js');
var api = require('../../../api/api.js');
var pay = require('../../../api/pay.js');
var app = getApp();

Page({
  data: {
    status: false,
    orderId: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.orderId || 24, //支付失败默认订单号24
      status: options.status
    })
    if(options.status){
        this.updateSuccess()
    }
  },
  updateSuccess: function () { //修改订单状态为成功
    let that = this
    util.request(api.eshopOrderQuery, { orderId: this.data.orderId}).then(function(res){})
  },
  payOrder: function() { //重新支付
    pay.payOrder(parseInt(this.data.orderId)).then(res => {
      this.setData({
        status: true
      });
    }).catch(res =>{
      util.showErrorToast('支付失败,请联系客服');
    });
  }
})