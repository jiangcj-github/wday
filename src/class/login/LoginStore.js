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
        return this.Proxy.logout();
    }

    //获取登录信息
    get loginInfo(){
        return Object.assign({},this.state.loginInfo);
    }

    //保存登录信息
    saveLogin({token,phone}){
        this.Storage.userPhone.set(phone);
        this.Storage.userToken.set(token);
        this.state.userPhone = phone;
        this.state.userToken = token
    }

    //清除登录信息
    clearLogin(){
        this.Storage.userPhone.removeAll();
        this.Storage.userToken.removeAll();
        this.state.userPhone = '';
        this.state.userToken = '';
    }

    //获取图像验证码
    async getImgCode(){
        return await this.Proxy.getImgCode();
    }

    //获取短信验证码
    async getPhoneCode(params){
        return await this.Proxy.getPhoneCode(params);
    }

}
