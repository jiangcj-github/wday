// import StoreBase from './StoreBase'
import AsyncAll from "./libs/AsyncAll"; //同步多个异步请求
import Sleep from "./libs/Sleep"; //同步多个异步请求
import Loop from "./loop"; //localStorage交互
import GlobalUtil from "./libs/GlobalUtil";
import Storage from "./storage";
import FileSaver from "file-saver";
import './libs/RSAUtil'
import Bus from "../core/Bus";
const encrypt = new JSEncrypt();
let rsaPublicKeyFlag = false

const FILTERFUNC = {
  function: (arr, func) => arr.filter(func),
  number: (arr, num) => arr.filter(v => v === num),
  undefined: arr => arr,
  string: (arr, str) =>
    arr.filter(v => typeof v === "string" && v.indexOf(str) > -1),
  object: (arr, obj) =>
    arr.filter(
      v =>
        typeof v === "object" &&
        Object.keys(obj).filter(
          vv =>
            v[vv] !== "undefined" &&
            FILTERFUNC[typeof obj[vv]]([v[vv]], obj[vv]).length
        ).length === Object.keys(obj).length
    ),
  boolean: (arr, bool) => (bool && arr.filter(v => v)) || arr.filter(v => !v)
};

export default class ControllerBase {
  constructor() {
    this.AsyncAll = AsyncAll;
    this.Sleep = Sleep;
    this.Loop = Loop;
    this.Util = GlobalUtil;
    this.Storage = Storage;
    this.bus = Bus();
  }

  get initState() {
    return (this.store && this.Util.deepCopy(this.store.state)) || {};
  }

  static RSAsetPublicKey(key){
      encrypt.setPublicKey(key);
      rsaPublicKeyFlag = true
  }

  static RSAencrypt(data){
      if(!rsaPublicKeyFlag){
          return 'please set rsa publickey in method RSAsetPublicKey'
      }
      return encrypt.encrypt(data);
  }


  countDownStop(key) {
    this.Loop[key].stop();
    this.Loop[key].clear();
  }

    /**
     *  轮播方法
     *  key: 标识
     *  layer:      显示层
     *  layerCache:     缓冲层
     *  layerArr:   边界数组，包含layer的最大和最小值，[min,max]
     *  speed:  单次轮播量，每隔0.1秒layer变化量为speed
     *  displayTime:    轮播间隔时间
     *  func:   回调函数
     */
    swiper(key, layer, layerCache, layerArr, speed, displayTime, func) {
        this.Loop[key].clear();
        this.Loop[key].setDelayTime(displayTime);
        this.Loop[key].set(async () => {

            let obj = {};
            layer -= speed;
            layerCache -= speed;
            func && func(layer,layerCache);

            if(layer === layerArr[0]){
                layerCache = layerArr[layerArr.length-1];
            }
            if(layerCache === layerArr[0]){
                layer = layerArr[layerArr.length-1];
            }
            if(layerArr.includes(layer) || layerArr.includes[layerCache]){
                this.Loop[key].stop();
                await this.Sleep(displayTime);
                this.Loop[key].start();
            }
        }, 100);
        this.Loop[key].start();
    }

    /*
     *  倒计时方法
     *  key: 标识
     *  count: 初始计数
     *  func: 回调函数，每秒触发，接收一个参数
     */
    countDown(key, count, func) {
        this.Loop[key].clear();
        this.Loop[key].setDelayTime(0);
        this.Loop[key].set(async() => {
            if(count<=0){
                this.Loop[key].stop();
                return;
            }
            count--;
            func && func(count);
        }, 1000);
        this.Loop[key].start();
    }

  /**
   * 复制到剪贴板
   * el: input, 或textarea表单元素
   * return true成功或false
   */
  copy(el) {
    el.select(); // 选择对象
    try {
      if (document.execCommand("Copy", false, null)) {
        document.execCommand("Copy");
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // 获取url中的query
  getQuery(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1]);
  }

}
