import regeneratorRuntime from '../../../static/js/regenerator-runtime';
var util = require('../../../utils/util.js');
var api = require('../../../api/api.js');
const app = getApp()

Page({
    data: {
        navList: [],
        categoryList: [],
        currentCategory: {},
        scrollLeft: 0,
        scrollTop: 0,
        goodsCount: 0,
        scrollHeight: 0
    },
    onLoad: async function () {
        await app.loadTarbar(); //加载底部导航

        this.getCatalog();
    },
    getCatalog: function () {
        //CatalogList
        let that = this;
        wx.showLoading({
            title: '加载中...',
        });
        util.request(api.eshopCatalogList).then(function (res) {
            that.setData({
                navList: res.data.categoryList,
                currentCategory: res.data.currentCategory
            });
            wx.hideLoading();
        });
        util.request(api.eshopGoodsCount).then(function (res) {
            that.setData({
                goodsCount: res.data.goodsCount
            });
        });
    },
    getCurrentCategory: function (id) {
        let that = this;
        util.request(api.eshopCatalogCurrent, { id: id }).then(function (res) {
            that.setData({
                currentCategory: res.data.currentCategory
            });
        });
    },
    switchCate: function (event) {
        var that = this;
        var currentTarget = event.currentTarget;
        if (this.data.currentCategory.id === util.data(event,'id')) {
            return false;
        }
        this.getCurrentCategory(util.data(event,'id'));
    }
})