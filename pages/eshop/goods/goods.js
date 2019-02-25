const api = require('../../../api/api')
const util = require('../../../utils/util')
const WxParse = require('../../../static/lib/wxParse/wxParse');
const app = getApp()

Page({
    data: {
        id: 0,
        goods: {},
        gallery: [],
        attribute: [],
        specificationList: [],
        specAttr: {
            onOff: false,
            checkedSpecText: '请选择规格数量',
            specImage: '',
            specPrice: '',
            number: 1 //买几件
        },
        userHasCollect: 0, //是否已经收藏
        cartGoodsCount: 0, //购物车数量
        productList: [], //商品的所有种类
    },
    onLoad: function (opt) {
        console.log("进入index携带参数:"+ JSON.stringify(opt))
        let that = this
        util.request(api.eshopGoodsDetail, { id: opt.id }).then(function(res){
            if (res.errno === 0) {
                that.setData({
                    id: parseInt(opt.id),
                    goods: res.data.info,  //商品详情
                    gallery: res.data.gallery.map(item => {
                        return {id:item.id, image_url:item.img_url};
                    }), //轮播图
                    attribute: res.data.attribute, //商品参数
                    specificationList: res.data.specificationList, //规格数量
                    productList: res.data.productList,
                    'specAttr.specImage': res.data.info.list_pic_url,
                    'specAttr.specPrice': res.data.info.retail_price,
                    comment: res.data.comment,
                    issueList: res.data.issue,
                    userHasCollect: res.data.userHasCollect
                });

                that.setData({
                    'goods.goods_desc': res.data.info.goods_desc.replace(/\<img/gi, '<img class=\"fr-fin\" ')
                })
                that.checkSpecDisable()
                //商品详情
                //WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, that);
            }
        });

        //获取购物车商品的总件件数
        util.request(api.eshopCartGoodsCount).then(function(res){
            if (res.errno === 0) {
                that.setData({
                    cartGoodsCount: res.data.cartTotal.goodsCount
                });
            }
        })
    },
    switchAttrPop: function () { //显示规格参数
        this.setData({
            'specAttr.onOff': !this.data.specAttr.onOff
        });
    },
    clickSkuValue: function(e){ //选择规格
        let that = this;
        let specNameId = e.currentTarget.dataset.nameId;
        let specValueId = e.currentTarget.dataset.valueId;
        let _specificationList = this.data.specificationList;
        let _specification = _specificationList.find(n => n.specification_id === specNameId)
        if(_specification){
            let valueObj = _specification.valueList.find(n => n.id === specValueId)
            let valueChecked = !valueObj.checked
            _specification.valueList.forEach(n => {n.checked = false})
            if(valueObj){
                valueObj.checked = valueChecked
                if(valueObj.pic_url){
                    that.setData({
                        'specAttr.specImage': valueChecked?valueObj.pic_url:that.data.goods.list_pic_url
                    })
                }
            }
        }

        //收集已选项
        let checkedValues = [];
        let checkedSpecText = "请选择规格数量"
        checkedValues = this.getCheckedSpec()
        if(checkedValues.length>0){
            checkedSpecText = checkedValues.map(v=>v.valueText).join(' ')
            let specCombineIds = checkedValues.map(v=>v.valueId).join('_')
            let product = this.data.productList.find(p => p.goods_specification_ids == specCombineIds)
            if(product){
                //TODO
                console.log(product)
                that.setData({
                    'specAttr.specPrice': product.retail_price
                })
            }
        }
        this.checkSpecDisable(checkedValues)
        this.setData({
            'specificationList': _specificationList,
            'specAttr.checkedSpecText': checkedSpecText
        });
    },
    checkSpecDisable: function(checkedValues){
        let _specificationList = this.data.specificationList;
        let productSpecs = this.data.productList.map(p=>p.goods_specification_ids);
        if(checkedValues && checkedValues.length>0){

            checkedValues.forEach(cv => {
                let _productSpecs = []
                let index = _specificationList.findIndex(_spec => _spec.specification_id == cv.nameId)
                for(var i=0;i<productSpecs.length;i++){
                    let psIdsArr = productSpecs[i].split('_')
                    if(psIdsArr[index] == cv.valueId && !_productSpecs.includes(productSpecs[i])){
                        _productSpecs.push(productSpecs[i])
                    }
                }
                productSpecs =  _productSpecs
            })
        }

        let productSpecificationList = []
        productSpecs.forEach(pSpecs =>{
            let pSpecArr = pSpecs.split('_')
            for(let i=0;i<pSpecArr.length;i++){
                if(!productSpecificationList[i]){
                    productSpecificationList[i] = []
                }
                if(pSpecArr[i] && !productSpecificationList[i].includes(pSpecArr[i])){
                    productSpecificationList[i].push(pSpecArr[i])
                }
            }
        })

        let _specIndex = 0
        _specificationList.forEach(_spec=>{
            _spec.valueList.forEach(sv => {
                sv.disable = true
                if(productSpecificationList.length>0 && productSpecificationList[_specIndex].includes(sv.id+"")){
                    sv.disable = false
                }
            })
            _specIndex++
        })

        this.setData({
            'specificationList': _specificationList
        })
    },
    cutNumber: function () { //数量增减
        this.setData({
            'specAttr.number': (this.data.specAttr.number - 1 > 1) ? this.data.specAttr.number - 1 : 1
        });
    },
    addNumber: function () { //数量增减
        this.setData({
            'specAttr.number': this.data.specAttr.number + 1
        });
    },
    goHome: function(){ //返回上页
        wx.navigateBack({
            delta: 1
        })
    },
    collectOrDelete: function(){ //收藏
        let that = this;
        util.request(api.eshopCollectOrDelete, { typeId: 0, valueId: this.data.id }, "POST").then(function(res){
            if (res.errno == 0) {
                let userHasCollect = that.data.userHasCollect;
                if ( res.data.type == 'add') {
                    userHasCollect = 1
                    wx.showToast({
                        icon: 'none',
                        title: '已收藏'
                    });
                }else{
                    userHasCollect = 0
                    wx.showToast({
                        icon: 'none',
                        title: '已取消收藏'
                    });
                }
                that.setData({
                    userHasCollect: userHasCollect
                })
            }
        })
    },
    openCartPage: function(){ //去购物车页
        wx.redirectTo({
            url: "../cart/cart"
        })
    },
    addToCart: function(){ //添加到购物车
        let that = this;
        if(this.data.specAttr.onOff===false){
            this.switchAttrPop()
        }else{
            //检查规格完整性
            let checkedSpecs = this.getCheckedSpec()
            if(this.auditAllSpecsChecked(checkedSpecs)){
                let productId = this.auditHasProductItem(checkedSpecs)
                if(productId){
                    //加入购物车
                    util.request(api.eshopCartAdd, { goodsId: this.data.goods.id, number: this.data.specAttr.number, productId: productId }, "POST")
                        .then(function (res) {
                            let _res = res;
                            if (_res.errno == 0) {
                                wx.showToast({
                                    icon: 'none',
                                    title: '已添加到购物车'
                                });

                                that.switchAttrPop()
                                that.setData({
                                    cartGoodsCount: _res.data.cartTotal.goodsCount
                                })
                            }else{
                                wx.showToast({
                                    icon: 'none',
                                    title: _res.errmsg
                                });
                            }
                        })
                }
            }
        }
    },
    buy: function(){ //直接购买
        let that = this;
        if(this.data.specAttr.onOff===false){
            this.switchAttrPop()
        }else {
            //检查规格完整性
            let checkedSpecs = this.getCheckedSpec()
            if (this.auditAllSpecsChecked(checkedSpecs)) {
                let productId = this.auditHasProductItem(checkedSpecs)
                if (productId) {
                    util.request(api.eshopBuyAdd, { goodsId: this.data.goods.id, number: this.data.specAttr.number, productId: productId }, "POST")
                        .then(function (res) {
                            let _res = res;
                            if (_res.errno == 0) {
                                that.switchAttrPop()
                                //跳到下单页
                                wx.navigateTo({
                                    url: '/pages/eshop/shopping/checkout/checkout?isBuy=true',
                                })
                            }else{
                                wx.showToast({
                                    icon: 'none',
                                    title: _res.errmsg
                                });
                            }
                    })
                }
            }
        }
    },
    getCheckedSpec: function(){ //返回所有被选中的规格
        let checkedValues = [];
        this.data.specificationList.forEach(spec => {
            let specV = spec.valueList.find(v => v.checked == true)
            specV && checkedValues.push({
                nameId: spec.specification_id,
                valueId: specV.id,
                valueText: specV.value
            })
        })
        return checkedValues;
    },
    auditAllSpecsChecked: function(checkedSpecs){ //检查规格完整性
        let _specificationList = this.data.specificationList
        if(_specificationList.length == 0 || _specificationList.length == checkedSpecs.length){
            return true
        }else{ //规格选择不完整
            wx.showToast({
                icon: 'none',
                title: '请选择完整规格'
            });
            return false;
        }
    },
    auditHasProductItem: function(checkedSpecs){ //检查商品上架和库存
        let specCombineIds = checkedSpecs.map(v=>v.valueId).join('_')
        let product = this.data.productList.find(p => p.goods_specification_ids == specCombineIds)
        if(!product){
            wx.showToast({
                icon: 'none',
                title: '所选商品不存在'
            });
            return false;
        }else if(product.goods_number < this.data.specAttr.number){
            wx.showToast({
                icon: 'none',
                title: '库存不够'
            });
            return false;
        }else{
            return product.id;
        }
    },
    previewImage: function(e){ //预览图片
        wx.previewImage({
            urls: [util.data(e, 'url')]
        })
    },
    playVideo: function(e){ //播片
        app.globalData.currentVideoSrc = util.data(e, 'url')
        wx.navigateTo({
            url: "/pages/videoFull/videoFull"
        })
    },
    onShareAppMessage: function(){ //分享页面
        let data = this.data;
        return {
            title: data.goods.name,
            path: '/pages/eshop/goods/goods?id=' + data.id,
            success: (res) => {
                console.log("转发成功", res);
            },
            fail: (res) => {
                console.error("转发失败", res);
            }
        }
    }

})