import regeneratorRuntime from '../../../../static/js/regenerator-runtime';
var util = require('../../../../utils/util.js');
var api = require('../../../../api/api.js');
const app = getApp()

Page({
    data: {
        orderInfo:{},
        orderGoods: [],
        comments: []
    },
    onLoad: function (options) {
        this.getOrderDetail(parseInt(options.orderId));
    },
    onClose() {
        wx.navigateBack({
            url: 'pages/eshop/ucenter/order/order',
        });
    },
    bindInputField: function(e){ //评论
        let contentUri = "comments["+e.currentTarget.dataset.index+"].content"
        this.setData({
            [contentUri]: e.detail.value
        })
    },
    onStarChange(e) {
        let starsUri = "comments["+e.currentTarget.dataset.index+"].stars"
        this.setData({
            [starsUri]: e.detail.value
        })
    },
    getOrderDetail: function(orderId){
        let that = this;
        util.request(api.eshopOrderDetail, { orderId: orderId }).then(function (res) {
            if (res.errno === 0) {
                console.log(res.data);

                let comments = []
                res.data.orderGoods.forEach(g => {
                    comments.push({
                        order_id: orderId,
                        goods_id: g.goods_id,
                        product_id: g.product_id,
                        content: '',
                        stars: 5,
                        images: [],
                        videos: []
                    })
                })
                that.setData({
                    orderInfo: res.data.orderInfo,
                    orderGoods: res.data.orderGoods,
                    comments: comments
                });
            }
        });
    },
    uploadImage: async function(e){
        let that = this;
        let index = e.currentTarget.dataset.index
        try{
            wx.showActionSheet({
                itemList: ['发照片', '发视频'],
                itemColor: '#000',
                success: async function (res) {
                    console.log(res.tapIndex);
                    if(res.tapIndex==0){
                        let num = 5 - that.data.comments[index].images.length - that.data.comments[index].videos.length;
                        let rres = await util.chooseImage(num)
                        rres.tempFilePaths.forEach(function(tempFile){
                            util.uploadFile(api.uploadImageHost, tempFile).then(function(data){
                                if(data.data.code==0){
                                    let images = that.data.comments[index].images;
                                    images.push(data.data.url);
                                    that.setData({
                                        ["comments["+ index +"].images"]: images
                                    })
                                }
                            })
                        })
                    }else if(res.tapIndex==1){
                        wx.chooseVideo({
                            sourceType: ['album','camera'],
                            maxDuration: 60,
                            camera: 'back',
                            success(rres) {
                                wx.showLoading({
                                    title: '上传中...'
                                });
                                util.uploadFile(api.uploadVideoHost, rres.tempFilePath).then(function(data){
                                    if(data.data.code==0){
                                        let videos = that.data.comments[index].videos;
                                        videos.push({url:data.data.url, urlimg: data.data.urlimg});
                                        that.setData({
                                            ["comments["+ index +"].videos"]: videos
                                        })
                                    }else if(data.data.code==1){
                                        util.showErrorToast(data.data.errmsg)
                                    }
                                    wx.hideLoading();
                                })
                            },fail(e){
                                console.error(e)
                            }
                        })
                    }
                }
            })

        }catch(e){
            console.error(e)
        }
    },
    deleteImg: function(e){
        let that = this;
        let index = e.currentTarget.dataset.index
        let imgLink = e.currentTarget.dataset.value
        let images = that.data.comments[index].images;
        let i = images.indexOf(imgLink)
        if(i>-1){
            images.splice(i, 1);
            that.setData({
                ["comments["+ index +"].images"]: images
            })
        }
    },
    deleteVideo: function(e){
        let that = this;
        let index = e.currentTarget.dataset.index
        let iindex = e.currentTarget.dataset.value
        let videos = that.data.comments[index].videos;
        videos.splice(iindex, 1)
        that.setData({
            ["comments["+ index +"].videos"]: videos
        })
    },
    playVideo: function(e){
        app.globalData.currentVideoSrc = util.data(e, 'url')
        wx.navigateTo({
            url: "/pages/videoFull/videoFull"
        })
    },
    previewImage: function(e){
        wx.previewImage({
            urls: [util.data(e, 'url')]
        })
    },
    submitComments: function(){
        let that = this;
        util.request(api.eshopCommentSubmit, {comments: that.data.comments}, 'POST').then(function(res){
            if (res.errno === 0) {
                wx.showToast({
                    title: '评论成功'
                })
                setTimeout(function(){
                    wx.navigateBack({
                        url: 'pages/eshop/ucenter/order/order'
                    });
                },1000)
            }
        })
    }

})