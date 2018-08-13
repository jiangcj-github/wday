/**
 * 使用方法
 *  1.在ProxyConfig配置好相关参数
 *  2.直接this.Storage.XXX.XX()执行
 *  3.set：存Storage
 *    add：添加一项
 *    del：删除一项，或者根据某一条件删除部分
 *    get：取Storage
 *    handler：最后一个参数为true，则调add，第二个参数为false则调del
 *    removeAll：删除所有
 *     【具体操作查看libs/Storage.js】
 */

import StorageApi from '../libs/Storage' //引入storage

const STORAGE = {
  install(storageList) {
    storageList.forEach(v => {

      STORAGE[v.name] = {}

      //仅适用sessionStorage
      if(v.onlySession){
        // 存SessionStorage
        STORAGE[v.name].set = value => StorageApi.setSession(v.name, value)

        // getSessionStorage
        STORAGE[v.name].get = () => StorageApi.getSession(v.name)

        // 删除SessionStorage
        STORAGE[v.name].remove = () => StorageApi.removeSession(v.name)

        return
      }

      if (v.useDefault) {
        let defaultValue = StorageApi.getStorage(v.name) || v.default;
        StorageApi.setStorage(v.name, defaultValue, v.duration, v.expiryTime)
      }

      STORAGE[v.name].handler = (...params) => params.pop() ? StorageApi.addStorage(v.name, ...params) : StorageApi.delStorage(v.name, ...params)

      // 存Storage
      STORAGE[v.name].set = (value, duration = v.duration, expiryTime = v.expiryTime, ...params) => StorageApi.setStorage(v.name, value, duration, expiryTime, ...params)


      // 添加一项
      STORAGE[v.name].add = (value, index, arrPath = v.arrPath, duration = v.duration, ...params) => StorageApi.addStorage(v.name, value, index, arrPath, duration, ...params)

      // 删除一项，或者根据某一条件删除部分
      STORAGE[v.name].del = (value, arrPath = v.arrPath, duration = v.duration, ...params) => StorageApi.delStorage(v.name, value, arrPath, duration, ...params)

      // 取Storage
      STORAGE[v.name].get = (...params) => StorageApi.getStorage(v.name, ...params)

      // 删除所有
      STORAGE[v.name].removeAll = (...params) => StorageApi.removeStorage(v.name, ...params)
    })
  }
}

export default STORAGE
