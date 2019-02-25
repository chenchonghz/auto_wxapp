import regeneratorRuntime from '../../../../static/js/regenerator-runtime';
const api = require('../../../../api/api')
const util = require('../../../../utils/util')
const app = getApp()

Page({
    data: {
        addressList: [],
    },
    onLoad: function (options) {
    },
    onShow: function () {
        // 页面显示
        this.getAddressList();
    },
    getAddressList: async function(){ //地址列表
        let that = this;
        let res = await util.request(api.eshopAddressList)
        if (res.errno === 0) {
            that.setData({
                addressList: res.data
            });
        }
    },
    addAddress: function(e){ //新建
        wx.navigateTo({
            url: '/pages/eshop/ucenter/addressAdd/addressAdd'
        })
    },
    updateAddress: function(e){ //修改
        wx.navigateTo({
            url: '/pages/eshop/ucenter/addressAdd/addressAdd?id=' + e.currentTarget.dataset.addressId
        })
    },
    selectAddress: function(e){ //选择地址
        wx.setStorageSync('addressId', e.currentTarget.dataset.addressId);
        wx.navigateBack({
            url: '/pages/eshop/shopping/checkout/checkout'
        });
    }
})