import ExchangeControllerBase from '../ExchangeControllerBase'
import UserStore from './UserStore'
import Error from "../Error"
import LoginController from "../login/LoginController"

class UserController extends ExchangeControllerBase {
    constructor() {
        super();
        this.store = new UserStore();
        this.loginInfo = LoginController().loginInfo;
    }

    // 收藏列表
    getCollect(type){
        let data = this.store.getCollect({
            typ: type,
            uid: this.loginInfo.userId,
        });
        if(data.msg !== 0){
            return {msg: Error(data.ret)};
        }
        data = data.data;
        let newData = {};
        if(data){
            newData.articles = data.art || [];
            newData.projects = data.pro || [];
            newData.news = data.nsf || [];
        }
        return newData;
    }
}

//静态实例
UserController.instance = null;

export default function () {
    if(!UserController.instance){
        UserController.instance = new UserController();
    }
    return UserController.instance;
}