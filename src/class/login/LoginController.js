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
        let res = await this.store.getImgCode();
        let data = {};
        if(res){
            data = {id: res.id, pic: res.pic}
        }
        return Promise.resolve(data);
    }

    //获取手机验证码
    async getPhoneCode(phone){
        if(!/^1[23456789]\d{9}$/.test(phone)){
            return Promise.resolve({msg: "请输入正确的手机号"});
        }
        //
        let res = await this.store.getPhoneCode(phone);
        let data = {};
        if(res){
            data = {}
        }
        return Promise.resolve(data);
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