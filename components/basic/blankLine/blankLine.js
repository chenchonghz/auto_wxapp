const api = require('../../../api/api')
const util = require('../../../utils/util')

Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        styleHeight:{
            type: String,
            value: "20px",
            observer: function(newData, oldData){
                this.reDraw()
            }
        },
        styleBackgroundColor:{
            type: String,
            value: '#eee',
            observer: function(newData, oldData){
                this.reDraw()
            }
        },
        styleBorderBottom:{
            type: Object,
            observer: function(newData, oldData){
                this.reDraw()
            }
        }
    },
    data:{},
    ready: function(){
        this.reDraw()
    },
    methods:{
        reDraw: function(){
            let data = this.data
            let myStyle = "";
            if(data.styleHeight){
                myStyle += "height:" + data.styleHeight + ";"
            }
            if(data.styleBackgroundColor){
                myStyle += "background-color:" + data.styleBackgroundColor + ";"
            }

            let styleBorderBottom = util.deepObjectMerge({
                style: "solid", width: "1px", color: "#ddd"
            }, data.styleBorderBottom)
            if(util.isObjNotBlank(styleBorderBottom)){
                if(styleBorderBottom.style){
                    myStyle += "border-bottom-style: "+ styleBorderBottom.style +";"
                }
                if(styleBorderBottom.width){
                    myStyle += "border-bottom-width: "+ styleBorderBottom.width +";"
                }
                if(styleBorderBottom.color){
                    myStyle += "border-bottom-color: "+ styleBorderBottom.color +";"
                }
            }
            this.setData({
                myStyle: myStyle
            })
        }
    }
})