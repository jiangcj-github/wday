import ExchangeControllerBase from '../ExchangeControllerBase'
import HomeStore from './HomeStore'
import Error from "../Error"

class HomeController extends ExchangeControllerBase {
  constructor() {
    super();
    this.store = new HomeStore();
  }

  //获取首页项目列表
  async getHomeProjects(){
    let data = await this.store.getHomeProjects();
    if(data.ret !== 0){
      return {msg: Error(data.ret)};
    }
    data = data.data;

    let newData = {
      finishAll:    0,
      finishList:   [],
      runAll:       0,
      runList:      [],
      soonAll:      0,
      soonList:     [],
    };
    let parseItem = item =>{
      let resItem = {
        id:             item.id,
        logo:           item.lgo,
        name:           item.nam,
        fullName:       item.enm,
        badgeList:      item.cw || [],
        totalNum:       item.ta && item.ta.value,
        totalUnit:      item.ta && item.ta.unit,
        actualNum:      item.act && item.act.value,
        actualUnit:     item.act && item.act.unit,
        endTime:        item.fd * 1000,
      };
      resItem.step = resItem.totalNum && (resItem.actualNum / resItem.totalNum * 100).fix(0);
      return resItem;
    };
    if(data && data.fa){
      newData.finishAll = data.fa.all;
      data.fa.lst && data.fa.lst.forEach(item =>newData.finishList.push(parseItem(item)));
    }
    if(data && data.ra){
      newData.runAll = data.ra.all;
      data.ra.lst && data.ra.lst.forEach(item=>newData.runList.push(parseItem(item)));
    }
    if(data && data.sa){
      newData.soonAll = data.sa.all;
      data.sa.lst && data.sa.lst.forEach(item=>newData.soonList.push(parseItem(item)));
    }
    return newData;
  }
}

//静态实例
HomeController.instance = null;

export default function () {
  if(!HomeController.instance){
    HomeController.instance = new HomeController();
  }
  return HomeController.instance;
}