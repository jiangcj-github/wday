import ExchangeStoreBase from '../ExchangeStoreBase';

export default class NewsStore extends ExchangeStoreBase {
  constructor(props) {
    super(props);
    super('news', 'general');
    this.state = {
      voteGoods: this.Storage.voteGoods.get() || {},     // 利好
      voteBads: this.Storage.voteBads.get() || {},        // 利空
    }
  }

  async getNewsList(page, pageSize) {
    let resultR = await this.Proxy.getNewsList({ps: pageSize, cp: page});
    return resultR.data;
  }

  async getNewsDetail(id) {
    let resultR = await this.Proxy.getNewsDetail({id: id});
    return resultR.data;
  }

  //利好利空-接口
  async voteNews(){
    return await this.Proxy.voteNews();
  }

  // 保存投票
  saveVote(relateId, bool) {
    let voteStr = bool ? "voteGoods" : "voteBads";
    let votes = this.state[voteStr];
    let now = Date.now();
    if(votes[relateId] && now - votes[relateId] < 24 * 60 * 60 * 1000){
      delete votes[relateId];
    } else{
      votes[relateId] = now;
    }
    this.Storage[voteStr].set(votes);
  }

  // 判断是否投票
  isVote(relateId, bool){
    let voteStr = bool ? "voteGoods" : "voteBads";
    console.log("check vote ing", relateId, bool);
    let votes = this.state[voteStr];
    return votes[relateId] && Date.now() - votes[relateId] < 24 * 60 * 60 * 1000;
  }

}