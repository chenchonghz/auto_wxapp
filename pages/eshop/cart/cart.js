import regeneratorRuntime from '../../../static/js/regenerator-runtime';
const api = require('../../../api/api.js')
const util = require('../../../utils/util.js')
const app = getApp()

Page({
    data: {
        cartGoods: [],
        cartTotal: {
            "goodsCount": 0,
            "goodsAmount": 0.00,
            "checkedGoodsCount": 0,
            "checkedGoodsAmount": 0.00
        },
        isCheckAll: true,
        buyAttr: {

        },
        startX: 0, //开始坐标
        startY: 0
    },
    onLoad: async function (opt) {
        console.log("进入index携带参数:"+ JSON.stringify(opt))

        let that = this
        await app.loadTarbar(); //加载底部导航

        that.getCartList();
    },
    getCartList: function(){ //获取购物车信息
        let that = this;
        util.request(api.eshopCartList).then(function (res) {
            if (res.errno === 0) {
                let checkedCount = 0;
                res.data.cartList.forEach(cart => {
                    checkedCount += cart.checked
                    cart.isTouchMove = false  //滑动还原
                })
                that.setData({
                    cartGoods: res.data.cartList,
                    cartTotal: res.data.cartTotal,
                    isCheckAll: checkedCount==res.data.cartList.length
                });
            }
        })
    },
    checkedItem: function (e) { //选择或取消勾选商品
        let that = this;
        let product = that.data.cartGoods[e.target.dataset.itemIndex]
        util.request(api.eshopCartCheck, { productIds: product.product_id, isChecked: product.checked ? 0 : 1 }, 'POST').then(function (res) {
            if (res.errno === 0) {
                that.setData({
                    cartGoods: res.data.cartList,
                    cartTotal: res.data.cartTotal
                }, ()=>{
                    that.setData({
                        isCheckAll: that.isCheckedAll()
                    })
                });
            }
        })
    },
    checkAllItem: function(e){ //全选
        let that = this;
        let checkedGoods = that.isCheckedAll()? this.data.cartGoods:this.data.cartGoods.filter(cart => !cart.checked)
        // let checkedGoods = this.data.cartTotal.checkedGoodsCount > 0 ? this.data.cartGoods.filter(cart => cart.checked)
        //     :this.data.cartGoods;
        let productIds = checkedGoods.map(v => v.product_id).join(',');
        if(checkedGoods && checkedGoods.length>0){
            util.request(api.eshopCartCheck, { productIds: productIds, isChecked: that.isCheckedAll() ? 0 : 1 }, 'POST').then(function(res){
                if (res.errno === 0) {
                    that.setData({
                        cartGoods: res.data.cartList,
                        cartTotal: res.data.cartTotal
                    });
                }

                that.setData({
                    isCheckAll: that.isCheckedAll()
                });
            })
        }
    },
    isCheckedAll: function () { //是否全选
        return this.data.cartGoods.every(cart => cart.checked)
    },
    cutNumber: function (e) { //购物车数量减少
        let product = this.data.cartGoods[e.target.dataset.itemIndex];
        if(product.number - 1 < 1){
            return
        }else{
            product.number -= 1
            this.updateCart(product.product_id, product.goods_id, product.number, product.id);
        }
    },
    addNumber: function (e) { //购物车数量增加
        let product = this.data.cartGoods[e.target.dataset.itemIndex];
        product.number += 1
        this.updateCart(product.product_id, product.goods_id, product.number, product.id);
    },
    updateCart: function (productId, goodsId, number, id) { //更新购物车数据
        let that = this;
        util.request(api.eshopCartUpdate, { productId, goodsId, number, id}, 'POST').then(function(res){
            if (res.errno === 0) {
                that.setData({
                    cartGoods: res.data.cartList,
                    cartTotal: res.data.cartTotal
                });
            }
        })
    },
    deleteCart: function (e) { //从购物车删除商品
        let that = this;
        let product = this.data.cartGoods[e.currentTarget.dataset.itemIndex];
        util.request(api.eshopCartDelete, { productIds: product.product_id }, 'POST').then(function (res) {
            if (res.errno === 0) {
                that.setData({
                    cartGoods: res.data.cartList,
                    cartTotal: res.data.cartTotal
                })
            }
        })
    },
    checkoutOrder: function(){ //下单
        let that = this;
        let checkedGoods = this.data.cartGoods.filter(n => n.checked)
        if (checkedGoods.length <= 0) {
            return false;
        }
        wx.navigateTo({
            url: '../shopping/checkout/checkout'
        })
    },
    touchstart: function (e) { //手指触摸动作开始 记录起点X坐标
        //开始触摸时 重置所有删除
        this.data.cartGoods.forEach(function (v, i) {
            if (v.isTouchMove)//只操作为true的
                v.isTouchMove = false;
        })
        this.setData({
            startX: e.changedTouches[0].clientX,
            startY: e.changedTouches[0].clientY,
            cartGoods: this.data.cartGoods
        })
    },
    touchmove: function (e) { //滑动事件处理
        var that = this,
            index = e.currentTarget.dataset.index,//当前索引
            startX = that.data.startX,//开始X坐标
            startY = that.data.startY,//开始Y坐标
            touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
            touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
            //获取滑动角度
            angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
        that.data.cartGoods.forEach(function (v, i) {
            v.isTouchMove = false
            //滑动超过30度角 return
            if (Math.abs(angle) > 30) return;
            if (i == index) {
                if (touchMoveX > startX) //右滑
                    v.isTouchMove = false
                else //左滑
                    v.isTouchMove = true
            }
        })
        //更新数据
        that.setData({
            cartGoods: that.data.cartGoods
        })
    },
    /**
     * 计算滑动角度
     * @param {Object} start 起点坐标
     * @param {Object} end 终点坐标
     */
    angle: function (start, end) {
        var _X = end.X - start.X,
            _Y = end.Y - start.Y
        //返回角度 /Math.atan()返回数字的反正切值
        return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    }
})