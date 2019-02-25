import regeneratorRuntime from './static/js/regenerator-runtime';
const user = require('./api/user.js');
const api = require('./api/api.js');

const originalPage = Page
Page = function (config){
    config.data.staticImgHost = api.staticImgHost
    return originalPage(config)
}

const originalComponent = Component
Component = function (config){
    config.data && (config.data.staticImgHost = api.staticImgHost)
    return originalComponent(config)
}

App({
  onLaunch: async function (opt) {
      try{
          let res = await user.checkLogin()
          console.log('应用登录')
          this.globalData.userInfo = wx.getStorageSync('userInfo');
          this.globalData.token = wx.getStorageSync('token');
      }catch(e){
          console.log('登录态失效')
          wx.removeStorageSync('userInfo');
          wx.removeStorageSync('token');
      }

      if([1047,1048,1049].find(elm => elm===opt.scene) && opt.query.appId){
            //扫码进来的，且携带appId，就替换掉内置的appId
          this.globalData.appId = opt.query.appId
          console.log("分享进来的")
      }
      console.log(opt)
  },
  onLoad: function(opt){
      console.log(opt)
  },
  loadTarbar: async function(){ //获取自定义tarbar
      let _curPageArr = getCurrentPages();
      let _curPage = _curPageArr[_curPageArr.length - 1];
      let _pagePath = _curPage.__route__;
      if (_pagePath.indexOf('/') != 0) {
          _pagePath = '/' + _pagePath;
      }
      if(_curPage.data.templateId){
          _pagePath = _pagePath + "?id=" + _curPage.data.templateId;
      }

      let myTarbar = await this.getTarbar()
      let showTarbar = false;
      myTarbar.list.forEach(item => {
          item.active = false;
          if (item.pagePath === _pagePath) {
              item.active = true;//根据页面地址设置当前页面状态
              showTarbar = true;
          }
      })
      if(showTarbar){ //只显示tarbar里有的页面
          _curPage.setData({
              pageTarbar: myTarbar
          });
      }
  },
  getTarbar: async function() { //MOCK
      //如果全局变量里有就取，没有就再从后台取
      return {
          "color": "#000",
          "selectedColor": "#f00",
          "backgroundColor": "#fff",
          "borderStyle": "#ccc",
          "list": [
              {
                  "pagePath": "/pages/eshop/portal/portal",
                  "text": "商城",
                  "iconPath": "1388",
                  "selectedIconPath": "1384",
                  "active": true
              },
              {
                  "pagePath": "/pages/eshop/catalog/catalog",
                  "text": "分类",
                  "iconPath": "1383",
                  "selectedIconPath": "1386",
                  "active": false
              },
              {
                  "pagePath": "/pages/eshop/cart/cart",
                  "text": "购物车",
                  "iconPath": "1385",
                  "selectedIconPath": "1382",
                  "active": false
              },
              {
                  "pagePath": "/pages/eshop/ucenter/index/index",
                  "text": "我的",
                  "iconPath": "1385",
                  "selectedIconPath": "1382",
                  "active": false
              }
          ]
      }
  },
  globalData: {
      appId: "wx7dec91ed8acc9625", //写死
      userInfo: {
          nickName: 'Hi,游客',
          userName: '点击去登录',
          avatarUrl: 'https://platform-wxmall.oss-cn-beijing.aliyuncs.com/upload/20180727/150547696d798c.png'
      },
      token: '',
      userCoupon: 'NO_USE_COUPON'//默认不使用优惠券
  }
})