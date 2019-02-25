import regeneratorRuntime from '../../../static/js/regenerator-runtime';
var util = require('../../../utils/util.js');
var api = require('../../../api/api.js');
var app = getApp();

Page({
  data: {
      valueId: 0,
      commentList: [],
      currentPage: 1,
      currentTab: 0,
      totals:{}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      valueId: options.valueId
    });
    this.getCommentCount();
    this.getCommentList(1);
  },
  getCommentCount: function () {
      let that = this;
      util.request(api.eshopCommentCount, {valueId: that.data.valueId}).then(function (res) {
          if (res.errno === 0) {
              that.setData({
                  'totals.all': res.data[0].num,
                  'totals.good': res.data[1].num,
                  'totals.notBad': res.data[2].num,
                  'totals.bad': res.data[3].num,
                  'totals.hasPic': res.data[4].num,
                  'totals.favorableRating': (res.data[1].num/res.data[0].num * 100).toFixed(1),
                  'totals.totalStars': (res.data[1].num/res.data[0].num * 5).toFixed(1)
              });
          }
      });
  },
  getCommentList: function(page){
      let that = this;
      try{
          util.request(api.eshopCommentList, {valueId: that.data.valueId, type: that.data.currentTab, pageSize:10, page: page}).then(function(res){
              if(res.errno==0){
                  let list = res.data.data
                  if(list.length > 0){
                      that.setData({
                          currentPage: page,
                          commentList: that.data.commentList.concat(list)
                      })
                  }
              }
          })

      }catch(e){
          console.error(e)
      }
  },
  clickTab: function(e){ //点击切换tab页
      if (this.data.currentTab === util.data(e, 'current')) {
          return false;
      } else {
          this.setData({
              currentPage: 1,
              commentList: [],
              currentTab: util.data(e, 'current')
          })
          this.getCommentList(1)
      }
  },
  onReachBottom: async function(){ //上拉加载更多
     let currentPage = this.data.currentPage;
        // 显示加载图标
     wx.showLoading({
        title: '玩命加载中',
     })
     this.getCommentList(currentPage + 1)
     wx.hideLoading();
  },
  previewImage: function(e){ //预览图片
    wx.previewImage({
        urls: [util.data(e, 'url')]
    })
  },
  playVideo: function(e){ //播片
      app.globalData.currentVideoSrc = util.data(e, 'url')
      wx.navigateTo({
          url: "/pages/videoFull/videoFull"
      })
  }
})