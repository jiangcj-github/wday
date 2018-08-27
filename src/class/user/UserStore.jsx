import ExchangeStoreBase from '../ExchangeStoreBase'
import Error from "../Error";

export default class LoginStore extends ExchangeStoreBase {
  constructor() {
    super('user', 'general');
    this.state = {
        collectArticles: null,
        collectProjects: null,
        collectNews: null,
        initCollect: false,     // 是否初始化收藏
    };
  }

  // 添加,取消收藏
  async setCollect(params){
      return await this.Proxy.setCollect(params);
  }

  // 初始化收藏列表
  async initCollect(userId) {
      if(this.state.initCollect) return;
      let data = await this.Proxy.getCollect({
        uid: userId,
      });
      if(data.msg === 0){
        data = data.data;
        this.state.collectProjects = data && data.pro || [];
        this.state.collectArticles = data && data.art || [];
        this.state.collectNews = data && data.nsf || [];
        this.state.initCollect = true;
      }
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
