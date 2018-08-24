import ExchangeControllerBase from '../ExchangeControllerBase'
import ProjectStore from './ProjectStore'
import Error from "../Error";

class ProjectController extends ExchangeControllerBase {
    constructor() {
        super();
        this.store = new ProjectStore();
    }

    // 获取项目列表
    async getProjectList(curPage, pageSize, type){
        let data = await this.store.getProjectList({
          cp: curPage,
          ps: pageSize,
          typ: type,
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
            newData.total = data.all;
            data.pas && data.pas.forEach(item => newData.list.push({
              id:           item.id,
              logo:         item.lgo,
              name:         item.nme,
              fullName:     item.enm,
              badgeList:    item.cw || [],
              minNum:       item.tal && item.tal.pri,
              minUnit:      item.tal && item.tal.unt,
              maxNum:       item.tah && item.tah.pri,
              maxUnit:      item.tah && item.tah.unt,
              actualNum :   item.aa && item.aa.pri,
              actualUnit:   item.aa && item.aa.unt,
              isCollect:    false,
              startTime:    item.sd,
              endTime:      item.fd,
              recvCoin:     item.con || [],
              heat:          item.hot,
              icoPrices:    item.ra || [],
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
            Object.assign(newData,{
                type:   data.type,
                name:   data.nme,
                id:     data.id,
                badgeList:  data.cw || [],
                logo:   data.logo,
                startTime:  data.sd,
                endTime:    data.fd,
                minNum: data.lp,
                maxNum: data.hp,
                actualNum:  data.ap,
                recvCoin:   data.cur || [],
                step:   data.pro,
                heat:   data.hot,
                isCollect:  data.col,
                website:    data.url,
                whiteSkin:  data.wb,
                profile:    data.int,
                platform:   data.pla,
                area:   data.ara,
                icoPrice:   data.ico || [],
                icoNum: data.ia,
                publicNum:  data.pub,
                advantages: data.adv || {},
                heatRatings: data.rnk || {},
                scores: data.sco || {},
                routes: data.rut || [],
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
                icoPrice:   data.ret.ip,
                curPrice:   data.ret.np,
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