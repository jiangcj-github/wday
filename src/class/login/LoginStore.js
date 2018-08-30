import ExchangeStoreBase from '../ExchangeStoreBase'

export default class LoginStore extends ExchangeStoreBase {
  constructor() {
    super('login', 'general');
    this.state = {
      loginInfo: this.Storage.loginInfo.get() || {},
    };
  }

  // 登陆
  login(params) {
    return this.Proxy.login(params);
  }

  // 退出登录
  logout() {
    let token = this.state.loginInfo.userToken;
    return this.Proxy.logout({tkn: token});
  }

  // 获取图像验证码
  async getCode(params) {
    return await this.Proxy.getCode(params);
  }

  // 获取登录信息
  get loginInfo() {
    return Object.assign({}, this.state.loginInfo);
  }

  // 保存登录信息
  saveLogin(data) {
    this.Storage.loginInfo.set(data);
    this.state.loginInfo = data;
  }


  // 清除登录信息
  clearLogin() {
    this.Storage.loginInfo.removeAll();
    this.state.loginInfo = {};
  }

  //是否登录
  isLogin() {
    let loginInfo = this.state.loginInfo;
    return loginInfo.userToken && (Date.now() - loginInfo.loginTime < 24 * 24 * 60 * 1000);
  }


}
