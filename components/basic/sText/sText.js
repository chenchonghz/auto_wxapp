const api = require('../../../api/api')
const util = require('../../../utils/util')
const event = require('../../../utils/event')

Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties:{
        text:{
            type: String,
            value: ''
        },
        styleText: { //文字
            type: Object,
            observer: function(newData, oldData){
                this.reDraw()
            }
        },
        ...event.props
    },
    data: {},
    ready: function() {
        this.reDraw()
    },
    methods: {
        reDraw: function(){
            let data = this.data
            let [style2,style1,class1,class2]= ["","","",""]
            let styleText = util.deepObjectMerge({
                color: "#000", fontSize: "16px", align: "left",
                bold: false, italic: false, underline: false, shadow: false,
                paddingTop : "", paddingBottom : "", paddingLeft : "", paddingRight : "",
                backgroundColor: "#fff", lineHeight: 1
            }, data.styleText)
            if(styleText.color){
                style2 += "color: "+ styleText.color +";"
            }
            if(styleText.fontSize){
                style2 += "font-size:" + styleText.fontSize + ";"
            }
            if(styleText.align){
                switch(styleText.align){
                    case "right": {class2 += "text-r "; break;}
                    case "center": {class2 += "text-c "; break;}
                    default: { class2 += "text-l ";}
                }
            }
            if(styleText.lineHeight){
                style2 += "line-height:" + styleText.lineHeight + ";"
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
            if(styleText.backgroundColor){
                style1 +="background-color:" + styleText.backgroundColor +";"
            }
            if(styleText.paddingLeft){
                style1 += "padding-left:" + styleText.paddingLeft +";"
            }
            if(styleText.paddingRight){
                style1 += "padding-right:" + styleText.paddingRight +";"
            }
            if(styleText.paddingTop){
                style1 += "padding-top:" + styleText.paddingTop +";"
            }
            if(styleText.paddingBottom){
                style1 += "padding-bottom:" + styleText.paddingBottom +";"
            }
            this.setData({
                style1: style1, style2: style2,
                class1: class1, class2: class2
            })
        },
        ...event.methods
    }

})