import ExchangeStoreBase from '../ExchangeStoreBase'

export default class LoginStore extends ExchangeStoreBase {
  constructor() {
    super('user', 'general');
    this.state = {
        collectArticles: [],
        collectProjects: [],
        collectNews: [],
    };
  }

  // 添加,取消收藏
  setCollect(params){
      return this.Proxy.setCollect(params);
  }

  // 获取收藏列表
  getCollect(params) {
      return this.Proxy.getCollect(params);
  }

  // 更新本地收藏列表
  saveLocalCollect(type,relateId,bool){
      let collectList = this.state[{1:"collectProjects",2:"collectArticles",3:"collectNews"}[type]] || [];
      if(bool){
          !collectList.includes(relateId) && collectList.push(relateId);
      }else{
          collectList.includes(relateId) && collectList.splice(collectList.findIndex(item => item === relateId), 1);
      }
  }

  // 判断是否被收藏
  isCollect(type,relateId){
      let collectList = this.state[{1:"collectProjects",2:"collectArticles",3:"collectNews"}[type]] || [];
      return collectList.includes(relateId);
  }

  // 获取本地收藏列表
  getLocalCollect(type){
      let collectList = this.state[{1:"collectProjects",2:"collectArticles",3:"collectNews"}[type]] || [];
      return  collectList.map(item =>item);
  }

}
