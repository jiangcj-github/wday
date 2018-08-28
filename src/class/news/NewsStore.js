import ExchangeStoreBase from '../ExchangeStoreBase';

export default class NewsStore extends ExchangeStoreBase {
  constructor(props) {
    super(props);
    super('news', 'general');
    this.state = {}
  }

  async getNewsList(page, pageSize) {
    let resultR = await this.Proxy.getNewsList({ps: pageSize, cp: page});
    return resultR.data;
  }

  async getNewsDetail(id) {
    let resultR = await this.Proxy.getNewsDetail({id: id});
    return resultR.data;
  }

}