import regeneratorRuntime from '../../../../static/js/regenerator-runtime';
const api = require('../../../../api/api')
const util = require('../../../../utils/util')
const pay = require('../../../../api/pay.js');
const app = getApp()

Page({
    data: {
        addressId: 0,
        checkedGoodsList: [], //商品列表
        checkedAddress: {}, //默认地址
        price:{
            goodsTotalPrice: 0.00, //商品总价
            freightPrice: 0.00,    //快递费
            couponPrice: 0.00,     //优惠券的价格
            orderTotalPrice: 0.00,  //订单总价
            actualPrice: 0.00,     //实际需要支付的总价
        },
        coupon:{ //优惠券
            desc: '',
            id: 0,
            code: ''
        },
        buyType: 'cart'
    },
    onLoad: function (options) {
        this.data.buyType = options.isBuy?'buy':'cart'
        app.globalData.userCoupon = 'NO_USE_COUPON'
        app.globalData.courseCouponCode = {}
    },
    onShow: function () {
        wx.showLoading({
            title: '加载中...',
        })
        this.getCouponData()
        this.getCheckoutInfo()
    },
    getCouponData: function () { //获取优惠券
        if (app.globalData.userCoupon == 'USE_COUPON') {
            this.setData({
                'coupon.desc': app.globalData.courseCouponCode.name,
                'coupon.id': app.globalData.courseCouponCode.user_coupon_id,
            })
        } else if (app.globalData.userCoupon == 'NO_USE_COUPON') {
            this.setData({
                'coupon.desc': "不使用优惠券",
                'coupon.id': '',
            })
        }
    },
    getCheckoutInfo: async function () { //获取订单信息
        let that = this;
        let addressId = wx.getStorageSync('addressId')
        addressId = addressId || that.data.addressId
        let res = await util.request(api.eshopCartCheckOut, { addressId: addressId, couponId: that.data.coupon.id, type: that.data.buyType })
        if (res.errno === 0) {
            that.setData({
                checkedGoodsList: res.data.checkedGoodsList,
                checkedAddress: res.data.checkedAddress,
                checkedCoupon: res.data.checkedCoupon || {},
                couponList:  res.data.couponList || [],
                'price.actualPrice': res.data.actualPrice,
                'price.couponPrice': res.data.couponPrice,
                'price.freightPrice': res.data.freightPrice,
                'price.goodsTotalPrice': res.data.goodsTotalPrice,
                'price.orderTotalPrice': res.data.orderTotalPrice
            })
            //设置默认收获地址
            if (that.data.checkedAddress.id){
                that.setData({ addressId: that.data.checkedAddress.id });
            }
        }
        wx.hideLoading();
    },
    selectAddress: function(){ //添加收货地址
        wx.navigateTo({
            url: '/pages/eshop/shopping/address/address'
        })
    },
    addAddress: function(){ //选择收货地址
        wx.navigateTo({
            url: '/pages/eshop/shopping/addressAdd/addressAdd'
        })
    },
    tapCoupon: function () { //选择优惠券
        let that = this
        wx.navigateTo({
            url: '../selCoupon/selCoupon?buyType=' + that.data.buyType,
        })
    },
    submitOrder: async function () { //付款
        if (!this.data.checkedAddress.id) {
            util.showErrorToast('请选择收货地址');
            return false;
        }
        let res = await util.request(api.eshopOrderSubmit, { addressId: this.data.addressId, couponId: this.data.coupon.id, type: this.data.buyType }, 'POST')
        if (res.errno === 0) {
            const orderId = res.data.orderInfo.id;
            //支付 TODO
            console.log(res.data)
            pay.payOrder(parseInt(orderId)).then(res => {
                wx.redirectTo({
                    url: '/pages/eshop/payResult/payResult?status=1&orderId=' + orderId
                });
            }).catch(res => {
                wx.redirectTo({
                    url: '/pages/eshop/payResult/payResult?status=0&orderId=' + orderId
                });
            })
        }else{
            util.showErrorToast('下单失败');
        }
    }
})