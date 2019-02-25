var util = require('../../../../utils/util.js');
var api = require('../../../../api/api.js');

var app = getApp();

Page({
  data: {
    typeId: 0,
    collectList: []
  },
  getCollectList() {
    let that = this;
    util.request(api.eshopCollect, { typeId: that.data.typeId }).then(function (res) {
      if (res.errno === 0) {
        console.log(res.data);
        that.setData({
          collectList: res.data
        });
      }
    });
  },
  onShow: function () {
    this.getCollectList();
  },
  openGoods(event) {
    
    let that = this;
    let goodsId = this.data.collectList[event.currentTarget.dataset.index].value_id;
    console.log(goodsId);

    //触摸时间距离页面打开的毫秒数  
    var touchTime = that.data.touch_end - that.data.touch_start;
    console.log(touchTime);
    //如果按下时间大于350为长按  
    if (touchTime > 350) {
      wx.showModal({
        title: '',
        content: '确定删除收藏吗？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确认');
            util.request(api.eshopCollectOrDelete, { typeId: that.data.typeId, valueId: goodsId}, 'POST').then(function (res) {
              if (res.errno === 0) {
                console.log(res.data);
                wx.showToast({
                  title: '删除成功',
                  icon: 'none',
                  duration: 2000
                });
                that.getCollectList();
              }
            });
          }
        }
      })
    } else {
      
      wx.navigateTo({
        url: '/pages/eshop/goods/goods?id=' + goodsId,
      });
    }  
  },
  //按下事件开始  
  touchStart: function (e) {
    let that = this;
    that.setData({
      touch_start: e.timeStamp
    })
    console.log(e.timeStamp + '- touch-start')
  },
  //按下事件结束  
  touchEnd: function (e) {
    let that = this;
    that.setData({
      touch_end: e.timeStamp
    })
    console.log(e.timeStamp + '- touch-end')
  }, 
})