import ExchangeStoreBase from '../ExchangeStoreBase'

export default class LoginStore extends ExchangeStoreBase {
    constructor() {
        super('login', 'general');
        this.state = {
            loginInfo: {
                userPhone: this.Storage.userPhone.get(),
                userToken: this.Storage.userToken.get(),
            },
        };
    }

    // 登陆
    login(params) {
        return this.Proxy.login(params);
    }

    //退出登录
    logout(){
        let token = this.state.loginInfo.userToken;
        return this.Proxy.logout({token: token});
    }

    //获取登录信息
    get loginInfo(){
        return Object.assign({},this.state.loginInfo);
    }

    //保存登录信息
    saveLogin({token,phone}){
        this.Storage.userPhone.set(phone);
        this.Storage.userToken.set(token);
        this.state.loginInfo = {
            userPhone: phone,
            userToken: token,
        };
    }

    //清除登录信息
    clearLogin(){
        this.Storage.userPhone.removeAll();
        this.Storage.userToken.removeAll();
        this.state.loginInfo = {
            userPhone: "",
            userToken: "",
        };
    }

    //获取图像验证码
    async getCode(params){
        return await this.Proxy.getCode(params);
    }

}
