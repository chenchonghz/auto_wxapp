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
        goods: []
    },
    ready: function(){
        this.getGoods()
    },
    methods: {
        getGoods: function(){
            let that = this;
            util.request(api.eshopCategoryGoodsList).then(function(res){
                if (res.errno === 0) {
                    let myCategory = []
                    res.data.categoryList.forEach(c => {
                        c.goodsList = c.goodsList.filter(p => p.is_on_sale==1)
                        if(c.goodsList.length>0){
                            myCategory.push(c)
                        }
                    })
                    that.setData({
                        goods: myCategory
                    });
                }
            });
        }

    }
})