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
            value: [],
            observer: function(newData, oldData){
                this.reDraw()
            }
        },
        styleHeight: {
            type: String,
            value: "417rpx",
            observer: function(newData, oldData){
                this.reDraw()
            }
        }
    },
    data: {},
    ready: function() {
        this.reDraw()
    },
    methods: {
        reDraw: function(){
            let data = this.data
            let [style1,style2] = ["",""]
            if(data.styleHeight){
                style1 += "height:" + data.styleHeight + ";"
                style2 = style1;
            }
            this.setData({
                style1, style2
            })
        }
    }
});