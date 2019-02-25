const api = require('../../../api/api')
const util = require('../../../utils/util')

Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        phoneNumber: {
            type: String,
            observer: function(newData, oldData){
                this.reDraw()
            }
        },
        styleBackgroundColor: { //背景颜色
            type: String,
            value: '#fff',
            observer: function(newData, oldData){
                this.reDraw()
            }
        },
        styleText:{ //文字样式
            type: Object,
            observer: function(newData, oldData){
                this.reDraw()
            }
        }
    },
    data:{
    },
    ready: function(){
        this.reDraw();
    },
    methods:{
        reDraw: function(){
            let data = this.data;
            let [style1,class2,style2,style3] = ["","","",""]
            if(data.styleBackgroundColor){
                style1 += "background-color:" + data.styleBackgroundColor + ";"
            }

            let styleText = util.deepObjectMerge({
                fontSize:"16px", color: "#2aa2c1", align:"center",
                bold:false, italic:false, underline:false, shadow:false
            },data.styleText)
            if(styleText.color){
                style3 += "color: "+ styleText.color +";"
            }
            if(styleText.fontSize){
                style3 += "font-size:" + styleText.fontSize + ";"
                style2 += "width:"+ (parseInt(styleText.fontSize)+4)+"px;" + "height:"+ (parseInt(styleText.fontSize)+4) +"px;"
            }
            if(styleText.align){
                switch(styleText.align){
                    case "right": {class2 += "text-r "; break;}
                    case "center": {class2 += "text-c "; break;}
                    default: { class2 += "text-l";}
                }
            }
            if(styleText.bold){
                class2 += "fontW "
            }
            if(styleText.italic){
                class2 += "fontI "
            }
            if(styleText.underline){
                class2 += "text-under "
            }
            if(styleText.shadow){
                class2 += "textS "
            }

            this.setData({
                style1,style2,style3,class2
            })
        },
        makeCall: function(e){ //打电话
            let that = this
            wx.makePhoneCall({
                phoneNumber: that.data.phoneNumber
            })
        }
    }
})