const api = require('../../../api/api')
const util = require('../../../utils/util')
const event = require('../../../utils/event')

Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties:{
        bar: {
            type: Object,
            observer: function(newData, oldData){
                this.reDraw()
            }
        }
    },
    data: {
        imgHost: api.imgHost
    },
    ready: function() {
        this.reDraw()
    },
    methods: {
        reDraw: function(){

        },
        switchTab: function(e){
            let active = e.currentTarget.dataset.active
            if(active){
                return false
            }

            let url = e.currentTarget.dataset.url
            wx.redirectTo({
                url: url
            })
        }
    }
});