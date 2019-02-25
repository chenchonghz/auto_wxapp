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
    deleteAddress: function(e){ //删除
        let that = this;
        wx.showModal({
            title: '',
            content: '确定要删除地址？',
            success: function (res) {
                if (res.confirm) {
                    let addressId = e.target.dataset.addressId;
                    util.request(api.eshopAddressDelete, { id: addressId }, 'POST').then(function (res) {
                        if (res.errno === 0) {
                            that.getAddressList();
                        }
                    });
                }
            }
        })
    }
})