import ExchangeStoreBase from '../ExchangeStoreBase'

export default class LoginStore extends ExchangeStoreBase {
  constructor() {
    super('user', 'general');
    this.state = {
      loginInfo: this.Storage.loginInfo.get() || {},
    };
  }

  // 获取收藏列表
  getCollect(params) {
    return this.Proxy.getCollect(params);
  }
}
