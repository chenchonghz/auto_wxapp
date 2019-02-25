const util = require('../utils/util.js');
const api = require('./api.js');

const payOrder = orderId => new Promise((resolve,reject)=>{
    util.request(api.eshopPrePay, {
        orderId: orderId
    }).then((res) => {
        console.log(res)
        if (res.errno === 0) {
            const payParam = res.data;
            wx.requestPayment({
                'timeStamp': payParam.timeStamp,
                'nonceStr': payParam.nonceStr,
                'package': payParam.package,
                'signType': payParam.signType,
                'paySign': payParam.paySign,
                'success': function (res) {
                    resolve(res);
                },
                'fail': function (res) {
                    reject(res);
                },
                'complete': function (res) {
                    reject(res);
                }
            });
        }else{
            reject(res);
        }
    })
})

module.exports = {
    payOrder,
};