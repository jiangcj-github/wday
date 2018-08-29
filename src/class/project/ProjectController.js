import ExchangeControllerBase from '../ExchangeControllerBase'
import ProjectStore from './ProjectStore'
import Error from "../Error";
import UserController from  "../user/UserController";

class ProjectController extends ExchangeControllerBase {
    constructor() {
        super();
        this.store = new ProjectStore();
    }

    // 获取项目列表
    async getProjectList(curPage, pageSize, type, sort){
        let data = await this.store.getProjectList({
          cp: curPage,
          ps: pageSize,
          typ: type,
          srt: sort,
        });
        if(data.ret !== 0){
            return {msg: Error(data.ret)};
        }
        data = data.data;

        let newData = {
            total: 0,
            list: [],
        };
        if(data){
            await UserController().initCollect();
            newData.total = data.all;
            data.pas && data.pas.forEach(item => newData.list.push({
              id:           item.id,
              logo:         item.lgo,
              name:         item.nme,
              fullName:     item.enm,
              badgeList:    item.cw || [],
              minNum:       item.min && item.min.value,
              minUnit:      item.min && item.min.unit,
              maxNum:       item.max && item.max.value,
              maxUnit:      item.max && item.max.unit,
              actualNum :   item.act && item.act.value,
              actualUnit:   item.act && item.act.unit,
              startTime:    item.sd * 1000,
              endTime:      item.fd * 1000,
              recvCoin:     item.cur || [],
              heat:          item.hot,
              icoPrices:    [],
              isCollect:    UserController().isCollect(1, item.id),
            }));
        }
        return newData;
    }

    // 获取项目详情
    async getProjectDetail(id){
        let data = await this.store.getProjectDetail({
          id: id
        });
        if(data.ret !== 0){
            return {msg: Error(data.ret)};
        }
        data = data.data;

        let newData = {};
        if(data){
            await UserController().initCollect();
            Object.assign(newData,{
                type:   data.type,
                name:   data.nme,
                id:     data.id,
                badgeList:  data.cw || [],
                logo:   data.logo,
                startTime:  data.sd * 1000,
                endTime:    data.fd * 1000,
                minNum: data.lp && data.lp.value,
                minUnit: data.lp && data.lp.unit,
                maxNum: data.hp && data.hp.value,
                maxUnit: data.hp && data.hp.unit,
                actualNum:  data.ap && data.ap.value,
                actualUnit:  data.ap && data.ap.unit,
                recvCoin:   data.cur || [],
                step:   data.pro,
                heat:   data.hot,
                website:    data.url,
                whiteSkin:  data.wb,
                profile:    data.int,
                platform:   data.pla,
                area:   data.ara,
                icoPrice:   data.ip || [],
                icoNum: data.ia,
                publicNum:  data.pub,
                advantages: data.adv || {},          //项目优势
                heatRatings: data.rnk || {},        //热度评级
                scores: data.sco || {},             //用户打分
                routes: data.rut || [],
                isCollect:    UserController().isCollect(1, data.id),
            });
            newData.teams = [];
            data.tm && data.tm.forEach(item => newData.teams.push({
                logo:   item.lgo,
                name:   item.nme,
                position:   item.pos,
                link:   item.li,
            }));
            newData.articles = [];
            data.art && data.art.forEach(item => newData.articles.push({
                id: item.id,
                title:  item.title,
                content:    item.ctt,
                picture:    item.pic,
                author: item.aut,
                timestamp:  item.iss,
                readNum:    item.red,
                praiseNum:  item.lik,
            }));
            newData.markets = {};
            data.mkt && Object.assign(newData.markets, {
                curPrice:   data.mkt.np,
                highPrice:  data.mkt.hp,
                lowPrice:   data.mkt.lp,
                rise:   data.mkt.ris,
                volume: data.mkt.vol,
                turnover:   data.mkt.dp,
                marketValue:    data.mkt.val,
                num:    data.mkt.num,
                source: data.mkt.sos,
            });
            newData.returns = {};
            data.ret && Object.assign(newData.returns, {
                icoPrice:   data.ret.ip || [],
                curPrice:   data.ret.np || [],
                usdProfit:   data.ret.usd,
                btcProfit:  data.ret.btc,
                etcProfit:  data.ret.etc,
            });
        }
        return newData;
    }

}

//静态实例
ProjectController.instance = null;

export default function () {
    if(!ProjectController.instance){
        ProjectController.instance = new ProjectController();
    }
    return ProjectController.instance;
}