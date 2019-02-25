const api = require('../../../api/api')
const util = require('../../../utils/util')

Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        location:{
            type: Object,
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
        myLocation:{
            name: '',
            latitude: 0, //纬度
            longitude: 0, //经度
            scale: 18 //缩放比例
        }
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

            let myLocation = util.deepObjectMerge(this.data.myLocation, this.data.location)

            this.setData({
                style1,style2,style3,class2,
                myLocation
            })
        },
        openLocation: function(e){ //打开位置
            let that = this
            wx.openLocation({
                latitude: that.data.myLocation.latitude,
                longitude: that.data.myLocation.longitude,
                scale: that.data.myLocation.scale,
                address: that.data.myLocation.name
            })
        }
    }
})