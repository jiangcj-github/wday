//全局消息

class Bus{
    /*
     *  buffer示例
     *  {
     *      event1: [ [handler1,module1], [handler2,module1], [handler1,module2], [handler2,module2],],
     *      event2: [ [handler1,module1], [handler2,module1], [handler1,module2], [handler2,module2],],
 *      }
     */
    constructor(){
        this.buffer = {};
    }

    /*
     *  触发一个全局事件
     *  eventName  事件名
     *  attachData  事件附件
     */
    emit(eventName, attachData) {
        if (!this.buffer[eventName]) return;
        this.buffer[eventName].forEach(item =>{
            item[0] && item[0](attachData);
        });
    }

    /*
     *  监听一个全局事件
     *  eventName   事件名称
     *  moduleName  模块名
     *  handler     事件处理函数,handler会收到事件的attachData
     */
    on(eventName, moduleName, handler){
        if(!this.buffer[eventName]){
            this.buffer[eventName] = [];
        }
        this.buffer[eventName].push([handler,moduleName]);
    }

    /*
     *  移除on监听的全局事件
     *  eventName   事件名称
     *  moduleName  模块名称
     *  handler     事件处理函数,缺失则清除moduleName所有的事件处理函数
     */
    off(eventName, moduleName, handler){
        if(this.buffer[eventName]){
            for(let i=0; i<this.buffer[eventName].length; i++){
                if(this.buffer[eventName][i][1] === moduleName && (!handler || this.buffer[eventName][i][0] === handler)){
                    this.buffer[eventName].splice(i,1);
                    i--;
                }
            }
        }
    }
}

//静态实例
Bus.instance = null;

export default function () {
    if(!Bus.instance){
        Bus.instance = new Bus();
    }
    return Bus.instance;
}
