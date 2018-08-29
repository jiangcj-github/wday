import ExchangeControllerBase from '../ExchangeControllerBase'
import LoginStore from './LoginStore'
import Error from "../Error"

class LoginController extends ExchangeControllerBase {
    constructor() {
        super();
        this.store = new LoginStore();
    }

    // 登录
    async login(phone, imgCode, phoneCode, picId){
        if(!/^1[23456789]\d{9}$/.test(phone)){
            return {msg: "请输入正确的手机号", tip: "phone"};
        }
        if(!imgCode){
            return {msg: "图形验证码错误", tip: "ic"};
        }
        if(!phoneCode){
            return {msg: "短信验证码错误", tip: "pc"};
        }
        let data = await this.store.login({
            act:    phone,
            pwd:    "",
            pid:    picId,
            phe:    phone,
            pcd:    imgCode,
            hcd:    phoneCode
        });
        if(data.ret !== 0) {
            return {msg: Error(data.ret), tip: "other"};
        }
        data = data.data;
        this.store.saveLogin({
          userToken:    data.tkn,
          userPhone:    data.phe,
          userId:       data.uid,
          loginTime:    Date.now(),
        });
        return {};
    }

    // 退出登录
    async logout(){
       let data = await this.store.logout();
       if(data.ret !== 0) {
           return {msg: Error(data.ret)};
       }
       this.store.clearLogin();
       return {};
    }

    // 获取图像验证码
    async getImgCode(){
        let data = await this.store.getCode({typ: 1});
        if(data.ret !== 0) {
            return {msg: Error(data.ret)};
        }
        data = data.data || {};
        return {pid: data.id, pcode: data.pcd};
    }

    // 获取手机验证码
    async getPhoneCode(phone){
        if(!/^1[23456789]\d{9}$/.test(phone)) {
            return {msg: "请输入正确的手机号", tip: "phone"};
        }
        let data = await this.store.getCode({typ: 2, phe: phone});
        if(data.ret !== 0) {
            return {msg: Error(data.ret), tip: "pc"};
        }
        return {};
    }

    // 获取登录信息
    get loginInfo(){
        return this.store.loginInfo;
    }

    isLogin(){
        let isLogin = this.store.isLogin();
        !isLogin && this.store.clearLogin();
        return isLogin;
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