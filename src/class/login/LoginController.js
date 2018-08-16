import ExchangeControllerBase from '../ExchangeControllerBase'
import LoginStore from './LoginStore'

class LoginController extends ExchangeControllerBase {
    constructor() {
        super();
        this.store = new LoginStore();
    }

    //登录
    async login(phone, imgCode, phoneCode, picId){
        if(!/^1[23456789]\d{9}$/.test(phone)){
            return Promise.resolve({msg: "请输入正确的手机号", tip: "phone"});
        }
        if(!imgCode){
            return Promise.resolve({msg: "图形验证码错误", tip: "ic"});
        }
        if(!phoneCode){
            return Promise.resolve({msg: "短信验证码错误", tip: "pc"});
        }
        //
        let data = await this.store.login({
            account: phone,
            password: "",
            picid: picId,
            phone: phone,
            piccode: imgCode,
            pcode: phoneCode
        });
        if(!data || data.ret !== 1){
            return Promise.resolve({msg: "登录失败", tip: "other"})
        }
        //登录成功
        data = data.data;
        this.store.saveLogin({token: data.token, phone: phone});
        return Promise.resolve({});
    }

    //获取登录信息
    get loginInfo(){
        return this.store.loginInfo;
    }

    //退出登录
    async logout(){
       let data = await this.store.logout();
       if(!data || data.ret !== 1){
           return Promise.resolve({msg: "退出失败", tip: "other"})
       }
       //退出登录成功
       this.store.clearLogin();
       return Promise.resolve({});
    }

    //获取图像验证码
    async getImgCode(){
        let data = await this.store.getImgCode();console.log(data);
        if(!data || data.ret !== 1){
            return Promise.resolve({msg: ""});
        }
        data = data.data;
        return Promise.resolve({id: data.id, pic: data.pic});
    }

    //获取手机验证码
    async getPhoneCode(phone){
        if(!/^1[23456789]\d{9}$/.test(phone)){
            return Promise.resolve({msg: "请输入正确的手机号", tip: "phone"});
        }
        //
        let data = await this.store.getPhoneCode({phone: phone});
        if(!data || data.ret !== 1){
            return Promise.resolve({msg: "发送失败", tip: "pc"});
        }
        return Promise.resolve({});
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