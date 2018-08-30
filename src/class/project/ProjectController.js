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
          cp:     curPage,
          ps:     pageSize,
          typ:    type,
          srt:    sort,
        });
        if(data.ret !== 0){
            return {msg: Error(data.ret)};
        }
        data = data.data;

        let newData = {
            total:  0,
            list:   [],
        };
        if(data){
            await UserController().initCollect();
            newData.total = data.all;
            data.pas && data.pas.forEach(item => {
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
                    isCollect:      UserController().isCollect(1, item.id),
                    type:           type,
                };
                resItem.step = resItem.minNum && (resItem.actualNum / resItem.minNum * 100).fix(0);     // 进度
                newData.list.push(resItem);
            });
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
                type:           data.sta,
                name:           data.nme,
                fullName:       data.enm,
                id:             data.id,
                badgeList:      data.cw || [],
                logo:           data.lgo,
                startTime:      data.sd * 1000,
                endTime:        data.fd * 1000,
                minNum:         data.min && data.min.value,
                minUnit:        data.min && data.min.unit,
                maxNum:         data.max && data.max.value,
                maxUnit:        data.max && data.max.unit,
                actualNum:      data.act && data.act.value,
                actualUnit:     data.act && data.act.unit,
                recvCoin:       data.cur || [],
                heat:           data.hot,
                website:        data.url,
                whiteSkin:      data.wpl,
                profile:        data.int,
                platform:       data.plf,
                area:           data.cty,
                icoPrice:       data.ipc && data.ipc.value,
                icoPriceUnit:   data.ipc && data.ipc.unit,
                icoVolume:      data.iv && data.iv.value,
                icoVolumeUnit:  data.iv && data.iv.unit,
                publish:        data.icc && data.icc.value,
                publishUnit:    data.icc && data.icc.unit,
                twitter:        data.twi,
                facebook:       data.fbk,
                telegram:       data.tel,
                isCollect:      UserController().isCollect(1, data.id),
            });
            newData.step = newData.minNum && (newData.actualNum / newData.minNum * 100).fix(0);
            newData.advantage = {};
            Object.assign(newData.advantage, {
                content:        data.adv,
            });
            newData.market = {};
            Object.assign(newData.market, {
                price:          data.pri && data.pri.value,
                unit:           data.pri && data.pri.unit,
                maxPrice:       data["24a"] && data["24a"].value,
                maxUnit:        data["24a"] && data["24a"].unit,
                minPrice:       data["24m"] && data["24m"].value,
                minUnit:        data["24m"] && data["24m"].unit,
                rise:           data.ris && data.ris.value,
                riseUnit:       data.ris && data.ris.unit,
                volume:         data.vol && data.vol.value,
                volumeUnit:     data.vol && data.vol.unit,
            });
            newData.return = {};
            Object.assign(newData.return, {
                usd:            data.usd && data.usd.value,
                usdUnit:        data.usd && data.usd.unit,
                btc:            data.btc && data.btc.value,
                btcUnit:        data.btc && data.btc.unit,
                eth:            data.eth && data.eth.value,
                ethUnit:        data.eth && data.eth.unit,
            });
            newData.score = {};
            Object.assign(newData.score, {
                potential:      data.pot,
                mode:           data.mod,
                innovate:       data.inn,
                truth:          data.tru,
                risky:          data.rsk,
                media:          data.med,
                hot:            data.sh,
                community:      data.cb,
                team:           data.tb,
                technique:      data.te,
            });
            newData.routeLine = [];
            data.rc && data.rc.forEach(item => newData.routeLine.push({
                time:           item.dte * 1000,
                event:          item.evt,
            }));
            newData.teams = [];
            data.mem && data.mem.forEach(item => newData.teams.push({
                headimg:        item.img,
                name:           item.nam,
                position:       item.pos,
                linkedin:       item.lik,
            }));
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