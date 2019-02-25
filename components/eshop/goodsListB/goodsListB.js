const api = require('../../../api/api')
const util = require('../../../utils/util')
const event = require('../../../utils/event')

Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties:{

    },
    data: {
        imgHost: api.imgHost,
        offGoods: []
    },
    ready: function(){
        this.getGoods()
    },
    methods: {
        getGoods: function(){
            let that = this;
            util.request(api.eshopPromotionGoodsList).then(function(res){
                if (res.errno === 0) {
                    let myGoods = []
                    myGoods = myGoods.concat(res.data.filter(p => p.is_on_sale==1))
                    that.setData({
                        offGoods: myGoods
                    });
                }
            });
        }

    }
})