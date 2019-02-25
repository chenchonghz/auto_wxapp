import regeneratorRuntime from '../../../../static/js/regenerator-runtime';
const api = require('../../../../api/api')
const util = require('../../../../utils/util')
const order = require('../../../../api/order.js');
const app = getApp()


Page({
    data: {
        orderList: [],
        tabList:[
            {code:0, label:"待付款"},
            {code:201, label:"待发货"},
            {code:300, label:"待收货"},
            {code:301, label:"待评价"},
            {code:400, label:"退款"}
        ],
        currentTab: 0,
        currentPage: 1,
        totalPages: 1,
        touchMove:{
            touchStartDot: 0,
            touchEndDot: 0,
            touchDiff:0,
            time: 0
        }
    },
    onLoad: async function (opt) {
        console.log("进入index携带参数:"+ JSON.stringify(opt))

        await app.loadTarbar(); //加载底部导航
    },
    onShow: function(e){
        let that = this
        this.setData({
            currentPage: 1,
            orderList: [],
            currentTab: that.data.currentTab
        })
        this.getOrderList(1);
    },
    clickTab: function(e){ //点击切换tab页
        if (this.data.currentTab === e.currentTarget.dataset['current']) {
            return false;
        } else {
            this.setData({
                currentPage: 1,
                orderList: [],
                currentTab: util.data(e, 'current')
            })
            this.getOrderList(1)
        }
    },
    getOrderList: function(currentPage){ //获取订单
        let that = this;
        wx.showLoading({
            title: '加载中...'
        });
        util.request(api.eshopOrderList, {page: currentPage, size: 10, type: that.data.currentTab}).then(function(res){
            if (res.errno === 0) {
                if(res.data.data.length > 0){
                    that.setData({
                        orderList: that.data.orderList.concat(res.data.data),
                        currentPage: currentPage,
                        totalPages: res.data.totalPages
                    });
                }
                wx.hideLoading();
            }
        })
    },
    onReachBottom: async function(){ //上拉加载更多
        let that = this;
        let currentPage = this.data.currentPage;
        // 显示加载图标
        this.getOrderList(currentPage + 1)
    },
    payOrder: function(e){ //去付款
        let that = this;
        let orderIndex = util.data(e, 'orderIndex');
        let cur_order = that.data.orderList[orderIndex];
        wx.redirectTo({
            url: '/pages/eshop/pay/pay?orderId=' + cur_order.id + '&actualPrice=' + cur_order.actual_price,
        })
    },
    cancelOrder: function(e){
        let that = this;
        let orderIndex = util.data(e, 'orderIndex');
        let cur_order = that.data.orderList[orderIndex];
        order.cancelOrder(cur_order.id, cur_order.order_status)
    },
    confirmOrder: function(e){
        let that = this;
        let orderIndex = util.data(e, 'orderIndex');
        let cur_order = that.data.orderList[orderIndex];
        order.confirmOrder(cur_order.id, cur_order.order_status)
    },
    deleteOrder: function(e){

    },
    commentOrder: function(e){
        let that = this;
        let orderIndex = util.data(e, 'orderIndex');
        let cur_order = that.data.orderList[orderIndex];
        order.commentOrder(cur_order.id)
    },
    returnOrder: function(e){

    },
    // buyOrder: function(e){
    //     let that = this;
    //     let orderIndex = util.data(e, 'orderIndex');
    //     let cur_order = that.data.orderList[orderIndex];
    // }
})