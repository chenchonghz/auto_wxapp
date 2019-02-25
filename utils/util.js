const api = require('../api/api');

const formatSeconds = (value) => {
    var h = Math.floor(value / 3600);
    if(h==0){
        h= "";
    }else{
        h = h<10?("0"+h):h + ":";
    }
    var m = Math.floor((value / 60 % 60));
    m<10?m="0"+m:m;
    var s = Math.floor((value % 60));
    s<10?s="0"+s:s;
    return  h  + m + ":" + s + "";
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const isObjNotBlank = (obj) => {
    return obj && Object.keys(obj).length>0
}

const deepObjectMerge = (FirstOBJ, SecondOBJ) => { // 深度合并对象
    for (var key in SecondOBJ) {
        FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === "[object Object]" ?
            deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
    }
    return FirstOBJ;
}

/**函数节流**/
const throttle = (fn, gapTime) => {
    if (gapTime == null || gapTime == undefined) {
        gapTime = 1500
    }
    let _lastTime = null
    // 返回新的函数
    return function () {
        let _nowTime = + new Date()
        //console.error(this.data.text?this.data.text:this.data.src)
        //console.log(this._lock)
        if (_nowTime - _lastTime > gapTime || !this._lock) {
            fn.apply(this, arguments)   //将this和参数传给原函数
            _lastTime = _nowTime
            this._lock = _lastTime
        }
    }
}

/**wx.request封装**/
const request = (url, data = {}, method = "GET") => new Promise((resolve, reject) =>{
    wx.request({
        url: url,
        data: data,
        method: method,
        header: {
            'Content-Type': 'application/json',
            'X-AppId': getApp().globalData.appId,
            'X-Nideshop-Token': wx.getStorageSync('token')
        },
        success: function (res) {
            console.log("success");
            if (res.statusCode == 200) {
                if (res.data.errno == 401) { //权限不足
                    console.error(401)
                    wx.clearStorage({
                        success: function(){
                            wx.reLaunch({url: "/pages/eshop/portal/portal"})///pages/index/index"})
                        }
                    });
                } else {
                    resolve(res.data);
                }
            } else {
                reject(res.errMsg);
            }
        },
        fail: function (err) {
            reject(err)
            console.error("http request failed")
        }
    })
})


const chooseImage = (count = 1, sourceType = ['album', 'camera']) => new Promise((resolve, reject) => {
    wx.chooseImage({
        count,
        sourceType,
        success (res) {
            resolve(res)
        },
        fail (e) {
            reject(e)
        }
    })
})

const chooseVideo = (maxDuration=60, sourceType = ['album', 'camera']) => new Promise((resolve, reject) =>{
    wx.chooseVideo({
        maxDuration,
        sourceType,
        camera: 'back',
        success(res){
            resolve(res)
        },
        fail(e){
            reject(e)
        }
    })
})

const uploadFile = (url, filePath, formData={}) => new Promise((resolve, reject) => {
    wx.uploadFile({
        url,
        filePath,
        formData,
        name: 'file',
        header: {
            'X-AppId': getApp().globalData.appId,
            'X-Nideshop-Token': wx.getStorageSync('token')
        },
        success (res) {
            if(res.statusCode === 200){
                res.data = JSON.parse(res.data)
                resolve(res)
            }else{
                console.error(res)
            }
        },
        fail (e) {
            reject(e)
        }
    })
})


const showErrorToast = function(msg){
    wx.showToast({
        icon: 'none',
        title: msg
    });
}

/**
 * 从event中取得data属性
 * */
const data = (e, field) => {
    let fieldValue = e.currentTarget.dataset[field]
    return formatNumIfIsNum(fieldValue)
}

/**如果是数字字符串就转换成数字**/
const formatNumIfIsNum = (value) => {
    if(value && isIntNumber(value)){
        return parseInt(value)
    }else{
        return value;
    }
}

const isIntNumber = (val) =>{
    var regPos = /^\d+$/; // 非负整数
    var regNeg = /^\-[1-9][0-9]*$/; // 负整数
    if(regPos.test(val) || regNeg.test(val)){
        return true;
    }else{
        return false;
    }
}


module.exports = {
    request,
    chooseImage,
    chooseVideo,
    uploadFile,
    formatTime,
    deepObjectMerge,
    isObjNotBlank,
    throttle,
    formatSeconds,
    showErrorToast,
    data
}
