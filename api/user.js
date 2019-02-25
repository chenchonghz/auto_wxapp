import regeneratorRuntime from '../static/js/regenerator-runtime';
const util = require('../utils/util.js');
const api = require('../api/api.js');

/**
 * 换取code
 */
const login = () => new Promise((resolve, reject)=>{
    wx.login({
        success: function (res) {
            if (res.code) {
                resolve(res);
            } else {
                reject(res);
            }
        },
        fail: function (err) {
            reject(err);
        }
    });
})

/**
 * 检查微信会话是否过期
 */
const checkSession = () => new Promise((resolve, reject)=>{
    wx.checkSession({
        success: function () {
            resolve(true);
        },
        fail: function () {
            reject(false);
        }
    })
})

/**检查登录态**/
const checkLogin = () => new Promise((resolve, reject) => {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
        checkSession().then(() => {
            resolve(true);
        }).catch(() => {
            reject(false);
        });
    } else {
        reject(false);
    }
})

/**
 * 调用微信登录
 */
const loginByWeixin = async (userInfo) => {
    try{
        let loginRes = await login();
        let code = loginRes.code;
        let reqRes = await util.request(api.loginWeiXin, {code: code, userInfo: userInfo}, 'POST')
        if (reqRes.errno === 0) {
            //存储用户信息
            wx.setStorageSync('userInfo', reqRes.data.userInfo);
            wx.setStorageSync('token', reqRes.data.token);
        } else {
            console.error(reqRes.errmsg)
        }
        return reqRes;
    }catch(e){
        console.error(e)
    }
}

module.exports = {
    login,
    loginByWeixin,
    checkLogin,
    checkSession
};