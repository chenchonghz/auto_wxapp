import regeneratorRuntime from '../../../../static/js/regenerator-runtime';
const app = getApp()

Page({
    data: {
        userInfo: {}
    },
    onLoad: async function (opt) {
        console.log("进入index携带参数:"+ JSON.stringify(opt))

        await app.loadTarbar(); //加载底部导航
    },
    onShow: function () {
        let userInfo = wx.getStorageSync('userInfo');
        let token = wx.getStorageSync('token');
        if (userInfo && token) {
            app.globalData.userInfo = userInfo;
            app.globalData.token = token;
        }
        this.setData({
            userInfo: app.globalData.userInfo
        });
    },
    exitLogin: function(){ //退出登录
        wx.showModal({
            title: '',
            confirmColor: '#b4282d',
            content: '您确定要退出登录吗？',
            success: function (res) {
                if (res.confirm) {
                    wx.removeStorageSync('token');
                    wx.removeStorageSync('userInfo');
                    wx.switchTab({
                        url: '/pages/index/index'
                    });
                }
            }
        })
    }
})