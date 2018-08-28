import ExchangeStoreBase from '../ExchangeStoreBase'

export default class SearchStore extends ExchangeStoreBase {
  constructor() {
    super("search", "general");
    this.state = {};
  }

  async search(params){
    return await this.Proxy.search(params);
  }

}
