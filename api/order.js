const util = require('../utils/util.js');
const api = require('./api.js');
const pay = require('./pay.js');

const payOrder = order_id => {
    pay.payOrder(order_id).then(res=>{
        wx.redirectTo({
            url: '/pages/eshop/payResult/payResult?status=1&orderId=' + order_id
        })
    }).catch((res)=>{
        wx.redirectTo({
            url: '/pages/eshop/payResult/payResult?status=0&orderId=' + order_id
        })
    })
}

const cancelOrder = (order_id, order_status) => {
    var errorMessage = '';
    switch (order_status){
        case 300: {
            console.log('已发货，不能取消');
            errorMessage = '订单已发货，不能取消';
            break;
        }
        case 301:{
            console.log('已收货，不能取消');
            errorMessage = '订单已收货，不能取消';
            break;
        }
        case 101:{
            console.log('已经取消');
            errorMessage = '订单已取消，不能取消';
            break;
        }
        case 102: {
            console.log('已经删除');
            errorMessage = '订单已删除，不能取消';
            break;
        }
        case 401: {
            console.log('已经退款');
            errorMessage = '订单已退款，不能取消';
            break;
        }
        case 402: {
            console.log('已经退款退货');
            errorMessage = '订单已退货，不能取消';
            break;
        }
    }
    if (errorMessage != '') {
        console.log(errorMessage);
        util.showErrorToast(errorMessage);
        return false;
    }

    wx.showModal({
        title: '',
        content: '确定要取消此订单？',
        success: function (res) {
            if (res.confirm) {
                util.request(api.eshopOrderCancel,{ orderId: order_id }, 'POST').then(function (res) {
                    if (res.errno === 0) {
                        console.log(res.data);
                        wx.showModal({
                            title:'提示',
                            content: res.data,
                            showCancel:false,
                            confirmText:'继续',
                            success: function (res) {
                                wx.navigateBack({
                                    url: '/pages/eshop/ucenter/order/order'
                                });
                            }
                        });
                    }
                });
            }
        }
    });
}

const confirmOrder = (order_id, order_status) => {
    var errorMessage = '';
    switch (order_status) {
        case 301: {
            console.log('已收货，不能再收货');
            errorMessage = '订单已收货';
            break;
        }
        case 101: {
            console.log('已经取消');
            errorMessage = '订单已取消';
            break;
        }
        case 102: {
            console.log('已经删除');
            errorMessage = '订单已删除';
            break;
        }
        case 401: {
            console.log('已经退款');
            errorMessage = '订单已退款';
            break;
        }
        case 402: {
            console.log('已经退款退货');
            errorMessage = '订单已退货';
            break;
        }
    }

    if (errorMessage != '') {
        console.log(errorMessage);
        util.showErrorToast(errorMessage);
        return false;
    }

    wx.showModal({
        title: '',
        content: '确定已经收到商品？',
        success: function (res) {
            if (res.confirm) {
                util.request(api.eshopOrderConfirm, { orderId: order_id }, 'POST').then(function (res) {
                    console.log(res.errno);
                    if (res.errno === 0) {
                        wx.showModal({
                            title: '提示',
                            content: res.data,
                            showCancel: false,
                            confirmText: '去评价',
                            success: function (res) {
                                wx.navigateTo({
                                    url: '/pages/eshop/ucenter/rate/rate?orderId=' + order_id,
                                });
                            }
                        });
                    }
                });
            }
        }
    });
}

const commentOrder = order_id => {
    wx.navigateTo({
        url: '/pages/eshop/ucenter/rate/rate?orderId=' + order_id
    })
}

module.exports = {
    payOrder,
    cancelOrder,
    confirmOrder,
    commentOrder
};