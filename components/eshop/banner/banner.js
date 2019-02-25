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
        banner: []
    },
    ready: function(){
        this.getBanners()
    },
    methods: {
        getBanners: function(){
            let that = this;
            util.request(api.eshopBanners).then(function(res){
                if (res.errno === 0) {
                    let banner = res.data.banner //toFix
                    that.setData({
                        banner: banner
                    });
                }
            });
        }

    }
})