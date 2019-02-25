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
        channel: []
    },
    ready: function(){
        this.getChannel()
    },
    methods: {
        getChannel: function(){
            let that = this;
            util.request(api.eshopChannel).then(function (res) {
                if (res.errno === 0) {
                    that.setData({
                        channel: res.data.channel
                    });
                }
            });
        }
    }
})