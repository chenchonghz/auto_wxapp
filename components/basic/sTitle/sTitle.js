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
        stylePadding:{ //内边距-上
            type: Object,
            observer: function(newData, oldData){
                this.reDraw()
            }
        },
        styleBorderBottom:{
            type: Object,
            observer: function(newData, oldData){
                this.reDraw()
            }
        },
        styleLineMark: {
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
            let [class2, class3, style1, style2, style3] = ["","","","",""]
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
                    style2 += "padding-bottom:" + stylePadding.bottom +";"
                }
            }

            let styleText = util.deepObjectMerge({
                color: "#000", fontSize: "16px", align: "left",
                bold: false, italic: false, underline: false, shadow: false
            }, data.styleText)
            if(util.isObjNotBlank(styleText)){
                if(styleText.color){
                    style3 += "color: "+ styleText.color +";"
                }
                if(styleText.fontSize){
                    style3 += "font-size:" + styleText.fontSize + ";"
                }
                if(styleText.align){
                    switch(styleText.align){
                        case "right": {class2 += "text-r "; break;}
                        case "center": {class2 += "text-c "; break;}
                        default: { class2 += "text-l ";}
                    }
                }
                if(styleText.bold){
                    class3 += "fontW "
                }
                if(styleText.italic){
                    class3 += "fontI "
                }
                if(styleText.underline){
                    class3 += "text-under "
                }
                if(styleText.shadow){
                    class3 += "textS "
                }
            }

            let styleBorderBottom = util.deepObjectMerge({
                style: "solid", width: "1px", color: "#ddd"
            }, data.styleBorderBottom)
            if(util.isObjNotBlank(styleBorderBottom)){
                if(styleBorderBottom.style){
                    style2 += "border-bottom-style: "+ styleBorderBottom.style +";"
                }
                if(styleBorderBottom.width){
                    style2 += "border-bottom-width: "+ styleBorderBottom.width +";"
                }
                if(styleBorderBottom.color){
                    style2 += "border-bottom-color: "+ styleBorderBottom.color +";"
                }
            }

            let styleLineMark = util.deepObjectMerge({
                style: "solid", width: "3px",
                color: "#c7d342", paddingLeft: "10px"
            }, data.styleLineMark)
            if(util.isObjNotBlank(styleLineMark)){
                if(styleLineMark.style){
                    style3 += "border-left-style: "+ styleLineMark.style +";"
                }
                if(styleLineMark.width){
                    style3 += "border-left-width: "+ styleLineMark.width +";"
                }
                if(styleLineMark.color){
                    style3 += "border-left-color: "+ styleLineMark.color +";"
                }
                if(styleLineMark.paddingLeft){
                    style3 += "padding-left: "+ styleLineMark.paddingLeft +";"
                }
            }

            this.setData({
                style1: style1, style2: style2,
                class3: class3, style3: style3
            })
        },
        ...event.methods
    },
})