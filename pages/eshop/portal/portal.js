import regeneratorRuntime from '../../../static/js/regenerator-runtime';
const app = getApp()

Page({
    data: {
        structure:{
            sections:[
                {
                    sectionId: 96,
                    component: 21,
                    componentName: "Banner",
                },
                {
                    sectionId: 95,
                    component: 22,
                    componentName: "Navi",
                },
                {
                    sectionId: 97,
                    component: 19,
                    componentName: "GoodsListA",
                },
                {
                    sectionId: 98,
                    component: 20,
                    componentName: "GoodsListB",
                },
                {
                    sectionId: 99,
                    component: 24,
                    componentName: "Marquee",
                }
            ]
        }
    },
    onLoad: async function (opt) {
        console.log("进入index携带参数:"+ JSON.stringify(opt))
        this.data.templateId = opt.id;

        let that = this
        // await this.getTemplate(); //加载模板
        // wx.setNavigationBarTitle({
        //     title: that.data.structure.navigationBarTitleText
        // })
        await app.loadTarbar(); //加载底部导航
    }
})