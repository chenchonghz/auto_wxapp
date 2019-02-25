var util = require('../../../../utils/util.js');
var api = require('../../../../api/api.js');
var app = getApp();

Page({
  data: {
    couponList: []
  },
  onLoad: function (options) {
    this.loadListData()
  },
  loadListData: function () {
    let that = this;

    util.request(api.eshopCouponList).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          couponList: res.data
        });
      }
    });
  }
})