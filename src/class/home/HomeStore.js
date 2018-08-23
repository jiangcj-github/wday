import ExchangeStoreBase from '../ExchangeStoreBase'
import Error from "../Error";

export default class HomeStore extends ExchangeStoreBase {
  constructor() {
    super("home", "general");
    this.state = {};
  }


  async getHomeProjects(){
    return await this.Proxy.getHomeProjects();
  }

}
