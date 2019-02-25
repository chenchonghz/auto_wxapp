//index.js
import regeneratorRuntime from '../../static/js/regenerator-runtime';
const app = getApp()
const api = require('../../api/api.js');
const util = require('../../utils/util.js')

Page({
  data: {
      structure: {
          navigationBarTitleText: "官网",
          sections: []
      }
  },
  onLoad: async function (opt) {
      console.log("进入index携带参数:"+ JSON.stringify(opt))
      this.data.templateId = opt.id;

      let that = this
      await this.getTemplate(); //加载模板
      wx.setNavigationBarTitle({
          title: that.data.structure.navigationBarTitleText
      })
      await app.loadTarbar(); //加载底部导航
  },
  getTemplate: async function(){
      try{
          let template = await util.request(api.getTemplate)
          this.setData({structure: template})
      }catch(e){
          console.error(e)
      }
  },
  myTap: function(){
      console.log(1111)
  }
})
