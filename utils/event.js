const util = require('./util')

export const props = {
    eventTap:{
        type: Object
    },
    eventLongtap:{
        type: Object
    }
}

export const methods = {
    onTap: function(){
        let eventTap = this.data.eventTap;
        if(util.isObjNotBlank(eventTap)){
            if(eventTap.name==="navigate"){ //跳转
                let paramStr = ""
                if(util.isObjNotBlank(eventTap.params)){
                    paramStr += "?"
                    for(var key in eventTap.params){
                        paramStr+= key + "=" +eventTap.params[key]
                    }
                }

                wx.navigateTo({
                    url: eventTap.path + paramStr
                })
            }else{
                this.triggerEvent(eventTap.name, eventTap.params, {})
            }
        }
        console.log(this)
    },
    onLongtap: function(){
        console.log('longtap')
    }
}