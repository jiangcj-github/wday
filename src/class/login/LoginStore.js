import ExchangeStoreBase from '../ExchangeStoreBase'
import DetectOS from '../lib/Os'
import Browser from '../lib/Browser'

export default class LoginStore extends ExchangeStoreBase {
    constructor() {
        super('login', 'general');
        this.state = {};
    }

    // 登陆
    async login(params) {
        return await this.Proxy.login(params);
    }

    //获取图像验证码
    async getImgCode(){
        return await this.Proxy.getImgCode();
    }

    //获取短信验证码
    async getPhoneCode(phone){
        return await this.Proxy.getPhoneCode(phone);
    }

}
