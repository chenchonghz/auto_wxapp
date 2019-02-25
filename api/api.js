/** http请求的host **/
const imgHost = "https://wxmp.bjdvtyun.com"

const host = "http://101.200.124.206:8089"
const apiHost = `${host}/platform-framework/api`
const uploadImageHost = `${host}/platform-framework/sys/oss/upload`
const uploadVideoHost = `${host}/platform-framework/sys/oss/uploadvideo`

// const host = "http://localhost:8080"
// const apiHost = `${host}/api`
// const uploadImageHost = `${host}/sys/oss/upload`
// const uploadVideoHost = `${host}/sys/oss/uploadvideo`

module.exports = {
    /** 图片url的host **/
    imgHost : `${imgHost}/image/getImage/`,
    /** 静态图片地址 **/
    staticImgHost : `${host}/platform-framework/statics/apiimg/`,
    /** 上传图片 **/
    uploadImageHost: uploadImageHost,
    uploadVideoHost: uploadVideoHost,

    /** 登录 **/
    loginWeiXin: `${apiHost}/auth/login_by_weixin`,

    /** 查询 **/
    getTemplate: 'http://101.200.124.206:8083/app/',

    /*** 商城 ***/
    /**轮播广告**/
    eshopBanners: `${apiHost}/index/banner`,
    /**按钮导航**/
    eshopChannel: `${apiHost}/index/channel`,
    /**带分类的商品列表**/
    eshopCategoryGoodsList : `${apiHost}/index/category`,
    /**热销商品列表**/
    eshopHotGoodsList: `${apiHost}/index/hotGoods`,
    /**促销商品列表**/
    eshopPromotionGoodsList: `${apiHost}/goods/timegoods `,
    /**商品列表**/
    eshopGoodsList: `${apiHost}/goods/list`,
    /**商品详情**/
    eshopGoodsDetail: `${apiHost}/goods/detail`,
    /**商品总数**/
    eshopGoodsCount: `${apiHost}/goods/count`,
    /**商品分类**/
    eshopGoodsCategory: `${apiHost}/goods/category`,
    /**获取购物车商品件数**/
    eshopCartGoodsCount: `${apiHost}/cart/goodscount`,
    /**加入购物车**/
    eshopCartAdd: `${apiHost}/cart/add`,
    /**直接购买***/
    eshopBuyAdd: `${apiHost}/buy/add`,
    /**获取购物车数据**/
    eshopCartList: `${apiHost}/cart/index`,
    /**选择或取消商品**/
    eshopCartCheck: `${apiHost}/cart/checked`,
    /**更新购物车数据**/
    eshopCartUpdate: `${apiHost}/cart/update`,
    /**从购物车删除**/
    eshopCartDelete: `${apiHost}/cart/delete`,
    /**收货地址列表**/
    eshopAddressList: `${apiHost}/address/list`,
    /**收货地址详情**/
    eshopAddressDetail: `${apiHost}/address/detail`,
    /**保存收货地址**/
    eshopAddressSave: `${apiHost}/address/save`,
    /**删除收货地址**/
    eshopAddressDelete: `${apiHost}/address/delete`,
    /**获取行政区划**/
    eshopAllRegion: `${apiHost}/region/listAll`,
    /**下单前信息确认**/
    eshopCartCheckOut: `${apiHost}/cart/checkout`,
    /**下单前信息确认**/
    eshopBuyCheckOut: `${apiHost}/buy/checkout`,
    /**提交订单**/
    eshopOrderSubmit: `${apiHost}/order/submit`,
    /**支付准备**/
    eshopPrePay: `${apiHost}/pay/prepay`,
    /**支付情况查询**/
    eshopOrderQuery: `${apiHost}/pay/query`,
    /**修改订单状态为成功**/
    eshopOrderSuccess: `${apiHost}order/updateSuccess`,
    /**查询订单列表**/
    eshopOrderList: `${apiHost}/order/list`,
    /**查询订单详情**/
    eshopOrderDetail: `${apiHost}/order/detail`,
    /**取消订单**/
    eshopOrderCancel: `${apiHost}/order/cancelOrder`,
    /**确认收货**/
    eshopOrderConfirm: `${apiHost}/order/confirmOrder`,
    /**优惠券列表**/
    eshopCouponList: `${apiHost}/coupon/list`,
    /**商品优惠券列表**/
    eshopGoodsCouponList: `${apiHost}/coupon/listByGoods`,
    /**评论列表**/
    eshopCommentList: `${apiHost}/comment/list`,
    /**评论总数**/
    eshopCommentCount: `${apiHost}/comment/groupcount`,
    /**发表评价**/
    eshopCommentSubmit: `${apiHost}/comment/postcomment`,
    /**发送短信**/
    eshopSmsCode: `${apiHost}/user/smscode`,
    /**绑定手机**/
    eshopBindMobile: `${apiHost}/user/bindMobile`,
    /**收藏列表**/
    eshopCollect: `${apiHost}/collect/list`,
    /**收藏或取消收藏**/
    eshopCollectOrDelete: `${apiHost}/collect/addordelete`,
    /**全部分类**/
    eshopCatalogList: `${apiHost}/catalog/index`,
    /**当前分类**/
    eshopCatalogCurrent: `${apiHost}/catalog/current`,
    /**搜索页面数据**/
    eshopSearchIndex: `${apiHost}/search/index`,
    /**搜索数据**/
    eshopSearchResult: `${apiHost}/search/result`,
    /**搜索帮助**/
    eshopSearchHelper: `${apiHost}/search/helper`,
    /**清理搜索历史**/
    eshopSearchClearHistory: `${apiHost}/search/clearhistory`,
}