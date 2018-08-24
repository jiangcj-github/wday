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

    // 添加，取消收藏
    // type=1 项目, type=2 文章, type=3  快讯
    // op=true 收藏 op=false 取消收藏
    setCollect(type,relateId,bool){
        let data = this.store.setCollect({
            typ: type,
            oid: relateId,
            op: bool,
            uid: LoginController().loginInfo.userId,
        });
        if(data.ret !== 0){
            return {msg: Error(data.ret)};
        }
        //更新用户收藏列表
        this.store.saveLocalCollect(type,relateId,bool);
        return {};
    }

    // 判断是否被收藏
    isCollect(type,relateId){
        return this.store.isCollect(type,relateId);
    }

    // 获取本地收藏列表
    getLocalCollect(type){
        return this.store.getLocalCollect(type);
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