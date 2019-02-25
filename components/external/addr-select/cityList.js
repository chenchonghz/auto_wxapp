import regeneratorRuntime from '../../../static/js/regenerator-runtime';
const api = require('../../../api/api')
const util = require('../../../utils/util')

const getRegions = async function(){
    let cityList = wx.getStorageSync('regionList');
    if(!cityList){
        let res = await util.request(api.eshopAllRegion, {})
        if(res.errno==0){
            cityList = res.data
            wx.setStorage({key:'regionList',data: cityList})
        }
    }
    return cityList;
}


module.exports = getRegions;



