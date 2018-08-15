import ExchangeControllerBase from '../ExchangeControllerBase'
import LoginStore from './LoginStore'

class LoginController extends ExchangeControllerBase {
    constructor() {
        super();
        this.store = new LoginStore();
    }

    //登录
    async login(phone, imgCode, phoneCode){
        let obj = {
            account: phone,
            password: "",
            picid: "",
            phone: phone,
            piccode: imgCode,
            pcode: phoneCode,
        };
        return await this.store.login(obj);
    }

    //获取图像验证码
    async getImgCode(){
        return await this.store.getImgCode();
    }

    //获取图像验证码
    async getPhoneCode(phone){
        return await this.store.getPhoneCode(phone);
    }
}

//静态实例
LoginController.instance = null;

export default function () {
    if(!LoginController.instance){
        LoginController.instance = new LoginController();
    }
    return LoginController.instance;
}