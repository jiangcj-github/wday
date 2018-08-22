import ExchangeStoreBase from '../ExchangeStoreBase'

export default class HeaderStore extends ExchangeStoreBase {
  constructor() {
    super("header", "general");
    this.state = {};
  }

  async getMarket(){
    return await this.Proxy.getMarket();
  }

}
