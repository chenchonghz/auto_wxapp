const api = require('../../../api/api')
const util = require('../../../utils/util')
const event = require('../../../utils/event')

const myaudio = wx.createInnerAudioContext();

Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties:{
        cover:{
            type: String,
            value: ''
        },
        title:{
            type: String,
            value: ''
        },
        author:{
            type: String,
            value: ''
        },
        src:{
            type: String,
            value: ''
        },
        styleBackgroundColor: {
            type: String,
            value: "#fff"
        }
    },
    data: {
        imgHost: api.imgHost,
        isPlay: false
    },
    ready: function() {
        this.reDraw()

        this.setData({
            slider_value: 0,
            now_time: 0
        });
        myaudio.seek(0);//设置音频初始位置为0
        this.audioListen();
        this.getAudioDetail();//获取音頻資源
    },
    pageLifetimes:{
        hide: function(){
            this.pause()
        }
    },
    methods: {
        reDraw: function(){
            var style1 = ""
            if(this.data.styleBackgroundColor){
                style1 += "background-color:" + this.data.styleBackgroundColor + ";"
            }
            this.setData({
                myStyle : style1
            })
        },
        getAudioDetail: function(){
            var that = this;
            myaudio.src = that.data.src //ToFix
            that.play()
            that.pause()
            this.getMusicLength()
        },
        getMusicLength: function(){
            let that = this;
            if (myaudio.duration == 0) {
                setTimeout(function () {
                    that.getMusicLength();
                }, 100);
            }else {
                let duration = Math.ceil(myaudio.duration);
                that.setData({
                    now_time: util.formatSeconds(0),
                    duration: util.formatSeconds(duration),
                });
            }
        },
        audioListen: function(){
            var that = this;
            myaudio.onPlay(() => {
                console.log('开始播放')
            })
            myaudio.onTimeUpdate(function(res) {
                var per = (myaudio.currentTime / myaudio.duration) * 100;//获取当前播放时间所对应的slider位置
                that.setData({
                    slider_value: per,//设置slider滑块所在位置
                    now_time: util.formatSeconds(myaudio.currentTime)//获得的值是秒，需要转换成分钟
                })
            })
            myaudio.onEnded(() => {
                that.setStopState(that)
            })
            myaudio.onWaiting((res) => {
                console.log("wait")
            })
        },
        play: function(){
            console.log("play")
            myaudio.play();
            this.setData({ isPlay: true });
        },
        pause: function(){
            console.log("pause")
            myaudio.pause();
            this.setData({ isPlay: false });
        },
        change: function(e){
            let perTime = (e.detail.value / 100) * myaudio.duration;
            this.setData({
                slider_value: e.detail.value,
                now_time: util.formatSeconds(perTime),
                isChanging: false
            })
            myaudio.seek(perTime);
        },
        changing: util.throttle(function(e){
            this.pause();
        }),
        setStopState: function(that){
            that.setData({
                slider_value: 0,
                now_time: util.formatSeconds(0),
                isPlay: false
            })
            myaudio.stop()
        }

    }
})