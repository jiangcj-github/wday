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

    // 收藏内容列表-接口
    async getCollectList(type, curPage, pageSize){
        let result = await this.store.getCollectList({
            uid:    this.loginInfo.userId,
            typ:    type,
            cp:     curPage,
            ps:     pageSize,
        });
        if(result.ret !== 0){
            return {msg: Error(result.ret)};
        }
        let data = result.data;
        let resultR = {
            total:      data.all,
            list:       [],
        };
        let parseProject = item =>{
            let resItem = {
                id:             item.id,
                logo:           item.lgo,
                name:           item.nme,
                fullName:       item.enm,
                badgeList:      item.cw || [],
                minNum:         item.min && item.min.value,
                minUnit:        item.min && item.min.unit,
                maxNum:         item.max && item.max.value,
                maxUnit:        item.max && item.max.unit,
                actualNum:      item.act && item.act.value,
                actualUnit:     item.act && item.act.unit,
                startTime:      item.sd * 1000,
                endTime:        item.fd * 1000,
                recvCoin:       item.cur || [],
                heat:           item.hot,
                icoPrices:      [],
                isCollect:      this.isCollect(1, item.id),
                type:           0,
            };
            resItem.step = resItem.minNum && (resItem.actualNum / resItem.minNum * 100).fix(0);     // 进度
            return resItem;
        };
        let parseArticle = item =>({
            id:           item.id,
            author:       item.aut,
            title:        item.tit,
            content:      item.pre,
            img:          item.img && (item.img.indexOf("http") >-1 ? item.img : `http://192.168.55.125/image/origin/${item.img}`),
            like:         item.ln,
            read:         item.rn,
            date:         new Date(v.iss * 1000).dateHandle("MM-dd HH:mm"),
            isCollect:    this.isCollect(2, v.id),
        });
        let parseNews = item =>({


        });
        let parseFunc = {1: parseProject, 2: parseArticle, 3: parseNews}[type];
        if(data){
            await this.initCollect();
            resultR.total = data.all;
            data.lst && data.lst.forEach(item => resultR.list.push(parseFunc(item)));
        }
        return resultR;
    }

    // 项目打分
    async scoreProject(projectId, {potential,mode,innovate,truth,risky}){
        let data = await this.store.scoreProject({
            uid:    this.loginInfo.userId,
            pid:    projectId,
            pot:    potential,
            mod:    mode,
            inn:    innovate,
            tru:    truth,
            rsk:    risky,
        });
        if(data.ret !== 0){
            return {msg: Error(data.ret)};
        }
        return {};
    }

    async initCollect(){
        await this.store.initCollect(this.loginInfo.userId);
    }

    // 添加，取消收藏，必须调用initCollect初始化
    // type=1 项目, type=2 文章, type=3  快讯     op=true 收藏 op=false 取消收藏
    async setCollect(type,relateId,bool){
        let data = await this.store.setCollect({
            typ:    type,
            oid:    relateId,
            op:     bool,
            uid:    LoginController().loginInfo.userId,
        });
        if(data.ret !== 0){
            return {msg: Error(data.ret)};
        }
        //更新用户收藏列表
        this.store.saveLocalCollect(type,relateId,bool);
        return {};
    }

    // 判断是否被收藏，必须调用initCollect初始化
    isCollect(type,relateId){
        return this.store.isCollect(type,relateId);
    }

    // 获取本地收藏列表，必须调用initCollect初始化
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