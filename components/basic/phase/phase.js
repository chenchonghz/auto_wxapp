const api = require('../../../api/api')
const util = require('../../../utils/util')
const event = require('../../../utils/event')

Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        text:{
            type: String,
            value: ''
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
        },
        stylePadding:{ //内边距
            type: Object,
            observer: function(newData, oldData){
                this.reDraw()
            }
        },
        ...event.props
    },
    data:{},
    ready: function(){
        this.reDraw();
    },
    methods:{
        reDraw: function(){
            let data = this.data;
            let [style1,style2,class1,class2] = ["","","",""]
            if(data.styleBackgroundColor){
                style1 += "background-color:" + data.styleBackgroundColor + ";"
            }

            let stylePadding = util.deepObjectMerge({
                top: "12px", bottom: "12px",
                left: "20px", right: "20px"
            }, data.stylePadding)
            if(util.isObjNotBlank(stylePadding)){
                if(stylePadding.left){
                    style1 += "padding-left:" + stylePadding.left +";"
                }
                if(stylePadding.right){
                    style1 += "padding-right:" + stylePadding.right +";"
                }
                if(stylePadding.top){
                    style1 += "padding-top:" + stylePadding.top +";"
                }
                if(stylePadding.bottom){
                    style1 += "padding-bottom:" + stylePadding.bottom +";"
                }
            }

            let styleText = util.deepObjectMerge({
                color: "#000", fontSize: "16px", align: "left",
                bold: false, italic: false, underline: false, shadow: false,
                lineHeight: 1
            }, data.styleText)
            if(util.isObjNotBlank(styleText)){
                if(styleText.color){
                    style2 += "color: "+ styleText.color +";"
                }
                if(styleText.fontSize){
                    style2 += "font-size:" + styleText.fontSize + ";"
                }
                if(styleText.lineHeight){
                    style2 += "line-height: "+ styleText.lineHeight +";"
                }
                if(styleText.align){
                    switch(styleText.align){
                        case "right": {class1 += "text-r "; break;}
                        case "center": {class1 += "text-c "; break;}
                        default: { class1 += "text-l ";}
                    }
                }
                if(styleText.bold){
                    class2 += "fontW "
                }
                if(styleText.italic){
                    class2 += "fontI "
                }
                if(styleText.underline){
                    class1 += "text-under "
                }
                if(styleText.shadow){
                    class1 += "textS "
                }
            }

            this.setData({
                style1: style1, style2: style2,
                class1: class1, class2: class2
            })
        },
        ...event.methods
    }
})