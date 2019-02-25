import regeneratorRuntime from '../../../../static/js/regenerator-runtime';
const api = require('../../../../api/api')
const util = require('../../../../utils/util')
const app = getApp()

Page({
    data: {
        addressId: 0,
        address:{
            id:0,
            address: '',
            full_region: '',
            userName: '',
            telNumber: '',
            is_default: 0,
            provinceId: 0,
            cityId: 0,
            countyId: 0,
            townId: 0
        }
    },
    onLoad: function (options) {
        if (options.id) { //有值为修改
            this.setData({
                addressId: options.id
            });
            this.getAddressDetail();
        }
    },
    bindInput: function(e){ //反向绑定输入域
        let changeField = {}
        let field =  e.target.dataset.field;
        changeField[field] = e.detail.value;
        this.setData(changeField);
    },
    bindIsDefault: function(e){
        let address = this.data.address;
        address.is_default = !address.is_default;
        this.setData({
            address: address
        });
    },
    getAddressDetail: async function(){ //获取地址详情
        let that = this;
        let res = await util.request(api.eshopAddressDetail, { id: that.data.addressId });
        if (res.errno === 0) {
            if(res.data){
                that.setData({
                    address: res.data,
                }, ()=>{
                    if(res.data.provinceId && res.data.cityId && res.data.countyId){
                        that.setData({
                            choosenRegion: [{id:res.data.provinceId},{id:res.data.cityId},{id:res.data.countyId},{id:res.data.townId}]
                        })
                    }
                });
            }
        }
    },
    chooseRegion: function(e) { //选择区域
        let regionArray = e.detail
        this.setData({
            'address.full_region': regionArray.map(r=>r.name).join(''),
            'address.provinceId': regionArray[0].id,
            'address.provinceName': regionArray[0].name,
            'address.cityId': regionArray[1].id,
            'address.cityName': regionArray[1].name,
            'address.countyId': regionArray[2].id,
            'address.countyName': regionArray[2].name,
            'address.townId': regionArray[3].id,
            'address.townName': regionArray[3].name,
            choosenRegion: regionArray
        })
    },
    cancelAddress: function(){ //后退
        wx.navigateBack({
            url: '/pages/eshop/shopping/address/address',
        })
    },
    saveAddress: function(){ //保存
        let that = this;
        let address = this.data.address;
        if(address.userName == ''){
            util.showErrorToast('请输入收货人姓名')
            return false;
        }else if (address.telNumber == '') {
            util.showErrorToast('请输入手机号码');
            return false;
        }else if (address.district_id == 0) {
            util.showErrorToast('请输入省市区');
            return false;
        }else if (address.detailInfo == '') {
            util.showErrorToast('请输入详细地址');
            return false;
        }
        util.request(api.eshopAddressSave, {
            ...address
        }, 'POST').then(function (res) {
            if (res.errno === 0) {
                wx.navigateBack({
                    url: '/pages/eshop/shopping/address/address',
                })
            }
        });
    }
})