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
        styleBorder: { //边框
            type: Object,
            observer: function(newData, oldData){
                this.reDraw()
            }
        },
        stylePadding: { //边距
            type: Object,
            observer: function(newData, oldData){
                this.reDraw()
            }
        },
        styleButton: { //按钮
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
            let [style1,style2,class1,class2] = ["","","",""]

            let stylePadding = util.deepObjectMerge({
                top: "16px", bottom: "16px",
                left: "16px", right: "16px"
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

            let styleBorder = util.deepObjectMerge({
                style: "solid", width: "1px", color: "#ddd"
            }, data.styleBorder)
            if(util.isObjNotBlank(styleBorder)){
                if(styleBorder.style){
                    style2 += "border-style: "+ styleBorder.style +";"
                }
                if(styleBorder.width){
                    style2 += "border-width: "+ styleBorder.width +";"
                }
                if(styleBorder.color){
                    style2 += "border-color: "+ styleBorder.color +";"
                }
            }

            let styleText = util.deepObjectMerge({
                color: "#fff", fontSize: "16px", lineHeight: 2.5,
                bold: false, italic: false, shadow: false,
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
                if(styleText.bold){
                    class2 += "fontW "
                }
                if(styleText.italic){
                    class2 += "fontI "
                }
                if(styleText.shadow){
                    class1 += "textS "
                }
            }

            let styleButton = util.deepObjectMerge({
                innerColor: "#14c58b", outerColor: "", //#fff
                opacity: 1,
                fixTop: false, fixBottom: false,
            }, data.styleButton)
            if(util.isObjNotBlank(styleButton)){
                if(styleButton.innerColor){
                    style2 += "background-color:" + styleButton.innerColor + ";"
                }
                if(styleButton.outerColor){
                    style1 += "background-color:" + styleButton.outerColor + ";"
                }
                if(styleButton.opacity){
                    style1 += "opacity:" + styleButton.opacity + ";"
                }
                if(styleButton.fixTop){
                    class1 += "fix-t "
                }
                if(styleButton.fixBottom){
                    class1 += "fix-b "
                }
            }

            this.setData({
                style1: style1, class1: class1,
                style2: style2, class2: class2,
            })
        },
        ...event.methods
    }

})