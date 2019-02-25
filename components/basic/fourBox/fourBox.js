const api = require('../../../api/api')
const util = require('../../../utils/util')
const event = require('../../../utils/event')

Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties:{
        dataList: {
            type: Array,
            value: []
        },
        styleBackgroundColor: { //背景颜色
            type: String,
            value: '#fff',
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
        styleText:{ //文字样式
            type: Object,
            observer: function(newData, oldData){
                this.reDraw()
            }
        },
        styleBox:{
            type: Object,
            observer: function(newData, oldData){
                this.reDraw()
            }
        }
    },
    data: {
        imgHost: api.imgHost,
        stylePhoto:{
            width:"100%"
        }
    },
    ready: function(){
        this.reDraw();
    },
    methods: {
        reDraw: function(){
            let data = this.data;
            let [style1,style2,class2] = ["","",""]
            if(data.styleBackgroundColor){
                style1 += "background-color:" + data.styleBackgroundColor + ";"
            }

            let stylePadding = util.deepObjectMerge({
                top: "16px", bottom: "16px", left: "16px", right: "16px"
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

            this.setData({
                myStyleText: util.deepObjectMerge({
                    color: "#000", fontSize: "12px", align: "center", lineHeight:1,
                    bold: false, italic: false, underline: false
                },data.styleText)
            })

            let styleBox = util.deepObjectMerge({
                paddingTop: "8px", paddingBottom: "8px", paddingLeft: "8px", paddingRight: "8px",
                borderStyle: "solid", borderWidth: "1px", borderColor: "#ddd",
                shadow: false, radius: false
            }, data.styleBox)
            if(util.isObjNotBlank(styleBox)){
                if(styleBox.paddingLeft){
                    style2 += "padding-left:" + styleBox.paddingLeft +";"
                }
                if(styleBox.paddingRight){
                    style2 += "padding-right:" + styleBox.paddingRight +";"
                }
                if(styleBox.paddingTop){
                    style2 += "padding-top:" + styleBox.paddingTop +";"
                }
                if(styleBox.paddingBottom){
                    style2 += "padding-bottom:" + styleBox.paddingBottom +";"
                }
                if(styleBox.borderStyle){
                    style2 += "border-style:" + styleBox.borderStyle +";"
                }
                if(styleBox.borderWidth){
                    style2 += "border-width:" + styleBox.borderWidth +";"
                }
                if(styleBox.borderColor){
                    style2 += "border-color:" + styleBox.borderColor +";"
                }
                if(styleBox.shadow){
                    class2 += "boxS "
                }
                if(styleBox.radius){
                    class2 += "img-circle2 "
                }
            }

            this.setData({
                style1: style1, style2: style2,
                class2: class2
            })
        }
    }

})