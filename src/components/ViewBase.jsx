import React from 'react';
import Bus from "../core/Bus";
import imageDict from "../common/imageDict.js";
import Sleep from '../core/libs/Sleep'
import Loop from '../core/loop'

export default class ViewBase extends React.Component {

  constructor(props) {
    super(props);
    this.imageDict = imageDict();
    this.bus = Bus();
    this.Loop = Loop;
    this.Sleep = Sleep;
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

  /**
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
   *  页面滚动到顶部，过渡效果
   *  key:    标识
   *  initPos:    初始位置
   *  endPos:     结束位置
   *  speed:      滚动速度，每0.01秒滚动speed值
   *  func:       回调函数
   */
  scroll(key, initPos, endPos, speed, func){
    this.Loop[key].clear();
    this.Loop[key].setDelayTime(0);
    this.Loop[key].set(async() => {
      initPos -= speed;
      initPos = Math.max(initPos, endPos);
      func && func(initPos);
      if(initPos <= endPos){
        this.Loop[key].stop();
      }
    }, 10);
    this.Loop[key].start();
  }

  /**
   * 结束循环任务
   * key  标识
   */
  endLoop(key) {
    this.Loop[key].stop();
    this.Loop[key].clear();
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
