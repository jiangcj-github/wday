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
      finishAll: 0,
      finishList: [],
      runAll: 0,
      runList: [],
      soonAll: 0,
      soonList: [],
    };
    let parseItem = item =>({
      id: item.id,
      logo: item.src,
      name: item.nam,
      fullName: item.cw,
      totalNum: item.ta && item.ta.price,
      totalUnit:  item.ta && item.ta.unit,
      actualNum:  item.act && item.act.price,
      actualUnit:  item.act && item.act.unit,
      endTime:  item.fd,
      step: item.pro,
    });
    if(data && data.fns){
      newData.finishAll = data.fns.all;
      data.fns.lst && data.fns.lst.forEach(item =>newData.finishList.push(parseItem(item)));
    }
    if(data && data.run){
      newData.runAll = data.run.all;
      data.run.lst && data.run.lst.forEach(item=>newData.runList.push(parseItem(item)));
    }
    if(data && data.son){
      newData.soonAll = data.son.all;
      data.son.lst && data.son.lst.forEach(item=>newData.soonList.push(parseItem(item)));
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