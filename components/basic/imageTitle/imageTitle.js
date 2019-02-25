const api = require('../../../api/api')
const util = require('../../../utils/util')

Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties:{
        src:{
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        subtitle:{
            type: String,
            value: ''
        },
        stylePhoto:{
            type: Object,
            observer: function(newData, oldData){
                this.reDraw()
            }
        },
        styleTitle:{
            type: Object,
            observer: function(newData, oldData){
                this.reDraw()
            }
        },
        styleSubtitle:{
            type: Object,
            observer: function(newData, oldData){
                this.reDraw()
            }
        }
    },
    data: {
        myStylePhoto: {
            width:"100%"
        },
        myStyleTitle:{
            fontSize: "20px", color: "#fff",
            shadow: true, paddingBottom: "10px", backgroundColor: "transparent"
        },
        myStyleSubtitle:{
            fontSize: "14px", color: "#fff",
            shadow: true , backgroundColor: "transparent"
        }
    },
    ready: function(){
        this.reDraw();
    },
    methods: {
        reDraw: function(){
            let data = this.data

            this.setData({
                myStylePhoto: util.deepObjectMerge(data.myStylePhoto,data.stylePhoto),
                myStyleTitle: util.deepObjectMerge(data.myStyleTitle,data.styleTitle),
                myStyleSubtitle: util.deepObjectMerge(data.myStyleSubtitle,data.styleSubtitle)
            })

        }
    }

})