const api = require('../../../api/api')
const util = require('../../../utils/util')
const event = require('../../../utils/event')
const app = getApp()

Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties:{
        src: {
            type: String,
            value: '',
            observer: function(newData, oldData){
                this.reDraw()
            }
        },
        poster: {
            type: String,
            value: "false",
            observer: function(newData, oldData){
                this.reDraw()
            }
        },
        styleBackgroundColor: { //背景颜色
            type: String,
            value: 'transparent',
            observer: function(newData, oldData){
                this.reDraw()
            }
        },
        styleVideo: {
            type: Object,
            observer: function(newData, oldData){
                this.reDraw()
            }
        }
    },
    data: {
        isShowCoverView: true
    },
    ready: function() {
        this.reDraw()
    },
    methods: {
        reDraw: function(){
            let data = this.data
            let style = ""
            if(data.styleBackgroundColor){
                style += "background-color:" + data.styleBackgroundColor + ";"
            }
            let styleVideo = util.deepObjectMerge({
                marginTop: "5px", marginBottom: "5px",
                marginLeft: "5px", marginRight: "5px",
                width: '',
            }, data.styleVideo)
            if(util.isObjNotBlank(styleVideo)){
                if(styleVideo.marginLeft){
                    style += "margin-left:" + styleVideo.marginLeft +";"
                }
                if(styleVideo.marginRight){
                    style += "margin-right:" + styleVideo.marginRight +";"
                }
                if(styleVideo.marginTop){
                    style += "margin-top:" + styleVideo.marginTop +";"
                }
                if(styleVideo.marginBottom){
                    style += "margin-bottom:" + styleVideo.marginBottom +";"
                }
                if(styleVideo.width){
                    style += "width:" + styleVideo.width +";"
                }
            }

            this.setData({
                style: style
            })
        },
        playVideo: function(e){
            let that = this;
            app.globalData.currentVideoSrc = that.data.src
            wx.navigateTo({
                url: "/pages/videoFull/videoFull"
            })
        },

    }
});