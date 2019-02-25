var util = require('../../../../utils/util.js');
var api = require('../../../../api/api.js');
var app = getApp();

Page({
  data: {
    couponList: null,
    buyType: ''
  },
  onLoad: function (options) {
    this.data.buyType = options.buyType
    this.loadListData()
  },

  loadListData: function () {
    let that = this;
    util.request(api.eshopGoodsCouponList, { type: this.data.buyType }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          couponList: res.data
        });
      }
    });
  },

  /**
   * 点击不使用优惠券
   * 返回上一页
   */
  noUseCoupon: function () {
    app.globalData.userCoupon = 'NO_USE_COUPON'
    wx.navigateBack({
        delta: 1
    })
  },

  tapCoupon: function (e) {
    let item = e.currentTarget.dataset.item
    if (item.enabled==0) {
      return
    }
    app.globalData.userCoupon = 'USE_COUPON'
    app.globalData.courseCouponCode = item
    wx.navigateBack({
        delta : 1
    })
  }
})