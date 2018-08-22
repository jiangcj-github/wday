import ExchangeStoreBase from '../ExchangeStoreBase'

export default class HomeStore extends ExchangeStoreBase {
  constructor() {
    super("home", "general");
    this.state = {};
  }

}
