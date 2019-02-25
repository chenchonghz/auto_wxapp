const api = require('../../../api/api')
const util = require('../../../utils/util')
const event = require('../../../utils/event')

Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        // 弹窗标题
        src:{
            type: Number,
            value: 0,
        },
        stylePhoto: {
            type: Object,
            observer: function(newData, oldData){
                this.reDraw()
            }
        },
        ...event.props
    },
    data: {
        imgHost: api.imgHost
    },
    ready: function() {
        this.reDraw()
    },
    methods: {
        reDraw: function(){
            let data = this.data
            let [style2,style1,class2]= ["","",""]
            let stylePhoto = util.deepObjectMerge({
                width: "", height: "", shape: "rect",
                opacity: 1, radius: false,
                paddingTop : "", paddingBottom : "", paddingLeft : "", paddingRight : "",
                backgroundColor: "#fff"
            }, data.stylePhoto)
            if(stylePhoto.backgroundColor){
                style1 +="background-color:" + stylePhoto.backgroundColor +";"
            }
            if(stylePhoto.width){
                style2 +="width:" + stylePhoto.width +";"
            }
            if(stylePhoto.height){
                style2 +="height:" + stylePhoto.height +";"
            }
            if(stylePhoto.opacity){
                style1 +="opacity:" + stylePhoto.opacity +";"
            }
            if(stylePhoto.paddingTop){
                style1 +="padding-top:" + stylePhoto.paddingTop +";"
            }
            if(stylePhoto.paddingBottom){
                style1 +="padding-bottom:" + stylePhoto.paddingBottom +";"
            }
            if(stylePhoto.paddingLeft){
                style1 +="padding-left:" + stylePhoto.paddingLeft +";"
            }
            if(stylePhoto.paddingRight){
                style1 +="padding-right:" + stylePhoto.paddingRight +";"
            }
            if(stylePhoto.shape==="oval"){
                class2 += 'img-circle '
            }
            if(stylePhoto.radius){
                class2 += 'border-cir '
            }
            this.setData({
                style1: style1, style2: style2,
                class2: class2
            })
        },
        ...event.methods
    },
})