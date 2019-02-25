import regeneratorRuntime from '../../../static/js/regenerator-runtime';
const app = getApp()
const api = require('../../../api/api')
const user = require('../../../api/user')

Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties:{

    },
    data: {
        isShow: false,
        alertMsg: "小程序需要获得您的授权",
        buttonText: "好",
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        imgHost: api.imgHost
    },
    ready: function(){
        console.log('组件ready')
        let that = this;
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.userInfo']) {
                    that.setData({
                        alertMsg: "小程序需要获得您的授权",
                        buttonText: "好",
                        isShow: true
                    })
                }else{
                    // wx.getUserInfo({
                    //     withCredentials:true,
                    //     success: async function(res){
                    //         console.log(res)
                    //         let rres = await user.loginByWeixin(res)
                    //         if(rres.errno === 0){
                    //             that.setData({
                    //                 isShow: false
                    //             })
                    //             app.globalData.userInfo = rres.data.userInfo;
                    //             app.globalData.token = rres.data.token;
                    //         }
                    //     }
                    // })

                    let userInfo = wx.getStorageSync('userInfo')
                    let token = wx.getStorageSync('token')
                    if(!(userInfo && token)){
                        that.setData({
                            alertMsg: '登录超时',
                            buttonText: "点我自动登录",
                            isShow: true
                        })
                    }
                }
            }
        })
    },
    methods: {
        bindGetUserInfo: async function(e) {
            let userInfo = wx.getStorageSync('userInfo')
            let token = wx.getStorageSync('token')
            if (userInfo && token) {
                return;
            }

            if (e.detail.userInfo){ //用户按了允许授权按钮
                let res = await user.loginByWeixin(e.detail)
                if(res.errno === 0){
                    this.setData({
                        isShow: false
                    })
                    app.globalData.userInfo = res.data.userInfo;
                    app.globalData.token = res.data.token;
                }
            }else{ //拒绝授权
                wx.showModal({
                    title: '警告通知',
                    content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                    success: function (res) {
                        if (res.confirm) {
                            wx.openSetting({
                                success: async (res) => {
                                    if (res.authSetting["scope.userInfo"]) {
                                        let res = await user.loginByWeixin(e.detail)
                                        if(res.errno === 0){
                                            this.setData({
                                                isShow: false
                                            })
                                            app.globalData.userInfo = res.data.userInfo;
                                            app.globalData.token = res.data.token;
                                        }
                                    }
                                }
                            })
                        }
                    }
                })
            }
        },
        refuse: function(){

        }
    }
})